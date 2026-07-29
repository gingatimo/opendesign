import { TestBed } from '@angular/core/testing';
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

  it('range NGẮN, mốc tháng thứ hai rơi cột kề: BỎ nhãn quá sát thay vì vẽ đè', () => {
    // 30/08 là Chủ nhật: cột 0 là tháng 8, cột 1 (06/09) đã sang tháng 9 — hai
    // nhãn "Aug"/"Sep" chỉ cách nhau một cột nên đè lên nhau nếu vẽ cả hai.
    const labels = monthLabels(new Date(2020, 7, 30), new Date(2020, 8, 12));
    expect(labels.length).toBe(1);
  });

  it('range ĐỦ DÀI: các mốc tháng cách nhau vài cột thì hiện ĐỦ mọi nhãn', () => {
    // ~3 tháng: các mốc tháng cách nhau đủ xa để không đè — không được bỏ nhãn.
    const labels = monthLabels(new Date(2020, 5, 1), new Date(2020, 7, 31));
    expect(labels.length).toBeGreaterThanOrEqual(3);
  });
});
