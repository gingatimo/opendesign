/**
 * Lớp lệnh của GRichTextEditor — nơi DUY NHẤT trong thư viện gọi `document.execCommand`.
 *
 * Vì sao vẫn dùng một API đã deprecated? Vì đến nay nó là cách DUY NHẤT sửa nội dung
 * contenteditable mà GIỮ ĐƯỢC undo stack gốc của trình duyệt (Ctrl+Z) và luồng IME. Sửa DOM tay
 * bằng Range API sẽ xoá sạch lịch sử undo native, nên editor "hiện đại" (ProseMirror/Lexical/Slate)
 * phải tự dựng document model + history + selection + IME — cỡ hàng chục nghìn dòng, vượt xa phạm vi
 * một design system. Chính MDN cũng ghi nhận: execCommand deprecated nhưng "vẫn còn use case hợp lệ
 * chưa có phương án thay thế", ví dụ đúng chuyện giữ undo buffer.
 *
 * Cách giảm rủi ro ở đây:
 * 1. TOÀN BỘ bề mặt deprecated gói trong file này (`applyCommand`) — muốn đổi engine chỉ sửa 1 chỗ.
 * 2. Đọc trạng thái (đang đậm? đang ở H2?) KHÔNG dùng `queryCommandState`/`queryCommandValue`
 *    (deprecated + mỗi trình duyệt trả khác nhau) mà dò DOM bằng Selection/Range API tiêu chuẩn.
 * 3. Có `queryCommandSupported` chặn trước, `applyCommand` trả boolean để component biết lệnh trượt.
 */

/** Tên tag tương ứng từng mark — dùng để DÒ DOM thay cho `queryCommandState`. */
const MARK_TAGS: Readonly<Record<string, readonly string[]>> = {
  bold: ['B', 'STRONG'],
  italic: ['I', 'EM'],
  underline: ['U'],
  strikeThrough: ['S', 'STRIKE', 'DEL'],
  code: ['CODE'],
  subscript: ['SUB'],
  superscript: ['SUP'],
};

/** Các tag khối mà toolbar quan tâm (kể cả danh sách và ô bảng). */
const BLOCK_TAGS = [
  'P',
  'H1',
  'H2',
  'H3',
  'H4',
  'H5',
  'H6',
  'BLOCKQUOTE',
  'UL',
  'OL',
  'PRE',
  'TD',
  'TH',
];

let normalized = false;

/**
 * Ép trình duyệt sinh HTML NGỮ NGHĨA thay vì `<span style>`: `styleWithCSS=false` → dùng `<b>/<i>`,
 * `defaultParagraphSeparator=p` → xuống dòng tạo `<p>` (Chrome mặc định `<div>`). Chạy một lần,
 * ngay trước lệnh đầu tiên; hai lệnh này chỉ đổi CÀI ĐẶT nên nuốt lỗi được.
 */
function normalizeOutput(): void {
  if (normalized) return;
  normalized = true;
  try {
    document.execCommand('styleWithCSS', false, 'false');
    document.execCommand('defaultParagraphSeparator', false, 'p');
  } catch {
    // Trình duyệt không hỗ trợ cấu hình này → HTML vẫn đúng, chỉ là có thể lẫn thẻ <span style>.
  }
}

/** Áp một lệnh soạn thảo. Trả `false` nếu trình duyệt không hỗ trợ / lệnh thất bại. */
export function applyCommand(command: string, argument?: string): boolean {
  normalizeOutput();
  try {
    if (!document.queryCommandSupported?.(command)) return false;
    return document.execCommand(command, false, argument);
  } catch {
    return false;
  }
}

/**
 * Áp lệnh nhưng ép sinh CSS thay vì tag cũ. Dùng cho `foreColor`: ở chế độ mặc định
 * (`styleWithCSS=false`) Chrome sinh `<font color>` — thẻ đã bỏ khỏi HTML — nên riêng lệnh màu bật
 * CSS mode rồi trả về ngay để các lệnh khác vẫn ra tag ngữ nghĩa.
 */
export function applyStyledCommand(command: string, argument: string): boolean {
  normalizeOutput();
  try {
    document.execCommand('styleWithCSS', false, 'true');
    return applyCommand(command, argument);
  } finally {
    try {
      document.execCommand('styleWithCSS', false, 'false');
    } catch {
      // Không đổi lại được thì lệnh sau chỉ ra <span style> — vẫn hợp lệ, không cần xử lý gì.
    }
  }
}

/** Escape text để nhét an toàn vào chuỗi HTML của `insertHTML` (không nối chuỗi tay). */
function escapeText(text: string): string {
  const holder = document.createElement('span');
  holder.textContent = text;
  return holder.innerHTML;
}

/** Node đang chứa con trỏ, nếu nó nằm trong `root`. */
function selectionNode(root: HTMLElement): Node | null {
  const sel = document.getSelection();
  const node = sel?.focusNode ?? sel?.anchorNode ?? null;
  return node && root.contains(node) ? node : null;
}

/** Chuỗi tổ tiên từ vị trí con trỏ lên tới `root` (đã gồm phần tử chứa con trỏ). */
function ancestorTags(root: HTMLElement): string[] {
  const node = selectionNode(root);
  const tags: string[] = [];
  let el =
    node?.nodeType === Node.ELEMENT_NODE ? (node as HTMLElement) : (node?.parentElement ?? null);
  while (el && el !== root) {
    tags.push(el.tagName);
    el = el.parentElement;
  }
  return tags;
}

/**
 * Các mark đang bật tại con trỏ — dò bằng DOM (Selection API tiêu chuẩn), KHÔNG dùng
 * `queryCommandState`. Trả tên lệnh (bold/italic/...) để khớp thẳng với nút toolbar.
 */
