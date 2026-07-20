import {
  arcPath,
  chartColor,
  formatChartNumber,
  linePath,
  niceTicks,
  smoothPath,
} from './chart-utils';

describe('chart-utils', () => {
  describe('niceTicks', () => {
    it('sinh vạch tròn trịa phủ [min,max]', () => {
      const t = niceTicks(0, 88, 5);
      expect(t[0]).toBe(0);
      expect(t[t.length - 1]).toBeGreaterThanOrEqual(88);
      // Bước đều nhau.
      const step = t[1] - t[0];
      for (let i = 1; i < t.length; i++) {
        expect(t[i] - t[i - 1]).toBeCloseTo(step, 6);
      }
    });

    it('không sinh số lẻ dạng 0.30000000004', () => {
      const t = niceTicks(0, 1, 5);
      for (const v of t) expect(v).toBe(Number(v.toFixed(6)));
    });

    it('xử lý miền suy biến (min === max)', () => {
      expect(() => niceTicks(5, 5)).not.toThrow();
      expect(niceTicks(5, 5).length).toBeGreaterThan(1);
    });
  });

  describe('formatChartNumber', () => {
    it('rút gọn K/M', () => {
      expect(formatChartNumber(2500)).toBe('2.5K');
      expect(formatChartNumber(1_500_000)).toBe('1.5M');
      expect(formatChartNumber(42)).toBe('42');
    });
  });

  describe('linePath / smoothPath', () => {
    it('linePath dùng M rồi các L', () => {
      const d = linePath([
        { x: 0, y: 0 },
        { x: 10, y: 5 },
        { x: 20, y: 2 },
      ]);
      expect(d.startsWith('M0 0')).toBe(true);
      expect((d.match(/L/g) ?? []).length).toBe(2);
    });

    it('smoothPath dùng cung Bézier (C) giữa các điểm', () => {
      const pts = [
        { x: 0, y: 0 },
        { x: 10, y: 8 },
        { x: 20, y: 3 },
        { x: 30, y: 9 },
      ];
      const d = smoothPath(pts);
      expect(d.startsWith('M0 0')).toBe(true);
      expect((d.match(/C/g) ?? []).length).toBe(3); // n-1 đoạn
    });

    it('smoothPath với < 3 điểm rơi về đường thẳng', () => {
      const d = smoothPath([
        { x: 0, y: 0 },
        { x: 10, y: 5 },
      ]);
      expect(d).toContain('L');
      expect(d).not.toContain('C');
    });
  });

  describe('arcPath', () => {
    it('pie (rInner=0): bắt đầu từ tâm, có lệnh A, đóng Z', () => {
      const d = arcPath(50, 50, 40, 0, 0, Math.PI / 2);
      expect(d.startsWith('M50 50')).toBe(true);
      expect(d).toContain('A');
      expect(d.trim().endsWith('Z')).toBe(true);
    });

    it('donut (rInner>0): có hai cung A (ngoài + trong)', () => {
      const d = arcPath(50, 50, 40, 24, 0, Math.PI);
      expect((d.match(/A/g) ?? []).length).toBe(2);
      expect(d.trim().endsWith('Z')).toBe(true);
    });

    it('cờ largeArc bật khi góc > 180°', () => {
      const small = arcPath(50, 50, 40, 0, 0, Math.PI / 2); // 90°
      const large = arcPath(50, 50, 40, 0, 0, (3 * Math.PI) / 2); // 270°
      expect(small).toContain('0 1'); // largeArc=0, sweep=1
      expect(large).toContain('1 1'); // largeArc=1, sweep=1
    });
  });

  describe('chartColor', () => {
    it('lấy vòng bảng --g-chart-1..8', () => {
      expect(chartColor(0)).toBe('var(--g-chart-1)');
      expect(chartColor(8)).toBe('var(--g-chart-1)');
      expect(chartColor(2, '#abc')).toBe('#abc');
    });
  });
});
