import { ConnectedPosition, FlexibleConnectedPositionStrategy } from '@angular/cdk/overlay';
import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { vi } from 'vitest';
import { GTooltip } from './tooltip';

@Component({
  imports: [GTooltip],
  template: `
    <button type="button" gTooltip="Lưu tài liệu"><span class="icon">*</span>Lưu</button>
  `,
})
class HostComponent {}

describe('GTooltip', () => {
  function setup() {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    const button: HTMLButtonElement = fixture.debugElement.query(By.css('button')).nativeElement;
    return { fixture, button };
  }

  afterEach(() => {
    document.querySelectorAll('[role="tooltip"]').forEach((el) => el.remove());
  });

  it('mặc định không hiện tooltip', () => {
    setup();
    expect(document.querySelector('[role="tooltip"]')).toBeNull();
  });

  it('focus vào trigger: hiện tooltip có role=tooltip và đúng nội dung', () => {
    const { fixture, button } = setup();
    button.dispatchEvent(new FocusEvent('focus'));
    fixture.detectChanges();
    const tip = document.querySelector('[role="tooltip"]');
    expect(tip).not.toBeNull();
    expect(tip?.textContent).toContain('Lưu tài liệu');
  });

  it('khi hiện: trigger có aria-describedby trỏ đúng id của tooltip', () => {
    const { fixture, button } = setup();
    button.dispatchEvent(new FocusEvent('focus'));
    fixture.detectChanges();
    const tip = document.querySelector('[role="tooltip"]') as HTMLElement;
    expect(tip.id).toBeTruthy();
    expect(button.getAttribute('aria-describedby')).toBe(tip.id);
  });

  it('không xoá aria-describedby có sẵn từ trước: gộp id tooltip vào, gỡ đúng id đó khi ẩn', () => {
    const { fixture, button } = setup();
    button.setAttribute('aria-describedby', 'hint-1');

    button.dispatchEvent(new FocusEvent('focus'));
    fixture.detectChanges();
    const tip = document.querySelector('[role="tooltip"]') as HTMLElement;
    const idsWhileShown = (button.getAttribute('aria-describedby') ?? '').split(/\s+/);
    expect(idsWhileShown).toContain('hint-1');
    expect(idsWhileShown).toContain(tip.id);

    button.dispatchEvent(new FocusEvent('blur'));
    fixture.detectChanges();
    expect(button.getAttribute('aria-describedby')).toBe('hint-1');
  });

  it('blur: ẩn tooltip và bỏ aria-describedby', () => {
    const { fixture, button } = setup();
    button.dispatchEvent(new FocusEvent('focus'));
    fixture.detectChanges();
    button.dispatchEvent(new FocusEvent('blur'));
    fixture.detectChanges();
    expect(document.querySelector('[role="tooltip"]')).toBeNull();
    expect(button.getAttribute('aria-describedby')).toBeNull();
  });

  it('Esc đóng tooltip (WCAG 1.4.13 dismissible)', () => {
    const { fixture, button } = setup();
    button.dispatchEvent(new FocusEvent('focus'));
    fixture.detectChanges();
    button.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    fixture.detectChanges();
    expect(document.querySelector('[role="tooltip"]')).toBeNull();
  });

  it('hover (không focus) rồi Esc ở bất kỳ đâu vẫn đóng được tooltip (WCAG 1.4.13)', () => {
    const { fixture, button } = setup();
    button.dispatchEvent(new MouseEvent('mouseenter'));
    fixture.detectChanges();
    expect(document.querySelector('[role="tooltip"]')).not.toBeNull();

    // Escape phát sinh khi focus KHÔNG nằm trên trigger (hoặc không nằm ở đâu cả) —
    // CDK OverlayKeyboardDispatcher lắng nghe ở body, độc lập với focus.
    document.body.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Escape', keyCode: 27, bubbles: true }),
    );
    fixture.detectChanges();

    expect(document.querySelector('[role="tooltip"]')).toBeNull();
    expect(button.getAttribute('aria-describedby')).toBeNull();
  });

  it('Esc kèm modifier (vd. Ctrl+Esc) KHÔNG đóng tooltip (theo quy ước hasModifierKey của CDK)', () => {
    const { fixture, button } = setup();
    button.dispatchEvent(new FocusEvent('focus'));
    fixture.detectChanges();
    document.body.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Escape', ctrlKey: true, bubbles: true }),
    );
    fixture.detectChanges();
    expect(document.querySelector('[role="tooltip"]')).not.toBeNull();
  });

  it('mouseleave trên trigger với relatedTarget là panel tooltip: KHÔNG ẩn (WCAG 1.4.13 Hoverable)', () => {
    const { fixture, button } = setup();
    button.dispatchEvent(new MouseEvent('mouseenter'));
    fixture.detectChanges();
    const tip = document.querySelector('[role="tooltip"]') as HTMLElement;
    expect(tip).not.toBeNull();

    // Con trỏ rời trigger nhưng đang di chuyển VÀO tooltip (cách 8px) — không được ẩn,
    // nếu không người dùng screen-magnifier không bao giờ rê được chuột tới nội dung.
    button.dispatchEvent(new MouseEvent('mouseleave', { relatedTarget: tip }));
    fixture.detectChanges();

    expect(document.querySelector('[role="tooltip"]')).not.toBeNull();
  });

  it('mouseleave trên panel tooltip (không quay lại trigger): ẩn tooltip', () => {
    const { fixture, button } = setup();
    button.dispatchEvent(new MouseEvent('mouseenter'));
    fixture.detectChanges();
    const tip = document.querySelector('[role="tooltip"]') as HTMLElement;
    expect(tip).not.toBeNull();

    // Listener thật được gắn trên overlayRef.overlayElement (CDK gọi đây là "panel" — cùng
    // phần tử panelClass nhắm tới). mouseleave không bubble nên phải dispatch đúng lên phần
    // tử đó, không phải lên nội dung con bên trong (tip.parentElement chính là overlayElement).
    const panel = tip.parentElement as HTMLElement;
    panel.dispatchEvent(new MouseEvent('mouseleave', { relatedTarget: null }));
    fixture.detectChanges();

    expect(document.querySelector('[role="tooltip"]')).toBeNull();
  });

  it('mouseleave trên panel với relatedTarget là phần tử con của trigger (trigger tổng hợp): KHÔNG ẩn', () => {
    const { fixture, button } = setup();
    button.dispatchEvent(new MouseEvent('mouseenter'));
    fixture.detectChanges();
    const tip = document.querySelector('[role="tooltip"]') as HTMLElement;
    expect(tip).not.toBeNull();

    // Con trỏ rời panel nhưng relatedTarget là <span class="icon"> — con của trigger, không
    // phải chính nativeElement. Guard dùng contains() nên vẫn coi là "quay lại trigger", không
    // ẩn rồi hiện lại (nhấp nháy dispose/recreate).
    const icon = button.querySelector('.icon') as HTMLElement;
    const panel = tip.parentElement as HTMLElement;
    panel.dispatchEvent(new MouseEvent('mouseleave', { relatedTarget: icon }));
    fixture.detectChanges();

    expect(document.querySelector('[role="tooltip"]')).not.toBeNull();
  });

  it('focus giữ tooltip mở dù con trỏ hover rồi rời đi (Persistent khi vẫn còn focus)', () => {
    const { fixture, button } = setup();
    button.dispatchEvent(new FocusEvent('focus'));
    fixture.detectChanges();
    button.dispatchEvent(new MouseEvent('mouseenter'));
    fixture.detectChanges();

    button.dispatchEvent(new MouseEvent('mouseleave', { relatedTarget: null }));
    fixture.detectChanges();

    expect(document.querySelector('[role="tooltip"]')).not.toBeNull();
  });
});

