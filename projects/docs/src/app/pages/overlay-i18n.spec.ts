import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { GLocaleService, gLocaleEn, gLocaleVi, provideGLocale } from 'ngx-opendesign';
import ContextMenuPage from './context-menu.page';
import DialogPage from './dialog.page';
import DrawerPage from './drawer.page';
import ToastPage from './toast.page';
import TooltipPage from './tooltip.page';

class NoopResizeObserver {
  observe(): void {
    return undefined;
  }
  unobserve(): void {
    return undefined;
  }
  disconnect(): void {
    return undefined;
  }
}

function renderEn<T>(component: Type<T>): HTMLElement {
  const fixture = TestBed.createComponent(component);
  fixture.detectChanges();
  TestBed.inject(GLocaleService).use(gLocaleEn);
  fixture.detectChanges();
  return fixture.nativeElement as HTMLElement;
}

describe('overlay pages i18n', () => {
  beforeEach(() => {
    if (!globalThis.ResizeObserver) {
      Object.defineProperty(globalThis, 'ResizeObserver', {
        configurable: true,
        value: NoopResizeObserver,
      });
    }

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        provideGLocale(gLocaleVi),
      ],
    });
  });

  it('dịch trang Dialog và demo sang tiếng Anh', () => {
    const text = renderEn(DialogPage).textContent ?? '';

    expect(text).toContain('Modal dialog built on');
    expect(text).toContain('Delete document');
    expect(text).toContain('Opens a dialog with the given component');
    expect(text).toContain('Focus moves into the dialog when it opens');
    expect(text).not.toContain('Xóa tài liệu');
  });

  it('dịch trang Tooltip và demo sang tiếng Anh', () => {
    const el = renderEn(TooltipPage);
    const text = el.textContent ?? '';

    expect(text).toContain('Short tooltip directive');
    expect(text).toContain('Save');
    expect(text).toContain('Bottom');
    expect(el.querySelector('button[aria-label="Settings"]')).toBeTruthy();
    expect(text).toContain('Preferred placement');
    expect(text).toContain('Dismissible');
    expect(text).not.toContain('Lưu tài liệu hiện tại');
  });

  it('dịch trang Toast và demo sang tiếng Anh', () => {
    const text = renderEn(ToastPage).textContent ?? '';

    expect(text).toContain('Short stacked notification');
    expect(text).toContain('Position');
    expect(text).toContain('Normal notification');
    expect(text).toContain('Show toast at the selected position');
    expect(text).toContain('Message content.');
    expect(text).not.toContain('Thông báo thường');
  });

  it('dịch trang Drawer và demo sang tiếng Anh', () => {
    const el = renderEn(DrawerPage);
    const text = el.textContent ?? '';

    expect(text).toContain('Sliding panel from a screen edge');
    expect(text).toContain('Left');
    expect(text).toContain('Right');
    expect(el.querySelector('.g-drawer__panel[aria-label="Demo drawer"]')).toBeTruthy();
    expect(text).toContain('Edge the panel anchors to.');
    expect(text).not.toContain('Ngăn kéo minh hoạ');
  });

  it('dịch trang Context Menu và demo sang tiếng Anh', () => {
    const text = renderEn(ContextMenuPage).textContent ?? '';

    expect(text).toContain('Right-click context menu');
    expect(text).toContain('Right-click this area');
    expect(text).toContain('Last action:');
    expect(text).toContain('(none)');
    expect(text).toContain('Template for the menu content');
    expect(text).not.toContain('Chuột phải vào vùng này');
  });
});
