import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { GChartExport } from './chart-export';
import { GChartLegend, GChartLegendItem } from './chart-legend';
import { chartColor, GChartSlice } from './chart-utils';
import { GChartZoom } from './chart-zoom';

// Thanh TỈ LỆ một dòng (stacked bar, SVG thuần) — kiểu thanh "Languages" của GitHub: cả tập dữ liệu
// nằm trên MỘT thanh ngang, mỗi phần rộng theo tỉ lệ, chú giải kèm phần trăm bên dưới. Hợp khi chỉ
// cần so sánh cơ cấu của một tổng thể mà không muốn tốn chỗ như pie/donut.
@Component({
  selector: 'g-stacked-bar',
  imports: [GChartLegend, GChartExport, GChartZoom],
  template: `
    <div class="g-chart-frame" [class.g-chart-frame--zoom]="zoomed()">
      @if (title() || exportable() || zoomable()) {
        <div class="g-chart-frame__head" [class.g-chart-frame__head--center]="titleCentered()">
          @if (title()) {
            <div class="g-chart-frame__title">{{ title() }}</div>
          }
          <div class="g-chart-frame__actions">
            @if (exportable() && !zoomed()) {
              <g-chart-export
                [target]="svgEl()?.nativeElement"
                [filename]="filename()"
                [title]="title()"
                [legend]="legendItems()"
              />
            }
            @if (zoomable()) {
              <g-chart-zoom [(zoomed)]="zoomed" />
            }
          </div>
        </div>
      }
      <div class="g-chart-frame__plot g-stacked-bar__plot">
        <svg
          #chartSvg
          class="g-stacked-bar__svg g-chart-frame__svg"
          [attr.viewBox]="'0 0 ' + w() + ' ' + barHeight()"
          width="100%"
          [attr.height]="barHeight()"
          role="img"
          [attr.aria-label]="ariaLabel()"
        >
          <!-- Bo hai đầu thanh bằng clipPath: từng đoạn vẫn là hình chữ nhật vuông góc, chỉ mép
               ngoài cùng của CẢ thanh mới bo — nếu bo từng đoạn thì giữa các đoạn sẽ hở khe. -->
          <clipPath [attr.id]="clipId">
            <rect
              x="0"
              y="0"
              [attr.width]="w()"
              [attr.height]="barHeight()"
              [attr.rx]="barHeight() / 2"
            />
          </clipPath>
          <g [attr.clip-path]="'url(#' + clipId + ')'">
            @for (seg of segments(); track seg.name) {
              <rect
                class="g-stacked-bar__segment"
                [attr.x]="seg.x"
                y="0"
                [attr.width]="seg.width"
                [attr.height]="barHeight()"
                [style.fill]="seg.color"
              >
                <title>{{ seg.name }}: {{ seg.value }} ({{ seg.pct }}%)</title>
              </rect>
            }
          </g>
        </svg>

        @if (showLegend() && data().length) {
          <g-chart-legend [items]="legendItems()" />
        }
      </div>
    </div>
  `,
  styleUrl: './stacked-bar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'g-stacked-bar', '[attr.title]': 'null' },
})
export class GStackedBar {
  readonly data = input<readonly GChartSlice[]>([]);
  /** Độ dày thanh (px). */
  readonly barHeight = input(12);
  readonly showLegend = input(true);
  /** Hiện phần trăm ngay sau tên trong chú giải. */
  readonly showPercent = input(true);
  readonly title = input('');
  /** Vị trí tiêu đề trong hàng đầu: sát trái (mặc định) hay giữa khung. */
  readonly titlePosition = input<'left' | 'center'>('left');
  readonly ariaLabel = input('Thanh tỉ lệ');
  readonly exportable = input(false);
  /** Cho phép phóng to chart ra gần kín màn hình — nút nằm cạnh nút tải xuống. */
  readonly zoomable = input(false);
  readonly filename = input('stacked-bar');

  // clipPath tham chiếu theo id nên mỗi thể hiện phải có id riêng, không thì thanh thứ hai trên trang
  // sẽ cắt theo hình của thanh thứ nhất.
  protected readonly clipId = `g-stacked-bar-clip-${++clipCounter}`;
  protected readonly w = signal(640);
  protected readonly zoomed = signal(false);
  protected readonly titleCentered = computed(() => this.titlePosition() === 'center');

  private readonly destroyRef = inject(DestroyRef);
  protected readonly svgEl = viewChild<ElementRef<SVGSVGElement>>('chartSvg');

  constructor() {
    afterNextRender(() => {
      const el = this.svgEl()?.nativeElement;
      if (!el) return;
      const ro = new ResizeObserver((entries) => {
        const width = Math.round(entries[0].contentRect.width);
        if (width > 0) this.w.set(width);
      });
      ro.observe(el);
      this.destroyRef.onDestroy(() => ro.disconnect());
    });
  }

  protected readonly segments = computed(() => {
    const data = this.data();
    const total = data.reduce((sum, d) => sum + Math.max(0, d.value), 0) || 1;
    let x = 0;
    return data.map((d, i) => {
      const width = (Math.max(0, d.value) / total) * this.w();
      const seg = {
        name: d.name,
        value: d.value,
        color: chartColor(i, d.color),
        x,
        width,
        pct: Math.round((Math.max(0, d.value) / total) * 1000) / 10,
      };
      x += width;
      return seg;
    });
  });

  protected readonly legendItems = computed<GChartLegendItem[]>(() =>
    this.segments().map((s) => ({
      name: this.showPercent() ? `${s.name} ${s.pct}%` : s.name,
      color: s.color,
    })),
  );
}

let clipCounter = 0;
