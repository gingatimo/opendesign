import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { GLocaleService, gLocaleEn, gLocaleVi, provideGLocale } from 'ngx-opendesign';
import CascadeSelectPage from './cascade-select.page';
import CheckboxPage from './checkbox.page';
import ChipsPage from './chips.page';
import ColorPickerPage from './color-picker.page';
import DateRangePickerPage from './date-range-picker.page';
import DatepickerPage from './datepicker.page';
import FileInputPage from './file-input.page';
import InputPage from './input.page';
import InputOtpPage from './input-otp.page';
import RadioPage from './radio.page';
import RatingPage from './rating.page';
import SearchFieldPage from './search-field.page';
import SelectPage from './select.page';
import SliderPage from './slider.page';
import StepSliderPage from './step-slider.page';
import TextareaPage from './textarea.page';
import TimePickerPage from './time-picker.page';
import TogglePage from './toggle.page';
import TreeSelectPage from './tree-select.page';

class NoopResizeObserver {
  observe(): void {
    return undefined;
  }
  unobserve(): void {
    return undefined;
  }
  disconnect(): void {
    return undefined;
  }
}

function renderEn<T>(component: Type<T>): HTMLElement {
  const fixture = TestBed.createComponent(component);
  fixture.detectChanges();
  TestBed.inject(GLocaleService).use(gLocaleEn);
  fixture.detectChanges();
  return fixture.nativeElement as HTMLElement;
}

