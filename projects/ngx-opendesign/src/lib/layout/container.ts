import { Directive } from '@angular/core';

// Style-only directive (giống gLink): chỉ gắn class để opendesign.scss vẽ. max-width canh giữa cho
// vùng nội dung đọc dễ; consumer ghi đè bằng token --g-container-max-width.
@Directive({
  selector: '[gContainer]',
  host: { class: 'g-container' },
})
export class GContainer {}
