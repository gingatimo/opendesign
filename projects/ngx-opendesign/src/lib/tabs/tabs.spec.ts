import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { vi } from 'vitest';
import { GTab } from './tab';
import { GTabs } from './tabs';

@Component({
  imports: [GTabs, GTab],
  template: `
    <g-tabs [(selectedIndex)]="index" tablistLabel="Cài đặt tài khoản">
      <g-tab label="Tổng quan">Nội dung tổng quan</g-tab>
      <g-tab label="Cài đặt">Nội dung cài đặt</g-tab>
      <g-tab label="Nâng cao" [disabled]="true">Nội dung nâng cao</g-tab>
      <g-tab label="Lịch sử">Nội dung lịch sử</g-tab>
    </g-tabs>
  `,
})
class HostComponent {
  readonly index = signal(0);
}

@Component({
  imports: [GTabs, GTab],
  template: `
    <g-tabs>
      <g-tab label="Một">Nội dung một</g-tab>
    </g-tabs>
  `,
})
class HostKhongLabelComponent {}

@Component({
  imports: [GTabs, GTab],
  template: `
    <h2 id="tieu-de-tab-test">Tiêu đề</h2>
    <g-tabs tablistLabelledBy="tieu-de-tab-test">
      <g-tab label="Một">Nội dung một</g-tab>
    </g-tabs>
  `,
})
class HostLabelledByComponent {}

@Component({
  imports: [GTabs, GTab],
  template: `
    <g-tabs [(selectedIndex)]="index" tablistLabel="Tabs biên">
      <g-tab label="Đầu" [disabled]="true">Nội dung đầu</g-tab>
      <g-tab label="Giữa 1">Nội dung giữa 1</g-tab>
      <g-tab label="Giữa 2">Nội dung giữa 2</g-tab>
      <g-tab label="Cuối" [disabled]="true">Nội dung cuối</g-tab>
    </g-tabs>
  `,
})
class HostBienComponent {
  readonly index = signal(1);
}

