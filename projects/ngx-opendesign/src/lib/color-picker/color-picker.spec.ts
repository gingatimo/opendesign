import { TestBed } from '@angular/core/testing';
import { GColorPicker } from './color-picker';

interface Cp {
  value: () => string;
  open: () => boolean;
  toggle(): void;
  pick(c: string): void;
  onHexInput(e: Event): void;
  onHue(h: number): void;
}

function make() {
  const f = TestBed.createComponent(GColorPicker);
  f.detectChanges();
  return { f, cmp: f.componentInstance as unknown as Cp };
}

function hexEvent(v: string): { event: Event; input: HTMLInputElement } {
  const input = document.createElement('input');
  input.value = v;
  return { event: { target: input } as unknown as Event, input };
}

describe('GColorPicker', () => {
  it('mặc định #000000; trigger có ô màu', () => {
    const { f, cmp } = make();
    expect(cmp.value()).toBe('#000000');
    expect(f.nativeElement.querySelector('.g-color-picker__swatch')).not.toBeNull();
  });

  it('pick swatch đặt value', () => {
    const { cmp } = make();
    cmp.pick('#ef4444');
    expect(cmp.value()).toBe('#ef4444');
  });

  it('onHexInput hợp lệ → chuẩn hoá #rrggbb; sai → hoàn nguyên', () => {
    const { cmp } = make();
    cmp.onHexInput(hexEvent('#00ff00').event);
    expect(cmp.value()).toBe('#00ff00');

    const bad = hexEvent('không-phải-màu');
    cmp.onHexInput(bad.event);
    expect(cmp.value()).toBe('#00ff00'); // giữ nguyên
    expect(bad.input.value).toBe('#00ff00'); // ô nhập bị hoàn nguyên
  });

  it('rút gọn #f00 → #ff0000', () => {
    const { cmp } = make();
    cmp.onHexInput(hexEvent('#f00').event);
    expect(cmp.value()).toBe('#ff0000');
  });

  it('đồng bộ ngoài→trong: đặt value đỏ rồi đổi hue 120 → xanh lá', () => {
    const { f, cmp } = make();
    f.componentRef.setInput('value', '#ff0000');
    f.detectChanges(); // effect parse đỏ → HSV (h0 s1 v1)
    cmp.onHue(120);
    expect(cmp.value()).toBe('#00ff00');
  });

  it('toggle bật/tắt open', () => {
    const { cmp } = make();
    cmp.toggle();
    expect(cmp.open()).toBe(true);
    cmp.toggle();
    expect(cmp.open()).toBe(false);
  });
});
