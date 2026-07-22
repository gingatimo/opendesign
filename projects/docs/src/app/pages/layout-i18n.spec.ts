import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { GLocaleService, gLocaleEn, gLocaleVi, provideGLocale } from 'ngx-opendesign';
import ContainerPage from './container.page';
import GridPage from './grid.page';
import LayoutPage from './layout.page';
import ScrollPanelPage from './scroll-panel.page';
import SplitterPage from './splitter.page';
import StackPage from './stack.page';

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

describe('layout pages i18n', () => {
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

  it('dịch trang Container và demo sang tiếng Anh', () => {
    const text = renderEn(ContainerPage).textContent ?? '';

    expect(text).toContain('Constrains max width');
    expect(text).toContain('Content inside');
    expect(text).toContain('Maximum width of .g-container');
    expect(text).not.toContain('giới hạn chiều rộng tối đa');
  });

  it('dịch trang Stack và demo sang tiếng Anh', () => {
    const text = renderEn(StackPage).textContent ?? '';

    expect(text).toContain('Flexbox stack');
    expect(text).toContain('Row 1');
    expect(text).toContain('Wrap & alignment');
    expect(text).toContain('Maps to --g-space-N');
    expect(text).not.toContain('Hàng 1');
  });

  it('dịch trang Grid và demo sang tiếng Anh', () => {
    const text = renderEn(GridPage).textContent ?? '';

    expect(text).toContain('CSS grid layout primitive');
    expect(text).toContain('3 equal columns');
    expect(text).toContain('Cell 1');
    expect(text).toContain('responsive repeat(auto-fill');
    expect(text).not.toContain('3 cột đều');
  });

  it('dịch trang Layout và demo sang tiếng Anh', () => {
    const el = renderEn(LayoutPage);
    const text = el.textContent ?? '';

    expect(text).toContain('App-shell component');
    expect(text).toContain('Application');
    expect(text).toContain('Only content scrolls');
    expect(el.querySelector('button[aria-label="Notifications"]')).toBeTruthy();
    expect(text).toContain('Container app-shell');
    expect(text).not.toContain('Ứng dụng');
  });

  it('dịch trang Splitter và demo sang tiếng Anh', () => {
    const text = renderEn(SplitterPage).textContent ?? '';

    expect(text).toContain('Resizable split-panel layout');
    expect(text).toContain('Horizontal — drag the middle gutter');
    expect(text).toContain('Top');
    expect(text).toContain('Initial size for each panel');
    expect(text).not.toContain('Bố cục chia panel');
  });

  it('dịch trang Scroll Panel và demo sang tiếng Anh', () => {
    const text = renderEn(ScrollPanelPage).textContent ?? '';

    expect(text).toContain('Scrollable region');
    expect(text).toContain('OpenDesign is an Angular component library');
    expect(text).toContain('Maximum height');
    expect(text).toContain('Keyboard scrolling');
    expect(text).not.toContain('Vùng cuộn với thanh cuộn');
  });
});
