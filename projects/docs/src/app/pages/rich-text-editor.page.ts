import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiRow, ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { RichTextEditorDemo } from '../demos/editor/rich-text-editor.demo';

@Component({
  imports: [RichTextEditorDemo, ApiTable, CodeBlock, DemoSection],
  template: `
    <h1>Rich Text Editor</h1>
    <p>
      Trình soạn <b>văn bản định dạng</b> (WYSIWYG), <b>Angular-only</b>, 0 thư viện ngoài. Bề mặt
      là <code>contenteditable</code>. Toolbar: hoàn tác/làm lại · <b>Text styles</b> (Normal text,
      Heading 1–6, Quote) · đậm/nghiêng/gạch dưới/gạch ngang ·
      <b>Code / Subscript / Superscript</b> gộp trong một dropdown · <b>màu chữ</b> · danh sách
      chấm/số · căn trái/giữa/phải · chèn & bỏ <b>liên kết</b> · chèn <b>bảng</b> · xoá định dạng.
      <b>IME-safe</b> (không ghi đè innerHTML lúc gõ), dán plain-text hoặc HTML đã <b>sanitize</b>,
      giá trị ngoài cũng được sanitize chống XSS. Hai chiều <code>[(value)]</code> (HTML) hoặc
      <code>formControlName</code>.
    </p>

    <h2>Vì sao vẫn dùng <code>document.execCommand</code> dù nó deprecated?</h2>
    <p>
      Câu hỏi đúng chỗ — và câu trả lời không phải "vì tiện".
      <b>Deprecated ở đây không đồng nghĩa sắp bị gỡ:</b> execCommand nằm ngoài chuẩn từ lâu nhưng
      Chrome/Safari/Firefox không thể bỏ vì quá nhiều dịch vụ đang phụ thuộc. Chính MDN ghi rõ vẫn
      còn use case hợp lệ <b>chưa có phương án thay thế</b> — và đó đúng là trường hợp của trình
      soạn thảo:
    </p>
    <ul>
      <li>
        <b>Undo/redo native.</b> Sửa DOM tay bằng Range API sẽ <b>xoá sạch</b> lịch sử undo của
        trình duyệt: Ctrl+Z sau đó nhảy lung tung hoặc mất chữ. execCommand là cách duy nhất còn giữ
        được undo stack đó.
      </li>
      <li>
        <b>IME.</b> Gõ tiếng Việt/Nhật/Trung đi qua composition của trình duyệt. Tự dựng pipeline
        nhập liệu là nơi editor tự viết hay vỡ nhất.
      </li>
      <li>
        <b>Không có API thay thế 1–1.</b> Cách "hiện đại" (ProseMirror, Lexical, Slate) không phải
        là gọi API khác — mà là <b>tự dựng document model + history + selection + IME</b>, cỡ hàng
        chục nghìn dòng. Đó là một sản phẩm riêng, không phải một component của design system.
      </li>
    </ul>
    <p>Nên hướng xử lý ở đây là <b>khoanh vùng</b> thay vì né tránh:</p>
    <ul>
      <li>
        Toàn bộ lời gọi execCommand nằm trong
        <b>một file duy nhất</b> (<code>rte-commands.ts</code>) — đổi engine sau này chỉ sửa một
        chỗ, không lan ra component.
      </li>
      <li>
        Phần <b>đọc trạng thái</b> (đang đậm? đang ở tiêu đề mấy? căn lề nào? có đang trong liên kết
        không?) đã bỏ hẳn <code>queryCommandState</code>/<code>queryCommandValue</code>, chuyển sang
        dò DOM bằng <b>Selection/Range API tiêu chuẩn</b> — vừa hết deprecated ở nhánh này, vừa hết
        cảnh mỗi trình duyệt trả một kiểu.
      </li>
      <li>
        Mọi lệnh đi qua <code>queryCommandSupported</code> và trả về boolean, nên trình duyệt nào
        không hỗ trợ thì component biết chứ không "im lặng sai".
      </li>
      <li>
        Hai thứ execCommand <b>không có lệnh</b> — inline <code>code</code> và <b>bảng</b> — vẫn đi
        qua lệnh có sẵn (<code>insertHTML</code>, <code>removeFormat</code>) thay vì sửa DOM tay, để
        <b>không mất undo</b>. Riêng màu chữ bật <code>styleWithCSS</code> tạm thời cho ra
        <code>&lt;span style="color"&gt;</code> thay vì thẻ <code>&lt;font&gt;</code> đã bỏ chuẩn.
      </li>
      <li>
        HTML đầu ra được ép <b>ngữ nghĩa</b> (<code>styleWithCSS=false</code> →
        <code>&lt;b&gt;/&lt;i&gt;</code> thay vì <code>&lt;span style&gt;</code>;
        <code>defaultParagraphSeparator=p</code> → <code>&lt;p&gt;</code> thay vì
        <code>&lt;div&gt;</code>).
      </li>
    </ul>
    <p class="rte-note">
      <b>Khi nào nên đổi:</b> cần <b>cộng tác thời gian thực</b> (nhiều người sửa cùng lúc), schema
      nội dung chặt chẽ, hay các khối tuỳ biến (bảng, nhúng, mention) — lúc đó hãy dùng
      ProseMirror/TipTap ở package riêng. Vì <code>[(value)]</code> chỉ là chuỗi HTML nên đổi engine
      không kéo theo đổi API phía bạn.
    </p>

    <docs-demo-section>
      <docs-rich-text-editor-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/editor/rich-text-editor.demo.ts" />

    <h2>API — GRichTextEditor</h2>
    <docs-api-table [rows]="apiRows" />

    <h2>Accessibility</h2>
    <ul>
      <li>
        Vùng soạn là <code>role="textbox"</code> + <code>aria-multiline</code>; toolbar là
        <code>role="toolbar"</code>, nút bật/tắt có <code>aria-pressed</code> đồng bộ theo con trỏ.
      </li>
      <li>
        Toolbar theo chuẩn ARIA: <b>một điểm dừng Tab duy nhất</b>, dùng <b>←/→</b> (và Home/End) để
        đi giữa các nút — Tab tiếp theo nhảy thẳng vào vùng soạn, không phải bấm qua 15 nút.
      </li>
      <li>
        Nút toolbar chặn <code>mousedown</code> nên bấm chuột <b>không cướp con trỏ</b> đang bôi
        đen.
      </li>
    </ul>

    <h2>Ghi chú</h2>
    <ul>
      <li>
        <b>Màu chữ</b> ghi thẳng mã màu vào HTML, nên bảng màu chọn các tông đọc được trên
        <b>cả nền sáng lẫn tối</b>. Ô đầu tiên (gạch chéo) là <b>Mặc định</b> — trả chữ về
        <code>color: inherit</code> để đi theo theme.
      </li>
      <li>
        <b>Bảng</b>: nút chèn tạo bảng rỗng (hàng đầu là <code>&lt;th&gt;</code>) kèm một đoạn trống
        phía sau để con trỏ thoát ra được. Gõ trong ô là contenteditable thường; thêm/xoá hàng cột
        sau khi chèn thì chưa có — cần thao tác bảng đầy đủ nên dùng engine ProseMirror/TipTap.
      </li>
    </ul>

    <h2>Bảo mật</h2>
    <ul>
      <li>
        Giá trị HTML nạp từ ngoài (<code>[(value)]</code>, form) đi qua
        <code>DomSanitizer</code> trước khi render.
      </li>
      <li>
        URL nhập vào ô liên kết chỉ nhận <code>http</code>, <code>https</code>, <code>mailto</code>,
        <code>tel</code> — chặn <code>javascript:</code> (nếu lọt sẽ thành XSS ngay trong app của
        bạn); thiếu scheme thì tự thêm <code>https://</code>.
      </li>
      <li>
        <code>pasteMode="html"</code> giữ định dạng khi dán nhưng vẫn sanitize, vì clipboard là
        nguồn không tin cậy.
      </li>
    </ul>
  `,
  styles: `
    .rte-note {
      padding: var(--g-space-3) var(--g-space-4);
      border-left: 3px solid var(--g-warning-solid);
      background: var(--g-warning-bg);
      border-radius: var(--g-radius-sm);
      font-size: var(--g-font-size-sm);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RichTextEditorPage {
  protected readonly apiRows: ApiRow[] = [
    {
      name: 'value',
      type: 'string (HTML)',
      default: "''",
      description:
        'Nội dung HTML — `[(value)]` hoặc `formControlName`. Giá trị ngoài được sanitize.',
    },
    {
      name: 'pasteMode',
      type: "'text' | 'html'",
      default: "'text'",
      description:
        "'text' = dán bỏ hết định dạng (tránh rác từ Word/web); 'html' = giữ định dạng, đã sanitize.",
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
      default: "'Nhập nội dung…'",
      description: 'Gợi ý khi rỗng.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Vô hiệu hoá (cũng theo form.disable()).',
    },
    {
      name: 'ariaLabel',
      type: 'string',
      default: "'Trình soạn văn bản'",
      description: 'Nhãn a11y (role=textbox).',
    },
  ];
}
