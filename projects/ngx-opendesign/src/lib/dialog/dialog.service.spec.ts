import { Component, inject } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { GDialogRef } from './dialog-ref';
import { G_DIALOG_DATA, GDialogService } from './dialog.service';

/** GDialogRef mà component bên trong dialog thật sự inject được — để test so identity. */
let refSeenByDialogComponent: GDialogRef<string> | undefined;

@Component({
  template: `<p>Nội dung dialog: {{ data.message }}</p>
    <button type="button" id="dialog-btn" (click)="ref.close('đã-xác-nhận')">Xác nhận</button>`,
})
class TestDialogComponent {
  readonly data = inject<{ message: string }>(G_DIALOG_DATA);
  readonly ref = inject<GDialogRef<string>>(GDialogRef);

  constructor() {
    refSeenByDialogComponent = this.ref;
  }
}

describe('GDialogService', () => {
  let service: GDialogService;

  beforeEach(() => {
    service = TestBed.inject(GDialogService);
  });

  afterEach(() => {
    service.closeAll();
    refSeenByDialogComponent = undefined;
  });

  function flush() {
    TestBed.tick();
  }

  it('mở dialog: panel có role=dialog và aria-modal=true', () => {
    service.open(TestDialogComponent, {
      data: { message: 'xin chào' },
      ariaLabel: 'Hộp thoại thử',
    });
    flush();
    const panel = document.querySelector('[role="dialog"]');
    expect(panel).not.toBeNull();
    expect(panel?.getAttribute('aria-modal')).toBe('true');
    expect(panel?.getAttribute('aria-label')).toBe('Hộp thoại thử');
  });

  it('truyền data vào component qua G_DIALOG_DATA', () => {
    service.open(TestDialogComponent, { data: { message: 'xin chào' }, ariaLabel: 'x' });
    flush();
    expect(document.body.textContent).toContain('Nội dung dialog: xin chào');
  });

  it('close(result) phát result qua afterClosed()', async () => {
    const ref = service.open<TestDialogComponent, { message: string }, string>(
      TestDialogComponent,
      {
        data: { message: 'x' },
        ariaLabel: 'x',
      },
    );
    flush();
    const closed = new Promise<string | undefined>((resolve) => {
      ref.afterClosed().subscribe(resolve);
    });
    (document.querySelector('#dialog-btn') as HTMLButtonElement).click();
    flush();
    await expect(closed).resolves.toBe('đã-xác-nhận');
  });

  it('cảnh báo dev khi thiếu cả ariaLabel lẫn ariaLabelledBy', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    service.open(TestDialogComponent, { data: { message: 'x' } });
    flush();
    expect(warnSpy).toHaveBeenCalledWith(
      '[OpenDesign] GDialogService: dialog cần ariaLabel hoặc ariaLabelledBy để có tên cho screen reader',
    );
    warnSpy.mockRestore();
  });

  it('không cảnh báo khi có ariaLabel', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    service.open(TestDialogComponent, { data: { message: 'x' }, ariaLabel: 'Có tên' });
    flush();
    expect(warnSpy).not.toHaveBeenCalled();
    warnSpy.mockRestore();
  });

  it('closeAll() đóng mọi dialog đang mở', () => {
    service.open(TestDialogComponent, { data: { message: 'x' }, ariaLabel: 'x' });
    flush();
    expect(document.querySelector('[role="dialog"]')).not.toBeNull();
    service.closeAll();
    flush();
    expect(document.querySelector('[role="dialog"]')).toBeNull();
  });

  it('ref component inject được và ref trả về là CÙNG một instance', () => {
    const returnedRef = service.open<TestDialogComponent, { message: string }, string>(
      TestDialogComponent,
      { data: { message: 'x' }, ariaLabel: 'x' },
    );
    flush();
    // Hai instance GDialogRef riêng biệt vẫn "chạy đúng" hôm nay vì cùng bọc một CDK ref,
    // nên test hành vi không phát hiện được — phải so identity. Nếu sau này GDialogRef có
    // state riêng, hai instance sẽ âm thầm phân kỳ.
    expect(refSeenByDialogComponent).toBe(returnedRef);
  });

  it('mở dialog: focus chuyển vào trong dialog; đóng: focus trở lại nút trigger', async () => {
    const trigger = document.createElement('button');
    trigger.id = 'trigger';
    trigger.textContent = 'Mở';
    document.body.appendChild(trigger);
    trigger.focus();
    expect(document.activeElement).toBe(trigger);

    const ref = service.open(TestDialogComponent, { data: { message: 'x' }, ariaLabel: 'x' });
    flush();
    await new Promise((r) => setTimeout(r, 0));
    const panel = document.querySelector('[role="dialog"]') as HTMLElement;
    expect(panel.contains(document.activeElement)).toBe(true);

    ref.close();
    flush();
    await new Promise((r) => setTimeout(r, 0));
    expect(document.activeElement).toBe(trigger);

    trigger.remove();
  });

  it('Esc đóng dialog', async () => {
    service.open(TestDialogComponent, { data: { message: 'x' }, ariaLabel: 'x' });
    flush();
    expect(document.querySelector('[role="dialog"]')).not.toBeNull();
    document.body.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Escape', keyCode: 27, bubbles: true }),
    );
    flush();
    await new Promise((r) => setTimeout(r, 0));
    expect(document.querySelector('[role="dialog"]')).toBeNull();
  });

  it('disableClose: Esc không đóng dialog', async () => {
    service.open(TestDialogComponent, {
      data: { message: 'x' },
      ariaLabel: 'x',
      disableClose: true,
    });
    flush();
    document.body.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Escape', keyCode: 27, bubbles: true }),
    );
    flush();
    await new Promise((r) => setTimeout(r, 0));
    expect(document.querySelector('[role="dialog"]')).not.toBeNull();
  });
});
