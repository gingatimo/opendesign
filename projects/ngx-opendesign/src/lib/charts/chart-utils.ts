// Toán học nền cho charts — HÀM THUẦN, không đụng DOM (dễ test, không phụ thuộc trình duyệt).
// Toàn bộ chart của OpenDesign vẽ bằng <svg> tọa độ do các hàm này sinh ra (0 thư viện ngoài).

/**
 * Màu ghi đè cho một chuỗi/múi. Bỏ trống thì lấy theo bảng màu `--g-chart-1..18` (xem `chartColor`).
 *
 * Giá trị đi THẲNG vào `fill`/`stroke` của SVG nên nhận **mọi màu CSS hợp lệ**: hex (kể cả kênh
 * alpha `#rrggbbaa`), `rgb()`, `hsl()`, `oklch()`, tên màu, `var(--token)` (có/không fallback),
 * `color-mix()`. Lúc xuất ảnh, mọi dạng trên được quy về giá trị đã tính rồi mới ghi vào file.
 *
 * KHÔNG nhận gradient/pattern: `fill` cần `url(#id)` trỏ tới `<defs>` bên trong SVG, mà component
 * chưa mở chỗ để chèn defs. Màu cũng thuộc về cả chuỗi/múi, không đặt riêng cho từng điểm được.
 */
export type GChartColor = string;

export interface GChartSeries {
  /** Tên chuỗi (hiện ở legend/tooltip). */
  name: string;
  /** Giá trị theo từng mốc trục x (cùng độ dài với labels). */
  values: readonly number[];
  /** Màu của cả chuỗi — xem {@link GChartColor} để biết các dạng nhận được. */
  color?: GChartColor;
}

export interface GChartSlice {
  name: string;
  value: number;
  /** Màu của múi — xem {@link GChartColor} để biết các dạng nhận được. */
  color?: GChartColor;
}

export interface Point {
  x: number;
  y: number;
}

/** Vị trí đặt chú giải quanh chart. */
export type GChartLegendPosition = 'top' | 'right' | 'bottom' | 'left';

/** Legend nằm trái/phải → xếp DỌC; trên/dưới → xếp NGANG. */
export function legendDirection(pos: GChartLegendPosition): 'horizontal' | 'vertical' {
  return pos === 'left' || pos === 'right' ? 'vertical' : 'horizontal';
}

// ----- Trục số: chọn bước "đẹp" (1/2/5 × 10^n) và sinh danh sách vạch tròn trịa -----

function niceNum(range: number, round: boolean): number {
  const exp = Math.floor(Math.log10(range));
  const frac = range / 10 ** exp;
  let nice: number;
  if (round) {
    nice = frac < 1.5 ? 1 : frac < 3 ? 2 : frac < 7 ? 5 : 10;
  } else {
    nice = frac <= 1 ? 1 : frac <= 2 ? 2 : frac <= 5 ? 5 : 10;
  }
  return nice * 10 ** exp;
}

/** Danh sách vạch trục "đẹp" phủ [min, max], khoảng chừng `count` vạch. */
export function niceTicks(min: number, max: number, count = 5): number[] {
  if (!isFinite(min) || !isFinite(max) || min === max) {
    max = (min || 0) + 1;
    min = min || 0;
  }
  const step = niceNum(niceNum(max - min, false) / Math.max(1, count - 1), true);
  const niceMin = Math.floor(min / step) * step;
  const niceMax = Math.ceil(max / step) * step;
  // Số chữ số thập phân của step → làm tròn tránh 0.30000000000004.
  const decimals = Math.max(0, -Math.floor(Math.log10(step)));
  const ticks: number[] = [];
  for (let v = niceMin; v <= niceMax + step / 2; v += step) {
    ticks.push(Number(v.toFixed(decimals)));
  }
  return ticks;
}

/** Rút gọn số cho nhãn trục/legend: 1_500_000 → "1.5M", 2_500 → "2.5K". */
export function formatChartNumber(n: number): string {
  const abs = Math.abs(n);
  if (abs >= 1_000_000) return `${trim(n / 1_000_000)}M`;
  if (abs >= 1_000) return `${trim(n / 1_000)}K`;
  return trim(n);
}
function trim(n: number): string {
  return Number(n.toFixed(1)).toString();
}

// ----- Đường gấp khúc (nối thẳng) và đường cong trơn (Catmull-Rom → Bézier) -----

/** Path nối thẳng các điểm: M … L … L … */
export function linePath(points: readonly Point[]): string {
  if (!points.length) return '';
  return points.map((p, i) => `${i === 0 ? 'M' : 'L'}${r(p.x)} ${r(p.y)}`).join(' ');
}

/**
 * Path nối CONG trơn qua các điểm bằng spline Catmull-Rom quy đổi sang cung Bézier bậc 3.
 * Điều khiển mỗi đoạn: cp1 = Pi + (Pi+1 − Pi−1)/6, cp2 = Pi+1 − (Pi+2 − Pi)/6 (kẹp ở hai đầu).
 */
