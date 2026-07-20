import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CodeBlock } from '../../shared/code-block';
import { DemoSection } from '../../shared/demo-section';
import { CreatePageDemo } from '../../demos/playbook/create-page.demo';

@Component({
  imports: [CreatePageDemo, CodeBlock, DemoSection],
  template: `
    <h1>Thêm mới</h1>
    <p>
      Form "tạo bản ghi" gom gần đủ họ input của OpenDesign:
      <code>GInput</code>/<code>GInputGroup</code>, <code>GTextarea</code>, <code>GSelect</code>,
      <code>GRadioGroup</code>, <code>GCheckbox</code>, <code>GToggle</code>,
      <code>GDatepicker</code>, <code>GSlider</code>, <code>GChips</code> và
      <code>GFileInput</code> + <code>GImagePreview</code>. Validation qua reactive forms (trường
      bắt buộc đánh dấu <span aria-hidden="true">*</span>), nút <b>Lưu</b> bắn toast. Riêng
      <code>GDatepicker</code>/<code>GSlider</code> dùng model <code>[(value)]</code> (không phải
      CVA) nên giữ ngoài form group rồi gộp tay lúc submit.
    </p>
    <docs-demo-section>
      <docs-create-page-demo />
    </docs-demo-section>
    <docs-code-block src="demo-sources/playbook/create-page.demo.ts" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PlaybookCreatePage {}
