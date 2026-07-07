import { LiveAnnouncer } from '@angular/cdk/a11y';
import { OverlayContainer } from '@angular/cdk/overlay';
import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { GToastService } from './toast.service';

function getContainerHost(): HTMLElement | undefined {
  const pane = document.querySelector('.g-toast-container')?.closest('.cdk-overlay-pane');
  return pane?.parentElement as HTMLElement | undefined;
}

describe('GToastService', () => {
  let service: GToastService;
  let announcer: LiveAnnouncer;

  beforeEach(() => {
    service = TestBed.inject(GToastService);
    announcer = TestBed.inject(LiveAnnouncer);
  });

  afterEach(() => {
    service.dismissAll();
  });

  it('show(): hiện panel toast với đúng nội dung', () => {
    service.show({ message: 'Đã lưu thay đổi' });
    TestBed.tick();
    expect(document.body.textContent).toContain('Đã lưu thay đổi');
  });

  it('show(): thông báo qua LiveAnnouncer với politeness polite (mặc định)', () => {
    const announceSpy = vi.spyOn(announcer, 'announce');
    service.show({ message: 'Đã lưu thay đổi' });
    TestBed.tick();
    expect(announceSpy).toHaveBeenCalledWith('Đã lưu thay đổi', 'polite');
  });

  it('variant danger: thông báo với politeness assertive', () => {
    const announceSpy = vi.spyOn(announcer, 'announce');
    service.show({ message: 'Lưu thất bại', variant: 'danger' });
    TestBed.tick();
    expect(announceSpy).toHaveBeenCalledWith('Lưu thất bại', 'assertive');
  });

  it('panel KHÔNG tự đặt aria-live (tránh screen reader đọc hai lần cùng LiveAnnouncer)', () => {
    service.show({ message: 'x' });
    TestBed.tick();
    const panel = document.querySelector('.g-toast');
    expect(panel).not.toBeNull();
    expect(panel?.getAttribute('aria-live')).toBeNull();
    expect(panel?.getAttribute('role')).not.toBe('alert');
  });

  it('nút đóng là button native có aria-label, click thì đóng toast', () => {
    service.show({ message: 'x' });
    TestBed.tick();
    const closeBtn = document.querySelector('.g-toast button') as HTMLButtonElement;
    expect(closeBtn).not.toBeNull();
    expect(closeBtn.getAttribute('aria-label')).toBe('Đóng');
    closeBtn.click();
    TestBed.tick();
    expect(document.querySelector('.g-toast')).toBeNull();
  });

  it('show() trả về id của toast; dismiss(id) đóng đúng toast đó', () => {
    const id = service.show({ message: 'x', duration: 0 });
    TestBed.tick();
    expect(document.querySelector('.g-toast')).not.toBeNull();

    service.dismiss(id);
    TestBed.tick();
    expect(document.querySelector('.g-toast')).toBeNull();
  });

  it('có HAI toast đang mở: dismiss(id của toast thứ nhất) chỉ đóng toast đó, giữ nguyên toast còn lại', () => {
    const idOne = service.show({ message: 'một', duration: 0 });
    service.show({ message: 'hai', duration: 0 });
    TestBed.tick();
    expect(document.querySelectorAll('.g-toast').length).toBe(2);

    service.dismiss(idOne);
    TestBed.tick();

    expect(document.querySelectorAll('.g-toast').length).toBe(1);
    expect(document.body.textContent).toContain('hai');
    expect(document.body.textContent).not.toContain('một');
  });

  it('duration: 0 thì không tự đóng', async () => {
    vi.useFakeTimers();
    service.show({ message: 'x', duration: 0 });
    TestBed.tick();
    vi.advanceTimersByTime(10000);
    TestBed.tick();
    expect(document.querySelector('.g-toast')).not.toBeNull();
    vi.useRealTimers();
  });

  it('duration mặc định 4000ms thì tự đóng', () => {
    vi.useFakeTimers();
    service.show({ message: 'x' });
    TestBed.tick();
    expect(document.querySelector('.g-toast')).not.toBeNull();
    vi.advanceTimersByTime(4001);
    TestBed.tick();
    expect(document.querySelector('.g-toast')).toBeNull();
    vi.useRealTimers();
  });

  it('dismissAll() đóng mọi toast', () => {
    service.show({ message: 'một', duration: 0 });
    service.show({ message: 'hai', duration: 0 });
    TestBed.tick();
    expect(document.querySelectorAll('.g-toast').length).toBe(2);
    service.dismissAll();
    TestBed.tick();
    expect(document.querySelectorAll('.g-toast').length).toBe(0);
  });

  it('toast được đưa lên cuối overlay container khi có overlay khác chèn vào sau (bring-to-front)', () => {
    service.show({ message: 'đầu tiên', duration: 0 });
    TestBed.tick();

    const overlayContainer = TestBed.inject(OverlayContainer).getContainerElement();
    // Mô phỏng một overlay khác (vd. dialog) được mở SAU toast — pane của nó chèn vào cuối
    // overlay container, đứng trên toast vì mọi pane CDK dùng chung z-index.
    const laterOverlayHost = document.createElement('div');
    laterOverlayHost.className = 'fake-later-overlay-host';
    overlayContainer.appendChild(laterOverlayHost);
    expect(overlayContainer.lastElementChild).toBe(laterOverlayHost);

    service.show({ message: 'thứ hai', duration: 0 });
    TestBed.tick();

    const toastPane = document.querySelector('.g-toast-container')?.closest('.cdk-overlay-pane');
    const toastHost = toastPane?.parentElement;
    expect(toastHost).not.toBeNull();
    expect(overlayContainer.lastElementChild).toBe(toastHost);
  });

  it('host đã ở cuối overlay container: KHÔNG appendChild lại (tránh mất focus của nút đóng đang được focus)', () => {
    service.show({ message: 'một', duration: 0 });
    TestBed.tick();
    const closeBtn = document.querySelector('.g-toast button') as HTMLButtonElement;
    closeBtn.focus();
    expect(document.activeElement).toBe(closeBtn);

    // Toast host đang là overlay duy nhất (đã ở cuối container, không có nextSibling), nên
    // ensureContainer() không cần appendChild lại — appendChild trên một node đã ở đúng vị trí
    // vẫn tách/gắn lại node đó khỏi cây DOM, làm mất focus của người dùng bàn phím.
    service.show({ message: 'hai', duration: 0 });
    TestBed.tick();

    expect(document.activeElement).toBe(closeBtn);
  });
});