describe('form pages i18n', () => {
  beforeEach(() => {
    if (!globalThis.ResizeObserver) {
      Object.defineProperty(globalThis, 'ResizeObserver', {
        configurable: true,
        value: NoopResizeObserver,
      });
    }

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        provideGLocale(gLocaleVi),
      ],
    });
  });

  it('dịch trang Input và demo sang tiếng Anh', () => {
    const el = renderEn(InputPage);
    const text = el.textContent ?? '';

    expect(text).toContain('Native input directive');
    expect(text).toContain('Input with icon — GInputGroup');
    expect(text).toContain('Projected prefix element');
    expect(el.querySelector('input[placeholder="Your name"]')).toBeTruthy();
    expect(el.querySelector('input[placeholder="Search"]')).toBeTruthy();
    expect(el.querySelector('button[aria-label="Show password"]')).toBeTruthy();
    expect(text).not.toContain('Nhập tên của bạn');
  });

  it('dịch trang Textarea và demo sang tiếng Anh', () => {
    const el = renderEn(TextareaPage);
    const text = el.textContent ?? '';

    expect(text).toContain('Native textarea directive');
    expect(text).toContain('Resizable vertically');
    expect(el.querySelector('textarea[placeholder="Add a note..."]')).toBeTruthy();
    expect(text).not.toContain('Nhập ghi chú');
  });

  it('dịch trang Checkbox và demo sang tiếng Anh', () => {
    const text = renderEn(CheckboxPage).textContent ?? '';

    expect(text).toContain('Independent single-item selection');
    expect(text).toContain('I agree to the terms');
    expect(text).toContain('Partially selected');
    expect(text).toContain('Show the partially selected state.');
    expect(text).not.toContain('Tôi đồng ý với điều khoản');
  });

  it('dịch trang Toggle và aria-label demo sang tiếng Anh', () => {
    const el = renderEn(TogglePage);
    const text = el.textContent ?? '';

    expect(text).toContain('On/off switch');
    expect(text).toContain('Required: aria-label or aria-labelledby');
    expect(el.querySelector('g-toggle[aria-label="Enable notifications"]')).toBeTruthy();
    expect(text).not.toContain('Công tắc bật/tắt');
  });

  it('dịch trang Radio và demo sang tiếng Anh', () => {
    const text = renderEn(RadioPage).textContent ?? '';

    expect(text).toContain('contains g-radio options');
    expect(text).toContain('Free');
    expect(text).toContain('(required)');
    expect(text).toContain('Arrow keys move and select');
    expect(text).not.toContain('Miễn phí');
  });

  it('dịch trang Select và demo sang tiếng Anh', () => {
    const el = renderEn(SelectPage);
    const text = el.textContent ?? '';

    expect(text).toContain('Pill trigger');
    expect(text).toContain('Search');
    expect(text).toContain('Multiple selection');
    expect(text).toContain('Selected: none');
    expect(el.querySelector('g-select[placeholder="Choose a country"]')).toBeTruthy();
    expect(text).toContain('Text shown before a value is selected.');
    expect(text).not.toContain('Chọn quốc gia');
  });

  it('dịch trang Cascade Select và demo sang tiếng Anh', () => {
    const el = renderEn(CascadeSelectPage);
    const text = el.textContent ?? '';

    expect(text).toContain('Choose one value through nested categories');
    expect(text).toContain('Selected: none');
    expect(el.querySelector('g-cascade-select[placeholder="Choose a region"]')).toBeTruthy();
    expect(text).toContain('Value is the selected leaf item value.');
    expect(text).toContain('ArrowRight opens the child column');
    expect(text).not.toContain('Chọn khu vực');
  });

  it('dịch trang Search Field và demo sang tiếng Anh', () => {
    const el = renderEn(SearchFieldPage);
    const text = el.textContent ?? '';

    expect(text).toContain('Field-based search input');
    expect(text).toContain('Choose a field, enter a value, then press Enter.');
    expect(
      el.querySelector('g-search-field[placeholder="Enter a value, then press Enter"]'),
    ).toBeTruthy();
    expect(text).toContain('Search field');
    expect(text).not.toContain('Nhập giá trị rồi Enter');
  });

  it('dịch trang File Input và demo sang tiếng Anh', () => {
    const text = renderEn(FileInputPage).textContent ?? '';

    expect(text).toContain('Presentation-only file picker');
    expect(text).toContain('Multiple files');
    expect(text).toContain('Selected: 0 files');
    expect(text).toContain('0 files — choose more to append');
    expect(text).not.toContain('Đã chọn: 0 tệp');
  });

  it('dịch trang Datepicker và demo sang tiếng Anh', () => {
    const text = renderEn(DatepickerPage).textContent ?? '';

    expect(text).toContain('Pick one date');
    expect(text).toContain('Selected: none');
    expect(text).toContain('Selected date, two-way bound with [(value)].');
    expect(text).not.toContain('Đã chọn');
  });

  it('dịch trang Date Range Picker và demo sang tiếng Anh', () => {
    const text = renderEn(DateRangePickerPage).textContent ?? '';

    expect(text).toContain('Pick a date range');
    expect(text).toContain('No range selected');
    expect(text).toContain('Date range { start, end }, two-way bound with [(value)].');
    expect(text).not.toContain('Chưa chọn khoảng');
  });

  it('dịch trang Time Picker và demo sang tiếng Anh', () => {
    const text = renderEn(TimePickerPage).textContent ?? '';

    expect(text).toContain('Pick an HH:mm time');
    expect(text).toContain('Selected: none');
    expect(text).toContain('Selected time as "HH:mm"');
    expect(text).not.toContain('Đã chọn');
  });

  it('dịch trang Slider và aria-label demo sang tiếng Anh', () => {
    const el = renderEn(SliderPage);
    const text = el.textContent ?? '';

    expect(text).toContain('Select a numeric value');
    expect(el.querySelector('g-slider[ariaLabel="Value"]')).toBeTruthy();
    expect(el.querySelector('g-slider[ariaLabel="Temperature"]')).toBeTruthy();
    expect(text).toContain('Name for screen readers.');
    expect(text).not.toContain('Giá trị đang chọn');
  });

  it('dịch trang Step Slider và demo sang tiếng Anh', () => {
    const el = renderEn(StepSliderPage);
    const text = el.textContent ?? '';

    expect(text).toContain('Discrete pill-shaped slider');
    expect(text).toContain('Size md (default)');
    expect(text).toContain('Selected step:');
    expect(el.querySelector('g-step-slider[ariaLabel="Faster or smarter"]')).toBeTruthy();
    expect(text).not.toContain('Bậc đang chọn');
  });

  it('dịch trang Rating và demo sang tiếng Anh', () => {
    const text = renderEn(RatingPage).textContent ?? '';

    expect(text).toContain('Star rating input');
    expect(text).toContain('Choose a rating');
    expect(text).toContain('Average rating 4.5');
    expect(text).toContain('Screen-reader label for interactive mode.');
    expect(text).not.toContain('Đánh giá trung bình');
  });

  it('dịch trang Color Picker và demo sang tiếng Anh', () => {
    const text = renderEn(ColorPickerPage).textContent ?? '';

    expect(text).toContain('Pick a color');
    expect(text).toContain('Selected:');
    expect(text).toContain('Selected color as #rrggbb hex');
    expect(text).not.toContain('Đã chọn');
  });

  it('dịch trang Input OTP và demo sang tiếng Anh', () => {
    const text = renderEn(InputOtpPage).textContent ?? '';

    expect(text).toContain('OTP/PIN input');
    expect(text).toContain('Entered code: empty');
    expect(text).toContain('Value is the concatenated string from all cells.');
    expect(text).not.toContain('Mã đã nhập');
  });

  it('dịch trang Chips và demo sang tiếng Anh', () => {
    const el = renderEn(ChipsPage);
    const text = el.textContent ?? '';

    expect(text).toContain('Multi-value chip input');
    expect(text).toContain('Added: none');
    expect(el.querySelector('g-chips[placeholder="Type then press Enter"]')).toBeTruthy();
    expect(text).toContain('Placeholder shown in the input before chips exist.');
    expect(text).not.toContain('Nhập rồi Enter');
  });

  it('dịch trang Tree Select và demo sang tiếng Anh', () => {
    const el = renderEn(TreeSelectPage);
    const text = el.textContent ?? '';

    expect(text).toContain('Choose an item from a collapsible tree');
    expect(text).toContain('Multiple selection');
    expect(text).toContain('Selected: none');
    expect(el.querySelector('g-tree-select[placeholder="Choose an item"]')).toBeTruthy();
    expect(el.querySelector('g-tree-select[placeholder="Choose permissions"]')).toBeTruthy();
    expect(text).toContain('single: selected node value; multiple: selected leaf node values.');
    expect(text).not.toContain('Chọn mục');
  });
});
