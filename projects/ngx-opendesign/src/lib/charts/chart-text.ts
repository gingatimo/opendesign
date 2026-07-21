// Đo bề ngang chữ để chart SVG chừa đúng chỗ cho nhãn.
//
// SVG không tự dàn chữ như HTML: muốn biết cột nhãn rộng bao nhiêu thì phải ĐO. Canvas là cách duy
// nhất đo được trước khi vẽ (getBBox chỉ dùng được sau khi phần tử đã nằm trong DOM, mà lúc đó tọa
// độ đã tính xong rồi). Dùng chung một context cho mọi lần đo — tạo canvas mỗi lần là phí.

export const CHART_FONT_STACK =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

let context: CanvasRenderingContext2D | null | undefined;

export function measureTextWidth(text: string, fontSize: number, weight = '400'): number {
  context ??= document.createElement('canvas').getContext('2d');
  if (!context) return text.length * fontSize * 0.55; // môi trường không có canvas (SSR/test)
  context.font = `${weight} ${fontSize}px ${CHART_FONT_STACK}`;
  return context.measureText(text).width;
}

/** Bề ngang của nhãn dài nhất trong danh sách — dùng để chừa cột nhãn. */
export function maxTextWidth(texts: readonly string[], fontSize: number, weight = '400'): number {
  return texts.reduce((max, t) => Math.max(max, measureTextWidth(t, fontSize, weight)), 0);
}
