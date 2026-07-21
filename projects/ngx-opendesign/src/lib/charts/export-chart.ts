import { GChartLegendItem } from './chart-legend';

// Xuất chart ra file SVG hoặc PNG — thao tác do NGƯỜI DÙNG bấm nút (không phải tự động).
//
// Hai chuyện phải tự làm, vì file xuất ra sống độc lập với trang:
// 1. MÀU: chart tô bằng `var(--g-chart-N)` trong INLINE STYLE. Tách khỏi trang là không còn nơi định
//    nghĩa biến → mọi thứ rơi về màu mặc định (đen). Phải "nướng" giá trị ĐÃ TÍNH vào inline style
//    của bản sao — ghi vào attribute là vô ích vì inline style luôn thắng attribute.
// 2. TIÊU ĐỀ + CHÚ GIẢI: chúng là phần tử HTML nằm NGOÀI <svg> nên không có trong bản sao. Ở đây
//    dựng lại bằng <text>/<rect> ngay trong SVG xuất ra.

const PAINT_PROPS = [
  'fill',
  'stroke',
  'stroke-width',
  'stroke-linecap',
  'stroke-linejoin',
  'opacity',
  'font-size',
  'font-family',
  'font-weight',
  'text-anchor',
  'dominant-baseline',
] as const;

const SVG_NS = 'http://www.w3.org/2000/svg';
const PAD = 16;
const TITLE_SIZE = 15;
const TITLE_GAP = 12;
const SWATCH = 10;
const LEGEND_SIZE = 12;
const LEGEND_LINE = 20;
const LEGEND_GAP = 18;

export type GChartExportFormat = 'svg' | 'png';

export interface GChartExportMeta {
  title?: string;
  legend?: readonly GChartLegendItem[];
}

/** Đổi `var(--token)` thành màu thật, đọc từ phần tử sống trên trang. */
function resolveColor(value: string, reference: Element): string {
  const token = /^var\((--[\w-]+)\)$/.exec(value.trim());
  if (!token) return value;
  return getComputedStyle(reference).getPropertyValue(token[1]).trim() || value;
}

/** Ước lượng bề ngang một mục chú giải — đủ để xếp hàng, không cần đo chữ chính xác. */
function legendItemWidth(name: string): number {
  return SWATCH + 6 + name.length * 6.6 + LEGEND_GAP;
}

function createText(
  content: string,
  x: number,
  y: number,
  size: number,
  color: string,
): SVGElement {
  const text = document.createElementNS(SVG_NS, 'text');
  text.setAttribute('x', String(x));
  text.setAttribute('y', String(y));
  text.setAttribute('font-family', 'system-ui, -apple-system, Segoe UI, sans-serif');
  text.setAttribute('font-size', String(size));
  text.setAttribute('fill', color);
  text.textContent = content;
  return text;
}

