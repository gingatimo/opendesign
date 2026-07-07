let counter = 0;

/** Sinh id duy nhất trong phiên chạy, dùng cho các thuộc tính ARIA cần tham chiếu id (vd. aria-activedescendant). */
export function gNextId(prefix: string): string {
  counter += 1;
  return `${prefix}-${counter}`;
}
