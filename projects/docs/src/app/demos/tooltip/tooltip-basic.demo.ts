import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GButton, GIcon, GIconButton, gIconSettings, GTooltip } from 'ngx-opendesign';

@Component({
  selector: 'docs-tooltip-basic-demo',
  imports: [GTooltip, GButton, GIconButton, GIcon],
  template: `
    <button g-button variant="outline" gTooltip="Lưu tài liệu hiện tại">Lưu</button>
    <button g-button variant="outline" gTooltip="Ở phía dưới" gTooltipPosition="bottom">
      Dưới
    </button>
    <button g-icon-button aria-label="Cài đặt" gTooltip="Mở cài đặt">
      <g-icon [icon]="iconSettings" />
    </button>
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
export class TooltipBasicDemo {
  protected readonly iconSettings = gIconSettings;
}
