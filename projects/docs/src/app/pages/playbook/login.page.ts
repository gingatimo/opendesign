import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CodeBlock } from '../../shared/code-block';
import { DemoSection } from '../../shared/demo-section';
import { LoginFormDemo } from '../../demos/playbook/login-form.demo';

@Component({
  imports: [LoginFormDemo, CodeBlock, DemoSection],
  template: `
    <h1>Đăng nhập</h1>
    <p>
      Màn đăng nhập tối giản dựng bằng <code>GCard</code> + <code>GInput</code> +
      <code>GCheckbox</code> + <code>GButton</code>. Reactive forms với
      <code>Validators.required</code> và <code>Validators.email</code>; lỗi chỉ hiện khi trường đã
      touched và invalid. Nút submit chuyển sang trạng thái <code>loading</code> thật trong lúc "gọi
      API" để chặn double-submit.
    </p>
    <docs-demo-section>
      <docs-login-form-demo />
    </docs-demo-section>
    <docs-code-block src="demo-sources/playbook/login-form.demo.ts" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PlaybookLoginPage {}
