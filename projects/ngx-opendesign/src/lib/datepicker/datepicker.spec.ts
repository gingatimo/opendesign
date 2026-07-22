import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { GLocaleService } from '../core/locale';
import { formatDateFor } from '../core/locale-format';
import { gLocaleVi } from '../locales/vi';
import { GDatepicker } from './datepicker';

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
    // formatDateFor chỉ dùng làm tiện ích so sánh Date trong test, không liên quan locale hiển thị.
    expect(formatDateFor('vi-VN', cmp.viewMonth())).toBe('01/07/2026');
    cmp.close();
    expect(cmp.open()).toBe(false);
  });

  it('select đặt value + đóng', () => {
    const { cmp } = make();
    cmp.openPanel();
    cmp.select(new Date(2026, 6, 20));
    expect(formatDateFor('vi-VN', cmp.value()!)).toBe('20/07/2026');
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
    expect(formatDateFor('vi-VN', cmp.value()!)).toBe('15/07/2026');
  });

  it('shiftMonth đổi viewMonth', () => {
    const { f, cmp } = make();
    f.componentRef.setInput('value', new Date(2026, 6, 15));
    f.detectChanges();
    cmp.openPanel();
    cmp.shiftMonth(1);
    expect(formatDateFor('vi-VN', cmp.viewMonth())).toBe('01/08/2026');
  });

  it('placeholder mặc định theo thứ tự locale, còn input consumer giữ nguyên', () => {
    const { f } = make();
    const el = f.nativeElement.querySelector('.g-datepicker__value') as HTMLElement;
    expect(el.textContent!.trim()).toBe('MM/dd/yyyy');

    TestBed.inject(GLocaleService).use(gLocaleVi);
    f.detectChanges();
    expect(el.textContent!.trim()).toBe('dd/MM/yyyy');

    f.componentRef.setInput('placeholder', 'Ngày tuỳ chỉnh');
    f.detectChanges();
    TestBed.inject(GLocaleService).use(gLocaleVi);
    f.detectChanges();
    expect(el.textContent!.trim()).toBe('Ngày tuỳ chỉnh');
  });

  // Gói mặc định là tiếng Anh (en-US, firstDayOfWeek=0) nên cột đầu là Chủ nhật; đổi sang vi-VN
  // (firstDayOfWeek=1) thì cột đầu đổi thành Thứ hai — đây là breaking change của lưới lịch.
  // Panel là nội dung CDK overlay (gắn vào document.body, không phải con của fixture.nativeElement)
  // nên phải dò qua fixture.debugElement (theo cây view của Angular), như select.spec.ts đã làm.
  it('đổi gói ngôn ngữ thì đổi cả nhãn thứ lẫn cột đầu tuần', () => {
    TestBed.configureTestingModule({});
    const fixture = TestBed.createComponent(GDatepicker);
    fixture.detectChanges();
    const cmp = fixture.componentInstance as unknown as Dp;
    cmp.openPanel();
    fixture.detectChanges();
    const head = () =>
      fixture.debugElement
        .queryAll(By.css('.g-datepicker__weekday'))
        .map((el) => (el.nativeElement as HTMLElement).textContent?.trim());
    expect(head()[0]).toBe('Sun');

    TestBed.inject(GLocaleService).use(gLocaleVi);
    fixture.detectChanges();
    expect(head()[0]).not.toBe('Sun'); // vi bắt đầu Thứ hai
  });
});

// GDatepicker nay là ControlValueAccessor: dùng được formControlName, đồng thời GIỮ [(value)].
@Component({
  imports: [GDatepicker, ReactiveFormsModule],
  template: `<g-datepicker [formControl]="control" />`,
})
class DpHost {
  readonly control = new FormControl<Date | null>(null);
}

describe('GDatepicker (CVA)', () => {
  function setup() {
    const f = TestBed.createComponent(DpHost);
    f.detectChanges();
    const host: HTMLElement = f.debugElement.query(By.directive(GDatepicker)).nativeElement;
    const cmp = f.debugElement.query(By.directive(GDatepicker)).componentInstance as unknown as Dp;
    return { f, host, cmp };
  }

  it('setValue của FormControl hiển thị lên trigger (writeValue)', () => {
    const { f, host } = setup();
    f.componentInstance.control.setValue(new Date(2026, 6, 20));
    f.detectChanges();
    // Locale mặc định en-US → MM/dd/yyyy (khác dd/MM/yyyy của formatDateFor('vi-VN', …) dùng ở trên).
    expect(host.querySelector('.g-datepicker__value')!.textContent!.trim()).toBe('07/20/2026');
  });

  it('chọn ngày cập nhật FormControl (onChange)', () => {
    const { f, cmp } = setup();
    cmp.openPanel();
    cmp.select(new Date(2026, 6, 20));
    expect(formatDateFor('vi-VN', f.componentInstance.control.value!)).toBe('20/07/2026');
  });

  it('invalid + markAsTouched: có class g-datepicker--invalid', () => {
    const { f, host } = setup();
    f.componentInstance.control.setValidators(() => ({ required: true }));
    f.componentInstance.control.updateValueAndValidity();
    f.componentInstance.control.markAsTouched();
    f.detectChanges();
    expect(host.classList).toContain('g-datepicker--invalid');
  });

  it('control.disable() vô hiệu hóa trigger (setDisabledState)', () => {
    const { f, host } = setup();
    f.componentInstance.control.disable();
    f.detectChanges();
    const btn = host.querySelector('.g-datepicker__trigger') as HTMLButtonElement;
    expect(btn.disabled).toBe(true);
  });
});
