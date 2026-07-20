import { NgTemplateOutlet } from '@angular/common';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDragHandle,
  CdkDropList,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import {
  ChangeDetectionStrategy,
  Component,
  contentChild,
  model,
  TemplateRef,
} from '@angular/core';

// Danh sách KÉO-THẢ để sắp xếp lại thứ tự (dùng CDK drag-drop). `[(items)]` hai chiều — thả xong tự
// cập nhật mảng. Mỗi hàng render bằng <ng-template let-item let-i="index"> consumer chiếu vào (không có
// thì hiện thẳng item). Có tay nắm (grip) để kéo; xem trước (preview) nổi khi kéo, chỗ trống mờ đi.
@Component({
  selector: 'g-reorder-list',
  imports: [CdkDropList, CdkDrag, CdkDragHandle, NgTemplateOutlet],
  template: `
    <div cdkDropList class="g-reorder-list__list" (cdkDropListDropped)="onDrop($event)">
      @for (item of items(); track item; let i = $index) {
        <div cdkDrag class="g-reorder-list__item">
          <button
            type="button"
            cdkDragHandle
            class="g-reorder-list__handle"
            aria-label="Kéo để sắp xếp lại"
          >
            <svg width="10" height="16" viewBox="0 0 10 16" aria-hidden="true" fill="currentColor">
              <circle cx="2" cy="3" r="1.3" />
              <circle cx="8" cy="3" r="1.3" />
              <circle cx="2" cy="8" r="1.3" />
              <circle cx="8" cy="8" r="1.3" />
              <circle cx="2" cy="13" r="1.3" />
              <circle cx="8" cy="13" r="1.3" />
            </svg>
          </button>

          <div class="g-reorder-list__content">
            @if (itemTemplate(); as tpl) {
              <ng-container *ngTemplateOutlet="tpl; context: { $implicit: item, index: i }" />
            } @else {
              {{ item }}
            }
          </div>
        </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'g-reorder-list' },
})
export class GReorderList<T> {
  // Danh sách item (two-way `[(items)]`). Thả xong tự set lại theo thứ tự mới.
  readonly items = model<T[]>([]);

  // Template hàng do consumer chiếu vào (context `$implicit` = item, `index` = vị trí). Không có → item.
  protected readonly itemTemplate = contentChild(TemplateRef);

  protected onDrop(e: CdkDragDrop<T[]>): void {
    const arr = [...this.items()];
    moveItemInArray(arr, e.previousIndex, e.currentIndex);
    this.items.set(arr);
  }
}