describe('GTooltip — gTooltipSetPosition (kênh lập trình cho vị trí)', () => {
  function setup() {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    const button: HTMLButtonElement = fixture.debugElement.query(By.css('button')).nativeElement;
    const directive = fixture.debugElement.query(By.directive(GTooltip)).injector.get(GTooltip);
    return { fixture, button, directive };
  }

  afterEach(() => {
    document.querySelectorAll('[role="tooltip"]').forEach((el) => el.remove());
  });

  // withPositions() nhận mảng [preferred, ...fallback] — phần tử ĐẦU chính là vị trí được ưu
  // tiên. Kiểm bằng originX/overlayX (hình dạng thật của CDK ConnectedPosition) thay vì đo pixel
  // thật: jsdom không có layout engine nên toạ độ luôn là 0, nhưng cấu hình vị trí gửi cho CDK
  // vẫn tính toán được — đây là cách duy nhất kiểm "phải" mà không cần trình duyệt thật.
  it('gọi gTooltipSetPosition("right") TRƯỚC khi hiện: overlay ưu tiên vị trí phải (originX end, overlayX start), không phải top mặc định', () => {
    const { fixture, button, directive } = setup();
    const spy = vi.spyOn(FlexibleConnectedPositionStrategy.prototype, 'withPositions');

    directive.gTooltipSetPosition('right');
    button.dispatchEvent(new FocusEvent('focus'));
    fixture.detectChanges();

    const positions = spy.mock.calls.at(-1)?.[0] as ConnectedPosition[];
    expect(positions[0].originX).toBe('end');
    expect(positions[0].overlayX).toBe('start');
  });

  it('KHÔNG gọi gTooltipSetPosition: overlay vẫn dùng input gTooltipPosition như v1 (mặc định top)', () => {
    const { fixture, button } = setup();
    const spy = vi.spyOn(FlexibleConnectedPositionStrategy.prototype, 'withPositions');

    button.dispatchEvent(new FocusEvent('focus'));
    fixture.detectChanges();

    const positions = spy.mock.calls.at(-1)?.[0] as ConnectedPosition[];
    expect(positions[0].originY).toBe('top');
    expect(positions[0].overlayY).toBe('bottom');
  });
});

