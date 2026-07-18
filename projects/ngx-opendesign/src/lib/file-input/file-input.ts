import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  input,
  model,
  signal,
  viewChild,
} from '@angular/core';
import { GIcon } from '../icon/icon';
import { gIconFile, gIconUpload, gIconX } from '../icon/icons';

// Chọn file thuần TRÌNH BÀY: nút + tên file + vùng kéo-thả, bọc <input type=file> ẩn (native picker +
// bàn phím + a11y). Phát File[] qua model; CONSUMER tự upload (network). Không đụng mạng.
// Single-file: hàng pill gọn. Multi-file: dưới nút hiện danh sách file đã chọn, mỗi file có nút xoá;
// chọn lần mới NỐI thêm (khử trùng name+size). showFileList=false để consumer tự hiển thị preview.
@Component({
  selector: 'g-file-input',
  imports: [GIcon],
  template: `
    <div
      class="g-file-input"
      [class.g-file-input--dragover]="dragover()"
      [class.g-file-input--disabled]="disabled()"
      (dragover)="onDragOver($event)"
      (dragleave)="onDragLeave($event)"
      (drop)="onDrop($event)"
    >
      <div class="g-file-input__row">
        <button type="button" class="g-file-input__button" [disabled]="disabled()" (click)="pick()">
          <g-icon [icon]="iconUpload" size="sm" />
          Chọn tệp
        </button>
        <span class="g-file-input__name" aria-live="polite">{{ label() }}</span>
      </div>

      @if (multiple() && showFileList() && files().length) {
        <ul class="g-file-input__list">
          @for (file of files(); track file.name + file.size; let i = $index) {
            <li class="g-file-input__item">
              <g-icon class="g-file-input__file-icon" [icon]="iconFile" size="sm" />
              <span class="g-file-input__item-name">{{ file.name }}</span>
              <span class="g-file-input__item-size">{{ formatSize(file.size) }}</span>
              <button
                type="button"
                class="g-file-input__remove"
                [disabled]="disabled()"
                [attr.aria-label]="'Xoá ' + file.name"
                (click)="removeAt(i)"
              >
                <g-icon [icon]="iconX" size="sm" />
              </button>
            </li>
          }
        </ul>
      }

      <input
        #native
        type="file"
        class="g-file-input__native"
        hidden
        [accept]="accept() ?? ''"
        [multiple]="multiple()"
        [disabled]="disabled()"
        (change)="onNativeChange($event)"
      />
    </div>
  `,
  styleUrl: './file-input.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GFileInput {
  readonly files = model<File[]>([]);
  readonly accept = input<string>();
  readonly multiple = input(false, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly showFileList = input(true, { transform: booleanAttribute });

  private readonly native = viewChild.required<ElementRef<HTMLInputElement>>('native');
  protected readonly iconUpload = gIconUpload;
  protected readonly iconFile = gIconFile;
  protected readonly iconX = gIconX;
  protected readonly dragover = signal(false);

  protected readonly label = computed(() => {
    const f = this.files();
    if (f.length === 0) return 'Chưa chọn tệp';
    if (f.length === 1) return f[0].name;
    return `${f.length} tệp đã chọn`;
  });

  constructor() {
    // Consumer reset files=[] → clear giá trị native để chọn LẠI cùng file vẫn phát change.
    effect(() => {
      if (this.files().length === 0) {
        const el = this.native().nativeElement;
        if (el.value) el.value = '';
      }
    });
  }

  protected pick(): void {
    if (!this.disabled()) this.native().nativeElement.click();
  }

  protected onNativeChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.setFromList(input.files);
    // Multi: xoá value sau mỗi lần chọn để lần sau chọn lại (kể cả cùng file) vẫn phát change.
    if (this.multiple()) input.value = '';
  }

  protected onDragOver(event: DragEvent): void {
    if (this.disabled()) return;
    event.preventDefault();
    this.dragover.set(true);
  }

  protected onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.dragover.set(false);
  }

  protected onDrop(event: DragEvent): void {
    if (this.disabled()) return;
    event.preventDefault();
    this.dragover.set(false);
    this.setFromList(event.dataTransfer?.files ?? null);
  }

  protected removeAt(index: number): void {
    this.files.update((list) => list.filter((_, i) => i !== index));
  }

  // Format dung lượng: B / KB / MB (tối đa 1 chữ số thập phân, bỏ ".0" thừa).
  protected formatSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${trim1(bytes / 1024)} KB`;
    return `${trim1(bytes / (1024 * 1024))} MB`;
  }

  private setFromList(list: FileList | null): void {
    if (!list || list.length === 0) return;
    const incoming = Array.from(list).filter((f) => this.matchesAccept(f));
    if (incoming.length === 0) return;
    if (!this.multiple()) {
      this.files.set(incoming.slice(0, 1));
      return;
    }
    // Multi: nối thêm, khử trùng theo name+size.
    const seen = new Set(this.files().map(keyOf));
    const merged = [...this.files()];
    for (const f of incoming) {
      const k = keyOf(f);
      if (!seen.has(k)) {
        seen.add(k);
        merged.push(f);
      }
    }
    this.files.set(merged);
  }

  // Lọc accept cho kéo-thả (native picker đã tự lọc): hỗ trợ 'image/*', 'image/png', '.png'.
  private matchesAccept(file: File): boolean {
    const accept = this.accept()?.trim();
    if (!accept) return true;
    return accept
      .split(',')
      .map((s) => s.trim())
      .some((rule) => {
        if (rule.endsWith('/*')) return file.type.startsWith(rule.slice(0, -1));
        if (rule.startsWith('.')) return file.name.toLowerCase().endsWith(rule.toLowerCase());
        return file.type === rule;
      });
  }
}

function keyOf(f: File): string {
  return `${f.name}:${f.size}`;
}
function trim1(n: number): string {
  return (Math.round(n * 10) / 10).toString();
}
