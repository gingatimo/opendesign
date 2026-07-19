import { hexToRgb, hsvToRgb, rgbToHex, rgbToHsv } from './color-utils';

describe('color-utils', () => {
  describe('hsvToRgb', () => {
    it('đỏ (0,1,1) → 255,0,0', () => {
      expect(hsvToRgb(0, 1, 1)).toEqual({ r: 255, g: 0, b: 0 });
    });
    it('lục (120,1,1) → 0,255,0', () => {
      expect(hsvToRgb(120, 1, 1)).toEqual({ r: 0, g: 255, b: 0 });
    });
    it('lam (240,1,1) → 0,0,255', () => {
      expect(hsvToRgb(240, 1, 1)).toEqual({ r: 0, g: 0, b: 255 });
    });
    it('trắng (0,0,1) → 255,255,255; đen (*, *, 0) → 0,0,0', () => {
      expect(hsvToRgb(0, 0, 1)).toEqual({ r: 255, g: 255, b: 255 });
      expect(hsvToRgb(200, 1, 0)).toEqual({ r: 0, g: 0, b: 0 });
    });
  });

  describe('rgbToHsv', () => {
    it('255,0,0 → h0 s1 v1', () => {
      expect(rgbToHsv(255, 0, 0)).toEqual({ h: 0, s: 1, v: 1 });
    });
    it('trắng → s0 v1; đen → v0', () => {
      expect(rgbToHsv(255, 255, 255)).toEqual({ h: 0, s: 0, v: 1 });
      expect(rgbToHsv(0, 0, 0)).toEqual({ h: 0, s: 0, v: 0 });
    });
    it('lam 0,0,255 → h240 s1 v1', () => {
      expect(rgbToHsv(0, 0, 255)).toEqual({ h: 240, s: 1, v: 1 });
    });
  });

  describe('hexToRgb', () => {
    it('#ff0000 → 255,0,0', () => {
      expect(hexToRgb('#ff0000')).toEqual({ r: 255, g: 0, b: 0 });
    });
    it('rút gọn #fff → 255,255,255 (chấp nhận không có #)', () => {
      expect(hexToRgb('#fff')).toEqual({ r: 255, g: 255, b: 255 });
      expect(hexToRgb('00ff00')).toEqual({ r: 0, g: 255, b: 0 });
    });
    it('không hợp lệ → null', () => {
      expect(hexToRgb('#12345')).toBeNull();
      expect(hexToRgb('xyz')).toBeNull();
      expect(hexToRgb('')).toBeNull();
    });
  });

  describe('rgbToHex', () => {
    it('255,0,0 → #ff0000; kẹp + làm tròn', () => {
      expect(rgbToHex(255, 0, 0)).toBe('#ff0000');
      expect(rgbToHex(300, -5, 127.6)).toBe('#ff0080');
    });
  });

  it('roundtrip hex → rgb → hsv → rgb → hex giữ nguyên màu', () => {
    for (const hex of ['#ff0000', '#00ff00', '#0000ff', '#123456', '#abcdef', '#808080']) {
      const rgb = hexToRgb(hex)!;
      const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
      const back = hsvToRgb(hsv.h, hsv.s, hsv.v);
      expect(rgbToHex(back.r, back.g, back.b)).toBe(hex);
    }
  });
});
