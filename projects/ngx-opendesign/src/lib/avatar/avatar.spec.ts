import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { GAvatar } from './avatar';

@Component({
  imports: [GAvatar],
  template: `<g-avatar [src]="src()" name="Nguyễn Văn An" [size]="'md'" />`,
})
class HostComponent {
  readonly src = signal<string | undefined>('/anh.jpg');
}

@Component({
  imports: [GAvatar],
  template: `<g-avatar name="Trần Thị Bình" />`,
})
class NoImageHostComponent {}

describe('GAvatar', () => {
  it('có ảnh: render <img> với alt rỗng, host mang aria-label là tên', () => {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    const host: HTMLElement = fixture.debugElement.query(By.directive(GAvatar)).nativeElement;
    const img = host.querySelector('img');
    expect(img).not.toBeNull();
    expect(img?.getAttribute('alt')).toBe('');
    expect(host.getAttribute('aria-label')).toBe('Nguyễn Văn An');
  });

  it('không có src: hiện chữ cái đầu, vẫn có aria-label là tên', () => {
    const fixture = TestBed.createComponent(NoImageHostComponent);
    fixture.detectChanges();
    const host: HTMLElement = fixture.debugElement.query(By.directive(GAvatar)).nativeElement;
    expect(host.querySelector('img')).toBeNull();
    expect(host.textContent?.trim()).toBe('TB');
    expect(host.getAttribute('aria-label')).toBe('Trần Thị Bình');
  });

  it('ảnh lỗi: fallback về chữ cái đầu', () => {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    const host: HTMLElement = fixture.debugElement.query(By.directive(GAvatar)).nativeElement;
    const img = host.querySelector('img') as HTMLImageElement;
    img.dispatchEvent(new Event('error'));
    fixture.detectChanges();
    expect(host.querySelector('img')).toBeNull();
    expect(host.textContent?.trim()).toBe('NA');
    expect(host.getAttribute('aria-label')).toBe('Nguyễn Văn An');
  });

  it('src đổi sau khi ảnh lỗi: hiển thị lại ảnh mới thay vì kẹt ở chữ cái đầu', () => {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    const host: HTMLElement = fixture.debugElement.query(By.directive(GAvatar)).nativeElement;
    const failedImg = host.querySelector('img') as HTMLImageElement;
    failedImg.dispatchEvent(new Event('error'));
    fixture.detectChanges();
    expect(host.querySelector('img')).toBeNull();

    fixture.componentInstance.src.set('/anh-moi.jpg');
    fixture.detectChanges();
    const newImg = host.querySelector('img');
    expect(newImg).not.toBeNull();
    expect(newImg?.getAttribute('src')).toBe('/anh-moi.jpg');
  });

  it('host mang role="img" để aria-label được trình đọc màn hình công nhận', () => {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    const host: HTMLElement = fixture.debugElement.query(By.directive(GAvatar)).nativeElement;
    expect(host.getAttribute('role')).toBe('img');
    expect(host.getAttribute('aria-label')).toBe('Nguyễn Văn An');
  });

  it('tên một chữ: chỉ lấy một chữ cái đầu', () => {
    @Component({
      imports: [GAvatar],
      template: `<g-avatar name="Ánh" />`,
    })
    class SingleWordHostComponent {}

    const fixture = TestBed.createComponent(SingleWordHostComponent);
    fixture.detectChanges();
    const host: HTMLElement = fixture.debugElement.query(By.directive(GAvatar)).nativeElement;
    expect(host.textContent?.trim()).toBe('Á');
  });
});
