import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { gDevWarning } from '../core/dev-warning';
import { GLocaleService } from '../core/locale';
import { GIcon } from '../icon/icon';
import { gIconPanelLeftClose, gIconPanelLeftOpen } from '../icon/icons';
import { GSidebar } from './sidebar';

// Hai icon riêng đổi theo collapsed(), KHÔNG xoay 180° một icon: icon panel-left có vạch dọc
// cố định bên trái — xoay cả icon sẽ đẩy vạch sang phải và phá ý nghĩa "panel bên trái".
//
// Nút tái dùng NGUYÊN class .g-sidebar-item/.g-sidebar-item__icon (KHÔNG dùng GIconButton nữa)
// — đây là <button> thường mang class, không phải <button g-sidebar-item> (component
// GSidebarItem): GSidebarItem mang GTooltip qua hostDirectives (auto-tooltip đọc nhãn item khi
// thu gọn), nút toggle không có nhãn nên tooltip đó luôn vô dụng — dùng component sẽ kéo theo
// một DI graph/hostDirective không cần thiết cho một nút vốn đã có aria-label riêng. Cái giá
// đổi lại là lặp lại 2 class thủ công, chấp nhận được. Nhờ vậy nút tự động cùng cỡ 40px, cùng
// nền pill khi hover, cùng focus ring với item bên dưới — kể cả padding/border-radius. Riêng
// justify-content, sidebar-toggle.scss GHI ĐÈ (đặc hiệu hơn nhờ view encapsulation) để nút luôn
// canh icon giữa hộp 40px, khác với .g-sidebar-item mặc định flex-start khi mở rộng (xem vòng 3
// bên dưới).
//
// Vòng 3 (spec 2c mục 1): nút không còn là hàng full-width căn trái nữa — mở rộng ghém sát PHẢI,
// thu gọn CĂN GIỮA cột. Host cần biết collapsed() để đổi justify-content (xem sidebar-toggle.scss)
// — dùng host binding class thay vì :host-context: component đã inject GSidebar và có sẵn tín
// hiệu collapsed() ngay trong TS, nên phản chiếu thẳng qua class là cách trực tiếp nhất, không
// phụ thuộc cấu trúc DOM cha (host-context dò ngược lên ancestor, dễ vỡ nếu sau này có wrapper
// chen giữa <g-sidebar> và <g-sidebar-toggle>) và test được bằng classList thường, không cần
// getComputedStyle.
@Component({
  selector: 'g-sidebar-toggle',
  imports: [GIcon],
  template: `
    <button
      type="button"
      class="g-sidebar-toggle__button g-sidebar-item"
      [attr.aria-label]="toggleLabel()"
      [attr.aria-expanded]="!daThuGon()"
      (click)="doiTrangThai($event)"
    >
      <g-icon
        class="g-sidebar-item__icon"
        size="md"
        [icon]="daThuGon() ? gIconPanelLeftOpen : gIconPanelLeftClose"
      />
    </button>
  `,
  styleUrl: './sidebar-toggle.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'g-sidebar-toggle',
    '[class.g-sidebar-toggle--collapsed]': 'daThuGon()',
  },
})
export class GSidebarToggle {
  protected readonly gIconPanelLeftClose = gIconPanelLeftClose;
  protected readonly gIconPanelLeftOpen = gIconPanelLeftOpen;

  // optional: đặt ngoài <g-sidebar> là lỗi dùng sai, nhưng phải cảnh báo tử tế thay vì để
  // Angular ném lỗi injector khó hiểu.
  private readonly sidebar = inject(GSidebar, { optional: true });
  private readonly i18n = inject(GLocaleService);
  protected readonly t = this.i18n.strings;

  protected readonly daThuGon = computed(() => this.sidebar?.collapsed() ?? false);
  protected readonly toggleLabel = computed(() =>
    this.daThuGon() ? this.t().sidebar.expand : this.t().sidebar.collapse,
  );

  constructor() {
    if (!this.sidebar) {
      gDevWarning('GSidebarToggle', '<g-sidebar-toggle /> must be placed inside <g-sidebar>');
    }
  }

  protected doiTrangThai(event: MouseEvent): void {
    this.sidebar?.collapsed.update((v) => !v);
    // Collapse đổi icon + bề rộng sidebar → re-render khiến :focus-visible bám nhầm sau CLICK CHUỘT,
    // để lại focus ring lơ lửng. Bấm chuột (detail > 0) thì nhả focus; bàn phím (Enter/Space, detail
    // = 0) GIỮ focus để người dùng bàn phím không mất vị trí.
    if (event.detail > 0) (event.currentTarget as HTMLElement).blur();
  }
}
