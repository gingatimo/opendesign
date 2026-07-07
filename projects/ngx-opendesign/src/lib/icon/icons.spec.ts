import * as icons from './icons';
import { gIconPanelLeftClose, gIconPanelLeftOpen } from './icons';

describe('icon set', () => {
  const tatCaIcon = Object.entries(icons).filter(([ten]) => ten.startsWith('gIcon'));

  it('có ít nhất 20 icon', () => {
    expect(tatCaIcon.length).toBeGreaterThanOrEqual(20);
  });

  it('mọi icon đều có viewBox và ít nhất một hình để vẽ', () => {
    for (const [ten, icon] of tatCaIcon) {
      expect(icon, `${ten} thiếu viewBox`).toHaveProperty('viewBox');
      // Cấu trúc đã chọn: GIconGlyph = { viewBox, paths?, circles?, rects? } — icon phải có ít
      // nhất một trong ba mảng hình và mảng đó không được rỗng.
      const glyph = icon as {
        paths?: readonly string[];
        circles?: readonly unknown[];
        rects?: readonly unknown[];
      };
      const soHinh =
        (glyph.paths?.length ?? 0) + (glyph.circles?.length ?? 0) + (glyph.rects?.length ?? 0);
      expect(
        soHinh,
        `${ten} không có hình nào để vẽ (paths/circles/rects đều rỗng)`,
      ).toBeGreaterThan(0);
    }
  });

  it('tên icon theo quy ước gIcon<Ten>', () => {
    for (const [ten] of tatCaIcon) {
      expect(ten).toMatch(/^gIcon[A-Z]/);
    }
  });

  it('panelLeftClose/panelLeftOpen: khung + vạch dọc giống nhau, chỉ mũi tên khác hướng (không phải một icon xoay 180°)', () => {
    // Khung ngoài (rect bo góc) phải giống hệt nhau ở cả hai icon.
    expect(gIconPanelLeftClose.rects).toEqual(gIconPanelLeftOpen.rects);
    expect(gIconPanelLeftClose.rects?.[0]?.rx).toBeGreaterThan(0);
    // Vạch dọc cố định bên trái (path đầu tiên) phải giống hệt nhau.
    expect(gIconPanelLeftClose.paths?.[0]).toBe(gIconPanelLeftOpen.paths?.[0]);
    // Mũi tên (path thứ hai) phải khác nhau — đổi hướng, không phải xoay cả icon.
    expect(gIconPanelLeftClose.paths?.[1]).not.toBe(gIconPanelLeftOpen.paths?.[1]);
  });
});
