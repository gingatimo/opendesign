import { TestBed } from '@angular/core/testing';
import type { WritableSignal } from '@angular/core';
import { GCalendarHeatmap } from './calendar-heatmap';

describe('GCalendarHeatmap — nhãn tháng không đè nhau', () => {
  // `Date` dựng theo GIỜ ĐỊA PHƯƠNG (không phải chuỗi ISO parse ra UTC) để cột
  // tuần không lệch một ngày trên máy có múi giờ âm — bài test bám vào ranh giới
  // tháng rơi đúng cột nào nên một ngày lệch là hỏng.
  function monthLabels(from: Date, to: Date): string[] {
    TestBed.configureTestingModule({});
    const fixture = TestBed.createComponent(GCalendarHeatmap);
    fixture.componentRef.setInput('from', from);
    fixture.componentRef.setInput('to', to);
    fixture.detectChanges();
    return [...fixture.nativeElement.querySelectorAll('.g-calendar__month')].map((e) =>
      (e as SVGElement).textContent!.trim(),
    );
  }

  it('range ngắn, tháng đầu là mẩu vụn sát tháng sau: BỎ mẩu vụn, giữ tháng đầy đủ', () => {
    // 30/08 là Chủ nhật: cột 0 chỉ có mẩu cuối tháng 8, cột 1 (06/09) đã sang
    // tháng 9. Hai nhãn cách một cột nên đè — giữ tháng ĐẦY ĐỦ kế ("Sep"), bỏ
    // mẩu "Aug" chứ KHÔNG giữ mẩu đầu rồi bỏ tháng sau.
    expect(monthLabels(new Date(2020, 7, 30), new Date(2020, 8, 12))).toEqual(['Sep']);
  });

  it('range một năm bắt đầu cuối tháng 7: nhãn đầu là "Aug", KHÔNG phải mẩu "Jul"', () => {
    // Đúng ca người dùng gặp: dữ liệu ~1 năm, cột 0 chỉ vài ngày cuối tháng 7
    // (mẩu vụn). Phải bỏ "Jul" đầu — nó đã hiện ở mép phải (tháng hiện tại) —
    // và để "Aug" (tháng đầy đủ đầu tiên) làm nhãn đầu.
    const labels = monthLabels(new Date(2025, 6, 30), new Date(2026, 6, 29));
    expect(labels[0]).toBe('Aug');
    expect(labels.at(-1)).toBe('Jul');
    // Không được vẽ hai "Jul" sát nhau ở đầu (mẩu đầu + tháng sau).
    expect(labels[1]).not.toBe('Jul');
  });

  it('range đủ dài: các mốc tháng cách nhau vài cột thì hiện ĐỦ mọi nhãn', () => {
    // ~3 tháng, mỗi tháng đủ rộng — không được bỏ nhãn nào.
    const labels = monthLabels(new Date(2020, 5, 1), new Date(2020, 7, 31));
    expect(labels).toEqual(['Jun', 'Jul', 'Aug']);
  });
});

describe('GCalendarHeatmap — co lại khi khung hẹp', () => {
  it('lịch một năm trong khung HẸP: viewBox bao trọn lưới để SVG tự thu nhỏ, KHÔNG cắt tuần', () => {
    TestBed.configureTestingModule({});
    const fixture = TestBed.createComponent(GCalendarHeatmap);
    fixture.componentRef.setInput('from', new Date(2025, 0, 1));
    fixture.componentRef.setInput('to', new Date(2025, 11, 31));
    // Ép khung hẹp: 53 cột mà ô đã chạm sàn 6px nên lưới rộng hơn khung đo được.
    (fixture.componentInstance as unknown as { w: WritableSignal<number> }).w.set(300);
    fixture.detectChanges();

    const svg = fixture.nativeElement.querySelector('svg') as SVGSVGElement;
    const viewBoxWidth = Number(svg.getAttribute('viewBox')!.split(' ')[2]);
    const rects = [...svg.querySelectorAll('rect.g-calendar__day')];
    const gridRight = Math.max(
      ...rects.map((r) => Number(r.getAttribute('x')) + Number(r.getAttribute('width'))),
    );

    // viewBox phải BAO TRỌN lưới (không cắt tuần gần nhất) và rộng hơn khung 300
    // (nhờ vậy width="100%" + preserveAspectRatio thu nhỏ cả hình cho vừa).
    expect(viewBoxWidth).toBeGreaterThanOrEqual(gridRight);
    expect(viewBoxWidth).toBeGreaterThan(300);
  });
});
