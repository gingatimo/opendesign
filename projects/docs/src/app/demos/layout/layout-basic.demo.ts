import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  GIconButton,
  GLayout,
  GSidebar,
  GSidebarItem,
  GSidebarItemIcon,
  GSidebarItemLabel,
  GTopbar,
  GTopbarEnd,
  GTopbarStart,
} from 'ngx-opendesign';

@Component({
  selector: 'docs-layout-basic-demo',
  imports: [
    GLayout,
    GTopbar,
    GTopbarStart,
    GTopbarEnd,
    GSidebar,
    GSidebarItem,
    GSidebarItemIcon,
    GSidebarItemLabel,
    GIconButton,
  ],
  template: `
    <g-layout>
      <g-topbar>
        <div gTopbarStart class="brand">Ứng dụng</div>
        <div gTopbarEnd>
          <button g-icon-button aria-label="Thông báo">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              aria-hidden="true"
            >
              <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.7 21a2 2 0 0 1-3.4 0" />
            </svg>
          </button>
        </div>
      </g-topbar>

      <g-sidebar>
        <a g-sidebar-item href="#" class="g-active" aria-current="page">
          <svg
            gSidebarItemIcon
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            aria-hidden="true"
          >
            <path d="M3 11 12 3l9 8" />
            <path d="M5 10v10a1 1 0 0 0 1 1h3v-6h6v6h3a1 1 0 0 0 1-1V10" />
          </svg>
          <span gSidebarItemLabel>Trang chủ</span>
        </a>
        <a g-sidebar-item href="#">
          <svg
            gSidebarItemIcon
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            aria-hidden="true"
          >
            <rect x="3" y="10" width="18" height="4" rx="2" />
            <path d="M3 12h10" />
          </svg>
          <span gSidebarItemLabel>Báo cáo</span>
        </a>
        <a g-sidebar-item href="#">
          <svg
            gSidebarItemIcon
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="3" />
            <path
              d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1 1.55V21a2 2 0 1 1-4 0v-.09A1.7 1.7 0 0 0 9 19.4a1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.55-1H3a2 2 0 1 1 0-4h.09A1.7 1.7 0 0 0 4.6 9a1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-1.55V3a2 2 0 1 1 4 0v.09a1.7 1.7 0 0 0 1 1.55 1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.4 9a1.7 1.7 0 0 0 1.55 1H21a2 2 0 1 1 0 4h-.09a1.7 1.7 0 0 0-1.55 1z"
            />
          </svg>
          <span gSidebarItemLabel>Cài đặt</span>
        </a>
      </g-sidebar>

      <main>
        <h2>Tổng quan</h2>
        <p>
          Đây là vùng nội dung chính của app-shell — phần DUY NHẤT cuộn khi nội dung dài hơn khung
          hiển thị. Topbar phía trên và sidebar bên trái đứng yên, không cuộn theo.
        </p>
        <p>
          <code>g-layout</code> tự chọn bố cục lưới dựa trên những region đang có mặt: chỉ cần đặt
          <code>&lt;g-topbar&gt;</code> và/hoặc <code>&lt;g-sidebar&gt;</code> làm con trực tiếp,
          phần còn lại (không khớp hai selector đó) tự rơi vào vùng nội dung cuộn được.
        </p>
        <h2>Vì sao chỉ content cuộn</h2>
        <p>
          Trong một app-shell thật, topbar thường mang logo/điều hướng nhanh, sidebar mang menu
          chính — cả hai cần đứng yên để người dùng luôn thấy được, kể cả khi đang đọc một trang nội
          dung rất dài. Cuộn toàn trang (kể cả topbar/sidebar) sẽ khiến các mốc điều hướng đó biến
          mất ngay khi cuộn xuống.
        </p>
        <p>
          Kỹ thuật: <code>.g-layout</code> cố định chiều cao bằng <code>100vh</code> và
          <code>overflow: hidden</code>; chỉ <code>.g-layout__main</code> — vùng bọc nội dung mặc
          định — có <code>overflow: auto</code>.
        </p>
        <h2>Thử cuộn</h2>
        <p>
          Cuộn xuống trong khung demo này để thấy topbar và sidebar giữ nguyên vị trí, chỉ phần chữ
          bên dưới di chuyển.
        </p>
        <p>
          Đoạn văn này chỉ để kéo dài nội dung cho đủ chiều cao cuộn — không mang thông tin gì thêm
          ngoài việc minh hoạ hành vi cuộn độc lập của vùng content.
        </p>
        <p>
          Tiếp tục cuộn xuống dưới cùng để xác nhận toàn bộ nội dung đã hiển thị hết, trong khi
          topbar và sidebar không hề nhúc nhích.
        </p>
      </main>
    </g-layout>
  `,
  styles: `
    :host {
      display: block;
      height: 460px;
      border: 1px solid var(--g-border);
      border-radius: var(--g-radius-md);
      overflow: hidden;
    }

    // .g-layout mặc định cao 100vh (opendesign.scss) — phá khung 460px cố định của demo này.
    // Selector thẻ scoped trong style component (không phải ::ng-deep) VẪN áp được lên host của
    // <g-layout> vì Angular gắn attribute encapsulation của component CHA (demo này) lên mọi host
    // element được tạo ra trong template của nó — kể cả host của child component. Kết quả là rule
    // này biên dịch thành "g-layout[_ngcontent-xxx]", có specificity CAO HƠN ".g-layout" toàn cục
    // (thẻ+attribute > một class), nên luôn thắng bất kể thứ tự nạp stylesheet.
    g-layout {
      height: 100%;
    }

    .brand {
      font-weight: 500;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutBasicDemo {}
