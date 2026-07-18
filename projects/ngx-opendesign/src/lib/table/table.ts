import {
  afterNextRender,
  booleanAttribute,
  DestroyRef,
  Directive,
  ElementRef,
  inject,
  input,
} from '@angular/core';

// Table thuần hiển thị + điều phối freeze. Consumer lo dữ liệu/sắp xếp/phân trang.
// Freeze: dò marker [gFreezeColumn]/[gFreezeRow] rồi áp position:sticky + offset cộng dồn (đo bề rộng
// cột / chiều cao hàng). Nền đục do CSS (.g-table--freeze). Đo lại khi resize/đổi nội dung.
@Directive({
  selector: 'table[gTable]',
  host: {
    class: 'g-table',
    '[class.g-table--striped]': 'striped()',
    '[class.g-table--sticky]': 'stickyHeader()',
  },
})
export class GTable {
  readonly striped = input(false, { transform: booleanAttribute });
  readonly stickyHeader = input(false, { transform: booleanAttribute });

  private readonly table = inject<ElementRef<HTMLTableElement>>(ElementRef).nativeElement;
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      this.applyFreeze();
      // ResizeObserver: cột co giãn theo nội dung. MutationObserver: thêm/bớt hàng (filter/paging).
      // Chỉ quan sát childList+subtree (KHÔNG attributes) nên việc set style của ta không gây vòng lặp.
      const ro = new ResizeObserver(() => this.applyFreeze());
      ro.observe(this.table);
      const mo = new MutationObserver(() => this.applyFreeze());
      mo.observe(this.table, { childList: true, subtree: true });
      this.destroyRef.onDestroy(() => {
        ro.disconnect();
        mo.disconnect();
      });
    });
  }

  private applyFreeze(): void {
    const colMarker = this.table.querySelector<HTMLTableCellElement>('th[gFreezeColumn]');
    const rowMarker = this.table.querySelector<HTMLTableRowElement>('tr[gFreezeRow]');
    const hasFreeze = !!colMarker || !!rowMarker;
    // Bảng không freeze và chưa từng freeze → return sớm, khỏi quét (tránh overhead cho bảng cơ bản).
    if (!hasFreeze && !this.table.classList.contains('g-table--freeze')) return;
    this.clearFreeze();
    this.table.classList.toggle('g-table--freeze', hasFreeze);
    if (!hasFreeze) return;

    const rows = Array.from(this.table.rows);

    if (colMarker) {
      const boundary = colMarker.cellIndex;
      const headerCells = Array.from((colMarker.parentElement as HTMLTableRowElement).cells);
      const lefts: number[] = [];
      let acc = 0;
      for (let c = 0; c <= boundary; c++) {
        lefts[c] = acc;
        acc += headerCells[c]?.offsetWidth ?? 0;
      }
      for (const row of rows) {
        for (let c = 0; c <= boundary; c++) {
          const cell = row.cells[c];
          if (!cell) continue;
          cell.style.position = 'sticky';
          cell.style.left = `${lefts[c]}px`;
          cell.style.zIndex = '2';
          if (c === boundary) cell.classList.add('g-table__freeze-col-edge');
        }
      }
    }

    if (rowMarker) {
      const boundary = rows.indexOf(rowMarker);
      const tops: number[] = [];
      let acc = 0;
      for (let r = 0; r <= boundary; r++) {
        tops[r] = acc;
        acc += rows[r]?.offsetHeight ?? 0;
      }
      for (let r = 0; r <= boundary; r++) {
        const row = rows[r];
        for (const cell of Array.from(row.cells)) {
          cell.style.position = 'sticky';
          cell.style.top = `${tops[r]}px`;
          cell.style.zIndex = cell.style.left ? '4' : '3'; // góc giao (có cả left) cao nhất
          // Chỉ HÀNG RANH GIỚI có bóng-dưới; áp lên CELL (box-shadow trên <tr> + border-collapse
          // render không đáng tin) — đối xứng với freeze-col-edge.
          if (r === boundary) cell.classList.add('g-table__freeze-row-edge');
        }
      }
    }
  }

  private clearFreeze(): void {
    for (const row of Array.from(this.table.rows)) {
      for (const cell of Array.from(row.cells)) {
        cell.style.position = '';
        cell.style.left = '';
        cell.style.top = '';
        cell.style.zIndex = '';
        cell.classList.remove('g-table__freeze-col-edge', 'g-table__freeze-row-edge');
      }
    }
  }
}
