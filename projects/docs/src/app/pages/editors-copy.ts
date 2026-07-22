import { ApiRow } from '../shared/api-table';

interface EditorPageCopy {
  title: string;
  intro: string;
  apiTitle: string;
  apiRows: ApiRow[];
}

interface CodeEditorCopy extends EditorPageCopy {
  demo: {
    tablistLabel: string;
    typescriptLabel: string;
    jsonLabel: string;
    cssLabel: string;
    plainLabel: string;
    typescriptAriaLabel: string;
    jsonAriaLabel: string;
    cssAriaLabel: string;
    plainAriaLabel: string;
    typescript: string;
    json: string;
    css: string;
    plain: string;
  };
}

interface RichTextEditorCopy extends EditorPageCopy {
  accessibilityTitle: string;
  accessibility: string[];
  notesTitle: string;
  notes: string[];
  securityTitle: string;
  security: string[];
  execTitle: string;
  execIntro: string[];
  execReasons: string[];
  containmentIntro: string;
  containment: string[];
  migrationNote: string;
  demo: {
    ariaLabel: string;
    summary: string;
    html: string;
  };
}

interface EditorsCopy {
  codeEditor: CodeEditorCopy;
  richTextEditor: RichTextEditorCopy;
}

const VI_EDITORS: EditorsCopy = {
  codeEditor: {
    title: 'Code Editor',
    intro:
      'Trình soạn code nhẹ, Angular-only, 0 thư viện ngoài. Kỹ thuật textarea overlay đặt một textarea trong suốt đè đúng lên pre đã tô màu, nên IME tiếng Việt, undo/redo, chọn và con trỏ đều dùng cơ chế native. Tô màu bằng regex cho typescript/json/css/html; muốn xịn hơn thì truyền highlighter riêng, ví dụ Prism lazy-load. Có số dòng ở gutter, Tab thành spaces, và hỗ trợ [(value)] hoặc formControlName.',
    apiTitle: 'API — GCodeEditor',
    apiRows: [
      {
        name: 'value',
        type: 'string',
        default: "''",
        description: 'Nội dung — [(value)] hoặc formControlName.',
      },
      {
        name: 'language',
        type: "'plain' | 'typescript' | 'json' | 'css' | 'html' | ...",
        default: "'plain'",
        description: 'Ngôn ngữ tô màu.',
      },
      {
        name: 'highlighter',
        type: '(code, lang) => string',
        default: '—',
        description: 'Hàm tô màu riêng, trả HTML đã escape; bỏ trống dùng bộ regex nội bộ.',
      },
      {
        name: 'height',
        type: 'number',
        default: '220',
        description: 'Chiều cao (px), cuộn khi tràn.',
      },
      {
        name: 'lineNumbers',
        type: 'boolean',
        default: 'true',
        description: 'Hiện gutter số dòng.',
      },
      { name: 'tabSize', type: 'number', default: '2', description: 'Số spaces khi nhấn Tab.' },
      { name: 'readonly', type: 'boolean', default: 'false', description: 'Chỉ đọc.' },
      {
        name: 'placeholder / ariaLabel',
        type: 'string',
        default: "'' / 'Trình soạn code'",
        description: 'Gợi ý khi rỗng, nhãn a11y.',
      },
    ],
    demo: {
      tablistLabel: 'Ngôn ngữ code',
      typescriptLabel: 'TypeScript',
      jsonLabel: 'JSON',
      cssLabel: 'CSS',
      plainLabel: 'Plain',
      typescriptAriaLabel: 'Ví dụ TypeScript',
      jsonAriaLabel: 'Ví dụ JSON',
      cssAriaLabel: 'Ví dụ CSS',
      plainAriaLabel: 'Ví dụ Plain',
      typescript: `// Ví dụ TypeScript
import { signal } from '@angular/core';

export function tao(dem = 0) {
  const count = signal(dem);
  const tang = () => count.set(count() + 1);
  return { count, tang };
}

const { count, tang } = tao(10);
tang();
console.log(\`Giá trị: \${count()}\`);
`,
      json: `{
  "name": "ngx-opendesign",
  "version": "1.0.0",
  "private": false,
  "keywords": ["angular", "design-system", "pill"],
  "peerDependencies": {
    "@angular/cdk": ">=22.0.0",
    "@angular/forms": ">=22.0.0"
  }
}
`,
      css: `.g-button {
  height: var(--g-control-md);
  padding: 0 var(--g-space-4);
  border-radius: var(--g-radius-pill);
  background: var(--g-primary);
  color: #ffffff;
  transition: background-color 120ms ease;
}
.g-button:hover {
  background: var(--g-primary-hover);
}
`,
      plain: `OpenDesign — design system cho Angular
- 78 component, 116 icon
- 0 dependency bên thứ ba
- sáng/tối qua thuộc tính data-g-theme
`,
    },
  },
  richTextEditor: {
    title: 'Rich Text Editor',
    intro:
      'Trình soạn văn bản định dạng WYSIWYG, Angular-only, 0 thư viện ngoài. Bề mặt là contenteditable. Toolbar gồm hoàn tác/làm lại, text styles, đậm/nghiêng/gạch dưới, định dạng khác, màu chữ, kiểu danh sách, căn lề, thụt/lùi lề, liên kết, bảng và xoá định dạng. Editor IME-safe, không ghi đè innerHTML lúc gõ; dán plain text hoặc HTML đã sanitize; giá trị ngoài cũng được sanitize chống XSS. Hỗ trợ [(value)] HTML hoặc formControlName.',
    apiTitle: 'API — GRichTextEditor',
    apiRows: [
      {
        name: 'value',
        type: 'string (HTML)',
        default: "''",
        description: 'Nội dung HTML — [(value)] hoặc formControlName. Giá trị ngoài được sanitize.',
      },
      {
        name: 'pasteMode',
        type: "'text' | 'html'",
        default: "'text'",
        description:
          "'text' = dán bỏ hết định dạng để tránh rác từ Word/web; 'html' = giữ định dạng, đã sanitize.",
      },
      {
        name: 'minHeight',
        type: 'number',
        default: '160',
        description: 'Chiều cao tối thiểu vùng soạn (px).',
      },
      {
        name: 'placeholder',
        type: 'string',
        default: "'Nhập nội dung...'",
        description: 'Gợi ý khi rỗng.',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Vô hiệu hoá, bao gồm trạng thái từ form.disable().',
      },
      {
        name: 'ariaLabel',
        type: 'string',
        default: "'Trình soạn văn bản'",
        description: 'Nhãn a11y cho role=textbox.',
      },
    ],
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'Vùng soạn là role="textbox" + aria-multiline; toolbar là role="toolbar", nút bật/tắt có aria-pressed đồng bộ theo con trỏ.',
      'Toolbar theo chuẩn ARIA: một điểm dừng Tab duy nhất, dùng mũi tên trái/phải và Home/End để đi giữa các nút. Tab tiếp theo nhảy thẳng vào vùng soạn.',
      'Nút toolbar chặn mousedown nên bấm chuột không cướp con trỏ đang bôi đen.',
      'Tab = thụt lề, Shift+Tab = lùi ra. Trong danh sách thì thành danh sách con; ở đoạn văn/tiêu đề thì thụt cả khối 1.5em mỗi bậc; trong Code block thì gõ 2 dấu cách.',
      'Vì Tab đã bị chiếm, lối ra bàn phím là Esc rồi Tab. Quy ước này được đọc cho screen reader qua aria-describedby để tránh bẫy bàn phím.',
    ],
    notesTitle: 'Ghi chú',
    notes: [
      'Có hai kiểu code: Inline code là chip nhỏ giữa câu; Code block đổi cả khối thành pre, giữ nguyên khoảng trắng và xuống dòng.',
      'Màu chữ ghi thẳng mã màu vào HTML, nên bảng màu chọn các tông đọc được trên cả nền sáng lẫn tối. Ô mặc định trả chữ về color: inherit để đi theo theme.',
      'Checkbox list đánh dấu bằng class trên li và CSS vẽ ô tick. Không dùng input checkbox vì sanitizer của Angular loại bỏ thẻ form khi nạp HTML từ ngoài.',
      'Liên kết dùng popover hai ô: văn bản hiển thị và địa chỉ. Đứng trong một liên kết rồi mở lại là sửa, điền sẵn cả hai ô.',
      'Thụt lề ghi đè mức 40px hardcode của Chrome về 1.5em để HTML lưu ra vẫn render đúng bậc thụt ở nơi khác.',
      'Bảng chèn ra bảng rỗng với hàng đầu là th. Thêm/xoá hàng cột sau khi chèn chưa có; nếu cần thao tác bảng đầy đủ nên dùng engine ProseMirror/TipTap.',
    ],
    securityTitle: 'Bảo mật',
    security: [
      'Giá trị HTML nạp từ ngoài qua [(value)] hoặc form đi qua DomSanitizer trước khi render.',
      'URL nhập vào ô liên kết chỉ nhận http, https, mailto, tel. javascript: bị chặn; thiếu scheme thì tự thêm https://.',
      'pasteMode="html" giữ định dạng khi dán nhưng vẫn sanitize, vì clipboard là nguồn không tin cậy.',
    ],
    execTitle: 'Vì sao vẫn dùng document.execCommand dù nó deprecated?',
    execIntro: [
      'Câu hỏi đúng chỗ, và câu trả lời không phải vì tiện. Deprecated ở đây không đồng nghĩa sắp bị gỡ: execCommand nằm ngoài chuẩn từ lâu nhưng Chrome/Safari/Firefox không thể bỏ vì quá nhiều dịch vụ đang phụ thuộc.',
      'MDN vẫn ghi nhận use case hợp lệ chưa có phương án thay thế, và đó đúng là trường hợp của trình soạn thảo.',
    ],
    execReasons: [
      'Undo/redo native: sửa DOM tay bằng Range API sẽ xoá lịch sử undo của trình duyệt; execCommand là cách duy nhất còn giữ được undo stack đó.',
      'IME: gõ tiếng Việt/Nhật/Trung đi qua composition của trình duyệt. Tự dựng pipeline nhập liệu là nơi editor tự viết hay vỡ nhất.',
      'Không có API thay thế 1-1: cách hiện đại như ProseMirror, Lexical, Slate là tự dựng document model, history, selection và IME, cỡ hàng chục nghìn dòng.',
    ],
    containmentIntro: 'Hướng xử lý ở đây là khoanh vùng thay vì né tránh:',
    containment: [
      'Toàn bộ lời gọi execCommand nằm trong rte-commands.ts, nên đổi engine sau này chỉ sửa một chỗ.',
      'Phần đọc trạng thái đã bỏ queryCommandState/queryCommandValue, chuyển sang dò DOM bằng Selection/Range API tiêu chuẩn.',
      'Mọi lệnh đi qua queryCommandSupported và trả về boolean, nên trình duyệt nào không hỗ trợ thì component biết.',
      'Inline code và bảng vẫn đi qua insertHTML/removeFormat thay vì sửa DOM tay để không mất undo.',
      'HTML đầu ra được ép ngữ nghĩa: styleWithCSS=false và defaultParagraphSeparator=p.',
    ],
    migrationNote:
      'Khi nào nên đổi: cần cộng tác thời gian thực, schema nội dung chặt chẽ, hay các khối tuỳ biến như bảng, nhúng, mention. Lúc đó hãy dùng ProseMirror/TipTap ở package riêng. Vì [(value)] chỉ là chuỗi HTML nên đổi engine không kéo theo đổi API phía bạn.',
    demo: {
      ariaLabel: 'Ví dụ soạn văn bản',
      summary: 'Xem HTML kết quả',
      html: '<h2>Xin chào</h2><p>Đây là trình soạn <b>rich-text</b> viết <i>thuần Angular</i>. Bôi đen chữ rồi bấm nút trên thanh công cụ để định dạng, hoặc dùng <a href="https://developer.mozilla.org/vi/docs/Web/API/Document/execCommand">liên kết</a> và căn lề.</p><ul><li>Danh sách chấm</li><li>Đậm, nghiêng, gạch dưới</li></ul>',
    },
  },
};

