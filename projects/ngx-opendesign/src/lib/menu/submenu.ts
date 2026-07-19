import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  HostListener,
  inject,
  input,
  signal,
} from '@angular/core';
import { GIcon } from '../icon/icon';
import { gIconChevronDown } from '../icon/icons';
import { GMenu, GSubmenuEntry } from './menu';

// Mục cha của menu — chứa các mục con (chiếu vào). Đọc orientation từ GMenu cha (inject): dọc → mở/gập
// inline thụt lề (accordion); ngang → dropdown position:absolute. Đóng dropdown: click ra ngoài / Esc.
@Component({
  selector: 'g-submenu',
  imports: [GIcon],
  template: `
    <button
      type="button"
      class="g-menu-item g-submenu__toggle"
      [attr.aria-expanded]="open()"
      aria-haspopup="true"
      (click)="onToggle($event)"
    >
      <span class="g-submenu__label">{{ label() }}</span>
      <g-icon class="g-submenu__chevron" [icon]="iconChevron" size="sm" />
    </button>
    <div class="g-submenu__panel"><ng-content /></div>
  `,
  host: {
    class: 'g-submenu',
    '[class.g-submenu--horizontal]': 'isHorizontal()',
    '[class.g-submenu--open]': 'open()',
  },
  styleUrl: './submenu.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GSubmenu {
  readonly label = input.required<string>();
  private readonly menu = inject(GMenu);
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  protected readonly iconChevron = gIconChevronDown;
  protected readonly open = signal(false);
  protected readonly isHorizontal = computed(() => this.menu.orientation() === 'horizontal');

  // Đăng ký với GMenu để nó điều phối single-open (dropdown ngang). close() cũng gỡ đăng ký.
  private readonly entry: GSubmenuEntry = {
    el: this.elementRef.nativeElement,
    close: () => {
      this.open.set(false);
      this.menu.closeSubmenu(this.entry);
    },
  };

  protected onToggle(event: MouseEvent): void {
    // Chặn bubble để click MỞ không lọt tới document listener khiến đóng lại ngay lập tức.
    event.stopPropagation();
    if (this.open()) {
      this.close();
    } else {
      this.open.set(true);
      // Ngang: đăng ký để GMenu đóng các submenu anh-em đang mở. Dọc (accordion): cho phép nhiều mục mở.
      if (this.isHorizontal()) this.menu.openSubmenu(this.entry);
    }
  }
  protected close(): void {
    this.entry.close();
  }

  // Chỉ dropdown NGANG mới đóng khi click ra ngoài (hoặc vào mục con → điều hướng). Accordion DỌC giữ
  // nguyên trạng thái mở khi click chỗ khác.
  @HostListener('document:click')
  protected onDocClick(): void {
    if (this.isHorizontal() && this.open()) this.close();
  }
  @HostListener('keydown.escape')
  protected onEsc(): void {
    if (this.open()) {
      this.close();
      (this.elementRef.nativeElement.querySelector('.g-submenu__toggle') as HTMLElement)?.focus();
    }
  }
}
