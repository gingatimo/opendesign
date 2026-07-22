import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import {
  GButton,
  GIcon,
  GIconButton,
  GLocaleService,
  gIconSettings,
  GTooltip,
} from 'ngx-opendesign';
import { overlayCopyFor } from '../../pages/overlay-copy';

@Component({
  selector: 'docs-tooltip-basic-demo',
  imports: [GTooltip, GButton, GIconButton, GIcon],
  template: `
    <button g-button variant="outline" [gTooltip]="demo().saveTip">{{ demo().save }}</button>
    <button g-button variant="outline" [gTooltip]="demo().bottomTip" gTooltipPosition="bottom">
      {{ demo().bottom }}
    </button>
    <button g-icon-button [attr.aria-label]="demo().settings" [gTooltip]="demo().settingsTip">
      <g-icon [icon]="iconSettings" />
    </button>
    <button g-button variant="outline" [gTooltip]="demo().topLeftTip" gTooltipPosition="top-left">
      {{ demo().topLeft }}
    </button>
    <button g-button variant="outline" [gTooltip]="demo().topRightTip" gTooltipPosition="top-right">
      {{ demo().topRight }}
    </button>
    <button
      g-button
      variant="outline"
      [gTooltip]="demo().bottomLeftTip"
      gTooltipPosition="bottom-left"
    >
      {{ demo().bottomLeft }}
    </button>
    <button
      g-button
      variant="outline"
      [gTooltip]="demo().bottomRightTip"
      gTooltipPosition="bottom-right"
    >
      {{ demo().bottomRight }}
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
  private readonly i18n = inject(GLocaleService);
  protected readonly demo = computed(() => overlayCopyFor(this.i18n.tag()).tooltip.demo);
  protected readonly iconSettings = gIconSettings;
}
