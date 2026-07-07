import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { GTopbar, GTopbarCenter, GTopbarEnd, GTopbarStart } from './topbar';

@Component({
  imports: [GTopbar, GTopbarStart, GTopbarCenter, GTopbarEnd],
  template: `
    <g-topbar>
      <span gTopbarStart>Thương hiệu</span>
      <span gTopbarCenter>Tìm kiếm</span>
      <span gTopbarEnd>Hồ sơ</span>
    </g-topbar>
  `,
})
class HostComponent {}

@Component({
  imports: [GTopbar, GTopbarStart, GTopbarEnd],
  template: `
    <g-topbar>
      <span gTopbarStart>Thương hiệu</span>
      <span gTopbarEnd>Hồ sơ</span>
    </g-topbar>
  `,
})
class HostWithoutCenterComponent {}

describe('GTopbar', () => {
  function setup() {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    const topbar: HTMLElement = fixture.debugElement.query(By.directive(GTopbar)).nativeElement;
    return { fixture, topbar };
  }

  it('chiếu đủ 3 slot đúng thứ tự start → center → end', () => {
    const { topbar } = setup();
    const text = topbar.textContent ?? '';
    expect(text).toContain('Thương hiệu');
    expect(text).toContain('Tìm kiếm');
    expect(text).toContain('Hồ sơ');
    expect(text.indexOf('Thương hiệu')).toBeLessThan(text.indexOf('Tìm kiếm'));
    expect(text.indexOf('Tìm kiếm')).toBeLessThan(text.indexOf('Hồ sơ'));
  });

  it('KHÔNG tự đặt role banner (thư viện không biết ngữ cảnh — consumer tự thêm)', () => {
    const { topbar } = setup();
    expect(topbar.getAttribute('role')).toBeNull();
  });

  it('layout không có slot center: start và end vẫn chiếu đúng, không còn phần tử center trong DOM', () => {
    const fixture = TestBed.createComponent(HostWithoutCenterComponent);
    fixture.detectChanges();
    const topbar: HTMLElement = fixture.debugElement.query(By.directive(GTopbar)).nativeElement;
    const text = topbar.textContent ?? '';
    expect(text).toContain('Thương hiệu');
    expect(text).toContain('Hồ sơ');
    expect(topbar.querySelector('.g-topbar__center')).toBeNull();
    // .g-topbar__end dùng margin-left: auto để tự đẩy sang phải — không phụ thuộc
    // .g-topbar__center có mặt hay không, vì flex: 1 của center (khi có) đã tiêu thụ hết
    // free space trước khi auto-margin được phân bổ (flexbox resolve flex-grow ở bước
    // tính main size, TRƯỚC bước phân bổ auto margin) — nên khi center vắng mặt,
    // margin-left: auto trên end vẫn nhận toàn bộ free space còn lại như bình thường.
    // Đây là lý luận CSS/flexbox, không thể verify bằng jsdom (không có layout engine
    // thật) — chỉ có thể kiểm chứng cấu trúc DOM ở đây.
    const end = topbar.querySelector('.g-topbar__end');
    expect(end).not.toBeNull();
  });
});
