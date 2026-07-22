import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {
  GIcon,
  GIconButton,
  GIconGlyph,
  GLocaleService,
  gIconMoon,
  gIconSun,
  gLocaleEn,
  gLocaleVi,
  GSidebar,
  GSidebarHeader,
  GSidebarItem,
  GSidebarItemIcon,
  GSidebarItemLabel,
  GSidebarToggle,
  GTab,
  GTabs,
} from 'ngx-opendesign';
import { ThemeService } from './core/theme.service';
import { NAV_ICON_GLYPHS, NavIcon } from './core/nav-icons';
import { NAV_GROUPS } from './core/nav';

@Component({
  selector: 'docs-root',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    GIcon,
    GIconButton,
    GSidebar,
    GSidebarHeader,
    GSidebarItem,
    GSidebarItemIcon,
    GSidebarItemLabel,
    GSidebarToggle,
    GTabs,
    GTab,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly themeService = inject(ThemeService);
  protected readonly i18n = inject(GLocaleService);
  protected readonly iconMoon = gIconMoon;
  protected readonly iconSun = gIconSun;
  protected readonly languageIndex = computed(() => (this.i18n.tag() === gLocaleVi.tag ? 0 : 1));

  /** Glyph docs-local cho icon nav (xem core/nav-icons.ts) — dùng với <g-icon>. */
  protected navGlyph(icon: NavIcon): GIconGlyph {
    return NAV_ICON_GLYPHS[icon];
  }

  protected readonly navGroups = NAV_GROUPS;

  protected useLanguageIndex(index: number): void {
    this.i18n.use(index === 0 ? gLocaleVi : gLocaleEn);
  }
}
