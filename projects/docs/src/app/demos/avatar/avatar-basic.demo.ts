import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { GAvatar, GLocaleService } from 'ngx-opendesign';
import { displayCopyFor } from '../../pages/display-copy';

@Component({
  selector: 'docs-avatar-basic-demo',
  imports: [GAvatar],
  template: `
    <g-avatar [name]="names()[0]" size="sm" />
    <g-avatar [name]="names()[1]" />
    <g-avatar [name]="names()[2]" size="lg" />
    <g-avatar [name]="names()[3]" src="/khong-ton-tai.jpg" />
    <g-avatar [name]="names()[4]" shape="square" />
    <g-avatar [name]="names()[5]" shape="square" size="lg" />
  `,
  styles: `
    :host {
      display: flex;
      gap: var(--g-space-3);
      align-items: center;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarBasicDemo {
  private readonly i18n = inject(GLocaleService);
  protected readonly names = computed(() => displayCopyFor(this.i18n.tag()).avatar.demo.names);
}
