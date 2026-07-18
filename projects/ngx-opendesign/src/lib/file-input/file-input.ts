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
import { gIconUpload } from '../icon/icons';

// Chọn file thuần TRÌNH BÀY: nút + tên file + vùng kéo-thả, bọc <input type=file> ẩn (native picker +
// bàn phím + a11y). Phát File[] qua model; CONSUMER tự upload (network). Không đụng mạng.
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
      <button type="button" class="g-file-input__button" [disabled]="disabled()" (click)="pick()">
        <g-icon [icon]="iconUpload" size="sm" />
        Chọn tệp
      </button>
      <span class="g-file-input__name" aria-live="polite">{{ label() }}</span>
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

  private readonly native = viewChild.required<ElementRef<HTMLInputElement>>('native');
  protected readonly iconUpload = gIconUpload;
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
    this.setFromList((event.target as HTMLInputElement).files);
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

  private setFromList(list: FileList | null): void {
    if (!list || list.length === 0) return;
    let arr = Array.from(list).filter((f) => this.matchesAccept(f));
    if (!this.multiple()) arr = arr.slice(0, 1);
    if (arr.length > 0) this.files.set(arr);
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
