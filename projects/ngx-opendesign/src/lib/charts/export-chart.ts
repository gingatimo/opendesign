// Xuất một <svg> chart ra file SVG hoặc PNG — thao tác do NGƯỜI DÙNG bấm nút (không phải tự động).
// Vì chart tô màu qua biến CSS (var(--g-chart-N)) và class, bản serialize đứng một mình sẽ MẤT màu →
// phải "nướng" (inline) các thuộc tính trình bày đã resolve từ node sống trước khi serialize.

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

export type GChartExportFormat = 'svg' | 'png';

export async function exportChartSvg(
  svg: SVGSVGElement,
  filename: string,
  format: GChartExportFormat = 'png',
): Promise<void> {
  const width = svg.clientWidth || svg.viewBox.baseVal.width || 640;
  const height = svg.clientHeight || svg.viewBox.baseVal.height || 280;

  const clone = svg.cloneNode(true) as SVGSVGElement;
  // Ánh xạ 1-1 node sống → node clone (cùng thứ tự) để copy style đã tính.
  const live = svg.querySelectorAll('*');
  const copy = clone.querySelectorAll('*');
  live.forEach((node, i) => {
    const cs = getComputedStyle(node);
    const target = copy[i] as SVGElement;
    for (const prop of PAINT_PROPS) {
      const val = cs.getPropertyValue(prop);
      if (val) target.setAttribute(prop, val);
    }
  });
  clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  clone.setAttribute('width', String(width));
  clone.setAttribute('height', String(height));
  // Nền theo bề mặt hiện tại để PNG không bị trong suốt lẫn chữ.
  const bg = getComputedStyle(svg).getPropertyValue('--g-surface-raised').trim() || '#ffffff';
  const svgString = new XMLSerializer().serializeToString(clone);

  if (format === 'svg') {
    downloadBlob(new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' }), `${filename}.svg`);
    return;
  }

  // PNG: vẽ SVG lên canvas (scale ×2 cho nét), có nền.
  const scale = 2;
  const canvas = document.createElement('canvas');
  canvas.width = width * scale;
  canvas.height = height * scale;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.scale(scale, scale);
  ctx.fillStyle = bg;
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
