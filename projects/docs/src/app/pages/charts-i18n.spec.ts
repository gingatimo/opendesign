import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { GLocaleService, gLocaleEn, gLocaleVi, provideGLocale } from 'ngx-opendesign';
import BarChartPage from './bar-chart.page';
import CalendarHeatmapPage from './calendar-heatmap.page';
import DonutChartPage from './donut-chart.page';
import HeatmapChartPage from './heatmap-chart.page';
import HoneycombChartPage from './honeycomb-chart.page';
import LineChartPage from './line-chart.page';
import PieChartPage from './pie-chart.page';
import PolarChartPage from './polar-chart.page';
import RadarChartPage from './radar-chart.page';
import StackedBarPage from './stacked-bar.page';

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

function textOf<T>(component: Type<T>): string {
  return renderEn(component).textContent ?? '';
}

describe('chart pages i18n', () => {
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

  it('dịch Line Chart và Bar Chart sang tiếng Anh', () => {
    const line = textOf(LineChartPage);
    const bar = textOf(BarChartPage);

    expect(line).toContain('Pure SVG line chart');
    expect(line).toContain('Straight');
    expect(line).toContain('Revenue');
    expect(line).toContain('Screen-reader label');
    expect(line).not.toContain('Doanh thu');

    expect(bar).toContain('Pure SVG bar chart');
    expect(bar).toContain('Vertical');
    expect(bar).toContain('North');
    expect(bar).toContain('Category labels');
    expect(bar).not.toContain('Miền Bắc');
  });

  it('dịch Pie Chart, Donut Chart và Stacked Bar sang tiếng Anh', () => {
    const pie = textOf(PieChartPage);
    const donut = textOf(DonutChartPage);
    const stacked = textOf(StackedBarPage);

    expect(pie).toContain('Pure SVG pie chart');
    expect(pie).toContain('Traffic sources');
    expect(pie).toContain('Direct');
    expect(pie).not.toContain('Trực tiếp');

    expect(donut).toContain('Pure SVG donut chart');
    expect(donut).toContain('Orders by channel');
    expect(donut).toContain('Reseller');
    expect(donut).not.toContain('Đại lý');

    expect(stacked).toContain('Single-line proportional bar');
    expect(stacked).toContain('Order status');
    expect(stacked).toContain('Awaiting confirmation');
    expect(stacked).not.toContain('Hoàn tất');
  });

  it('dịch Polar Chart, Radar Chart và Honeycomb Chart sang tiếng Anh', () => {
    const polar = textOf(PolarChartPage);
    const radar = textOf(RadarChartPage);
    const honeycomb = textOf(HoneycombChartPage);

    expect(polar).toContain('Pure SVG polar area chart');
    expect(polar).toContain('Rainfall by season');
    expect(polar).toContain('Spring');
    expect(polar).not.toContain('Xuân');

    expect(radar).toContain('Pure SVG radar chart');
    expect(radar).toContain('Candidate scorecard');
    expect(radar).toContain('Communication');
    expect(radar).toContain('When not to use it');
    expect(radar).not.toContain('Kỹ thuật');

    expect(honeycomb).toContain('Pure SVG honeycomb chart');
    expect(honeycomb).toContain('Tasks by member');
    expect(honeycomb).toContain('Color mode:');
    expect(honeycomb).not.toContain('Tô màu');
  });

  it('dịch Heatmap và Calendar Heatmap sang tiếng Anh', () => {
    const heatmap = textOf(HeatmapChartPage);
    const calendar = textOf(CalendarHeatmapPage);

    expect(heatmap).toContain('Matrix heatmap');
    expect(heatmap).toContain('Visits by hour');
    expect(heatmap).toContain('Sparse');
    expect(heatmap).toContain('Mon');
    expect(heatmap).not.toContain('T2');

    expect(calendar).toContain('Daily calendar heatmap');
    expect(calendar).toContain('Activity over the past year');
    expect(calendar).toContain('Week starts on:');
    expect(calendar).toContain('Sunday');
    expect(calendar).toContain('Month labels');
    expect(calendar).not.toContain('Chủ nhật');
  });
});
