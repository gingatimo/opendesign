import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  model,
  output,
  untracked,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GInput } from '../input/input';
import { GOption } from '../select/option';
import { GSelect } from '../select/select';

export interface GSearchFieldOption {
  value: unknown;
  label: string;
}

// Ô tìm kiếm theo TRƯỜNG: select chọn trường (vd. Customer ID / Citizen ID / Username) bên trái +
// ô nhập giá trị bên phải, trong khung pill. Nhấn Enter phát `(search)` = { field, value } để
// consumer tự chạy truy vấn; đồng thời hai chiều [(field)] / [(query)]. Thuần trình bày (không mạng).
@Component({
  selector: 'g-search-field',
  imports: [FormsModule, GSelect, GOption, GInput],
  template: `
    <div class="g-search-field" [class.g-search-field--disabled]="disabled()">
      <g-select
        class="g-search-field__select"
        [ngModel]="field()"
        (ngModelChange)="field.set($event)"
        [disabled]="disabled()"
        aria-label="Trường tìm kiếm"
      >
        @for (f of fields(); track f.value) {
          <g-option [value]="f.value">{{ f.label }}</g-option>
        }
      </g-select>
      <input
        gInput
        type="text"
        class="g-search-field__input"
        [value]="query()"
        [placeholder]="placeholder()"
        [disabled]="disabled()"
        aria-label="Giá trị tìm kiếm"
        (input)="query.set($any($event.target).value)"
        (keydown.enter)="submit()"
      />
    </div>
  `,
  styleUrl: './search-field.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GSearchField {
  readonly fields = input<GSearchFieldOption[]>([]);
  readonly field = model<unknown>();
  readonly query = model('');
  readonly placeholder = input('');
  readonly disabled = input(false, { transform: booleanAttribute });
  // Tên (search) do consumer chọn (khớp ngữ nghĩa ô tìm kiếm). Đây là component tuỳ biến, KHÔNG phải
  // <input type=search> nên không đụng độ thật với DOM event `search` — tắt rule cho đúng ý API.
  // eslint-disable-next-line @angular-eslint/no-output-native
  readonly search = output<{ field: unknown; value: string }>();

  constructor() {
    // Mặc định chọn trường ĐẦU TIÊN khi chưa có field. Chỉ phụ thuộc fields() (untracked cho phần
    // đọc/ghi field) nên không chạy lại khi người dùng đổi field → không vòng lặp.
    effect(() => {
      const fs = this.fields();
      untracked(() => {
        if (this.field() === undefined && fs.length) this.field.set(fs[0].value);
      });
    });
  }

  protected submit(): void {
    this.search.emit({ field: this.field(), value: this.query() });
  }
}