export function smoothPath(points: readonly Point[]): string {
  const n = points.length;
  if (n < 3) return linePath(points);
  let d = `M${r(points[0].x)} ${r(points[0].y)}`;
  for (let i = 0; i < n - 1; i++) {
    const p0 = points[i === 0 ? 0 : i - 1];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2 < n ? i + 2 : n - 1];
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C${r(cp1x)} ${r(cp1y)} ${r(cp2x)} ${r(cp2y)} ${r(p2.x)} ${r(p2.y)}`;
  }
  return d;
}

// ----- Cung tròn cho pie/donut -----

/** Điểm trên đường tròn: góc 0 = ĐỈNH (12h), tăng theo chiều KIM ĐỒNG HỒ (radian). */
export function polar(cx: number, cy: number, radius: number, angle: number): Point {
  return { x: cx + radius * Math.sin(angle), y: cy - radius * Math.cos(angle) };
}

/**
 * Path một "múi" — hình quạt (rInner = 0, cho pie) hoặc vành khuyên (rInner > 0, cho donut).
 * Góc theo radian, 0 = 12h, thuận kim đồng hồ.
 */
export function arcPath(
  cx: number,
  cy: number,
  rOuter: number,
  rInner: number,
  a0: number,
  a1: number,
): string {
  const largeArc = a1 - a0 > Math.PI ? 1 : 0;
  const o0 = polar(cx, cy, rOuter, a0);
  const o1 = polar(cx, cy, rOuter, a1);
  if (rInner <= 0) {
    // Hình quạt đặc: tâm → mép ngoài → cung → về tâm.
    return `M${r(cx)} ${r(cy)} L${r(o0.x)} ${r(o0.y)} A${r(rOuter)} ${r(rOuter)} 0 ${largeArc} 1 ${r(o1.x)} ${r(o1.y)} Z`;
  }
  const i1 = polar(cx, cy, rInner, a1);
  const i0 = polar(cx, cy, rInner, a0);
  return (
    `M${r(o0.x)} ${r(o0.y)} A${r(rOuter)} ${r(rOuter)} 0 ${largeArc} 1 ${r(o1.x)} ${r(o1.y)} ` +
    `L${r(i1.x)} ${r(i1.y)} A${r(rInner)} ${r(rInner)} 0 ${largeArc} 0 ${r(i0.x)} ${r(i0.y)} Z`
  );
}

/** Số màu trong bảng phân loại (`--g-chart-1` … `--g-chart-18`). */
export const CHART_COLORS = 18;

/**
 * Màu cho chuỗi/múi thứ `index` (0-based): lấy VÒNG bảng `--g-chart-1..18` — vượt quá thì quay lại
 * màu 1 — trừ khi có `override` ({@link GChartColor}). Trả về token dạng `var(...)` chứ không phải mã
 * màu, nhờ vậy chart tự đổi theo theme sáng/tối mà không phải vẽ lại.
 *
 * Lưu ý: bảng màu KHÔNG đảm bảo không trùng. Quá 18 hạng mục là lặp lại đúng màu cũ, và ngay trong
 * 18 màu vẫn có những cặp gần nhau về thị giác — cần phân biệt tuyệt đối thì truyền `color` tay.
 */
export function chartColor(index: number, override?: GChartColor): string {
  return override ?? `var(--g-chart-${(index % CHART_COLORS) + 1})`;
}

/** Số bậc màu của heatmap — 0 nghĩa là "không có gì", còn lại chia đều theo giá trị lớn nhất. */
export const HEAT_LEVELS = 4;

/**
 * Bậc màu (0..HEAT_LEVELS) của một ô heatmap. Chia theo TỈ LỆ với giá trị lớn nhất chứ không theo
 * ngưỡng tuyệt đối, nhờ vậy cùng một bộ màu dùng được cho mọi thang dữ liệu.
 */
export function heatLevel(value: number, max: number): number {
  if (value <= 0 || max <= 0) return 0;
  return Math.min(HEAT_LEVELS, Math.ceil((value / max) * HEAT_LEVELS));
}

/**
 * Màu của một bậc heatmap: bậc 0 là nền trống, các bậc sau pha `--g-chart-2` với nền theo độ đậm
 * tăng dần. Dùng `color-mix` để chỉ cần MỘT token màu là ra cả thang, và thang tự đổi theo theme.
 */
export function heatColor(level: number, base = 'var(--g-chart-2)'): string {
  if (level <= 0) return 'var(--g-secondary-bg)';
  const strength = (level / HEAT_LEVELS) * 100;
  return `color-mix(in srgb, ${base} ${strength}%, var(--g-surface))`;
}

// Làm tròn tọa độ 2 chữ số → path gọn, không sai lệch thị giác.
function r(v: number): number {
  return Math.round(v * 100) / 100;
}
