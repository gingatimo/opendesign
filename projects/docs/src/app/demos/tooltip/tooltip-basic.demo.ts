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
    <button g-button variant="outline" gTooltip="Góc trên trái" gTooltipPosition="top-left">
      Trên-trái
    </button>
    <button g-button variant="outline" gTooltip="Góc trên phải" gTooltipPosition="top-right">
      Trên-phải
    </button>
    <button g-button variant="outline" gTooltip="Góc dưới trái" gTooltipPosition="bottom-left">
      Dưới-trái
    </button>
    <button g-button variant="outline" gTooltip="Góc dưới phải" gTooltipPosition="bottom-right">
      Dưới-phải
    </button>
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
export class TooltipBasicDemo {
  protected readonly iconSettings = gIconSettings;
}
