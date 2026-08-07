import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { GRangeSlider } from './range-slider';

@Component({
  imports: [GRangeSlider],
  template: `
    <g-range-slider
      [(from)]="from"
      [(to)]="to"
      [min]="min()"
      [max]="max()"
      [step]="step()"
      [disabled]="disabled()"
      ariaLabelFrom="Từ"
      ariaLabelTo="Đến"
    />
  `,
})
class Host {
  from = signal(20);
  to = signal(60);
  min = signal(0);
  max = signal(100);
  step = signal(1);
  disabled = signal(false);
}

function setup() {
  const f = TestBed.createComponent(Host);
  f.detectChanges();
  const inputs = f.nativeElement.querySelectorAll(
    '.g-range-slider__input',
  ) as NodeListOf<HTMLInputElement>;
  return { f, fromInput: inputs[0], toInput: inputs[1] };
}

function drag(input: HTMLInputElement, value: number) {
  input.value = String(value);
  input.dispatchEvent(new Event('input', { bubbles: true }));
}

describe('GRangeSlider', () => {
  it('render 2 input[type=range] với min/max/step + aria-label riêng từng đầu', () => {
    const { fromInput, toInput } = setup();
    expect(fromInput.type).toBe('range');
    expect(toInput.type).toBe('range');
    expect(fromInput.min).toBe('0');
    expect(toInput.max).toBe('100');
    expect(fromInput.getAttribute('aria-label')).toBe('Từ');
    expect(toInput.getAttribute('aria-label')).toBe('Đến');
  });

  it('kéo từng đầu cập nhật model hai chiều', () => {
    const { f, fromInput, toInput } = setup();
    drag(fromInput, 30);
    drag(toInput, 80);
    f.detectChanges();
    expect(f.componentInstance.from()).toBe(30);
    expect(f.componentInstance.to()).toBe(80);
  });

  it('kéo chéo bị kẹp: from không vượt to, to không tụt dưới from', () => {
    const { f, fromInput, toInput } = setup();
    drag(fromInput, 75); // vượt to=60 → kẹp 60
    f.detectChanges();
    expect(f.componentInstance.from()).toBe(60);
    drag(toInput, 10); // tụt dưới from=60 → kẹp 60
    f.detectChanges();
    expect(f.componentInstance.to()).toBe(60);
  });

  it('tô track giữa from→to qua CSS var (%)', () => {
    const { f } = setup();
    const host = f.nativeElement.querySelector('g-range-slider') as HTMLElement;
    expect(host.style.getPropertyValue('--g-range-from')).toBe('20%');
    expect(host.style.getPropertyValue('--g-range-to')).toBe('60%');
  });

  it('disabled áp cho cả 2 input', () => {
    const { f, fromInput, toInput } = setup();
    f.componentInstance.disabled.set(true);
    f.detectChanges();
    expect(fromInput.disabled).toBe(true);
    expect(toInput.disabled).toBe(true);
  });
});
