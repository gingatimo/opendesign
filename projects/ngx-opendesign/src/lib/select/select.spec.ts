import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { GSelect } from './select';
import { GOption } from './option';

@Component({
  imports: [GSelect, GOption, ReactiveFormsModule],
  template: `
    <g-select [formControl]="control" placeholder="Chọn màu">
      <g-option value="red">Đỏ</g-option>
      <g-option value="green">Xanh lá</g-option>
      <g-option value="blue">Xanh dương</g-option>
    </g-select>
  `,
})
class HostComponent {
  readonly control = new FormControl<string | null>(null);
}

describe('GSelect + GOption', () => {
  function setup() {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    const trigger: HTMLElement = fixture.debugElement.query(By.directive(GSelect)).nativeElement;
    return { fixture, trigger };
  }

  it('role combobox, hiện placeholder khi chưa chọn', () => {
    const { trigger } = setup();
    expect(trigger.getAttribute('role')).toBe('combobox');
    expect(trigger.textContent).toContain('Chọn màu');
  });

  it('mặc định đóng panel', () => {
    const { fixture } = setup();
    expect(fixture.debugElement.query(By.css('[role="listbox"]'))).toBeNull();
  });

  it('Enter mở panel, aria-expanded true', () => {
    const { fixture, trigger } = setup();
    trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', cancelable: true }));
    fixture.detectChanges();
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
    expect(fixture.debugElement.query(By.css('[role="listbox"]'))).not.toBeNull();
  });

  it('Escape đóng panel', () => {
    const { fixture, trigger } = setup();
    trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', cancelable: true }));
    fixture.detectChanges();
    trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', cancelable: true }));
    fixture.detectChanges();
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
  });

  it('click một option: cập nhật FormControl, đóng panel, trigger hiện đúng nhãn', () => {
    const { fixture, trigger } = setup();
    trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', cancelable: true }));
    fixture.detectChanges();
    const options = fixture.debugElement.queryAll(By.directive(GOption));
    (options[1].nativeElement as HTMLElement).click();
    fixture.detectChanges();
    expect(fixture.componentInstance.control.value).toBe('green');
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    expect(trigger.textContent).toContain('Xanh lá');
  });

  it('mũi tên xuống mở panel và di chuyển active option, Enter chọn option active', () => {
    const { fixture, trigger } = setup();
    trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', cancelable: true }));
    fixture.detectChanges();
    trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', cancelable: true }));
    trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', cancelable: true }));
    fixture.detectChanges();
    expect(fixture.componentInstance.control.value).toBe('green');
  });

  it('FormControl.setValue cập nhật lại nhãn trên trigger (writeValue)', () => {
    const { fixture, trigger } = setup();
    fixture.componentInstance.control.setValue('blue');
    fixture.detectChanges();
    expect(trigger.textContent).toContain('Xanh dương');
  });

  it('trigger có chevron (g-icon) trang trí, aria-hidden', () => {
    const { fixture } = setup();
    const icon = fixture.debugElement.query(By.css('.g-select__arrow'));
    expect(icon).not.toBeNull();
    expect(icon.nativeElement.tagName.toLowerCase()).toBe('g-icon');
    // GIcon tự set aria-hidden="true" trên host của chính nó (không có aria-label) — xem
    // icon.spec.ts 'mặc định là trang trí'. Đã detectChanges() trong setup() nên afterNextRender
    // của GIcon đã chạy xong.
    expect((icon.nativeElement as HTMLElement).getAttribute('aria-hidden')).toBe('true');
  });

  it('mở panel rồi mũi tên xuống: aria-activedescendant trỏ đúng id (không rỗng) của option đang active', () => {
    const { fixture, trigger } = setup();
    // ArrowDown lần 1 (đang đóng): mở panel, active option đầu tiên.
    trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', cancelable: true }));
    fixture.detectChanges();
    // ArrowDown lần 2 (đang mở): di chuyển active sang option kế tiếp.
    trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', cancelable: true }));
    fixture.detectChanges();

    const options = fixture.debugElement
      .queryAll(By.directive(GOption))
      .map((d) => d.nativeElement as HTMLElement);
    const activeDescendant = trigger.getAttribute('aria-activedescendant');
    expect(activeDescendant).toBeTruthy();
    expect(activeDescendant).toBe(options[1].getAttribute('id'));
  });
});

interface ColorOption {
  id: number;
  name: string;
}

@Component({
  imports: [GSelect, GOption, ReactiveFormsModule],
  template: `
    <g-select [formControl]="control" [compareWith]="compareWith" placeholder="Chọn màu">
      <g-option [value]="{ id: 1, name: 'Đỏ' }">Đỏ</g-option>
      <g-option [value]="{ id: 2, name: 'Xanh lá' }">Xanh lá</g-option>
    </g-select>
  `,
})
class CompareWithHostComponent {
  readonly control = new FormControl<ColorOption | null>(null);
  // Comparator bất đối xứng, cố ý chỉ null-guard tham số thứ hai (model value).
  // Nếu compareWith bị gọi sai thứ tự (model value ở vị trí 1), optionValue.id
  // sẽ ném TypeError khi model value đang là null/undefined.
  readonly compareWith = (a: unknown, b: unknown) => {
    const optionValue = a as ColorOption;
    const modelValue = b as ColorOption | null;
    return modelValue != null && optionValue.id === modelValue.id;
  };
}

