import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { GChips } from 'ngx-opendesign';

@Component({
  selector: 'docs-chips-basic-demo',
  imports: [GChips, ReactiveFormsModule],
  template: `
    <g-chips [formControl]="tags" placeholder="Nhập rồi Enter" />
    <p>Đã thêm: {{ (tags.value ?? []).join(', ') || 'chưa có' }}</p>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--g-space-3);
      max-width: 420px;
    }
    p {
      margin: 0;
      color: var(--g-text-muted);
      font-size: var(--g-font-size-sm);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipsBasicDemo {
  protected readonly tags = new FormControl<string[]>([], { nonNullable: true });
}
