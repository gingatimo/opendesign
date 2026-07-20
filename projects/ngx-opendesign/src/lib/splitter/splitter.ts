import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  contentChildren,
  Directive,
  inject,
  input,
  linkedSignal,
  output,
  TemplateRef,
} from '@angular/core';

// Đánh dấu một panel của splitter: <ng-template gSplitterPanel>…</ng-template>. Splitter tự chèn gutter
// (thanh kéo) GIỮA các panel liền kề.
@Directive({ selector: 'ng-template[gSplitterPanel]' })
export class GSplitterPanel {
  readonly template = inject(TemplateRef);
}

// Bố cục CHIA ĐÔI/BA có thanh KÉO để đổi kích thước hai bên. Panel chiếu qua <ng-template gSplitterPanel>
// (N panel, gutter tự chèn giữa). Kích thước là "trọng số" flex-grow — kéo gutter chỉ đổi cặp panel hai
// bên nó (tổng giữ nguyên). orientation 'horizontal' (cạnh nhau, mặc định) | 'vertical' (xếp chồng).
@Component({
  selector: 'g-splitter',
  imports: [NgTemplateOutlet],
  template: `
    @for (panel of panels(); track panel; let i = $index, last = $last) {
      <div class="g-splitter__panel" [style.flex-grow]="weights()[i]">
        <ng-container *ngTemplateOutlet="panel.template" />
      </div>
      @if (!last) {
        <div
          class="g-splitter__gutter"
          role="separator"
          tabindex="0"
          [attr.aria-orientation]="orientation()"
          [attr.aria-valuenow]="round(weights()[i])"
          (pointerdown)="onPointerDown($event, i)"
          (keydown)="onKeydown($event, i)"
        >
          <span class="g-splitter__grip"></span>
        </div>
      }
    }
  `,
  styleUrl: './splitter.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'g-splitter',
    '[class.g-splitter--vertical]': "orientation() === 'vertical'",
  },
})
export class GSplitter {
  readonly orientation = input<'horizontal' | 'vertical'>('horizontal');
  // Kích thước ban đầu (trọng số, thường cộng = 100). Không truyền → chia đều.
  readonly sizes = input<readonly number[] | undefined>(undefined);
  // Trọng số tối thiểu mỗi panel (chặn kéo thu về 0).
  readonly minSize = input(8);
  readonly sizeChange = output<number[]>();

  protected readonly panels = contentChildren(GSplitterPanel);

  // Trọng số hiện tại — khởi từ [sizes] (hoặc chia đều), ghi lại khi kéo. linkedSignal: reset nếu số
  // panel / [sizes] đổi, nhưng vẫn set được lúc kéo.
  protected readonly weights = linkedSignal<number[]>(() => {
    const n = this.panels().length;
    const s = this.sizes();
    if (s && s.length === n) return [...s];
    return n ? Array<number>(n).fill(100 / n) : [];
  });

  protected round(n: number): number {
    return Math.round(n);
  }

  protected onPointerDown(e: PointerEvent, gutterIndex: number): void {
    e.preventDefault();
    const gutter = e.currentTarget as HTMLElement;
    const prev = gutter.previousElementSibling as HTMLElement | null;
    const next = gutter.nextElementSibling as HTMLElement | null;
    if (!prev || !next) return;
    const horizontal = this.orientation() === 'horizontal';
    const pairPx = horizontal
      ? prev.offsetWidth + next.offsetWidth
      : prev.offsetHeight + next.offsetHeight;
    const startPos = horizontal ? e.clientX : e.clientY;
    const w0 = this.weights();
    const pairWeight = w0[gutterIndex] + w0[gutterIndex + 1];
    const startW = w0[gutterIndex];
    const min = this.minSize();

    // Nghe trên window (không phụ thuộc pointer capture) để kéo bám cả khi con trỏ rời khỏi gutter.
    const move = (ev: PointerEvent) => {
      const delta = (horizontal ? ev.clientX : ev.clientY) - startPos;
      const clamped = Math.min(
        Math.max(startW + (delta / pairPx) * pairWeight, min),
        pairWeight - min,
      );
      const nw = [...this.weights()];
      nw[gutterIndex] = clamped;
      nw[gutterIndex + 1] = pairWeight - clamped;
      this.weights.set(nw);
      this.sizeChange.emit(nw);
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  }

  // Bàn phím: ←/→ (ngang) hoặc ↑/↓ (dọc) nhích 2 đơn vị mỗi lần.
  protected onKeydown(e: KeyboardEvent, gutterIndex: number): void {
    const horizontal = this.orientation() === 'horizontal';
    const dec = horizontal ? 'ArrowLeft' : 'ArrowUp';
    const inc = horizontal ? 'ArrowRight' : 'ArrowDown';
    if (e.key !== dec && e.key !== inc) return;
    e.preventDefault();
    const step = e.key === inc ? 2 : -2;
    const w0 = this.weights();
    const pairWeight = w0[gutterIndex] + w0[gutterIndex + 1];
    const min = this.minSize();
    const clamped = Math.min(Math.max(w0[gutterIndex] + step, min), pairWeight - min);
    const nw = [...w0];
    nw[gutterIndex] = clamped;
    nw[gutterIndex + 1] = pairWeight - clamped;
    this.weights.set(nw);
    this.sizeChange.emit(nw);
  }
}
