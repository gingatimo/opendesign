import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GLink } from 'ngx-opendesign';
import { ApiRow, ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { TabsBasicDemo } from '../demos/tabs/tabs-basic.demo';

@Component({
  imports: [TabsBasicDemo, CodeBlock, ApiTable, DemoSection, GLink],
  template: `
    <h1>Tabs</h1>
    <p>
      Bộ chuyển tab dạng pill, theo đúng mẫu ARIA
      <a gLink href="https://www.w3.org/WAI/ARIA/apg/patterns/tabs/" target="_blank" rel="noopener"
        >Tabs Pattern</a
      >: <code>role="tablist"</code>/<code>tab</code>/<code>tabpanel</code>, roving tabindex, và bàn
      phím đầy đủ.
    </p>

    <docs-demo-section>
      <docs-tabs-basic-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/tabs/tabs-basic.demo.ts" />

    <h2>API — GTabs, GTab</h2>
    <docs-api-table [rows]="apiRows" />

    <h2>Accessibility</h2>
    <ul>
      <li>
        Danh sách tab mang <code>role="tablist"</code>, mỗi tab là <code>role="tab"</code>. Mỗi tab
        render riêng một <code>role="tabpanel"</code> với id ổn định (không dùng chung một panel cho
        mọi tab) — <code>aria-controls</code> của tab luôn trỏ đúng vùng nội dung của chính nó,
        panel có <code>aria-labelledby</code> trỏ ngược lại tab. Chỉ panel của tab đang chọn mới
        thực sự khởi tạo nội dung; các panel còn lại rỗng và <code>[hidden]</code>.
      </li>
      <li>
        Roving tabindex: tab đang chọn có <code>tabindex="0"</code>, các tab còn lại
        <code>tabindex="-1"</code> — vùng tab chỉ có một điểm dừng Tab duy nhất.
      </li>
      <li>
        Mũi tên trái/phải di chuyển giữa các tab, <b>bỏ qua</b> tab <code>disabled</code>, và vòng
        lại ở hai đầu. <code>Home</code>/<code>End</code> nhảy tới tab dùng được đầu tiên/cuối cùng
        (cũng bỏ qua <code>disabled</code>).
      </li>
      <li>
        Nếu <code>selectedIndex</code> trỏ tới một tab <code>disabled</code> hoặc ngoài khoảng hợp
        lệ, component tự rơi về tab dùng được đầu tiên — luôn có đúng một tab điều khiển được bằng
        bàn phím.
      </li>
      <li>
        Tablist <b>bắt buộc</b> phải có tên accessible (yêu cầu của APG Tabs Pattern) — truyền
        <code>tablistLabel</code> (chuỗi, render thành <code>aria-label</code>) hoặc
        <code>tablistLabelledBy</code> (id của phần tử đã hiển thị, vd. một heading, render thành
        <code>aria-labelledby</code>) trên <code>&lt;g-tabs&gt;</code>. Đặt
        <code>aria-label</code> thẳng lên <code>&lt;g-tabs&gt;</code> <b>không có tác dụng</b> — bản
        thân <code>&lt;g-tabs&gt;</code> không có role gì, ARIA đặt trên đó bị bỏ qua; hai input này
        mới bind đúng vào div <code>role="tablist"</code> bên trong. Thiếu cả hai, component cảnh
        báo ở dev mode (console.warn) — cùng cách GIconButton/GToggle/GDialog cảnh báo khi thiếu
        tên, vì không có tên mặc định chung nào hợp lý cho mọi tablist (khác GSpinner/GProgress, nơi
        một default như "Đang tải" là hợp lý cho hầu hết trường hợp).
      </li>
    </ul>
    <p>
      Toàn bộ khẳng định trên có test tương ứng trong
      <code>projects/ngx-opendesign/src/lib/tabs/tabs.spec.ts</code>.
    </p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TabsPage {
  protected readonly apiRows: ApiRow[] = [
    {
      name: 'g-tabs / selectedIndex',
      type: 'number (model)',
      default: '0',
      description: 'Index tab đang chọn, two-way binding qua [(selectedIndex)].',
    },
    {
      name: 'g-tabs / tablistLabel',
      type: 'string',
      default: '—',
      description:
        'Tên accessible cho tablist, render thành aria-label. Cần tablistLabel hoặc tablistLabelledBy.',
    },
    {
      name: 'g-tabs / tablistLabelledBy',
      type: 'string',
      default: '—',
      description: 'Id phần tử làm tên accessible cho tablist, render thành aria-labelledby.',
    },
    {
      name: 'g-tab / label',
      type: 'string (required)',
      default: '—',
      description: 'Nhãn hiển thị trên tab.',
    },
    {
      name: 'g-tab / disabled',
      type: 'boolean',
      default: 'false',
      description: 'Vô hiệu hóa tab — không chọn được bằng click hay bàn phím.',
    },
  ];
}
