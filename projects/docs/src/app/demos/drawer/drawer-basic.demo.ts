import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { GButton, GDrawer, GDrawerSide } from 'ngx-opendesign';

@Component({
  selector: 'docs-drawer-basic-demo',
  imports: [GButton, GDrawer],
  template: `
    <div class="buttons">
      <button g-button variant="outline" (click)="show('left')">Trái</button>
      <button g-button variant="outline" (click)="show('right')">Phải</button>
      <button g-button variant="outline" (click)="show('bottom')">Bottom sheet</button>
      <button g-button variant="outline" (click)="show('top')">Trên</button>
    </div>

    <g-drawer [(open)]="open" [side]="side()" ariaLabel="Ngăn kéo minh hoạ">
      <h3 class="title">{{ heading() }}</h3>
      <p class="body">
        Nội dung ngăn kéo. Đóng bằng phím <kbd>Esc</kbd>, bấm ra vùng nền, hoặc nút dưới đây.
      </p>
      <button g-button (click)="open.set(false)">Đóng</button>
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
  protected readonly open = signal(false);
  protected readonly side = signal<GDrawerSide>('right');

  private readonly headings: Record<GDrawerSide, string> = {
    left: 'Side panel — trái',
    right: 'Side panel — phải',
    bottom: 'Bottom sheet',
    top: 'Sheet — trên',
  };
  protected readonly heading = computed(() => this.headings[this.side()]);

  protected show(s: GDrawerSide): void {
    this.side.set(s);
    this.open.set(true);
  }
}