export function activeMarks(root: HTMLElement): Set<string> {
  const tags = new Set(ancestorTags(root));
  const marks = new Set<string>();
  for (const [mark, candidates] of Object.entries(MARK_TAGS)) {
    if (candidates.some((t) => tags.has(t))) marks.add(mark);
  }
  if (tags.has('A')) marks.add('link');
  return marks;
}

/**
 * Tag khối gần nhất tại con trỏ, viết thường ('p' | 'h1' | 'h2' | 'h3' | 'blockquote' | 'ul' | 'ol').
 * Rỗng nếu con trỏ không nằm trong vùng soạn. Thay cho `queryCommandValue('formatBlock')`.
 */
export function activeBlock(root: HTMLElement): string {
  for (const tag of ancestorTags(root)) {
    if (BLOCK_TAGS.includes(tag)) return tag.toLowerCase();
  }
  return selectionNode(root) ? 'p' : '';
}

/**
 * Căn lề của khối tại con trỏ: 'left' | 'center' | 'right' | 'justify'. Đọc `getComputedStyle` của
 * phần tử khối (API tiêu chuẩn) nên đúng cho cả `align=` cũ lẫn `style="text-align"`.
 */
export function activeAlign(root: HTMLElement): string {
  const node = selectionNode(root);
  const el =
    node?.nodeType === Node.ELEMENT_NODE ? (node as HTMLElement) : (node?.parentElement ?? null);
  if (!el) return '';
  const align = getComputedStyle(el).textAlign;
  return align === 'start' || align === '' ? 'left' : align === 'end' ? 'right' : align;
}

/** Phần tử `<a>` đang chứa con trỏ (để sửa/bỏ liên kết), nếu có. */
export function activeLink(root: HTMLElement): HTMLAnchorElement | null {
  const node = selectionNode(root);
  const el =
    node?.nodeType === Node.ELEMENT_NODE ? (node as HTMLElement) : (node?.parentElement ?? null);
  return (el?.closest('a') as HTMLAnchorElement | null) ?? null;
}

/** Phần tử tổ tiên gần nhất mang tag cho trước, giới hạn trong vùng soạn. */
function closestTag(root: HTMLElement, tag: string): HTMLElement | null {
  const node = selectionNode(root);
  const start =
    node?.nodeType === Node.ELEMENT_NODE ? (node as HTMLElement) : (node?.parentElement ?? null);
  const found = start?.closest(tag) as HTMLElement | null;
  return found && root.contains(found) ? found : null;
}

/**
 * Bật/tắt `<code>` cho đoạn đang chọn. `execCommand` không có lệnh inline-code, nhưng vẫn giữ được
 * undo native nếu đi vòng qua hai lệnh có sẵn:
 * - BẬT: `insertHTML` thay đoạn chọn bằng `<code>…</code>`.
 * - TẮT: chọn phần bên trong rồi `removeFormat` — `<code>` nằm trong danh sách thẻ mà lệnh này gỡ.
 *   (Không dùng `insertHTML` để tắt: Chrome chèn chữ NGƯỢC VÀO trong chính thẻ `<code>` đang chọn
 *   nên trông như không có gì xảy ra.)
 */
export function toggleInlineCode(root: HTMLElement): boolean {
  const sel = document.getSelection();
  if (!sel?.rangeCount) return false;
  const code = closestTag(root, 'code');
  if (code) {
    const range = document.createRange();
    range.selectNodeContents(code);
    sel.removeAllRanges();
    sel.addRange(range);
    return applyCommand('removeFormat');
  }
  const text = sel.toString();
  if (!text) return false;
  return applyCommand('insertHTML', `<code>${escapeText(text)}</code>`);
}

/**
 * Chèn bảng rỗng `rows × cols`. Cũng không có lệnh execCommand cho bảng → dựng DOM rồi đưa qua
 * `insertHTML` để giữ undo. Chèn kèm một đoạn trống phía sau để con trỏ còn lối thoát khỏi bảng.
 */
export function insertTable(rows: number, cols: number): boolean {
  const r = Math.min(Math.max(Math.trunc(rows) || 1, 1), 20);
  const c = Math.min(Math.max(Math.trunc(cols) || 1, 1), 10);
  const table = document.createElement('table');
  const tbody = document.createElement('tbody');
  for (let i = 0; i < r; i++) {
    const tr = document.createElement('tr');
    for (let j = 0; j < c; j++) {
      const cell = document.createElement(i === 0 ? 'th' : 'td');
      cell.appendChild(document.createElement('br'));
      tr.appendChild(cell);
    }
    tbody.appendChild(tr);
  }
  table.appendChild(tbody);
  return applyCommand('insertHTML', `${table.outerHTML}<p><br></p>`);
}

/**
 * Chuẩn hoá URL người dùng nhập trước khi chèn liên kết. Trả `null` nếu KHÔNG an toàn.
 *
 * Bắt buộc, vì `createLink` nhận nguyên chuỗi: nhập `javascript:alert(1)` sẽ tạo thẻ `<a>` chạy mã
 * khi bấm — XSS ngay trong chính app của người dùng. Chỉ cho http/https/mailto/tel; thiếu scheme thì
 * mặc định `https://`.
 */
export function safeLinkUrl(raw: string): string | null {
  const url = raw.trim();
  if (!url) return null;
  const withScheme = /^[a-z][a-z0-9+.-]*:/i.test(url) ? url : `https://${url}`;
  const scheme = withScheme.slice(0, withScheme.indexOf(':')).toLowerCase();
  return ['http', 'https', 'mailto', 'tel'].includes(scheme) ? withScheme : null;
}