@Component({
  imports: [GTooltip],
  template: `<button type="button" [gTooltip]="text()">Lưu</button>`,
})
class TextRongHostComponent {
  readonly text = signal('');
}

describe('GTooltip — text rỗng', () => {
  afterEach(() => {
    document.querySelectorAll('[role="tooltip"]').forEach((el) => el.remove());
  });

  // gTooltip được nới từ input.required<string>() thành input<string>('') để GSidebarItem mang
  // được GTooltip qua hostDirectives mà không buộc consumer truyền text (xem task-2-report).
  // Hệ quả: text rỗng trở thành trạng thái biểu diễn được, và tooltip rỗng là vô nghĩa —
  // không hiện. Không breaking: mọi consumer v1 đều đang truyền text thật.
  it('không hiện tooltip rỗng khi gTooltip là chuỗi rỗng', () => {
    const fixture = TestBed.createComponent(TextRongHostComponent);
    fixture.detectChanges();
    const button: HTMLButtonElement = fixture.debugElement.query(By.css('button')).nativeElement;

    button.dispatchEvent(new MouseEvent('mouseenter'));
    fixture.detectChanges();

    expect(document.querySelector('[role="tooltip"]')).toBeNull();
    // Không có tooltip thì cũng không được để lại aria-describedby trỏ vào hư không.
    expect(button.getAttribute('aria-describedby')).toBeNull();
  });

  it('có text trở lại thì hiện bình thường', () => {
    const fixture = TestBed.createComponent(TextRongHostComponent);
    fixture.componentInstance.text.set('Lưu tài liệu');
    fixture.detectChanges();
    const button: HTMLButtonElement = fixture.debugElement.query(By.css('button')).nativeElement;

    button.dispatchEvent(new MouseEvent('mouseenter'));
    fixture.detectChanges();

    expect(document.querySelector('[role="tooltip"]')?.textContent).toContain('Lưu tài liệu');
  });
});
