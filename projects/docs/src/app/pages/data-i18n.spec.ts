import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { GLocaleService, gLocaleEn, gLocaleVi, provideGLocale } from 'ngx-opendesign';
import OrgChartPage from './org-chart.page';
import ReorderListPage from './reorder-list.page';
import TablePage from './table.page';

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

describe('data pages i18n', () => {
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

  it('dịch trang Table và các demo sang tiếng Anh', () => {
    const el = renderEn(TablePage);
    const text = el.textContent ?? '';

    expect(text).toContain('Presentation-only table directive');
    expect(text).toContain('Sorting');
    expect(text).toContain('Frozen columns/rows');
    expect(text).toContain('Select rows');
    expect(text).toContain('Name');
    expect(text).toContain('Administrator');
    expect(text).toContain('Engineering');
    expect(text).toContain('Selected');
    expect(el.querySelector('g-checkbox[aria-label="Select all"]')).toBeTruthy();
    expect(text).toContain('Maximum number of rows');
    expect(text).not.toContain('Quản trị viên');
  });

  it('dịch trang Organization Chart và demo sang tiếng Anh', () => {
    const text = renderEn(OrgChartPage).textContent ?? '';

    expect(text).toContain('Top-down organization tree');
    expect(text).toContain('Default nodes');
    expect(text).toContain('Selected:');
    expect(text).toContain('(none)');
    expect(text).toContain('Data structure');
    expect(text).toContain('Root nodes');
    expect(text).not.toContain('Node mặc định');
  });

  it('dịch trang Reorder List và demo sang tiếng Anh', () => {
    const text = renderEn(ReorderListPage).textContent ?? '';

    expect(text).toContain('Drag-and-drop list');
    expect(text).toContain('Design UI');
    expect(text).toContain('Current order:');
    expect(text).toContain('List of items');
    expect(text).not.toContain('Thiết kế giao diện');
  });
});
