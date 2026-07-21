import { actionMenuPositions, GActionMenuPlacement } from './action-menu';

// Rút gọn một ConnectedPosition về tên góc để so sánh cho dễ đọc.
function corner(p: { originY: string; originX: string }): string {
  return `${p.originY}-${p.originX === 'start' ? 'left' : 'right'}`;
}

describe('actionMenuPositions', () => {
  it("'auto' ưu tiên góc dưới-trái", () => {
    expect(corner(actionMenuPositions('auto')[0])).toBe('bottom-left');
  });

  it('đặt góc được chọn lên đầu và lật DỌC ngay sau đó', () => {
    const cases: [GActionMenuPlacement, string, string][] = [
      ['bottom-left', 'bottom-left', 'top-left'],
      ['bottom-right', 'bottom-right', 'top-right'],
      ['top-left', 'top-left', 'bottom-left'],
      ['top-right', 'top-right', 'bottom-right'],
    ];
    for (const [placement, first, second] of cases) {
      const list = actionMenuPositions(placement);
      expect(corner(list[0])).toBe(first);
      expect(corner(list[1])).toBe(second);
    }
  });

  it('luôn liệt kê đủ 4 góc, không trùng nhau', () => {
    const list = actionMenuPositions('top-right');
    expect(new Set(list.map(corner)).size).toBe(4);
  });

  it('đẩy panel ra khỏi trigger đúng chiều: xuống +6, lên -6', () => {
    for (const p of actionMenuPositions('bottom-left')) {
      expect(p.offsetY).toBe(p.originY === 'bottom' ? 6 : -6);
      // Mép dọc của panel luôn NGƯỢC mép dọc của trigger (dưới trigger ↔ đỉnh panel).
      expect(p.overlayY).toBe(p.originY === 'bottom' ? 'top' : 'bottom');
      // Mép ngang thì căn TRÙNG nhau (trái-trái hoặc phải-phải).
      expect(p.overlayX).toBe(p.originX);
    }
  });
});
