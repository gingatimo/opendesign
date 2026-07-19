import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { GSlider } from './slider';

@Component({
  imports: [GSlider],
  template: `
    <g-slider
      [(value)]="value"
      [min]="min()"
      [max]="max()"
      [step]="step()"
      [disabled]="disabled()"
      ariaLabel="Âm lượng"
    />
  `,
})
class Host {
  value = signal(0);
  min = signal(0);
  max = signal(100);
  step = signal(1);
  disabled = signal(false);
}

function setup() {
  const f = TestBed.createComponent(Host);
  f.detectChanges();
  const input = f.nativeElement.querySelector('.g-slider__input') as HTMLInputElement;
  return { f, input };
}

describe('GSlider', () => {
  it('render input[type=range] với min/max/step + aria-label', () => {
    const { input } = setup();
    expect(input.type).toBe('range');
    expect(input.min).toBe('0');
    expect(input.max).toBe('100');
    expect(input.step).toBe('1');
    expect(input.getAttribute('aria-label')).toBe('Âm lượng');
  });

  it('value binding → input.value + --g-slider-fill %', () => {
    const { f, input } = setup();
    f.componentInstance.value.set(40);
    f.detectChanges();
    expect(input.value).toBe('40');
    expect(input.style.getPropertyValue('--g-slider-fill')).toBe('40%');
  });

  it('input event → cập nhật value hai chiều', () => {
    const { f, input } = setup();
    input.value = '30';
    input.dispatchEvent(new Event('input'));
    f.detectChanges();
    expect(f.componentInstance.value()).toBe(30);
  });

  it('fill tính theo min/max tuỳ chỉnh (0–1, value 0.5 → 50%)', () => {
    const { f, input } = setup();
    f.componentInstance.min.set(0);
    f.componentInstance.max.set(1);
    f.componentInstance.step.set(0.05);
    f.componentInstance.value.set(0.5);
    f.detectChanges();
    expect(input.style.getPropertyValue('--g-slider-fill')).toBe('50%');
  });

  it('disabled → input bị vô hiệu', () => {
    const { f, input } = setup();
    f.componentInstance.disabled.set(true);
    f.detectChanges();
    expect(input.disabled).toBe(true);
  });
});