describe('GSelect compareWith - thứ tự tham số (option value trước, model value sau)', () => {
  it('không throw khi mở panel lúc control còn null, và chọn đúng option sau khi setValue', () => {
    const fixture = TestBed.createComponent(CompareWithHostComponent);
    fixture.detectChanges();
    const trigger: HTMLElement = fixture.debugElement.query(By.directive(GSelect)).nativeElement;

    // (a) Mở panel khi control = null không được throw. openPanel() gọi
    // isSelected() cho từng option, tức là gọi compareWith() trong khi
    // valueSignal() vẫn null — đây chính là chỗ mà thứ tự đảo ngược sẽ vỡ.
    expect(() => {
      trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', cancelable: true }));
      fixture.detectChanges();
    }).not.toThrow();
    trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', cancelable: true }));
    fixture.detectChanges();

    // (b) setValue rồi mở lại panel: đúng nhãn trên trigger, đúng option được đánh dấu selected.
    fixture.componentInstance.control.setValue({ id: 2, name: 'Xanh lá' });
    fixture.detectChanges();
    expect(trigger.textContent).toContain('Xanh lá');

    trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', cancelable: true }));
    fixture.detectChanges();
    const options = fixture.debugElement.queryAll(By.directive(GOption));
    expect(options[0].nativeElement.getAttribute('aria-selected')).toBe('false');
    expect(options[1].nativeElement.getAttribute('aria-selected')).toBe('true');
  });
});

@Component({
  imports: [GSelect, GOption, ReactiveFormsModule],
  template: `
    <g-select [formControl]="controlA" placeholder="A">
      <g-option value="apple">Apple</g-option>
      <g-option value="banana">Banana</g-option>
    </g-select>
    <g-select [formControl]="controlB" placeholder="B">
      <g-option value="cherry">Cherry</g-option>
      <g-option value="date">Date</g-option>
    </g-select>
  `,
})
class TwoSelectsHostComponent {
  readonly controlA = new FormControl<string | null>(null);
  readonly controlB = new FormControl<string | null>(null);
}

describe('GSelect typeahead - buffer độc lập giữa các instance', () => {
  it('gõ ký tự ở select A không làm nhiễu kết quả typeahead của select B', () => {
    const fixture = TestBed.createComponent(TwoSelectsHostComponent);
    fixture.detectChanges();
    const [triggerA, triggerB] = fixture.debugElement
      .queryAll(By.directive(GSelect))
      .map((de) => de.nativeElement as HTMLElement);

    // Gõ 'b' ở select A (đang đóng) -> chọn thẳng "Banana".
    triggerA.dispatchEvent(new KeyboardEvent('keydown', { key: 'b', cancelable: true }));
    fixture.detectChanges();
    expect(fixture.componentInstance.controlA.value).toBe('banana');

    // Gõ 'c' ở select B (đang đóng) -> nếu buffer bị chia sẻ, buffer sẽ là
    // "bc" (nối từ select A) và không khớp option nào của select B ("cherry"/"date").
    triggerB.dispatchEvent(new KeyboardEvent('keydown', { key: 'c', cancelable: true }));
    fixture.detectChanges();
    expect(fixture.componentInstance.controlB.value).toBe('cherry');
  });
});

describe('GSelect keydown - phím tắt hệ thống (Cmd/Ctrl/Alt) không được kích hoạt typeahead', () => {
  it('Cmd+chữ cái lúc đóng panel không đổi giá trị FormControl; gõ chữ thường thì có', () => {
    const fixture = TestBed.createComponent(TwoSelectsHostComponent);
    fixture.detectChanges();
    const [triggerA] = fixture.debugElement
      .queryAll(By.directive(GSelect))
      .map((de) => de.nativeElement as HTMLElement);

    // Cmd+B (vd. người dùng bấm nhầm khi đang muốn bôi đậm text ở nơi khác,
    // hoặc Ctrl+R reload, Cmd+C copy...) không được kích hoạt typeahead.
    triggerA.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'b', metaKey: true, cancelable: true }),
    );
    fixture.detectChanges();
    expect(fixture.componentInstance.controlA.value).toBeNull();

    // Gõ 'b' thường (không kèm phím bổ trợ) vẫn phải kích hoạt typeahead bình thường.
    triggerA.dispatchEvent(new KeyboardEvent('keydown', { key: 'b', cancelable: true }));
    fixture.detectChanges();
    expect(fixture.componentInstance.controlA.value).toBe('banana');
  });

  it('Cmd+chữ cái lúc mở panel không đổi option đang active; gõ chữ thường thì có', () => {
    const fixture = TestBed.createComponent(TwoSelectsHostComponent);
    fixture.detectChanges();
    const [triggerA] = fixture.debugElement
      .queryAll(By.directive(GSelect))
      .map((de) => de.nativeElement as HTMLElement);

    triggerA.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', cancelable: true }));
    fixture.detectChanges();
    const activeDescendantWhenOpened = triggerA.getAttribute('aria-activedescendant');

    // Cmd+B lúc panel đang mở: không được kích hoạt typeahead nên option active giữ nguyên.
    triggerA.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'b', metaKey: true, cancelable: true }),
    );
    fixture.detectChanges();
    expect(triggerA.getAttribute('aria-activedescendant')).toBe(activeDescendantWhenOpened);

    // Gõ 'b' thường: typeahead chuyển active sang "Banana" (option thứ 2 của select A).
    triggerA.dispatchEvent(new KeyboardEvent('keydown', { key: 'b', cancelable: true }));
    fixture.detectChanges();
    expect(triggerA.getAttribute('aria-activedescendant')).not.toBe(activeDescendantWhenOpened);
  });
});
