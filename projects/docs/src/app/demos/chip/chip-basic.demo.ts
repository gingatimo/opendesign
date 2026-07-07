import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { GChip } from 'ngx-opendesign';

@Component({
  selector: 'docs-chip-basic-demo',
  imports: [GChip],
  template: `
    <g-chip>Thiết kế</g-chip>
    @for (tag of tags(); track tag) {
      <g-chip [removable]="true" [removeLabel]="'Xóa ' + tag" (removed)="remove(tag)">{{
        tag
      }}</g-chip>
    }
    <g-chip [removable]="true" [disabled]="true">Không xóa được</g-chip>
  `,
  styles: `
    :host {
      display: flex;
      flex-wrap: wrap;
      gap: var(--g-space-3);
      align-items: center;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipBasicDemo {
  protected readonly tags = signal(['Angular', 'TypeScript', 'SCSS']);

  protected remove(tag: string): void {
    this.tags.update((list) => list.filter((t) => t !== tag));
  }
}
