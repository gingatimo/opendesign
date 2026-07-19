import { TestBed } from '@angular/core/testing';
import { GTimePicker } from './time-picker';

interface Tp {
  open: () => boolean;
  openPanel(): void;
  close(): void;
  selectHour(h: number): void;
  selectMinute(m: number): void;
  value: () => string | null;
  hour: () => number | null;
  minute: () => number | null;
  minutes: () => number[];
}

function make() {
  const f = TestBed.createComponent(GTimePicker);
  f.detectChanges();
  return { f, cmp: f.componentInstance as unknown as Tp };
}

describe('GTimePicker', () => {
  it('hiển thị placeholder khi chưa chọn', () => {
    const { f } = make();
    const el = f.nativeElement.querySelector('.g-timepicker__value') as HTMLElement;
    expect(el.textContent!.trim()).toBe('HH:mm');
  });

  it('selectHour đặt value HH:00; selectMinute cập nhật phút', () => {
    const { cmp } = make();
    cmp.selectHour(14);
    expect(cmp.value()).toBe('14:00');
    cmp.selectMinute(30);
    expect(cmp.value()).toBe('14:30');
  });

  it('selectMinute khi chưa có giờ → 00:mm', () => {
    const { cmp } = make();
    cmp.selectMinute(45);
    expect(cmp.value()).toBe('00:45');
  });

  it('parse value → hour/minute', () => {
    const { f, cmp } = make();
    f.componentRef.setInput('value', '09:05');
    f.detectChanges();
    expect(cmp.hour()).toBe(9);
    expect(cmp.minute()).toBe(5);
  });

  it('value không hợp lệ → hour/minute null', () => {
    const { f, cmp } = make();
    f.componentRef.setInput('value', '99:99');
    f.detectChanges();
    expect(cmp.hour()).toBeNull();
    expect(cmp.minute()).toBeNull();
  });

  it('minuteStep=15 → cột phút [0,15,30,45]', () => {
    const { f, cmp } = make();
    f.componentRef.setInput('minuteStep', 15);
    f.detectChanges();
    expect(cmp.minutes()).toEqual([0, 15, 30, 45]);
  });

  it('openPanel/close bật tắt open', () => {
    const { cmp } = make();
    cmp.openPanel();
    expect(cmp.open()).toBe(true);
    cmp.close();
    expect(cmp.open()).toBe(false);
  });
});
