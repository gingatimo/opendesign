import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { GSidebar } from './sidebar';
import { GSidebarToggle } from './sidebar-toggle';

@Component({
  imports: [GSidebar, GSidebarToggle],
  template: `<g-sidebar [(collapsed)]="thuGon"><g-sidebar-toggle /></g-sidebar>`,
})
class HostComponent {
  readonly thuGon = signal(false);
}

@Component({
  imports: [GSidebarToggle],
  template: `<g-sidebar-toggle />`,
})
class NgoaiSidebarHostComponent {}

describe('GSidebarToggle', () => {
  function setup() {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    const nut: HTMLButtonElement = fixture.debugElement.query(By.css('button')).nativeElement;
    return { fixture, nut };
  }

  // LƯU Ý về "cặp role + accessible name": jsdom không có accessibility-tree engine, nên test
  // này chứng minh đúng hai mảnh ghép tạo nên cặp đó — phần tử là <button> native (role=button
  // ngầm định, không cần khai báo) và aria-label nằm TRÊN CHÍNH phần tử đó (nguồn accessible
  // name, ưu tiên hơn nội dung). Nó KHÔNG chứng minh trình đọc màn hình thật đọc ra "Thu gọn
  // thanh bên, button" — việc đó thuộc Step 9 (trình duyệt thật).
  it('ARIA nằm trên <button> native, không phải trên host <g-sidebar-toggle>', () => {
    const { fixture, nut } = setup();
    const host: HTMLElement = fixture.debugElement.query(
      By.directive(GSidebarToggle),
    ).nativeElement;

    expect(nut.tagName).toBe('BUTTON');
    expect(nut.getAttribute('aria-label')).toBe('Collapse sidebar');
    // Host là custom element không role → ARIA trên nó bị bỏ qua (bài học GAvatar, Plan 3).
    expect(host.getAttribute('aria-label')).toBeNull();
    expect(host.getAttribute('aria-expanded')).toBeNull();
  });

  it('mặc định (đang mở): aria-label "Collapse sidebar", aria-expanded true', () => {
    const { nut } = setup();
    expect(nut.getAttribute('aria-label')).toBe('Collapse sidebar');
    expect(nut.getAttribute('aria-expanded')).toBe('true');
  });

  it('click đảo collapsed và cập nhật nhãn + aria-expanded', () => {
    const { fixture, nut } = setup();

    nut.click();
    fixture.detectChanges();

    expect(fixture.componentInstance.thuGon()).toBe(true);
    expect(nut.getAttribute('aria-label')).toBe('Expand sidebar');
    expect(nut.getAttribute('aria-expanded')).toBe('false');
  });

  it('model hai chiều: cha đổi collapsed thì nhãn đổi theo', () => {
    const { fixture, nut } = setup();
    fixture.componentInstance.thuGon.set(true);
    fixture.detectChanges();
    expect(nut.getAttribute('aria-label')).toBe('Expand sidebar');
    expect(nut.getAttribute('aria-expanded')).toBe('false');
  });

  // Vòng 3 (spec 2c mục 1): host tự phản ánh collapsed() qua class, để sidebar-toggle.scss đổi
  // justify-content — ghém phải khi mở rộng, căn giữa khi thu gọn. jsdom không dựng layout nên
  // không kiểm được vị trí thật (xem Step 2 report, bằng chứng ở trình duyệt thật), nhưng kiểm
  // được đúng hợp đồng class mà CSS đó nhắm tới.
  it('host mang class g-sidebar-toggle--collapsed đúng theo trạng thái collapsed', () => {
    const { fixture } = setup();
    const host: HTMLElement = fixture.debugElement.query(
      By.directive(GSidebarToggle),
    ).nativeElement;

    expect(host.classList).not.toContain('g-sidebar-toggle--collapsed');

    fixture.componentInstance.thuGon.set(true);
    fixture.detectChanges();
    expect(host.classList).toContain('g-sidebar-toggle--collapsed');

    fixture.componentInstance.thuGon.set(false);
    fixture.detectChanges();
    expect(host.classList).not.toContain('g-sidebar-toggle--collapsed');
  });

  it('icon là trang trí: không chen vào accessible name của nút', () => {
    const { nut } = setup();
    const icon: HTMLElement = nut.querySelector('g-icon')!;
    expect(icon).not.toBeNull();
    // GIcon tự đặt aria-hidden khi không có aria-label (afterNextRender) — xác nhận lại chứ
    // không giả định. Nút đã có aria-label riêng nên icon phải nằm ngoài accessibility tree.
    expect(icon.getAttribute('aria-hidden')).toBe('true');
    expect(icon.getAttribute('role')).toBeNull();
  });

  // Thiết kế mới (Task 2b vòng 2): nút toggle tái dùng NGUYÊN style .g-sidebar-item (cùng cỡ
  // 40px, cùng nền pill hover, cùng focus ring với item bên dưới) thay vì GIconButton — không
  // còn nổi ở mép, không viền/nền riêng. jsdom không kiểm được style thật (xem Step 5 report),
  // nhưng kiểm được đúng hợp đồng class mà CSS đó nhắm tới.
  it('nút mang class g-sidebar-item (tái dùng style item), KHÔNG còn dùng GIconButton', () => {
    const { nut } = setup();
    expect(nut.classList).toContain('g-sidebar-item');
    expect(nut.classList).not.toContain('g-icon-button');
  });

  it('icon trong nút mang class g-sidebar-item__icon và size="md" (=20px, cùng cỡ icon item)', () => {
    const { nut } = setup();
    const icon: HTMLElement = nut.querySelector('g-icon')!;
    expect(icon.classList).toContain('g-sidebar-item__icon');
    expect(icon.classList).toContain('g-icon--md');
  });

  it('đặt ngoài <g-sidebar> thì cảnh báo dev', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const fixture = TestBed.createComponent(NgoaiSidebarHostComponent);
    fixture.detectChanges();
    expect(warnSpy).toHaveBeenCalledWith(
      '[OpenDesign] GSidebarToggle: <g-sidebar-toggle /> phải đặt bên trong <g-sidebar>',
    );
    warnSpy.mockRestore();
  });

  it('đặt ngoài <g-sidebar>: click không throw', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const fixture = TestBed.createComponent(NgoaiSidebarHostComponent);
    fixture.detectChanges();
    const nut: HTMLButtonElement = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(() => nut.click()).not.toThrow();
    warnSpy.mockRestore();
  });
});
