import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { GLocaleService, gLocaleEn, gLocaleVi, provideGLocale } from 'ngx-opendesign';
import AccordionPage from './accordion.page';
import ActionMenuPage from './action-menu.page';
import BreadcrumbPage from './breadcrumb.page';
import DockMenuPage from './dock-menu.page';
import LinkPage from './link.page';
import MenuPage from './menu.page';
import PaginationPage from './pagination.page';
import SidebarPage from './sidebar.page';
import StepperPage from './stepper.page';
import TabsPage from './tabs.page';
import TopbarPage from './topbar.page';

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

describe('navigation pages i18n', () => {
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

  it('dịch trang Tabs và demo sang tiếng Anh', () => {
    const text = renderEn(TabsPage).textContent ?? '';

    expect(text).toContain('Pill tab switcher');
    expect(text).toContain('Overview tab content.');
    expect(text).toContain('Accessible name for the tablist.');
    expect(text).toContain('Roving tabindex');
    expect(text).not.toContain('Bộ chuyển tab dạng pill');
  });

  it('dịch trang Stepper và demo sang tiếng Anh', () => {
    const text = renderEn(StepperPage).textContent ?? '';

    expect(text).toContain('Multi-step wizard');
    expect(text).toContain('Enter basic information');
    expect(text).toContain('Vertical');
    expect(text).toContain('Step header label.');
    expect(text).not.toContain('Nhập thông tin cơ bản');
  });

  it('dịch trang Topbar và demo sang tiếng Anh', () => {
    const el = renderEn(TopbarPage);
    const text = el.textContent ?? '';

    expect(text).toContain('Fixed horizontal bar');
    expect(text).toContain('All 3 slots');
    expect(text).toContain('Docs');
    expect(el.querySelector('button[aria-label="Notifications"]')).toBeTruthy();
    expect(text).toContain('Marks left content.');
    expect(text).not.toContain('Đủ 3 slot');
  });

  it('dịch trang Sidebar và demo sang tiếng Anh', () => {
    const text = renderEn(SidebarPage).textContent ?? '';

    expect(text).toContain('Collapsible vertical navigation');
    expect(text).toContain('Home');
    expect(text).toContain('Help & feedback');
    expect(text).toContain('Collapses the sidebar.');
    expect(text).not.toContain('Trang chủ');
  });

  it('dịch trang Link và demo sang tiếng Anh', () => {
    const text = renderEn(LinkPage).textContent ?? '';

    expect(text).toContain('Inline text link directive');
    expect(text).toContain('design philosophy');
    expect(text).toContain('OpenDesign docs');
    expect(text).toContain('Adds the .g-link class');
    expect(text).not.toContain('triết lý thiết kế');
  });

  it('dịch trang Menu và demo sang tiếng Anh', () => {
    const text = renderEn(MenuPage).textContent ?? '';

    expect(text).toContain('Hierarchical navigation menu');
    expect(text).toContain('Vertical — inline accordion');
    expect(text).toContain('Profile');
    expect(text).toContain('Leaf item on an');
    expect(text).not.toContain('mở/gập');
  });

  it('dịch trang Action Menu và demo sang tiếng Anh', () => {
    const text = renderEn(ActionMenuPage).textContent ?? '';

    expect(text).toContain('Navigation/action dropdown menu');
    expect(text).toContain('Default — icon-only round trigger');
    expect(text).toContain('Products');
    expect(text).toContain('Emits the selected item.');
    expect(text).not.toContain('TỰ LẬT');
  });

  it('dịch trang Breadcrumb và demo sang tiếng Anh', () => {
    const text = renderEn(BreadcrumbPage).textContent ?? '';

    expect(text).toContain('Hierarchical path');
    expect(text).toContain('Products');
    expect(text).toContain('Current item');
    expect(text).toContain('Container for breadcrumb items');
    expect(text).not.toContain('Đường dẫn phân cấp');
  });

  it('dịch trang Accordion và demo sang tiếng Anh', () => {
    const text = renderEn(AccordionPage).textContent ?? '';

    expect(text).toContain('Collapsible panel list');
    expect(text).toContain('What is OpenDesign?');
    expect(text).toContain('Allows multiple panels');
    expect(text).not.toContain('Danh sách panel');
  });

  it('dịch trang Dock Menu và demo sang tiếng Anh', () => {
    const text = renderEn(DockMenuPage).textContent ?? '';

    expect(text).toContain('macOS-style dock menu');
    expect(text).toContain('Dashboard');
    expect(text).toContain('Fixed at the bottom center');
    expect(text).not.toContain('Bảng điều khiển');
  });

  it('dịch trang Pagination và demo sang tiếng Anh', () => {
    const text = renderEn(PaginationPage).textContent ?? '';

    expect(text).toContain('Presentational pagination control');
    expect(text).toContain('Current page:');
    expect(text).toContain('Total page count.');
    expect(text).not.toContain('Trang hiện tại');
  });
});
