import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { GChip, GLocaleService } from 'ngx-opendesign';
import { displayCopyFor } from '../../pages/display-copy';

@Component({
  selector: 'docs-chip-basic-demo',
  imports: [GChip],
  template: `
    <g-chip>{{ demo().design }}</g-chip>
    @for (tag of tags(); track tag) {
      <g-chip [removable]="true" [removeLabel]="demo().remove(tag)" (removed)="remove(tag)">{{
        tag
      }}</g-chip>
    }
    <g-chip [removable]="true" [disabled]="true">{{ demo().disabled }}</g-chip>
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
  private readonly i18n = inject(GLocaleService);
  protected readonly tags = signal(['Angular', 'TypeScript', 'SCSS']);
  protected readonly demo = computed(() => displayCopyFor(this.i18n.tag()).chip.demo);

  protected remove(tag: string): void {
    this.tags.update((list) => list.filter((t) => t !== tag));
  }
}
