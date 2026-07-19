import {
  afterRenderEffect,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  ElementRef,
  inject,
  input,
  signal,
  untracked,
  viewChild,
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { CdkConnectedOverlay, ConnectedPosition } from '@angular/cdk/overlay';
import { gNextId } from '../core/id-generator';
import { GChip } from '../chip/chip';
import { GIcon } from '../icon/icon';
import { gIconChevronDown } from '../icon/icons';
import { GOption } from './option';

const POSITIONS: ConnectedPosition[] = [
  { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetY: 4 },
  { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom', offsetY: -4 },
];

// Bỏ dấu tiếng Việt để tìm không dấu-nhạy: "cam" khớp "Cam", "da" khớp "Đà".
function normalize(s: string): string {
  return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd');
}

@Component({
  selector: 'g-select',
  imports: [CdkConnectedOverlay, GIcon, GChip],
  template: `
    <div class="g-select__trigger-content">
      @if (multiple() && selectedOptions().length > 0) {
        <span class="g-select__chips">
          @for (opt of selectedOptions(); track opt.id) {
            <g-chip removable [removeLabel]="'Bỏ ' + opt.getLabel()" (removed)="removeChip(opt)">
              {{ opt.getLabel() }}
            </g-chip>
          }
        </span>
      } @else if (!multiple() && selectedLabel()) {
        <span>{{ selectedLabel() }}</span>
      } @else {
        <span class="g-select__placeholder">{{ placeholder() }}</span>
      }
    </div>

    <g-icon class="g-select__arrow" [icon]="gIconChevronDown" />

    <ng-template
      cdkConnectedOverlay
      [cdkConnectedOverlayOrigin]="elementRef"
      [cdkConnectedOverlayOpen]="open()"
      [cdkConnectedOverlayWidth]="triggerWidth()"
      [cdkConnectedOverlayPositions]="positions"
      cdkConnectedOverlayHasBackdrop
      cdkConnectedOverlayBackdropClass="cdk-overlay-transparent-backdrop"
      (backdropClick)="close()"
      (detach)="close()"
    >
      <div class="g-select__panel">
        @if (searchable()) {
          <input
            #searchInput
            type="text"
            class="g-select__search"
            [value]="search()"
            [placeholder]="searchPlaceholder()"
            aria-label="Tìm kiếm"
            aria-autocomplete="list"
            [attr.aria-controls]="listboxId"
            [attr.aria-activedescendant]="activeDescendantId()"
            (input)="onSearchInput($event)"
            (keydown)="onKeydown($event)"
          />
        }
        <div class="g-select__options" role="listbox" [attr.id]="listboxId">
          <ng-content />
          @if (searchable() && visibleCount() === 0) {
            <div class="g-select__empty">Không có kết quả</div>
          }
        </div>
      </div>
    </ng-template>
  `,
  styleUrl: './select.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'g-select',
    role: 'combobox',
    tabindex: '0',
    'aria-haspopup': 'listbox',
    '[attr.aria-expanded]': 'open()',
    '[attr.aria-disabled]': 'disabled() ? "true" : null',
    '[attr.aria-controls]': 'listboxId',
    '[attr.aria-activedescendant]': 'activeDescendantId()',
    '[class.g-select--disabled]': 'disabled()',
    '[class.g-select--open]': 'open()',
    '[class.g-select--multiple]': 'multiple()',
    '(click)': 'onTriggerClick($event)',
    '(keydown)': 'onKeydown($event)',
    '(blur)': 'onBlur($event)',
  },
})
export class GSelect implements ControlValueAccessor {
  readonly placeholder = input('');
  readonly searchable = input(false, { transform: booleanAttribute });
  readonly multiple = input(false, { transform: booleanAttribute });
  readonly searchPlaceholder = input('Tìm...');
  /** Hàm so sánh option value (tham số 1) với giá trị đang bind của control (tham số 2). */
  readonly compareWith = input<(a: unknown, b: unknown) => boolean>((a, b) => a === b);

  protected readonly open = signal(false);
  protected readonly triggerWidth = signal(0);
  protected readonly activeIndex = signal(-1);
  protected readonly disabled = signal(false);
  protected readonly search = signal('');
  protected readonly positions = POSITIONS;
  protected readonly listboxId = gNextId('g-select-listbox');
  protected readonly gIconChevronDown = gIconChevronDown;

  private readonly valueSignal = signal<unknown>(undefined);
  private readonly optionsList = contentChildren(GOption);
  private readonly searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');

  private onChange: (value: unknown) => void = () => undefined;
  protected onTouchedFn: () => void = () => undefined;

  private typeaheadBuffer = '';
  private typeaheadTimer: ReturnType<typeof setTimeout> | undefined;
  private prevOpen = false;

  protected readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly ngControl = inject(NgControl, { optional: true, self: true });

  constructor() {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
    // Đưa focus vào ô tìm kiếm khi mở panel (chỉ khi searchable): ô này nằm trong CDK overlay nên
    // phải focus tay. Bắt CHUYỂN trạng thái open qua prevOpen để không focus lại mỗi render.
    afterRenderEffect(() => {
      const isOpen = this.open();
      untracked(() => {
        if (isOpen && !this.prevOpen && this.searchable()) {
          this.searchInput()?.nativeElement.focus();
        }
        this.prevOpen = isOpen;
      });
    });
  }

  // Option đang hiển thị (qua bộ lọc search). Điều hướng bàn phím chỉ chạy trên danh sách này.
  private readonly visibleOptions = computed(() =>
    this.optionsList().filter((o) => this.isOptionVisible(o)),
  );
  protected readonly visibleCount = computed(() => this.visibleOptions().length);

  protected readonly selectedOptions = computed(() =>
    this.optionsList().filter((o) => this.isSelected(o.value())),
  );

  protected readonly selectedLabel = computed(() => {
    const value = this.valueSignal();
    if (value === undefined || value === null) return '';
    const match = this.optionsList().find((o) => this.compareWith()(o.value(), value));
    return match ? match.getLabel() : '';
  });

  isOptionVisible(option: GOption): boolean {
    if (!this.searchable()) return true;
    const q = this.search().trim();
    if (!q) return true;
    return normalize(option.getLabel()).includes(normalize(q));
  }

  isSelected(value: unknown): boolean {
    if (this.multiple()) {
      const arr = this.valueSignal();
      return Array.isArray(arr) && arr.some((v) => this.compareWith()(value, v));
    }
    return this.compareWith()(value, this.valueSignal());
  }

  isActive(option: GOption): boolean {
    return this.visibleOptions()[this.activeIndex()] === option;
  }

  protected readonly activeDescendantId = computed(() => {
    if (!this.open()) return null;
    const active = this.visibleOptions()[this.activeIndex()];
    return active ? active.id : null;
  });

  selectValue(value: unknown): void {
    if (this.multiple()) {
      const current = Array.isArray(this.valueSignal())
        ? [...(this.valueSignal() as unknown[])]
        : [];
      const idx = current.findIndex((v) => this.compareWith()(value, v));
      if (idx >= 0) current.splice(idx, 1);
      else current.push(value);
      this.valueSignal.set(current);
      this.onChange(current);
      this.onTouchedFn();
      // Multi: giữ panel mở để chọn tiếp.
    } else {
      this.valueSignal.set(value);
      this.onChange(value);
      this.onTouchedFn();
      this.close();
    }
  }

  protected removeChip(option: GOption): void {
    // option đang được chọn → selectValue toggle sẽ bỏ chọn.
    this.selectValue(option.value());
  }

  close(): void {
    this.open.set(false);
    this.activeIndex.set(-1);
    // preventScroll: đóng bằng backdrop/detach không nên cuộn select vào tầm nhìn (giật trang).
    this.elementRef.nativeElement.focus({ preventScroll: true });
  }

  // Chỉ đánh dấu touched khi focus thực sự RỜI khỏi select — không phải khi mở panel searchable làm
  // focus chuyển vào ô tìm kiếm (nằm trong CDK overlay, ngoài DOM host), tránh required báo lỗi sớm.
  protected onBlur(event: FocusEvent): void {
    if (event.relatedTarget === this.searchInput()?.nativeElement) return;
    this.onTouchedFn();
  }

  protected onTriggerClick(event: MouseEvent): void {
    if (this.disabled()) return;
    // Click vào vùng chips (kể cả nút bỏ chip) không mở/đóng panel — để nút × của GChip xử lý riêng.
    if ((event.target as HTMLElement).closest('.g-select__chips')) return;
    if (this.open()) {
      this.close();
    } else {
      this.openPanel();
    }
  }

  private openPanel(): void {
    this.triggerWidth.set(this.elementRef.nativeElement.offsetWidth);
    this.search.set('');
    const vis = this.visibleOptions();
    const currentIndex = vis.findIndex((o) => this.isSelected(o.value()));
    this.activeIndex.set(currentIndex >= 0 ? currentIndex : 0);
    this.open.set(true);
  }

  protected onSearchInput(event: Event): void {
    this.search.set((event.target as HTMLInputElement).value);
    this.activeIndex.set(0); // về option hiển thị đầu tiên sau khi lọc
  }

  protected onKeydown(event: KeyboardEvent): void {
    if (this.disabled()) return;
    const hasModifier = event.ctrlKey || event.metaKey || event.altKey;

    if (!this.open()) {
      if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown') {
        event.preventDefault();
        this.openPanel();
        return;
      }
      if (!hasModifier && event.key.length === 1) {
        if (this.searchable()) this.openPanel();
        else this.handleTypeaheadWhileClosed(event.key);
      }
      return;
    }

    switch (event.key) {
      case 'Escape':
        event.preventDefault();
        this.close();
        break;
      case 'ArrowDown':
        event.preventDefault();
        this.moveActive(1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.moveActive(-1);
        break;
      case 'Enter':
        event.preventDefault();
        this.commitActive();
        break;
      case ' ':
        // Khi searchable, Space là ký tự tìm kiếm (không nuốt để chọn).
        if (!this.searchable()) {
          event.preventDefault();
          this.commitActive();
        }
        break;
      default:
        if (!this.searchable() && !hasModifier && event.key.length === 1) {
          this.handleTypeaheadWhileOpen(event.key);
        }
    }
  }

  private moveActive(direction: 1 | -1): void {
    const list = this.visibleOptions();
    if (list.length === 0) return;
    const next = (this.activeIndex() + direction + list.length) % list.length;
    this.activeIndex.set(next);
  }

  private commitActive(): void {
    const option = this.visibleOptions()[this.activeIndex()];
    if (option && !option.disabled()) {
      this.selectValue(option.value());
    }
  }

  private handleTypeaheadWhileClosed(char: string): void {
    const match = this.findTypeaheadMatch(char);
    if (match) {
      this.selectValue(match.value());
    }
  }

  private handleTypeaheadWhileOpen(char: string): void {
    const match = this.findTypeaheadMatch(char);
    if (match) {
      this.activeIndex.set(this.visibleOptions().indexOf(match));
    }
  }

  private findTypeaheadMatch(char: string): GOption | undefined {
    this.typeaheadBuffer += char.toLowerCase();
    clearTimeout(this.typeaheadTimer);
    this.typeaheadTimer = setTimeout(() => {
      this.typeaheadBuffer = '';
    }, 500);
    return this.visibleOptions().find(
      (o) => !o.disabled() && o.getLabel().toLowerCase().startsWith(this.typeaheadBuffer),
    );
  }

  writeValue(value: unknown): void {
    this.valueSignal.set(value);
  }

  registerOnChange(fn: (value: unknown) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedFn = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }
}
