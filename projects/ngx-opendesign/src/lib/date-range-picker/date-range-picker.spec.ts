import { TestBed } from '@angular/core/testing';
import { formatDateFor } from '../core/locale-format';
import { GDateRange, GDateRangePicker } from './date-range-picker';

interface Rp {
  open: () => boolean;
  openPanel(): void;
  select(d: Date): void;
  value: () => GDateRange;
  isStart(d: Date): boolean;
  isEnd(d: Date): boolean;
  inRangeMid(d: Date): boolean;
}

function make() {
  const f = TestBed.createComponent(GDateRangePicker);
  f.detectChanges();
  return { f, cmp: f.componentInstance as unknown as Rp };
}

describe('GDateRangePicker', () => {
  it('placeholder khi chưa chọn', () => {
    const { f } = make();
    const el = f.nativeElement.querySelector('.g-date-range-picker__value') as HTMLElement;
    expect(el.textContent!.trim()).toBe('dd/MM/yyyy – dd/MM/yyyy');
  });

  it('click 1 = start (end null); click 2 sau start = end + đóng', () => {
    const { cmp } = make();
    cmp.openPanel();
    cmp.select(new Date(2026, 6, 10));
    // formatDateFor chỉ dùng làm tiện ích so sánh Date trong test, không liên quan locale hiển thị.
    expect(formatDateFor('vi-VN', cmp.value().start!)).toBe('10/07/2026');
    expect(cmp.value().end).toBeNull();
    expect(cmp.open()).toBe(true);

    cmp.select(new Date(2026, 6, 20));
    expect(formatDateFor('vi-VN', cmp.value().end!)).toBe('20/07/2026');
    expect(cmp.open()).toBe(false);
  });

  it('click 2 trước start → dời start, end null', () => {
    const { cmp } = make();
    cmp.openPanel();
    cmp.select(new Date(2026, 6, 15));
    cmp.select(new Date(2026, 6, 5)); // trước start
    expect(formatDateFor('vi-VN', cmp.value().start!)).toBe('05/07/2026');
    expect(cmp.value().end).toBeNull();
  });

  it('chọn khi dải đã đủ → bắt đầu dải mới', () => {
    const { cmp } = make();
    cmp.openPanel();
    cmp.select(new Date(2026, 6, 10));
    cmp.select(new Date(2026, 6, 20)); // đủ dải
    cmp.openPanel();
    cmp.select(new Date(2026, 7, 1)); // dải mới
    expect(formatDateFor('vi-VN', cmp.value().start!)).toBe('01/08/2026');
    expect(cmp.value().end).toBeNull();
  });

  it('ngày ngoài min/max bị bỏ qua', () => {
    const { f, cmp } = make();
    f.componentRef.setInput('min', new Date(2026, 6, 10));
    f.componentRef.setInput('max', new Date(2026, 6, 20));
    f.detectChanges();
    cmp.openPanel();
    cmp.select(new Date(2026, 6, 5));
    expect(cmp.value().start).toBeNull();
  });

  it('inRangeMid đúng cho ngày giữa dải (không tính hai biên)', () => {
    const { cmp } = make();
    cmp.openPanel();
    cmp.select(new Date(2026, 6, 10));
    cmp.select(new Date(2026, 6, 20));
    expect(cmp.inRangeMid(new Date(2026, 6, 15))).toBe(true);
    expect(cmp.inRangeMid(new Date(2026, 6, 10))).toBe(false); // start là biên
    expect(cmp.inRangeMid(new Date(2026, 6, 25))).toBe(false);
    expect(cmp.isStart(new Date(2026, 6, 10))).toBe(true);
    expect(cmp.isEnd(new Date(2026, 6, 20))).toBe(true);
  });
});
