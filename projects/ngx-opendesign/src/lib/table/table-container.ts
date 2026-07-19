import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  ElementRef,
  inject,
  input,
  numberAttribute,
  signal,
} from '@angular/core';

/**
 * Vùng cuộn bao quanh `<table gTable>`: cấp `overflow` + viền + bo góc, và (tuỳ chọn) giữ chiều cao
 * ỔN ĐỊNH theo SỐ HÀNG để khi kết quả đổi (lọc/phân trang) bảng không co giãn giật, đồng thời tự
 * thêm scroll khi vượt quá `maxRows`.
 *
 * `minRows`/`maxRows` được quy ra chiều cao thực bằng cách ĐO lúc chạy: chiều cao `<thead>` + N ×
 * chiều cao một hàng thân bảng (+ phần viền của chính vùng cuộn). Đo lại khi resize hoặc đổi nội
 * dung (`ResizeObserver` + `MutationObserver`). Hàng "rỗng" (`td[colspan]`, vd. ô thông báo "không
 * có dữ liệu") bị bỏ qua khi đo để không lấy nhầm chiều cao của nó làm đơn vị hàng; chiều cao hàng
 * đo được gần nhất được cache để vẫn ràng buộc đúng khi bảng tạm thời rỗng.
 *
 * Chỉ style phần tử host của chính mình nên đặt style ở `:host` (khác `GInputGroup` phải để style ở
 * global scss vì cần với tới nội dung projected).
 */
@Component({
  selector: 'g-table-container',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'g-table-container',
    '[class.g-table-container--capped]': 'maxRows() > 0',
    '[style.min-height.px]': 'minHeight()',
    '[style.max-height.px]': 'maxHeight()',
  },
  styles: `
    :host {
      display: block;
      /* Thư viện không reset box-sizing toàn cục nên phải tự khai — để min/max-height tính cả viền. */
      box-sizing: border-box;
      overflow: auto;
      border: 1px solid var(--g-border);
      border-radius: var(--g-radius-md);
    }
    /* Có maxRows (vùng cuộn có thể bật thanh cuộn dọc): giữ chỗ thanh cuộn cố định để lúc nó hiện/ẩn
       bề rộng nội dung không đổi — tránh chữ sát mép wrap qua lại làm chiều cao hàng dao động rồi
       kéo maxHeight nhấp nháy. */
    :host(.g-table-container--capped) {
      scrollbar-gutter: stable;
    }
  `,
})
export class GTableContainer {
  /** Giữ tối thiểu bấy nhiêu hàng chiều cao (0 = không đặt) — chống giật khi kết quả ngắn lại. */
  readonly minRows = input(0, { transform: numberAttribute });
  /** Tối đa bấy nhiêu hàng; vượt quá thì cuộn dọc (0 = không giới hạn). */
  readonly maxRows = input(0, { transform: numberAttribute });

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly destroyRef = inject(DestroyRef);

  // Chiều cao px đã tính; null = không ràng buộc (host bỏ qua style khi giá trị null).
  protected readonly minHeight = signal<number | null>(null);
  protected readonly maxHeight = signal<number | null>(null);

  // Chiều cao một hàng thân bảng đo được gần nhất — cache để còn dùng khi bảng tạm rỗng.
  private rowUnit = 0;

  constructor() {
    // Đổi minRows/maxRows -> tính lại. measure() đọc DOM nên lần chạy đầu (trước render) sẽ return
    // sớm vì chưa có <table>; afterNextRender lo lần đo đầu tiên, effect lo các lần input đổi sau.
    effect(() => {
      this.minRows();
      this.maxRows();
      this.measure();
    });

    afterNextRender(() => {
      this.measure();
      // ResizeObserver: cột/hàng co giãn theo nội dung, cửa sổ đổi kích thước. MutationObserver:
      // thêm/bớt hàng (lọc/phân trang). Chỉ quan sát childList+subtree (KHÔNG attributes) nên việc
      // set min/max-height của ta không tự kích hoạt lại. Signal dedupe theo Object.is nên set lại
      // cùng giá trị là no-op -> ResizeObserver không lặp vô hạn vì thay đổi của chính mình.
      const ro = new ResizeObserver(() => this.measure());
      ro.observe(this.host);
      const table = this.host.querySelector('table');
      if (table) ro.observe(table);
      const mo = new MutationObserver(() => this.measure());
      mo.observe(this.host, { childList: true, subtree: true });
      this.destroyRef.onDestroy(() => {
        ro.disconnect();
        mo.disconnect();
      });
    });
  }

  private measure(): void {
    const table = this.host.querySelector('table');
    if (!table) return;

    // Đo bằng getBoundingClientRect().height (số THỰC, phân số) thay vì offsetHeight (đã làm tròn):
    // với maxRows, N × rowUnit làm tròn tích luỹ tối đa ~N×0.5px sai lệch → có thể hiện scrollbar
    // ngay ở đúng N hàng hoặc kẹp mất 1px hàng cuối.
    const headH = table.tHead?.getBoundingClientRect().height ?? 0;
    const body = table.tBodies[0];
    if (body) {
      // :scope > td[colspan] — chỉ ô con TRỰC TIẾP của hàng, khỏi bắt nhầm colspan của bảng lồng.
      const dataRow = Array.from(body.rows).find((r) => !r.querySelector(':scope > td[colspan]'));
      if (dataRow) this.rowUnit = dataRow.getBoundingClientRect().height;
    }

    const min = this.minRows();
    const max = this.maxRows();
    // Phần "khung" ngoài vùng nội dung (viền trên+dưới, và thanh cuộn ngang nếu có) — cộng vào để
    // border-box hiện đúng N hàng thay vì bị viền ăn mất ~2px.
    const chrome = this.host.offsetHeight - this.host.clientHeight;

    this.minHeight.set(min > 0 && this.rowUnit ? headH + min * this.rowUnit + chrome : null);
    // +1px dung sai: chặn scrollbar bật ngay ở đúng maxRows hàng do sai số sub-pixel còn sót (chrome
    // vẫn lấy từ offsetHeight/clientHeight nguyên nên có thể lệch ~1px).
    this.maxHeight.set(max > 0 && this.rowUnit ? headH + max * this.rowUnit + chrome + 1 : null);
  }
}