const EN_EDITORS: EditorsCopy = {
  codeEditor: {
    ...VI_EDITORS.codeEditor,
    intro:
      'Lightweight code editor, Angular-only, with no external dependency. It uses a textarea overlay: a transparent textarea sits on top of a highlighted pre, so IME input, undo/redo, selection, and the caret stay native. Built-in regex highlighting covers TypeScript, JSON, CSS, and HTML; pass a custom highlighter for richer engines such as lazy-loaded Prism. It includes line numbers, Tab-to-spaces, and works with [(value)] or formControlName.',
    apiRows: [
      {
        name: 'value',
        type: 'string',
        default: "''",
        description: 'Editor content through [(value)] or formControlName.',
      },
      {
        name: 'language',
        type: "'plain' | 'typescript' | 'json' | 'css' | 'html' | ...",
        default: "'plain'",
        description: 'Language used for syntax highlighting.',
      },
      {
        name: 'highlighter',
        type: '(code, lang) => string',
        default: '—',
        description:
          'Custom highlighter that returns escaped HTML; empty uses the built-in regex highlighter.',
      },
      {
        name: 'height',
        type: 'number',
        default: '220',
        description: 'Editor height in pixels; content scrolls when it overflows.',
      },
      {
        name: 'lineNumbers',
        type: 'boolean',
        default: 'true',
        description: 'Shows the line-number gutter.',
      },
      {
        name: 'tabSize',
        type: 'number',
        default: '2',
        description: 'Number of spaces inserted when Tab is pressed.',
      },
      { name: 'readonly', type: 'boolean', default: 'false', description: 'Read-only mode.' },
      {
        name: 'placeholder / ariaLabel',
        type: 'string',
        default: "'' / 'Code editor'",
        description: 'Empty-state hint and Accessible label.',
      },
    ],
    demo: {
      tablistLabel: 'Code language',
      typescriptLabel: 'TypeScript',
      jsonLabel: 'JSON',
      cssLabel: 'CSS',
      plainLabel: 'Plain',
      typescriptAriaLabel: 'TypeScript example',
      jsonAriaLabel: 'JSON example',
      cssAriaLabel: 'CSS example',
      plainAriaLabel: 'Plain text sample',
      typescript: `// TypeScript example
import { signal } from '@angular/core';

export function createCounter(initial = 0) {
  const count = signal(initial);
  const increment = () => count.set(count() + 1);
  return { count, increment };
}

const { count, increment } = createCounter(10);
increment();
console.log(\`Value: \${count()}\`);
`,
      json: VI_EDITORS.codeEditor.demo.json,
      css: VI_EDITORS.codeEditor.demo.css,
      plain: `OpenDesign — design system for Angular
- 78 components, 116 icons
- no third-party dependency
- light/dark themes via the data-g-theme attribute
`,
    },
  },
  richTextEditor: {
    ...VI_EDITORS.richTextEditor,
    intro:
      'Angular-only WYSIWYG rich text editor with no external dependency. The editing surface is contenteditable. The toolbar includes undo/redo, text styles, bold/italic/underline, extra inline formats, text color, list types, alignment, indent/outdent, links, tables, and clear formatting. The editor is IME-safe, avoids rewriting innerHTML while typing, sanitizes pasted HTML, sanitizes external values against XSS, and supports [(value)] as HTML or formControlName.',
    apiRows: [
      {
        name: 'value',
        type: 'string (HTML)',
        default: "''",
        description: 'Sanitized HTML value through [(value)] or formControlName.',
      },
      {
        name: 'pasteMode',
        type: "'text' | 'html'",
        default: "'text'",
        description:
          "'text' strips formatting from pasted content; 'html' keeps formatting after sanitizing.",
      },
      {
        name: 'minHeight',
        type: 'number',
        default: '160',
        description: 'Minimum editor surface height in pixels.',
      },
      {
        name: 'placeholder',
        type: 'string',
        default: "'Enter content...'",
        description: 'Hint shown while empty.',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Disables editing, including when a bound form is disabled.',
      },
      {
        name: 'ariaLabel',
        type: 'string',
        default: "'Rich text editor'",
        description: 'Accessible label for the textbox role.',
      },
    ],
    accessibilityTitle: 'Keyboard and accessibility',
    accessibility: [
      'The editor surface is role="textbox" with aria-multiline; the toolbar is role="toolbar", and toggle buttons keep aria-pressed in sync with the current selection.',
      'The toolbar follows the ARIA toolbar pattern: one Tab stop, then Left/Right Arrow and Home/End move between buttons. The next Tab lands in the editor instead of stepping through every toolbar button.',
      'Toolbar buttons prevent mousedown from stealing the current text selection.',
      'Tab indents and Shift+Tab outdents. In lists it creates nested lists; in paragraphs and headings it indents the block by 1.5em; inside a code block it inserts two spaces.',
      'Because Tab is used for indentation, the keyboard exit is Escape then Tab. That convention is exposed through aria-describedby to avoid a keyboard trap.',
    ],
    notesTitle: 'Notes',
    notes: [
      'There are two code formats: Inline code is a small chip inside a sentence; Code block converts the whole block to pre and preserves whitespace and line breaks.',
      'Text color is written directly into the saved HTML, so the palette uses tones that remain readable in light and dark themes. The default swatch returns text to color: inherit.',
      'Checkbox lists store checked state as a class on li and draw the box with CSS. They do not use input checkbox because Angular sanitization removes form elements from loaded HTML.',
      'Links use a two-field popover: display text and URL. Opening the popover inside an existing link edits that link and pre-fills both fields.',
      'Indentation overrides Chrome’s hardcoded 40px indent to 1.5em so saved HTML renders with the same spacing elsewhere.',
      'Inserted tables start with a header row and a blank paragraph afterward so the caret can leave the table. Full row/column editing is intentionally left to ProseMirror/TipTap-class engines.',
    ],
    securityTitle: 'Security',
    security: [
      'External HTML loaded through [(value)] or forms passes through DomSanitizer before rendering.',
      'Link URLs only accept http, https, mailto, and tel. javascript: is blocked, and missing schemes are normalized to https://.',
      'pasteMode="html" keeps formatting while still sanitizing clipboard content because the clipboard is untrusted input.',
    ],
    execTitle: 'Why keep document.execCommand?',
    execIntro: [
      'The useful question is not convenience. Deprecated here does not mean about to disappear: execCommand has been outside the standard for a long time, but Chrome, Safari, and Firefox cannot remove it because many production editors still depend on it.',
      'MDN still calls out valid use cases without complete replacements, and rich text editing is one of them.',
    ],
    execReasons: [
      'Native undo/redo: directly mutating the DOM with Range APIs breaks the browser undo stack; execCommand is the remaining path that preserves it.',
      'IME: Vietnamese, Japanese, and Chinese input go through browser composition. Rebuilding that input pipeline is where custom editors often break.',
      'No 1-to-1 replacement: modern engines such as ProseMirror, Lexical, and Slate build their own document model, history, selection, and IME handling.',
    ],
    containmentIntro: 'The implementation contains the risk instead of spreading it:',
    containment: [
      'All execCommand calls live in rte-commands.ts, so swapping the engine later is isolated.',
      'State reading no longer uses queryCommandState/queryCommandValue; it uses standard Selection and Range APIs.',
      'Commands go through queryCommandSupported and return booleans, so unsupported browsers are detectable.',
      'Inline code and table insertion still route through insertHTML/removeFormat instead of manual DOM edits to preserve undo.',
      'Output HTML is normalized toward semantic markup with styleWithCSS=false and defaultParagraphSeparator=p.',
    ],
    migrationNote:
      'When to switch: real-time collaboration, strict content schemas, or custom blocks such as advanced tables, embeds, and mentions. Put ProseMirror/TipTap in a separate package when that need appears. Because [(value)] is just an HTML string, changing the engine does not force a consumer API change.',
    demo: {
      ariaLabel: 'Rich text editing example',
      summary: 'View generated HTML',
      html: '<h2>Hello editor</h2><p>This is an <b>Angular-only</b> rich text editor. Select text and use the toolbar to format it, or add a <a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand">link</a> and change alignment.</p><ul><li>Bulleted list</li><li>Bold, italic, and underline</li></ul>',
    },
  },
};

export function editorsCopyFor(tag: string): EditorsCopy {
  return tag.toLowerCase().startsWith('vi') ? VI_EDITORS : EN_EDITORS;
}
