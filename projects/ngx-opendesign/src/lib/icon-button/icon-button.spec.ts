import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { vi } from 'vitest';
import { GIconButton } from './icon-button';

@Component({
  imports: [GIconButton],
  template: `<button g-icon-button aria-label="Đóng"><svg></svg></button>`,
})
class HostComponent {}

@Component({
  imports: [GIconButton],
  template: `<button g-icon-button><svg></svg></button>`,
})
class HostThieuAriaComponent {}

describe('GIconButton', () => {
  it('mặc định ghost md, có class g-icon-button', () => {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    const button: HTMLButtonElement = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(button.classList).toContain('g-icon-button');
    expect(button.classList).toContain('g-icon-button--ghost');
    expect(button.classList).toContain('g-icon-button--md');
  });

  it('cảnh báo dev khi thiếu aria-label/aria-labelledby', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const fixture = TestBed.createComponent(HostThieuAriaComponent);
    fixture.detectChanges();
    expect(warnSpy).toHaveBeenCalledWith(
      '[OpenDesign] GIconButton: icon button needs aria-label or aria-labelledby',
    );
    warnSpy.mockRestore();
  });

  it('không cảnh báo khi có aria-label', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    expect(warnSpy).not.toHaveBeenCalled();
    warnSpy.mockRestore();
  });
});
