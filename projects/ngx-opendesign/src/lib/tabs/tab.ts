import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  input,
  TemplateRef,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'g-tab',
  // Nội dung tab được bọc trong ng-template để GTabs chỉ render tab đang active.
  // Đã kiểm chứng: <ng-content> lồng trong <ng-template> vẫn chiếu đúng nội dung consumer
  // truyền vào, nhưng nội dung đó chỉ thực sự được khởi tạo (instantiate) khi template được
  // stamp ra qua ngTemplateOutlet — xem test "chỉ render nội dung tab đang chọn" ở tabs.spec.ts,
  // nội dung của tab chưa active không xuất hiện trong host.textContent, chứng minh nó chưa
  // được render chứ không phải chỉ bị ẩn bằng CSS.
  template: `<ng-template #content><ng-content /></ng-template>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GTab {
  readonly label = input.required<string>();
  readonly disabled = input(false, { transform: booleanAttribute });

  readonly content = viewChild.required<TemplateRef<unknown>>('content');
}
