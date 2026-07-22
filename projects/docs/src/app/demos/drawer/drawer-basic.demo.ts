import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { GButton, GDrawer, GDrawerSide, GLocaleService } from 'ngx-opendesign';
import { overlayCopyFor } from '../../pages/overlay-copy';

@Component({
  selector: 'docs-drawer-basic-demo',
  imports: [GButton, GDrawer],
  template: `
    <div class="buttons">
      <button g-button variant="outline" (click)="show('left')">{{ demo().left }}</button>
      <button g-button variant="outline" (click)="show('right')">{{ demo().right }}</button>
      <button g-button variant="outline" (click)="show('bottom')">{{ demo().bottom }}</button>
      <button g-button variant="outline" (click)="show('top')">{{ demo().top }}</button>
    </div>

    <g-drawer [(open)]="open" [side]="side()" [ariaLabel]="demo().ariaLabel">
      <h3 class="title">{{ heading() }}</h3>
      <p class="body">{{ demo().body }}</p>
      <button g-button (click)="open.set(false)">{{ demo().close }}</button>
    </g-drawer>
  `,
  styles: `
    :host {
      display: block;
    }
    .buttons {
      display: flex;
      flex-wrap: wrap;
      gap: var(--g-space-2);
    }
    .title {
      margin: 0 0 var(--g-space-2);
    }
    .body {
      margin: 0 0 var(--g-space-4);
      color: var(--g-text-muted);
    }
    kbd {
      padding: 2px 6px;
      border: 1px solid var(--g-border);
      border-radius: var(--g-radius-sm);
      font-family: var(--g-font-family-mono, monospace);
      font-size: var(--g-font-size-xs);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrawerBasicDemo {
  private readonly i18n = inject(GLocaleService);
  protected readonly open = signal(false);
  protected readonly side = signal<GDrawerSide>('right');
  protected readonly demo = computed(() => overlayCopyFor(this.i18n.tag()).drawer.demo);
  protected readonly heading = computed(() => this.demo().headings[this.side()]);

  protected show(s: GDrawerSide): void {
    this.side.set(s);
    this.open.set(true);
  }
}
