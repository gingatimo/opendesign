import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GIcon, GIconButton, gIconPlus, gIconSearch, gIconX } from 'ngx-opendesign';

@Component({
  selector: 'docs-icon-button-basic-demo',
  imports: [GIconButton, GIcon],
  template: `
    <button g-icon-button aria-label="Thêm mới">
      <g-icon [icon]="iconPlus" />
    </button>
    <button g-icon-button variant="primary" aria-label="Tìm kiếm">
      <g-icon [icon]="iconSearch" />
    </button>
    <button g-icon-button variant="outline" size="lg" aria-label="Đóng">
      <g-icon [icon]="iconX" size="lg" />
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
export class IconButtonBasicDemo {
  protected readonly iconPlus = gIconPlus;
  protected readonly iconSearch = gIconSearch;
  protected readonly iconX = gIconX;
}
