import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { GLocaleService, GSplitter, GSplitterPanel } from 'ngx-opendesign';
import { layoutCopyFor } from '../../pages/layout-copy';

@Component({
  selector: 'docs-splitter-basic-demo',
  imports: [GSplitter, GSplitterPanel],
  template: `
    <p class="sp-demo__caption">{{ copy().horizontalCaption }}</p>
    <g-splitter class="sp-demo" [sizes]="[30, 70]">
      <ng-template gSplitterPanel>
        <div class="sp-demo__panel">{{ copy().panel1 }}</div>
      </ng-template>
      <ng-template gSplitterPanel>
        <div class="sp-demo__panel">{{ copy().panel2 }}</div>
      </ng-template>
    </g-splitter>

    <p class="sp-demo__caption">{{ copy().verticalCaption }}</p>
    <g-splitter class="sp-demo" orientation="vertical">
      <ng-template gSplitterPanel>
        <div class="sp-demo__panel">{{ copy().top }}</div>
      </ng-template>
      <ng-template gSplitterPanel>
        <div class="sp-demo__panel">{{ copy().middle }}</div>
      </ng-template>
      <ng-template gSplitterPanel>
        <div class="sp-demo__panel">{{ copy().bottom }}</div>
      </ng-template>
    </g-splitter>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--g-space-4);
    }
    .sp-demo__caption {
      margin: 0;
      font-size: var(--g-font-size-sm);
      color: var(--g-text-muted);
    }
    .sp-demo {
      height: 240px;
    }
    .sp-demo__panel {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      color: var(--g-text-muted);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SplitterBasicDemo {
  private readonly i18n = inject(GLocaleService);
  protected readonly copy = computed(() => layoutCopyFor(this.i18n.tag()).splitter.demo);
}
