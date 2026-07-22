import { TestBed } from '@angular/core/testing';
import { GLocaleService, gLocaleEn, gLocaleVi, provideGLocale } from 'ngx-opendesign';
import { HeatmapChartDemo } from './heatmap-chart.demo';

class ResizeObserverStub implements ResizeObserver {
  observe(): void {
    // jsdom không cần layout thật cho test label.
  }
  unobserve(): void {
    // jsdom không cần layout thật cho test label.
  }
  disconnect(): void {
    // jsdom không cần layout thật cho test label.
  }
}

function rowLabels(root: HTMLElement): string[] {
  return Array.from(root.querySelectorAll('.g-heatmap__row-label')).map((el) =>
    (el.textContent ?? '').trim(),
  );
}

describe('HeatmapChartDemo', () => {
  beforeEach(() => {
    Object.defineProperty(globalThis, 'ResizeObserver', {
      configurable: true,
      value: ResizeObserverStub,
    });
    TestBed.configureTestingModule({ providers: [provideGLocale(gLocaleVi)] });
  });

  it('đổi nhãn hàng thứ trong tuần theo locale hiện hành', () => {
    const fixture = TestBed.createComponent(HeatmapChartDemo);
    fixture.detectChanges();

    expect(rowLabels(fixture.nativeElement)).toEqual([
      'Thứ 2',
      'Thứ 3',
      'Thứ 4',
      'Thứ 5',
      'Thứ 6',
      'Thứ 7',
      'CN',
    ]);

    TestBed.inject(GLocaleService).use(gLocaleEn);
    fixture.detectChanges();

    expect(rowLabels(fixture.nativeElement)).toEqual([
      'Mon',
      'Tue',
      'Wed',
      'Thu',
      'Fri',
      'Sat',
      'Sun',
    ]);
  });
});
