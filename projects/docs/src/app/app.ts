import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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
  protected readonly localeEn = gLocaleEn;
  protected readonly localeVi = gLocaleVi;

  /** Glyph docs-local cho icon nav (xem core/nav-icons.ts) — dùng với <g-icon>. */
  protected navGlyph(icon: NavIcon): GIconGlyph {
    return NAV_ICON_GLYPHS[icon];
  }

  protected readonly navGroups = NAV_GROUPS;

  protected useLanguage(locale: 'vi' | 'en'): void {
    this.i18n.use(locale === 'vi' ? gLocaleVi : gLocaleEn);
  }
}
