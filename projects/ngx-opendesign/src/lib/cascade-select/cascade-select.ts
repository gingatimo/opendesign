import {
  afterRenderEffect,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  signal,
  untracked,
  viewChild,
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { CdkConnectedOverlay, ConnectedPosition } from '@angular/cdk/overlay';
import { GIcon } from '../icon/icon';
import { gIconChevronDown, gIconChevronRight } from '../icon/icons';

export interface GCascadeOption {
  label: string;
  value?: unknown;
  children?: GCascadeOption[];
}

const POSITIONS: ConnectedPosition[] = [
  { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetY: 4 },
  { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom', offsetY: -4 },
];

// Tìm đường dẫn (chuỗi option từ gốc tới lá) có value khớp — cho selectedLabel + writeValue.
function findPath(
  opts: GCascadeOption[],
  value: unknown,
  eq: (a: unknown, b: unknown) => boolean,
): GCascadeOption[] | null {
  for (const o of opts) {
    if (!o.children?.length && o.value !== undefined && eq(o.value, value)) return [o];
    if (o.children?.length) {
      const sub = findPath(o.children, value, eq);
      if (sub) return [o, ...sub];
    }
  }
  return null;
}

// Chọn giá trị qua các cấp danh mục lồng nhau. Trigger + overlay các cột: hover/focus item có con mở
// cột con bên phải; chọn LÁ (không con) set value + đóng. CVA. value = value của lá.
@Component({
  selector: 'g-cascade-select',
  imports: [CdkConnectedOverlay, GIcon],
  template: `
    <div
      class="g-cascade-select__value"
      [class.g-cascade-select__value--placeholder]="!selectedLabel()"
    >
      {{ selectedLabel() || placeholder() }}
    </div>
    <g-icon class="g-cascade-select__arrow" [icon]="iconDown" />

    <ng-template
      cdkConnectedOverlay
      [cdkConnectedOverlayOrigin]="elementRef"
      [cdkConnectedOverlayOpen]="open()"
      [cdkConnectedOverlayPositions]="positions"
      cdkConnectedOverlayHasBackdrop
      cdkConnectedOverlayBackdropClass="cdk-overlay-transparent-backdrop"
      (backdropClick)="close()"
      (detach)="close()"
    >
      <div #panel class="g-cascade-select__panel">
        @for (col of columns(); track $index; let ci = $index) {
          <ul class="g-cascade-select__col" role="listbox">
            @for (opt of col; track $index; let ri = $index) {
              <li>
                <button
                  type="button"
                  class="g-cascade-select__opt"
                  role="option"
                  [attr.data-col]="ci"
                  [attr.data-row]="ri"
                  [class.g-cascade-select__opt--active]="pathAt(ci) === opt"
                  [attr.aria-selected]="pathAt(ci) === opt"
                  [attr.aria-haspopup]="opt.children?.length ? 'true' : null"
                  (mouseenter)="opt.children?.length ? expand(ci, opt) : null"
                  (click)="onClick(ci, opt)"
                  (keydown)="onKeydown($event)"
                >
                  <span>{{ opt.label }}</span>
                  @if (opt.children?.length) {
                    <g-icon [icon]="iconRight" size="sm" />
                  }
                </button>
              </li>
            }
          </ul>
        }
      </div>
    </ng-template>
  `,
  host: {
    class: 'g-cascade-select',
    role: 'combobox',
    tabindex: '0',
    'aria-haspopup': 'true',
    '[attr.aria-expanded]': 'open()',
    '[attr.aria-disabled]': 'disabled() ? "true" : null',
    '[class.g-cascade-select--disabled]': 'disabled()',
    '[class.g-cascade-select--open]': 'open()',
    '(click)': 'onTriggerClick()',
    '(keydown)': 'onTriggerKeydown($event)',
    '(blur)': 'onBlur($event)',
  },
  styleUrl: './cascade-select.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GCascadeSelect implements ControlValueAccessor {
  readonly options = input<GCascadeOption[]>([]);
  readonly placeholder = input('');
  readonly compareWith = input<(a: unknown, b: unknown) => boolean>((a, b) => a === b);

  protected readonly open = signal(false);
  protected readonly disabled = signal(false);
  protected readonly positions = POSITIONS;
  protected readonly iconDown = gIconChevronDown;
  protected readonly iconRight = gIconChevronRight;

  // path[i] = option đang mở ở cột i (nhánh). columns dựng từ path.
  protected readonly path = signal<GCascadeOption[]>([]);
  private readonly valueSignal = signal<unknown>(undefined);
  private readonly panel = viewChild<ElementRef<HTMLElement>>('panel');

  protected readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly ngControl = inject(NgControl, { optional: true, self: true });

  private onChange: (value: unknown) => void = () => undefined;
  protected onTouchedFn: () => void = () => undefined;

  // Ô cần focus sau lần render tới. Zoneless render ở macrotask nên KHÔNG dùng queueMicrotask (chạy
  // trước render → panel/cột chưa tồn tại); dùng afterRenderEffect như GTreeSelect.
  private readonly focusPending = signal<{ col: number; row: number } | null>(null);

  constructor() {
    if (this.ngControl) this.ngControl.valueAccessor = this;
    afterRenderEffect(() => {
      const target = this.focusPending();
      if (!this.open() || !target) return;
      untracked(() => {
        this.focusCell(target.col, target.row);
        this.focusPending.set(null);
      });
    });
  }

  private requestFocus(col: number, row: number): void {
    this.focusPending.set({ col, row });
  }

  protected readonly columns = computed(() => {
    const cols: GCascadeOption[][] = [this.options()];
    for (const p of this.path()) {
      if (p.children?.length) cols.push(p.children);
      else break;
    }
    return cols;
  });

  protected readonly selectedLabel = computed(() => {
    const v = this.valueSignal();
    if (v === undefined || v === null) return '';
    const p = findPath(this.options(), v, this.compareWith());
    return p ? p.map((o) => o.label).join(' / ') : '';
  });

  protected pathAt(ci: number): GCascadeOption | undefined {
    return this.path()[ci];
  }

  protected expand(ci: number, opt: GCascadeOption): void {
    this.path.set([...this.path().slice(0, ci), opt]);
  }

  protected onClick(ci: number, opt: GCascadeOption): void {
    if (opt.children?.length) {
      this.expand(ci, opt);
      this.requestFocus(ci + 1, 0); // focus item đầu cột con sau khi render
    } else {
      this.valueSignal.set(opt.value);
      this.onChange(opt.value);
      this.onTouchedFn();
      this.close();
    }
  }

  protected onTriggerClick(): void {
    if (this.disabled()) return;
    if (this.open()) this.close();
    else this.openPanel();
  }
  protected onTriggerKeydown(event: KeyboardEvent): void {
    if (this.disabled()) return;
    if (!this.open() && (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown')) {
      event.preventDefault();
      this.openPanel();
      this.requestFocus(0, 0);
    } else if (event.key === 'Escape') {
      this.close();
    }
  }

  private openPanel(): void {
    // Khởi tạo path theo giá trị đang chọn (nếu có) để mở đúng nhánh.
    const p =
      this.valueSignal() != null
        ? findPath(this.options(), this.valueSignal(), this.compareWith())
        : null;
    this.path.set(p ?? []);
    this.open.set(true);
  }

  close(): void {
    this.open.set(false);
    this.elementRef.nativeElement.focus({ preventScroll: true });
  }

  // Không đánh dấu touched khi focus chuyển vào panel (overlay) — chỉ khi rời hẳn control.
  protected onBlur(event: FocusEvent): void {
    if (this.panel()?.nativeElement.contains(event.relatedTarget as Node)) return;
    this.onTouchedFn();
  }

  protected onKeydown(event: KeyboardEvent): void {
    const btn = event.target as HTMLElement;
    const col = Number(btn.getAttribute('data-col'));
    const row = Number(btn.getAttribute('data-row'));
    if (Number.isNaN(col)) {
      if (event.key === 'Escape') this.close();
      return;
    }
    const cols = this.columns();
    switch (event.key) {
      case 'Escape':
        this.close();
        event.preventDefault();
        break;
      case 'ArrowDown':
        this.focusCell(col, (row + 1) % cols[col].length);
        event.preventDefault();
        break;
      case 'ArrowUp':
        this.focusCell(col, (row - 1 + cols[col].length) % cols[col].length);
        event.preventDefault();
        break;
      case 'ArrowRight': {
        const opt = cols[col][row];
        if (opt.children?.length) {
          this.expand(col, opt);
          this.requestFocus(col + 1, 0);
        }
        event.preventDefault();
        break;
      }
      case 'ArrowLeft':
        if (col > 0) {
          this.path.set(this.path().slice(0, col));
          this.requestFocus(col - 1, 0);
        }
        event.preventDefault();
        break;
      case 'Enter':
      case ' ':
        this.onClick(col, cols[col][row]);
        event.preventDefault();
        break;
    }
  }

  private focusCell(col: number, row: number): void {
    const el = this.panel()?.nativeElement.querySelector<HTMLElement>(
      `.g-cascade-select__opt[data-col="${col}"][data-row="${row}"]`,
    );
    el?.focus();
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
