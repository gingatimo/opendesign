import { activeBlock, activeLink, activeMarks, safeLinkUrl } from './rte-commands';

// Dựng một vùng soạn giả rồi đặt con trỏ vào node có `id` cho trước.
function setup(html: string, caretId: string): HTMLElement {
  // Dọn lần dựng trước: id trùng nhau khiến querySelector('#id') của jsdom trả về node của lần cũ.
  document.body.innerHTML = '';
  const root = document.createElement('div');
  root.innerHTML = html;
  document.body.appendChild(root);
  const target = root.querySelector(`#${caretId}`)!;
  const range = document.createRange();
  range.selectNodeContents(target);
  range.collapse(true);
  const sel = document.getSelection()!;
  sel.removeAllRanges();
  sel.addRange(range);
  return root;
}

describe('rte-commands', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    document.getSelection()?.removeAllRanges();
  });

  describe('activeMarks', () => {
    it('nhận ra đậm/nghiêng lồng nhau (kể cả tag ngữ nghĩa strong/em)', () => {
      const root = setup('<p><strong><em><span id="c">chữ</span></em></strong></p>', 'c');
      const marks = activeMarks(root);
      expect(marks.has('bold')).toBe(true);
      expect(marks.has('italic')).toBe(true);
      expect(marks.has('underline')).toBe(false);
    });

    it('nhận ra gạch dưới, gạch ngang và liên kết', () => {
      const root = setup('<p><u><s><a href="#"><span id="c">x</span></a></s></u></p>', 'c');
      const marks = activeMarks(root);
      expect(marks.has('underline')).toBe(true);
      expect(marks.has('strikeThrough')).toBe(true);
      expect(marks.has('link')).toBe(true);
    });

    it('không nhận mark khi con trỏ nằm NGOÀI vùng soạn', () => {
      const outside = setup('<p><b><span id="c">x</span></b></p>', 'c');
      const other = document.createElement('div');
      document.body.appendChild(other);
      expect(activeMarks(other).size).toBe(0);
      expect(outside).toBeTruthy();
    });
  });

  describe('activeBlock', () => {
    it('trả tag khối gần nhất', () => {
      expect(activeBlock(setup('<h2><span id="c">Tiêu đề</span></h2>', 'c'))).toBe('h2');
      expect(activeBlock(setup('<blockquote><span id="c">Trích</span></blockquote>', 'c'))).toBe(
        'blockquote',
      );
    });

    it('ưu tiên ul/ol khi con trỏ trong danh sách', () => {
      expect(activeBlock(setup('<ul><li><span id="c">mục</span></li></ul>', 'c'))).toBe('ul');
    });

    it("mặc định 'p' khi không có tag khối, rỗng khi con trỏ ở ngoài", () => {
      expect(activeBlock(setup('<span id="c">trần</span>', 'c'))).toBe('p');
      setup('<p><span id="c">x</span></p>', 'c');
      const other = document.createElement('div');
      document.body.appendChild(other);
      expect(activeBlock(other)).toBe('');
    });
  });

  describe('activeLink', () => {
    it('trả đúng thẻ <a> đang chứa con trỏ', () => {
      const root = setup('<p><a id="a" href="https://a.vn"><span id="c">x</span></a></p>', 'c');
      expect(activeLink(root)?.getAttribute('href')).toBe('https://a.vn');
    });

    it('trả null khi không nằm trong liên kết', () => {
      expect(activeLink(setup('<p><span id="c">x</span></p>', 'c'))).toBeNull();
    });
  });

  describe('safeLinkUrl', () => {
    it('chặn scheme nguy hiểm (javascript:, data:) — nếu lọt sẽ là XSS', () => {
      expect(safeLinkUrl('javascript:alert(1)')).toBeNull();
      expect(safeLinkUrl('JavaScript:alert(1)')).toBeNull();
      expect(safeLinkUrl('data:text/html,<script>x</script>')).toBeNull();
      expect(safeLinkUrl('   ')).toBeNull();
    });

    it('giữ nguyên http/https/mailto/tel', () => {
      expect(safeLinkUrl('https://a.vn/x?y=1')).toBe('https://a.vn/x?y=1');
      expect(safeLinkUrl('http://a.vn')).toBe('http://a.vn');
      expect(safeLinkUrl('mailto:a@b.vn')).toBe('mailto:a@b.vn');
      expect(safeLinkUrl('tel:+84900')).toBe('tel:+84900');
    });

    it('thiếu scheme thì mặc định https://', () => {
      expect(safeLinkUrl('a.vn/tai-lieu')).toBe('https://a.vn/tai-lieu');
    });
  });
});
