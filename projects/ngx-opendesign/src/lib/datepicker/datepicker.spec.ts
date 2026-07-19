import { TestBed } from '@angular/core/testing';
import { GDatepicker } from './datepicker';
import { formatDate } from './date-utils';

interface Dp {
  open: () => boolean;
  openPanel(): void;
  close(): void;
  shiftMonth(n: number): void;
  select(d: Date): void;
  viewMonth: () => Date;
  value: () => Date | null;
}

function make() {
  const f = TestBed.createComponent(GDatepicker);
  f.detectChanges();
  return { f, cmp: f.componentInstance as unknown as Dp };
}

describe('GDatepicker', () => {
  it('openPanel/close bật tắt open + đồng bộ viewMonth theo value', () => {
    const { f, cmp } = make();
    f.componentRef.setInput('value', new Date(2026, 6, 15));
    f.detectChanges();
    cmp.openPanel();
    expect(cmp.open()).toBe(true);
    expect(formatDate(cmp.viewMonth())).toBe('01/07/2026');
    cmp.close();
    expect(cmp.open()).toBe(false);
  });

  it('select đặt value + đóng', () => {
    const { cmp } = make();
    cmp.openPanel();
    cmp.select(new Date(2026, 6, 20));
    expect(formatDate(cmp.value()!)).toBe('20/07/2026');
    expect(cmp.open()).toBe(false);
  });

  it('select ngoài min/max bị bỏ qua', () => {
    const { f, cmp } = make();
    f.componentRef.setInput('min', new Date(2026, 6, 10));
    f.componentRef.setInput('max', new Date(2026, 6, 20));
    f.detectChanges();
    cmp.openPanel();
    cmp.select(new Date(2026, 6, 5)); // trước min
    expect(cmp.value()).toBeNull();
    cmp.select(new Date(2026, 6, 15));
    expect(formatDate(cmp.value()!)).toBe('15/07/2026');
  });

  it('shiftMonth đổi viewMonth', () => {
    const { f, cmp } = make();
    f.componentRef.setInput('value', new Date(2026, 6, 15));
    f.detectChanges();
    cmp.openPanel();
    cmp.shiftMonth(1);
    expect(formatDate(cmp.viewMonth())).toBe('01/08/2026');
  });

  it('hiển thị placeholder khi chưa chọn', () => {
    const { f } = make();
    const el = f.nativeElement.querySelector('.g-datepicker__value') as HTMLElement;
    expect(el.textContent!.trim()).toBe('dd/MM/yyyy');
  });
});
