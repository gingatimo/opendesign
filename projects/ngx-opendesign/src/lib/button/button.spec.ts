import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { GButton, GButtonSize, GButtonVariant } from './button';

@Component({
  imports: [GButton],
  template: `
    <button
      g-button
      [variant]="variant()"
      [size]="size()"
      [loading]="loading()"
      (click)="onButtonClick()"
    >
      Lưu
    </button>
    <a g-button href="#" [loading]="loading()" (click)="onAnchorClick()">Liên kết</a>
  `,
})
class HostComponent {
  readonly variant = signal<GButtonVariant>('primary');
  readonly size = signal<GButtonSize>('md');
  readonly loading = signal(false);
  buttonClickCount = 0;
  anchorClickCount = 0;

  onButtonClick(): void {
    this.buttonClickCount++;
  }

  onAnchorClick(): void {
    this.anchorClickCount++;
  }
}

describe('GButton', () => {
  function setup() {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    const button: HTMLButtonElement = fixture.debugElement.query(By.css('button')).nativeElement;
    return { fixture, button };
  }

  it('mặc định là pill primary md', () => {
    const { button } = setup();
    expect(button.classList).toContain('g-button');
    expect(button.classList).toContain('g-button--primary');
    expect(button.classList).toContain('g-button--md');
  });

  it('đổi variant và size qua input', () => {
    const { fixture, button } = setup();
    fixture.componentInstance.variant.set('outline');
    fixture.componentInstance.size.set('sm');
    fixture.detectChanges();
    expect(button.classList).toContain('g-button--outline');
    expect(button.classList).toContain('g-button--sm');
    expect(button.classList).not.toContain('g-button--primary');
  });

  it('loading: hiện spinner, aria-busy, class loading', () => {
    const { fixture, button } = setup();
    fixture.componentInstance.loading.set(true);
    fixture.detectChanges();
    expect(button.getAttribute('aria-busy')).toBe('true');
    expect(button.classList).toContain('g-button--loading');
    expect(button.querySelector('.g-button__spinner')).toBeTruthy();
  });

  it('hoạt động trên thẻ <a>', () => {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    const anchor: HTMLAnchorElement = fixture.debugElement.query(By.css('a')).nativeElement;
    expect(anchor.classList).toContain('g-button');
    expect(anchor.classList).toContain('g-button--primary');
  });

  it('loading: chặn click kích hoạt bằng bàn phím (Enter/Space) trên <button>', () => {
    const { fixture, button } = setup();
    fixture.componentInstance.loading.set(true);
    fixture.detectChanges();
    const event = new MouseEvent('click', { cancelable: true, bubbles: true });
    button.dispatchEvent(event);
    expect(event.defaultPrevented).toBe(true);
  });

  it('không loading: click vẫn hoạt động bình thường trên <button>', () => {
    const { button } = setup();
    const event = new MouseEvent('click', { cancelable: true, bubbles: true });
    button.dispatchEvent(event);
    expect(event.defaultPrevented).toBe(false);
  });

  it('loading: chặn click (điều hướng bàn phím) trên <a>', () => {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    fixture.componentInstance.loading.set(true);
    fixture.detectChanges();
    const anchor: HTMLAnchorElement = fixture.debugElement.query(By.css('a')).nativeElement;
    const event = new MouseEvent('click', { cancelable: true, bubbles: true });
    anchor.dispatchEvent(event);
    expect(event.defaultPrevented).toBe(true);
  });

  it('loading: chặn luôn (click) handler của consumer trên <button>', () => {
    const { fixture, button } = setup();
    fixture.componentInstance.loading.set(true);
    fixture.detectChanges();
    const event = new MouseEvent('click', { cancelable: true, bubbles: true });
    button.dispatchEvent(event);
    expect(event.defaultPrevented).toBe(true);
    expect(fixture.componentInstance.buttonClickCount).toBe(0);
  });

  it('không loading: (click) handler của consumer trên <button> vẫn được gọi', () => {
    const { fixture, button } = setup();
    const event = new MouseEvent('click', { cancelable: true, bubbles: true });
    button.dispatchEvent(event);
    expect(event.defaultPrevented).toBe(false);
    expect(fixture.componentInstance.buttonClickCount).toBe(1);
  });

  it('loading: chặn luôn (click) handler của consumer trên <a>', () => {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    fixture.componentInstance.loading.set(true);
    fixture.detectChanges();
    const anchor: HTMLAnchorElement = fixture.debugElement.query(By.css('a')).nativeElement;
    const event = new MouseEvent('click', { cancelable: true, bubbles: true });
    anchor.dispatchEvent(event);
    expect(event.defaultPrevented).toBe(true);
    expect(fixture.componentInstance.anchorClickCount).toBe(0);
  });
});
