import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiRow, ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { TableAdvancedDemo } from '../demos/table/table-advanced.demo';
import { TableBasicDemo } from '../demos/table/table-basic.demo';
import { TableContainerDemo } from '../demos/table/table-container.demo';
import { TableSelectDemo } from '../demos/table/table-select.demo';

@Component({
  imports: [
    TableBasicDemo,
    TableAdvancedDemo,
    TableContainerDemo,
    TableSelectDemo,
    CodeBlock,
    ApiTable,
    DemoSection,
  ],
  template: `
    <h1>Table</h1>
    <p>
      Directive <code>gTable</code> gắn class lên phần tử <code>&lt;table&gt;</code> native để style
      — <b>thuần hiển thị</b>: không quản lý dữ liệu, sắp xếp hay phân trang. Consumer tự dựng
      <code>&lt;thead&gt;</code>/<code>&lt;tbody&gt;</code> và tự lo logic đó.
    </p>
    <p>
      Bọc <code>&lt;table&gt;</code> trong một khối <code>overflow-x: auto</code> (như demo dưới) để
      bảng cuộn ngang thay vì tràn trang trên màn hình hẹp.
    </p>

    <docs-demo-section>
      <docs-table-basic-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/table/table-basic.demo.ts" />

    <h2>Sắp xếp</h2>
    <p>
      <code>[gSortHeader]</code> đặt trên <code>&lt;th&gt;</code>, nhận trạng thái sort của cột
      (<code>'asc' | 'desc' | null</code>) rồi tự đặt <code>aria-sort</code> cùng chỉ báo hướng icon
      angle lên/xuống — <b>logic sắp xếp nằm ở consumer</b>, directive chỉ trình bày trạng thái. Để
      bấm được và giữ đúng a11y, đặt một <code>&lt;button&gt;</code> bên trong
      <code>&lt;th&gt;</code> làm điểm kích hoạt thay vì gắn <code>(click)</code> thẳng lên
      <code>&lt;th&gt;</code>.
    </p>

    <h2>Đóng băng cột/hàng</h2>
    <p>
      Theo kiểu Excel panes: <code>[gFreezeColumn]</code> đặt trên một <code>&lt;th&gt;</code> làm
      các cột từ mép trái tới cột đó dính (sticky) khi cuộn ngang; <code>[gFreezeRow]</code> đặt
      trên một <code>&lt;tr&gt;</code> làm các hàng từ đỉnh tới hàng đó dính khi cuộn dọc.
      <code>gTable</code> tự dò hai marker này và áp sticky — nhớ bọc bảng trong một khối
      <code>overflow: auto</code> có chiều cao/chiều rộng giới hạn thì mới thấy hiệu ứng cuộn. Nền
      của các ô đóng băng được tự động đục để không lộ nội dung bên dưới, kể cả khi kết hợp với
      <code>striped</code>.
    </p>

    <docs-demo-section>
      <docs-table-advanced-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/table/table-advanced.demo.ts" />

    <h2>Chọn hàng</h2>
    <p>
      <code>gTable</code> thuần hiển thị nên <b>chọn hàng cũng do consumer quản lý</b> — đây là cách
      ghép: cột checkbox <code>GCheckbox</code> mỗi hàng + ô tích ở <code>&lt;th&gt;</code> làm
      <b>chọn tất cả</b> với trạng thái <code>indeterminate</code> (chọn một phần). Tập id đã chọn
      giữ trong một <code>signal&lt;Set&gt;</code>; hàng đã chọn tô nền nhẹ. Bind checkbox một chiều
      <code>[ngModel]</code> + <code>(ngModelChange)</code> (state là nguồn sự thật duy nhất).
    </p>

    <docs-demo-section>
      <docs-table-select-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/table/table-select.demo.ts" />

    <h2>Vùng cuộn — chiều cao theo số hàng</h2>
    <p>
      Bọc <code>&lt;table gTable&gt;</code> trong <code>&lt;g-table-container&gt;</code> để có sẵn
      viền, bo góc và vùng cuộn, đồng thời ràng buộc chiều cao theo <b>số hàng</b> thay vì px thủ
      công:
    </p>
    <ul>
      <li>
        <code>[minRows]</code> — giữ tối thiểu bấy nhiêu hàng chiều cao. Danh sách lọc/phân trang có
        lúc ngắn hơn một trang; đặt <code>minRows</code> bằng số hàng mỗi trang thì bảng
        <b>không co giật</b> khi kết quả ngắn lại (kể cả khi rỗng).
      </li>
      <li>
        <code>[maxRows]</code> — vượt quá bấy nhiêu hàng thì <b>tự cuộn dọc</b>. Kết hợp
        <code>[stickyHeader]</code> của <code>gTable</code> để giữ hàng tiêu đề khi cuộn (như demo
        dưới).
      </li>
    </ul>
    <p>
      Số hàng được quy ra chiều cao thực bằng cách đo lúc chạy (chiều cao
      <code>&lt;thead&gt;</code> + N × chiều cao một hàng) và đo lại khi resize hoặc đổi nội dung —
      nên hàng cao thấp khác nhau vẫn ra đúng.
    </p>

    <docs-demo-section>
      <docs-table-container-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/table/table-container.demo.ts" />

    <h2>API — GTable</h2>
    <docs-api-table [rows]="apiRows" />

    <h2>API — GTableContainer</h2>
    <docs-api-table [rows]="containerApiRows" />

    <h2>Accessibility</h2>
    <p>
      Dùng đúng phần tử <code>&lt;table&gt;</code> native cùng <code>&lt;th scope="col"&gt;</code>
      cho header — screen reader đọc đúng cấu trúc bảng theo hàng/cột mà không cần thêm
      <code>role</code> nào. <code>gTable</code> chỉ gắn class trình bày, không đụng tới ARIA.
    </p>
    <p>
      <code>[gSortHeader]</code> phản ánh trạng thái sort qua <code>aria-sort</code> trên chính
      <code>&lt;th&gt;</code>. Nút kích hoạt sắp xếp phải là một <code>&lt;button&gt;</code> thật
      bên trong <code>&lt;th&gt;</code> để dùng được bằng bàn phím (Tab tới, Enter/Space kích hoạt)
      thay vì chỉ bắt sự kiện click bằng chuột.
    </p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TablePage {
  protected readonly apiRows: ApiRow[] = [
    {
      name: '[gTable] / striped',
      type: 'boolean',
      default: 'false',
      description: 'Tô nền xen kẽ cho các hàng chẵn trong tbody.',
    },
    {
      name: '[gTable] / stickyHeader',
      type: 'boolean',
      default: 'false',
      description: 'Ghim hàng tiêu đề (thead) khi cuộn dọc.',
    },
    {
      name: '[gSortHeader]',
      type: "'asc' | 'desc' | null",
      default: 'null',
      description:
        'Đặt trên <th> — set aria-sort + chỉ báo hướng icon angle lên/xuống. Logic sắp xếp do consumer tự xử lý.',
    },
    {
      name: '[gFreezeColumn]',
      type: 'marker',
      default: '—',
      description:
        'Đặt trên một <th> header: các cột từ mép trái tới cột đó dính (sticky) khi cuộn ngang.',
    },
    {
      name: '[gFreezeRow]',
      type: 'marker',
      default: '—',
      description: 'Đặt trên một <tr>: các hàng từ đỉnh tới hàng đó dính (sticky) khi cuộn dọc.',
    },
  ];

  protected readonly containerApiRows: ApiRow[] = [
    {
      name: 'minRows',
      type: 'number',
      default: '0',
      description:
        'Giữ tối thiểu bấy nhiêu hàng chiều cao (0 = không đặt) — chống giật khi kết quả ngắn lại.',
    },
    {
      name: 'maxRows',
      type: 'number',
      default: '0',
      description: 'Tối đa bấy nhiêu hàng; vượt quá thì cuộn dọc (0 = không giới hạn).',
    },
  ];
}
