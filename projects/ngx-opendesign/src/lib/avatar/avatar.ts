import { ChangeDetectionStrategy, Component, computed, input, linkedSignal } from '@angular/core';

export type GAvatarSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'g-avatar',
  template: `
    @if (src() && !imageFailed()) {
      <img class="g-avatar__image" [src]="src()" alt="" (error)="imageFailed.set(true)" />
    } @else {
      <span class="g-avatar__initials" aria-hidden="true">{{ initials() }}</span>
    }
  `,
  styleUrl: './avatar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'g-avatar',
    role: 'img',
    '[attr.aria-label]': 'name()',
    '[class.g-avatar--sm]': 'size() === "sm"',
    '[class.g-avatar--md]': 'size() === "md"',
    '[class.g-avatar--lg]': 'size() === "lg"',
  },
})
export class GAvatar {
  readonly src = input<string | undefined>(undefined);
  readonly name = input.required<string>();
  readonly size = input<GAvatarSize>('md');

  protected readonly imageFailed = linkedSignal({ source: this.src, computation: () => false });

  protected readonly initials = computed(() => {
    const parts = this.name().trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return '';
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  });
}
