import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiRow, ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { ProgressBasicDemo } from '../demos/progress/progress-basic.demo';
import { ProgressCircleDemo } from '../demos/progress/progress-circle.demo';

@Component({
  imports: [ProgressBasicDemo, ProgressCircleDemo, CodeBlock, ApiTable, DemoSection],
  template: `
    <h1>Progress</h1>
    <p>Thanh tiến độ hiển thị tỉ lệ hoàn thành, hỗ trợ cả trạng thái không xác định.</p>

    <docs-demo-section>
      <docs-progress-basic-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/progress/progress-basic.demo.ts" />

    <h2>Vòng tròn (đếm ngược)</h2>
    <p>
      <code>GProgressCircle</code> vẽ tiến độ dạng vòng tròn — <code>[value]</code> 0–100 quyết định
      độ dài cung, phần còn lại là track mờ. Nội dung chiếu vào giữa vòng qua
      <code>&lt;ng-content&gt;</code> (số đếm ngược, phần trăm…). <code>[size]</code>/<code
        >[stroke]</code
      >
      chỉnh đường kính và độ dày nét. Demo dưới là bộ đếm ngược: cung vơi dần, số giây hiện ở giữa
      (logic hẹn giờ do consumer tự lo bằng signal + <code>setInterval</code>).
    </p>

    <docs-demo-section>
      <docs-progress-circle-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/progress/progress-circle.demo.ts" />

    <h2>API — GProgress</h2>
    <docs-api-table [rows]="apiRows" />

    <h2>API — GProgressCircle</h2>
    <docs-api-table [rows]="circleApiRows" />

    <h2>Accessibility</h2>
    <ul>
      <li>
        Host mang <code>role="progressbar"</code> cùng <code>aria-valuemin="0"</code> và
        <code>aria-valuemax="100"</code>.
      </li>
      <li>
        <code>aria-valuenow</code> phản ánh giá trị đã kẹp về khoảng 0–100; khi
        <code>indeterminate</code> thì <b>bỏ</b> hẳn <code>aria-valuenow</code> đúng theo chuẩn ARIA
        cho tiến độ không xác định.
      </li>
      <li>
        Nếu không tự đặt <code>aria-label</code> hoặc <code>aria-labelledby</code>, component tự gán
        <code>aria-label="Tiến độ"</code>.
      </li>
      <li>
        Tôn trọng <code>prefers-reduced-motion</code>: khi bật, animation trượt ở trạng thái
        indeterminate chậm lại thay vì dừng hẳn.
      </li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProgressPage {
  protected readonly apiRows: ApiRow[] = [
    {
      name: 'value',
      type: 'number',
      default: '0',
      description: 'Giá trị tiến độ, tự kẹp về khoảng 0–100.',
    },
    {
      name: 'indeterminate',
      type: 'boolean',
      default: 'false',
      description: 'Hiển thị trạng thái tiến độ không xác định (animation trượt).',
    },
  ];

  protected readonly circleApiRows: ApiRow[] = [
    {
      name: 'value',
      type: 'number',
      default: '0',
      description: 'Giá trị tiến độ 0–100 (tự kẹp) — quyết định độ dài cung tròn.',
    },
    {
      name: 'size',
      type: 'number',
      default: '96',
      description: 'Đường kính vòng tròn (px).',
    },
    {
      name: 'stroke',
      type: 'number',
      default: '6',
      description: 'Độ dày nét vòng tròn (px).',
    },
    {
      name: '<ng-content>',
      type: 'slot',
      default: '—',
      description: 'Nội dung chiếu vào GIỮA vòng (số đếm ngược, phần trăm, icon…).',
    },
  ];
}