describe('GToastService - vị trí (GToastPosition)', () => {
  let service: GToastService;

  beforeEach(() => {
    service = TestBed.inject(GToastService);
  });

  afterEach(() => {
    service.dismissAll();
  });

  it('mặc định vị trí là top-right', () => {
    expect(service.position()).toBe('top-right');
  });

  it('setPosition() đổi vị trí hiện tại', () => {
    service.setPosition('bottom-left');
    expect(service.position()).toBe('bottom-left');
  });

  it('mặc định (top-right): container KHÔNG có class --start hay --center (dùng flex-end nền)', () => {
    service.show({ message: 'x', duration: 0 });
    TestBed.tick();
    const container = document.querySelector('.g-toast-container');
    expect(container?.classList.contains('g-toast-container--start')).toBe(false);
    expect(container?.classList.contains('g-toast-container--center')).toBe(false);
  });

  it('setPosition("bottom-left") trước khi show(): container có class --start', () => {
    service.setPosition('bottom-left');
    service.show({ message: 'x', duration: 0 });
    TestBed.tick();
    const container = document.querySelector('.g-toast-container');
    expect(container?.classList.contains('g-toast-container--start')).toBe(true);
  });

  it('setPosition("top-center") trước khi show(): container có class --center', () => {
    service.setPosition('top-center');
    service.show({ message: 'x', duration: 0 });
    TestBed.tick();
    const container = document.querySelector('.g-toast-container');
    expect(container?.classList.contains('g-toast-container--center')).toBe(true);
  });

  it('setPosition() khi container ĐANG MỞ: cập nhật ngay class căn lề, không cần show() lại', () => {
    service.show({ message: 'x', duration: 0 });
    TestBed.tick();
    let container = document.querySelector('.g-toast-container');
    expect(container?.classList.contains('g-toast-container--start')).toBe(false);

    service.setPosition('bottom-left');
    TestBed.tick();
    container = document.querySelector('.g-toast-container');
    expect(container?.classList.contains('g-toast-container--start')).toBe(true);
  });

  it('setPosition() khi container ĐANG MỞ: cập nhật ngay position strategy của overlay (justifyContent đổi theo trục ngang mới)', () => {
    service.show({ message: 'x', duration: 0 });
    TestBed.tick();
    const hostBefore = getContainerHost();
    expect(hostBefore).not.toBeUndefined();
    // top-right (mặc định): trục ngang canh phải -> justifyContent flex-end.
    expect(hostBefore?.style.justifyContent).toBe('flex-end');

    service.setPosition('bottom-left');
    TestBed.tick();
    const hostAfter = getContainerHost();
    // bottom-left: trục ngang canh trái -> justifyContent flex-start.
    expect(hostAfter?.style.justifyContent).toBe('flex-start');
  });
});
