import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { GButton, GChartLegendPosition, GLineChart, GLocaleService } from 'ngx-opendesign';
import { chartsCopyFor } from '../../pages/charts-copy';

@Component({
  selector: 'docs-line-chart-demo',
  imports: [GLineChart, GButton],
  template: `
    <div class="lc-demo__ctrls">
      <button
        g-button
        size="sm"
        [variant]="curve() === 'straight' ? 'primary' : 'outline'"
        (click)="curve.set('straight')"
      >
        {{ copy().straight }}
      </button>
      <button
        g-button
        size="sm"
        [variant]="curve() === 'smooth' ? 'primary' : 'outline'"
        (click)="curve.set('smooth')"
      >
        {{ copy().smooth }}
      </button>
    </div>

    <div class="lc-demo__ctrls">
      <span class="lc-demo__lbl">{{ copy().legend }}</span>
      @for (p of positions; track p) {
        <button
          g-button
          size="sm"
          [variant]="legendPos() === p ? 'primary' : 'outline'"
          (click)="legendPos.set(p)"
        >
          {{ p }}
        </button>
      }
    </div>

    <g-line-chart
      [title]="copy().title"
      [series]="copy().series"
      [labels]="copy().labels"
      [curve]="curve()"
      [legendPosition]="legendPos()"
      [exportable]="true"
      [zoomable]="true"
      [filename]="copy().filename"
      [ariaLabel]="copy().ariaLabel"
    />
  `,
  styles: `
    :host {
      display: block;
    }
    .lc-demo__ctrls {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: var(--g-space-2);
      margin-bottom: var(--g-space-3);
    }
    .lc-demo__lbl {
      font-size: var(--g-font-size-sm);
      color: var(--g-text-muted);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LineChartDemo {
  private readonly i18n = inject(GLocaleService);
  protected readonly copy = computed(() => chartsCopyFor(this.i18n.tag()).line.demo);
  protected readonly curve = signal<'straight' | 'smooth'>('smooth');
  protected readonly positions: GChartLegendPosition[] = ['top', 'right', 'bottom', 'left'];
  protected readonly legendPos = signal<GChartLegendPosition>('bottom');
}
