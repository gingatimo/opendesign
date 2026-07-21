import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { GChip } from './chip';

@Component({
  imports: [GChip],
  template: `
    <g-chip
      [removable]="removable()"
      [disabled]="disabled()"
      (removed)="removedCount = removedCount + 1"
    >
      Thiết kế
    </g-chip>
  `,
})
class HostComponent {
  readonly removable = signal(false);
  readonly disabled = signal(false);
  removedCount = 0;
}

describe('GChip', () => {
  function setup() {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    const chip: HTMLElement = fixture.debugElement.query(By.directive(GChip)).nativeElement;
    return { fixture, chip };
  }

  it('hiển thị nội dung, không có nút xóa khi removable=false', () => {
    const { chip } = setup();
    expect(chip.textContent).toContain('Thiết kế');
    expect(chip.querySelector('button')).toBeNull();
  });

  it('removable: có nút xóa là <button> native với aria-label mặc định', () => {
    const { fixture, chip } = setup();
    fixture.componentInstance.removable.set(true);
    fixture.detectChanges();
    const button = chip.querySelector('button');
    expect(button).not.toBeNull();
    expect(button?.getAttribute('type')).toBe('button');
    expect(button?.getAttribute('aria-label')).toBe('Remove');
    expect(button?.querySelector('svg')?.getAttribute('aria-hidden')).toBe('true');
  });

  it('click nút xóa phát output removed', () => {
    const { fixture, chip } = setup();
    fixture.componentInstance.removable.set(true);
    fixture.detectChanges();
    (chip.querySelector('button') as HTMLButtonElement).click();
    expect(fixture.componentInstance.removedCount).toBe(1);
  });

  it('disabled: nút xóa bị vô hiệu thật, click không phát removed', () => {
    const { fixture, chip } = setup();
    fixture.componentInstance.removable.set(true);
    fixture.componentInstance.disabled.set(true);
    fixture.detectChanges();
    const button = chip.querySelector('button') as HTMLButtonElement;
    expect(button.disabled).toBe(true);
    button.click();
    expect(fixture.componentInstance.removedCount).toBe(0);
  });

  it('removeLabel tùy biến: gắn vào aria-label của nút xóa để phân biệt các chip', () => {
    @Component({
      imports: [GChip],
      template: `<g-chip [removable]="true" [removeLabel]="'Xóa Angular'">Angular</g-chip>`,
    })
    class CustomLabelHostComponent {}

    const fixture = TestBed.createComponent(CustomLabelHostComponent);
    fixture.detectChanges();
    const chip: HTMLElement = fixture.debugElement.query(By.directive(GChip)).nativeElement;
    const button = chip.querySelector('button');
    expect(button?.getAttribute('aria-label')).toBe('Xóa Angular');
  });
});