describe('GTabs + GTab', () => {
  function setup() {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    const host: HTMLElement = fixture.debugElement.query(By.directive(GTabs)).nativeElement;
    const tablist = host.querySelector('[role="tablist"]') as HTMLElement;
    const tabs = Array.from(host.querySelectorAll('[role="tab"]')) as HTMLElement[];
    return { fixture, host, tablist, tabs };
  }

  it('có role tablist và đúng số tab', () => {
    const { tablist, tabs } = setup();
    expect(tablist).not.toBeNull();
    expect(tabs.length).toBe(4);
    expect(tabs[0].textContent).toContain('Tổng quan');
  });

  it('tab đầu được chọn: aria-selected và roving tabindex đúng', () => {
    const { tabs } = setup();
    expect(tabs[0].getAttribute('aria-selected')).toBe('true');
    expect(tabs[0].getAttribute('tabindex')).toBe('0');
    expect(tabs[1].getAttribute('aria-selected')).toBe('false');
    expect(tabs[1].getAttribute('tabindex')).toBe('-1');
  });

  it('chỉ render nội dung tab đang chọn', () => {
    const { fixture, host } = setup();
    expect(host.textContent).toContain('Nội dung tổng quan');
    expect(host.textContent).not.toContain('Nội dung cài đặt');
    fixture.componentInstance.index.set(1);
    fixture.detectChanges();
    expect(host.textContent).toContain('Nội dung cài đặt');
    expect(host.textContent).not.toContain('Nội dung tổng quan');
  });

  it('panel có role tabpanel, aria-labelledby trỏ đúng tab đang chọn, tabindex 0', () => {
    const { host, tabs } = setup();
    const panel = host.querySelector('[role="tabpanel"]') as HTMLElement;
    expect(panel).not.toBeNull();
    expect(panel.getAttribute('tabindex')).toBe('0');
    expect(tabs[0].id).toBeTruthy();
    expect(panel.getAttribute('aria-labelledby')).toBe(tabs[0].id);
  });

  it('tab có aria-controls trỏ đúng id của panel', () => {
    const { host, tabs } = setup();
    const panel = host.querySelector('[role="tabpanel"]') as HTMLElement;
    expect(panel.id).toBeTruthy();
    expect(tabs[0].getAttribute('aria-controls')).toBe(panel.id);
  });

  it('mỗi tab điều khiển một panel riêng (aria-controls không trùng nhau)', () => {
    const { tabs, fixture } = setup();
    const controlsTab0 = tabs[0].getAttribute('aria-controls');
    fixture.componentInstance.index.set(1);
    fixture.detectChanges();
    const controlsTab1 = tabs[1].getAttribute('aria-controls');
    expect(controlsTab1).not.toBe(controlsTab0);
    // panel tương ứng với tab 1 phải tồn tại trong DOM với đúng id đó.
    expect(document.getElementById(controlsTab1 as string)).not.toBeNull();
  });

  it('click tab: cập nhật selectedIndex hai chiều', () => {
    const { fixture, tabs } = setup();
    tabs[1].click();
    fixture.detectChanges();
    expect(fixture.componentInstance.index()).toBe(1);
    expect(tabs[1].getAttribute('aria-selected')).toBe('true');
  });

  it('click tab disabled: không đổi selection', () => {
    const { fixture, tabs } = setup();
    tabs[2].click();
    fixture.detectChanges();
    expect(fixture.componentInstance.index()).toBe(0);
  });

  it('mũi tên phải: sang tab kế, BỎ QUA tab disabled', () => {
    const { fixture, tabs } = setup();
    tabs[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', cancelable: true }));
    fixture.detectChanges();
    expect(fixture.componentInstance.index()).toBe(1);
    // từ index 1, mũi tên phải phải nhảy qua tab 2 (disabled) tới tab 3
    tabs[1].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', cancelable: true }));
    fixture.detectChanges();
    expect(fixture.componentInstance.index()).toBe(3);
  });

  it('mũi tên phải ở tab cuối: vòng về tab đầu', () => {
    const { fixture, tabs } = setup();
    fixture.componentInstance.index.set(3);
    fixture.detectChanges();
    tabs[3].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', cancelable: true }));
    fixture.detectChanges();
    expect(fixture.componentInstance.index()).toBe(0);
  });

  it('mũi tên trái ở tab đầu: vòng về tab cuối', () => {
    const { fixture, tabs } = setup();
    tabs[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', cancelable: true }));
    fixture.detectChanges();
    expect(fixture.componentInstance.index()).toBe(3);
  });

  it('Home về tab đầu, End tới tab cuối (bỏ qua disabled)', () => {
    const { fixture, tabs } = setup();
    fixture.componentInstance.index.set(1);
    fixture.detectChanges();
    tabs[1].dispatchEvent(new KeyboardEvent('keydown', { key: 'End', cancelable: true }));
    fixture.detectChanges();
    expect(fixture.componentInstance.index()).toBe(3);
    tabs[3].dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', cancelable: true }));
    fixture.detectChanges();
    expect(fixture.componentInstance.index()).toBe(0);
  });

  it('mũi tên phải: focus() chuyển sang tab mới được chọn (roving tabindex)', () => {
    const { fixture, tabs } = setup();
    tabs[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', cancelable: true }));
    fixture.detectChanges();
    expect(document.activeElement).toBe(tabs[1]);
  });

  it('selectedIndex trỏ tới tab disabled: rơi về tab enabled đầu tiên để bàn phím luôn dùng được', () => {
    const { fixture, tabs } = setup();
    fixture.componentInstance.index.set(2); // "Nâng cao" — disabled
    fixture.detectChanges();
    expect(tabs[2].getAttribute('aria-selected')).toBe('false');
    expect(tabs[2].getAttribute('tabindex')).toBe('-1');
    expect(tabs[0].getAttribute('aria-selected')).toBe('true');
    expect(tabs[0].getAttribute('tabindex')).toBe('0');
  });

  it('selectedIndex ngoài khoảng hợp lệ (vd. 99): rơi về tab enabled đầu tiên, roving tabindex chỉ đúng một tab', () => {
    const { fixture, tabs } = setup();
    fixture.componentInstance.index.set(99);
    fixture.detectChanges();
    expect(tabs[0].getAttribute('aria-selected')).toBe('true');
    expect(tabs[0].getAttribute('tabindex')).toBe('0');
    const soTabTabindex0 = tabs.filter((t) => t.getAttribute('tabindex') === '0').length;
    expect(soTabTabindex0).toBe(1);
  });

  it('selectedIndex ngoài khoảng ở fixture có tab 0 disabled: rơi về tab enabled đầu tiên (index 1), không phải index 0', () => {
    const fixture = TestBed.createComponent(HostBienComponent);
    fixture.detectChanges();
    const host: HTMLElement = fixture.debugElement.query(By.directive(GTabs)).nativeElement;
    const tabs = Array.from(host.querySelectorAll('[role="tab"]')) as HTMLElement[];
    fixture.componentInstance.index.set(99);
    fixture.detectChanges();
    // Tab 0 ("Đầu") disabled — nếu fallback trả về 0 một cách cứng (mutation return 0;) thay vì
    // tìm tab enabled đầu tiên, test này phải FAIL vì tab 0 không được aria-selected.
    expect(tabs[0].getAttribute('aria-selected')).toBe('false');
    expect(tabs[1].getAttribute('aria-selected')).toBe('true');
    expect(tabs[1].getAttribute('tabindex')).toBe('0');
  });

  it('Home/End bỏ qua tab disabled ở CẢ HAI đầu danh sách (không chỉ ở giữa)', () => {
    const fixture = TestBed.createComponent(HostBienComponent);
    fixture.detectChanges();
    const host: HTMLElement = fixture.debugElement.query(By.directive(GTabs)).nativeElement;
    const tabs = Array.from(host.querySelectorAll('[role="tab"]')) as HTMLElement[];
    // "Đầu" (0) và "Cuối" (3) đều disabled — End từ tab đang chọn (1) phải dừng ở "Giữa 2" (2),
    // không phải "Cuối" (3); Home từ đó phải dừng ở "Giữa 1" (1), không phải "Đầu" (0).
    tabs[1].dispatchEvent(new KeyboardEvent('keydown', { key: 'End', cancelable: true }));
    fixture.detectChanges();
    expect(fixture.componentInstance.index()).toBe(2);
    tabs[2].dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', cancelable: true }));
    fixture.detectChanges();
    expect(fixture.componentInstance.index()).toBe(1);
  });

  it('tablist nhận tên accessible từ tablistLabel qua aria-label', () => {
    const { tablist } = setup();
    expect(tablist.getAttribute('aria-label')).toBe('Cài đặt tài khoản');
  });

  it('tablist nhận tên accessible từ tablistLabelledBy qua aria-labelledby', () => {
    const fixture = TestBed.createComponent(HostLabelledByComponent);
    fixture.detectChanges();
    const host: HTMLElement = fixture.debugElement.query(By.directive(GTabs)).nativeElement;
    const tablist = host.querySelector('[role="tablist"]') as HTMLElement;
    expect(tablist.getAttribute('aria-labelledby')).toBe('tieu-de-tab-test');
  });

  it('cảnh báo dev khi tablist không có tablistLabel/tablistLabelledBy', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const fixture = TestBed.createComponent(HostKhongLabelComponent);
    fixture.detectChanges();
    expect(warnSpy).toHaveBeenCalledWith(
      '[OpenDesign] GTabs: tablist needs tablistLabel or tablistLabelledBy to have an accessible name',
    );
    warnSpy.mockRestore();
  });

  it('không cảnh báo khi có tablistLabel', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    setup();
    expect(warnSpy).not.toHaveBeenCalled();
    warnSpy.mockRestore();
  });

  it('không cảnh báo khi có tablistLabelledBy', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const fixture = TestBed.createComponent(HostLabelledByComponent);
    fixture.detectChanges();
    expect(warnSpy).not.toHaveBeenCalled();
    warnSpy.mockRestore();
  });
});