export async function exportChartSvg(
  svg: SVGSVGElement,
  filename: string,
  format: GChartExportFormat = 'png',
  meta: GChartExportMeta = {},
): Promise<void> {
  const chartWidth = svg.clientWidth || svg.viewBox.baseVal.width || 640;
  const chartHeight = svg.clientHeight || svg.viewBox.baseVal.height || 280;
  const styles = getComputedStyle(svg);
  const textColor = styles.getPropertyValue('--g-text').trim() || '#18181b';
  const background = styles.getPropertyValue('--g-surface-raised').trim() || '#ffffff';

  const clone = svg.cloneNode(true) as SVGSVGElement;
  // Ánh xạ 1-1 node sống → node clone (cùng thứ tự) để copy style đã tính.
  const live = svg.querySelectorAll('*');
  const copies = clone.querySelectorAll('*');
  live.forEach((node, i) => {
    const computed = getComputedStyle(node);
    const target = copies[i] as SVGElement;
    for (const prop of PAINT_PROPS) {
      const value = computed.getPropertyValue(prop);
      if (value) target.style.setProperty(prop, value);
    }
  });

  // Xếp chú giải thành các hàng vừa bề ngang chart.
  const legend = meta.legend ?? [];
  const rows: GChartLegendItem[][] = [];
  let row: GChartLegendItem[] = [];
  let rowWidth = 0;
  for (const item of legend) {
    const width = legendItemWidth(item.name);
    if (row.length && rowWidth + width > chartWidth) {
      rows.push(row);
      row = [];
      rowWidth = 0;
    }
    row.push(item);
    rowWidth += width;
  }
  if (row.length) rows.push(row);

  const titleHeight = meta.title ? TITLE_SIZE + TITLE_GAP : 0;
  const legendHeight = rows.length ? rows.length * LEGEND_LINE + 4 : 0;
  const width = chartWidth + PAD * 2;
  const height = chartHeight + titleHeight + legendHeight + PAD * 2;

  const out = document.createElementNS(SVG_NS, 'svg');
  out.setAttribute('xmlns', SVG_NS);
  out.setAttribute('width', String(width));
  out.setAttribute('height', String(height));
  out.setAttribute('viewBox', `0 0 ${width} ${height}`);

  const backdrop = document.createElementNS(SVG_NS, 'rect');
  backdrop.setAttribute('width', String(width));
  backdrop.setAttribute('height', String(height));
  backdrop.setAttribute('fill', background);
  out.appendChild(backdrop);

  if (meta.title) {
    const title = createText(meta.title, PAD, PAD + TITLE_SIZE, TITLE_SIZE, textColor);
    title.setAttribute('font-weight', '600');
    out.appendChild(title);
  }

  // Chart lồng vào dưới dạng <svg> con: giữ nguyên viewBox nên hình không méo.
  clone.setAttribute('x', String(PAD));
  clone.setAttribute('y', String(PAD + titleHeight));
  clone.setAttribute('width', String(chartWidth));
  clone.setAttribute('height', String(chartHeight));
  out.appendChild(clone);

  // Chú giải: ô màu bo góc + tên, mỗi hàng căn giữa như trên giao diện.
  let y = PAD + titleHeight + chartHeight + 4;
  for (const line of rows) {
    const lineWidth = line.reduce((sum, item) => sum + legendItemWidth(item.name), 0) - LEGEND_GAP;
    let x = PAD + Math.max(0, (chartWidth - lineWidth) / 2);
    for (const item of line) {
      const swatch = document.createElementNS(SVG_NS, 'rect');
      swatch.setAttribute('x', String(x));
      swatch.setAttribute('y', String(y + 3));
      swatch.setAttribute('width', String(SWATCH));
      swatch.setAttribute('height', String(SWATCH));
      swatch.setAttribute('rx', '3');
      swatch.setAttribute('fill', resolveColor(item.color, svg));
      out.appendChild(swatch);
      out.appendChild(
        createText(item.name, x + SWATCH + 6, y + LEGEND_SIZE + 1, LEGEND_SIZE, textColor),
      );
      x += legendItemWidth(item.name);
    }
    y += LEGEND_LINE;
  }

  const svgString = new XMLSerializer().serializeToString(out);

  if (format === 'svg') {
    downloadBlob(new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' }), `${filename}.svg`);
    return;
  }

  // PNG: vẽ SVG lên canvas (scale ×2 cho nét).
  const scale = 2;
  const canvas = document.createElement('canvas');
  canvas.width = width * scale;
  canvas.height = height * scale;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.scale(scale, scale);
  ctx.fillStyle = background;
  ctx.fillRect(0, 0, width, height);

  const img = new Image();
  const url = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`;
  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () => reject(new Error('SVG load lỗi'));
    img.src = url;
  });
  ctx.drawImage(img, 0, 0, width, height);
  await new Promise<void>((resolve) => {
    canvas.toBlob((blob) => {
      if (blob) downloadBlob(blob, `${filename}.png`);
      resolve();
    }, 'image/png');
  });
}

function downloadBlob(blob: Blob, name: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
}
