import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiRow, ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { IconBasicDemo } from '../demos/icon/icon-basic.demo';

@Component({
  imports: [IconBasicDemo, CodeBlock, ApiTable, DemoSection],
  template: `
    <h1>Icon</h1>
    <p>
      <code>g-icon</code> render icon set có sẵn của OpenDesign — 30 icon. Mỗi icon là dữ liệu hình
      học có cấu trúc (<code>{{ '{ viewBox, paths?, circles?, rects? }' }}</code
      >), không phải chuỗi HTML/SVG thô hay font icon — <code>GIcon</code> vẽ bằng binding thường
      (<code>[attr.d]</code>...), không dùng <code>innerHTML</code> hay
      <code>bypassSecurityTrustHtml</code> nên không có rủi ro XSS dù dữ liệu icon tới từ đâu.
    </p>

    <h2>Toàn bộ icon set</h2>
    <p>Tên bên dưới mỗi icon là hằng cần import từ <code>ngx-opendesign</code>.</p>

    <docs-demo-section>
      <docs-icon-basic-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/icon/icon-basic.demo.ts" />

    <h2>Hai cách dùng</h2>

    <h3>1. Icon từ set</h3>
    <p>
      Import hằng icon cần dùng từ <code>ngx-opendesign</code>, truyền vào input
      <code>icon</code> của <code>&lt;g-icon&gt;</code>:
    </p>
    <docs-code-block [code]="fromSetSnippet" language="typescript" />

    <h3>2. SVG tự truyền vào</h3>
    <p>
      Với icon không có trong set, đừng cố ép vào <code>&lt;g-icon&gt;</code> (input
      <code>icon</code> chỉ nhận đúng dữ liệu hằng <code>gIconXxx</code>) — viết thẳng
      <code>&lt;svg&gt;</code> của bạn, đúng cách toàn bộ demo khác trong docs này vẫn đang làm cho
      icon ngoài set (vd. trang Icon Button):
    </p>
    <docs-code-block [code]="customSvgSnippet" language="xml" />

    <h2>API — GIcon</h2>
    <docs-api-table [rows]="apiRows" />

    <h2>Accessibility</h2>
    <ul>
      <li>
        Mặc định <code>g-icon</code> là <b>trang trí</b>: host tự mang
        <code>aria-hidden="true"</code> và không có <code>role</code> — đúng khi icon đứng cạnh chữ
        đã tự mang nghĩa (nút, mục menu, item sidebar). Test lib (<code>icon.spec.ts</code>) chứng
        minh cả hai attribute này ở chế độ mặc định.
      </li>
      <li>
        Khi icon đứng một mình mang nghĩa (không có chữ đi kèm), đặt <code>aria-label</code> (hoặc
        <code>aria-labelledby</code>) trên <code>&lt;g-icon&gt;</code> — lúc đó host tự chuyển sang
        <code>role="img"</code> và <b>gỡ</b> <code>aria-hidden</code> nếu có (hai thứ này mâu thuẫn:
        <code>aria-hidden</code> xoá phần tử khỏi accessibility tree, làm <code>aria-label</code> vô
        nghĩa). Cũng được test lib chứng minh, kèm cảnh báo console (chỉ dev mode) khi phát hiện tổ
        hợp mâu thuẫn đó trên template.
      </li>
      <li>
        SVG con luôn có <code>aria-hidden="true"</code> và <code>focusable="false"</code>, nên
        accessible name (nếu có) luôn tới từ <code>aria-label</code> trên host, không bao giờ từ nội
        dung SVG.
      </li>
    </ul>

    <h2>Tree-shaking</h2>
    <p>
      Mỗi icon là một <code>export const</code> riêng ở module <code>icons.ts</code>, không gom vào
      một object/map dùng chung — bundler dựa trên ES module tĩnh (esbuild, dùng bởi
      <code>&#64;angular/build</code>) loại bỏ được import không dùng tới ở cấp export riêng lẻ,
      nhưng <b>không</b> loại bỏ được thuộc tính của một object lớn.
    </p>
    <p>
      Đã kiểm chứng bằng bundle production <b>thật</b>: đóng gói thư viện (<code>npm pack</code>),
      cài vào một app Angular tối thiểu ngoài workspace, chỉ import <b>một</b> icon
      (<code>gIconSearch</code>), build <code>--configuration production</code>, rồi grep bundle tìm
      đoạn path đặc trưng của các icon không dùng tới (vd. <code>gIconSettings</code>,
      <code>gIconTrash</code>, <code>gIconCart</code>) — không thấy đoạn nào trong số đó. Đối chứng:
      lặp lại với app import <b>cả bộ icon</b>, cùng đoạn path đó xuất hiện đầy đủ — xác nhận cách
      grep có phát hiện được khi dữ liệu thực sự có mặt, không phải false negative. Bundle 1-icon
      116.75&nbsp;kB, bundle cả-bộ ~119.6&nbsp;kB (phần lớn 116.75&nbsp;kB là chi phí cố định của
      framework Angular, không phải icon).
    </p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class IconPage {
  protected readonly fromSetSnippet = `import { Component } from '@angular/core';
import { GIcon, gIconSearch } from 'ngx-opendesign';

@Component({
  selector: 'app-vi-du',
  imports: [GIcon],
  template: \`<g-icon [icon]="gIconSearch" size="sm" />\`,
})
export class ViDuComponent {
  protected readonly gIconSearch = gIconSearch;
}`;

  protected readonly customSvgSnippet = `<!-- Icon không có trong set OpenDesign: viết SVG tay -->
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
  <path d="M12 2 2 7l10 5 10-5-10-5z" />
</svg>`;

  protected readonly apiRows: ApiRow[] = [
    {
      name: 'icon',
      type: 'GIconGlyph',
      default: '—',
      description: 'Bắt buộc. Một trong các hằng gIconXxx export từ ngx-opendesign.',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      description: 'Cỡ icon: 16 / 20 / 24px — khác thang của GSpinner (16/24/32px), cố ý.',
    },
  ];
}
