import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiRow, ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { SidebarBasicDemo } from '../demos/sidebar/sidebar-basic.demo';

@Component({
  imports: [SidebarBasicDemo, CodeBlock, ApiTable, DemoSection],
  template: `
    <h1>Sidebar</h1>
    <p>
      Sidebar điều hướng dọc, có thể thu gọn. Chứa danh sách <code>GSidebarItem</code> (phần tử
      <code>&lt;a&gt;</code>/<code>&lt;button&gt;</code> native), tùy chọn phần đầu/chân qua
      <code>[gSidebarHeader]</code>/<code>[gSidebarFooter]</code>.
    </p>

    <docs-demo-section>
      <docs-sidebar-basic-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/sidebar/sidebar-basic.demo.ts" />

    <h2>Nút thu gọn</h2>
    <p>
      Đặt <code>&lt;g-sidebar-toggle /&gt;</code> vào bên trong <code>&lt;g-sidebar&gt;</code> để có
      nút thu gọn/mở lại. Nút không có input: nó inject <code>GSidebar</code> cha và đọc/ghi thẳng
      <code>collapsed</code>, nên dùng được cả khi bạn không gắn <code>[(collapsed)]</code>. Đặt nó
      ngoài <code>&lt;g-sidebar&gt;</code> thì nút không làm gì và thư viện cảnh báo ở console (chỉ
      dev, no-op ở production build).
    </p>
    <p>
      <b>Vị trí:</b> nút nằm <b>trong luồng</b> (không <code>position: absolute</code>), luôn ở hàng
      trên cùng bên trong sidebar (<code>.g-sidebar__top</code>) — đặt
      <code>&lt;g-sidebar-toggle /&gt;</code> ở đâu trong nội dung
      <code>&lt;g-sidebar&gt;</code> không quan trọng, thư viện tự kéo nó lên hàng đầu tiên, TRƯỚC
      header. Nút <b>tái dùng style của <code>g-sidebar-item</code></b> — cùng cỡ 40px, cùng nền
      pill khi hover, cùng focus ring — nhưng KHÔNG full-width như item: nút tự canh theo trạng thái
      <code>collapsed</code> — <b>mở rộng nằm bên trái header</b>, <b>thu gọn căn giữa</b> cột 72px
      (cùng vị trí với icon các item bên dưới). Không bao giờ đè lên <code>border-right</code> của
      sidebar vì không còn định vị tuyệt đối.
    </p>
    <p>
      <b>Chung hàng với header:</b> thư viện <b>tự gộp</b> <code>[gSidebarHeader]</code> và
      <code>&lt;g-sidebar-toggle /&gt;</code> vào chung một hàng <code>.g-sidebar__top</code> — nút
      bên trái, header bên phải, cả hai căn trái (đồng nhất với topbar dashboard), không cần bạn tự
      bọc flex row nào cả. Không có <code>[gSidebarHeader]</code> thì nút vẫn nằm bên trái đúng như
      khi có header.
    </p>

    <h2>Header khi thu gọn</h2>
    <p>
      Khi <code>collapsed=true</code>, <code>GSidebar</code> tự <b>ẩn trực quan</b> toàn bộ
      <code>[gSidebarHeader]</code> (kỹ thuật visually-hidden, giống
      <code>[gSidebarItemLabel]</code> — vẫn còn trong DOM và accessibility tree, chỉ không hiện
      trên màn hình) vì ở 72px không còn đủ chỗ cho tên app cỡ chữ lớn. Bạn không phải tự vá; khi
      thu gọn, vùng đầu sidebar chỉ còn lại nút toggle — nhìn như một item icon trên cùng.
    </p>

    <h2>Tooltip tự động khi thu gọn</h2>
    <p>
      Khi <code>collapsed=true</code>, nhãn item bị ẩn trực quan nên chỉ còn icon. Lúc đó
      <code>GSidebarItem</code> <b>tự</b> hiện tooltip lấy text từ
      <code>[gSidebarItemLabel]</code> của chính nó khi hover/focus. Item nằm ngoài
      <code>&lt;g-sidebar&gt;</code> hoặc không có <code>[gSidebarItemLabel]</code> thì cũng không
      hiện.
    </p>
    <p>
      Bạn <b>vẫn tự gắn được</b> <code>gTooltip="…"</code> lên <code>g-sidebar-item</code> (<code
        >GTooltip</code
      >
      áp qua <code>hostDirectives</code>, nhưng input vẫn nhận giá trị bình thường nhờ selector
      <code>[gTooltip]</code> của chính nó khớp trên cùng phần tử). <code>gTooltip</code> bạn tự gắn
      luôn <b>thắng</b>, ở <b>cả hai</b> trạng thái collapsed — đúng hành vi v1, giá trị bạn chủ
      động truyền vào không bao giờ bị ghi đè. Chỉ khi bạn <b>không</b> gắn <code>gTooltip</code>,
      <code>GSidebarItem</code> mới tự dùng nhãn item làm text mặc định, và cũng chỉ khi sidebar
      <b>thu gọn</b> (mở rộng thì nhãn đã hiện sẵn, không cần tooltip).
    </p>
    <p>
      Text được đọc <b>tại thời điểm hiện tooltip</b>, nên nhãn động (vd.
      <code>{{ '{{ link.label }}' }}</code>) luôn cho tooltip đúng text mới nhất.
    </p>

    <h2>API — GSidebar, GSidebarItem, GSidebarToggle</h2>
    <docs-api-table [rows]="apiRows" />

    <h2>Accessibility</h2>
    <ul>
      <li>
        <code>g-sidebar</code> <b>cố ý không</b> tự đặt <code>role="navigation"</code> — sidebar có
        thể chứa cả header/footer/nút thu gọn, không chỉ danh sách điều hướng, và thư viện không
        biết ngữ cảnh sử dụng. Bọc phần điều hướng của bạn trong
        <code>&lt;nav aria-label="…"&gt;</code> khi cần landmark.
      </li>
      <li>
        Item đang active: <code>class="g-active"</code> chỉ đổi màu/kiểu —
        <b>class không tới được trình đọc màn hình</b>. Luôn kèm
        <code>aria-current="page"</code> trên item active (dùng
        <code>routerLinkActive="g-active"</code> cùng <code>ariaCurrentWhenActive="page"</code> của
        <code>RouterLinkActive</code> nếu điều hướng bằng Angular Router — đã xác minh input này có
        thật trong bản <code>@angular/router</code>
        đang cài).
      </li>
      <li>
        Nhãn chữ của item <b>bắt buộc</b> bọc trong <code>&lt;span gSidebarItemLabel&gt;</code>,
        không để text node trần — đây là phần tử mà CSS thu gọn nhắm tới để ẩn trực quan (kỹ thuật
        visually-hidden: kích thước 1px, <code>clip</code>, <code>overflow: hidden</code> —
        <b>không</b> dùng <code>display: none</code>/<code>visibility: hidden</code>, vì cả hai gỡ
        phần tử khỏi accessibility tree).
      </li>
      <li>
        Khi <code>collapsed=true</code>: test lib (<code>sidebar.spec.ts</code>) chứng minh nhãn
        (phần tử <code>[gSidebarItemLabel]</code>) vẫn còn trong DOM, không bị gỡ bỏ — nhưng jsdom
        <b>không có</b> accessibility-tree engine nên tự nó không chứng minh được trình đọc màn hình
        thực sự đọc ra tên. Đã bổ sung bằng chứng bằng accessibility tree <b>thật</b> của Chromium
        khi dogfooding sidebar này trong chính docs shell: ở trạng thái collapsed, mọi item vẫn giữ
        nguyên accessible name đầy đủ (vd. <code>"Trang chủ"</code>, <code>"Button"</code>), xác
        minh trực tiếp bằng snapshot accessibility tree của trình duyệt thật.
      </li>
      <li>
        Header khi thu gọn dùng kỹ thuật visually-hidden (giống <code>[gSidebarItemLabel]</code>),
        <b>không</b> <code>display: none</code> — tên app trong <code>[gSidebarHeader]</code> vẫn
        còn trong DOM và accessibility tree, chỉ không hiện trên màn hình. Test lib
        (<code>sidebar.spec.ts</code>) chứng minh header không bị gỡ khỏi DOM khi
        <code>collapsed=true</code>.
      </li>
      <li>
        <code>&lt;g-sidebar-toggle /&gt;</code> đặt ARIA lên <code>&lt;button&gt;</code> native bên
        trong, <b>không</b> lên host <code>&lt;g-sidebar-toggle&gt;</code> — host là custom element
        không có role nên ARIA đặt trên nó sẽ bị bỏ qua. Nút tự mang <code>aria-label</code> tiếng
        Việt đổi theo trạng thái (<code>"Thu gọn thanh bên"</code> ↔
        <code>"Mở rộng thanh bên"</code>) cùng <code>aria-expanded</code>; icon bên trong là trang
        trí (<code>aria-hidden</code>) nên không chen vào accessible name. Test lib
        (<code>sidebar-toggle.spec.ts</code>) chứng minh phần tử là
        <code>&lt;button&gt;</code> native và <code>aria-label</code> nằm trên chính nó — jsdom
        không có accessibility-tree engine nên phần "trình đọc màn hình đọc ra đúng cặp role + tên"
        được xác minh riêng bằng accessibility tree thật của trình duyệt khi dogfood trong docs
        shell.
      </li>
      <li>
        <code>aria-controls</code> <b>cố ý không</b> làm: nó cần thêm <code>id</code> trên
        <code>GSidebar</code>, tức mở rộng API cho một thứ chưa ai cần.
      </li>
      <li>
        Tooltip tự động khi thu gọn dùng lại <code>GTooltip</code> nên thừa hưởng nguyên các bảo đảm
        WCAG 1.4.13 của nó (hoverable, dismissible bằng Esc, persistent, gộp
        <code>aria-describedby</code>). Nó hiện cả khi <b>focus</b> bằng bàn phím, không chỉ hover.
      </li>
      <li>
        Kỹ thuật thu gọn ở trên chỉ áp dụng cho <code>[gSidebarItemLabel]</code>. Nếu bạn thêm nội
        dung khác vào phần thân sidebar (vd. tiêu đề nhóm điều hướng, như docs shell của chính dự án
        này đang làm), nội dung đó <b>không</b> tự động ẩn trực quan khi collapsed — bạn phải tự
        viết CSS cho nó.
      </li>
      <li>
        Tôn trọng <code>prefers-reduced-motion</code>: hiệu ứng trượt khi thu/mở là chuyển động theo
        tương tác (không phải chỉ báo liên tục như spinner), nên khi bật, animation
        <b>tắt hẳn</b> thay vì chậm lại — sidebar đổi width tức thì, trạng thái cuối vẫn đúng.
      </li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SidebarPage {
  protected readonly apiRows: ApiRow[] = [
    {
      name: 'g-sidebar / collapsed',
      type: 'boolean (model)',
      default: 'false',
      description: 'Thu gọn sidebar (240px → 72px), two-way binding qua [(collapsed)].',
    },
    {
      name: '[gSidebarHeader]',
      type: '(directive)',
      default: '—',
      description: 'Đánh dấu phần đầu sidebar, không có input.',
    },
    {
      name: '[gSidebarFooter]',
      type: '(directive)',
      default: '—',
      description: 'Đánh dấu phần chân sidebar, không có input.',
    },
    {
      name: 'g-sidebar-item',
      type: '(component, a | button)',
      default: '—',
      description: 'Một mục điều hướng — chọn thẻ native theo ngữ nghĩa (link hoặc hành động).',
    },
    {
      name: '[gSidebarItemIcon]',
      type: '(directive)',
      default: '—',
      description: 'Đánh dấu icon SVG của item.',
    },
    {
      name: '[gSidebarItemLabel]',
      type: '(directive)',
      default: '—',
      description: 'Bắt buộc bọc nhãn chữ của item — điểm neo CSS để ẩn trực quan khi collapsed.',
    },
    {
      name: 'g-sidebar-toggle',
      type: '(component)',
      default: '—',
      description:
        'Hàng trên cùng trong sidebar, bấm để thu gọn/mở lại — mở rộng ghém sát phải, thu gọn ' +
        'căn giữa cột. Không input, không output — đọc/ghi thẳng collapsed của <g-sidebar> cha. ' +
        'Phải đặt bên trong <g-sidebar>.',
    },
  ];
}
