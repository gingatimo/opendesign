import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GSplitter, GSplitterPanel } from 'ngx-opendesign';

@Component({
  selector: 'docs-splitter-basic-demo',
  imports: [GSplitter, GSplitterPanel],
  template: `
    <p class="sp-demo__caption">Ngang — kéo thanh giữa để đổi chiều rộng hai bên</p>
    <g-splitter class="sp-demo" [sizes]="[30, 70]">
      <ng-template gSplitterPanel>
        <div class="sp-demo__panel">Panel 1</div>
      </ng-template>
      <ng-template gSplitterPanel>
        <div class="sp-demo__panel">Panel 2</div>
      </ng-template>
    </g-splitter>

    <p class="sp-demo__caption">Dọc + nhiều panel (kéo từng thanh)</p>
    <g-splitter class="sp-demo" orientation="vertical">
      <ng-template gSplitterPanel>
        <div class="sp-demo__panel">Trên</div>
      </ng-template>
      <ng-template gSplitterPanel>
        <div class="sp-demo__panel">Giữa</div>
      </ng-template>
      <ng-template gSplitterPanel>
        <div class="sp-demo__panel">Dưới</div>
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
export class SplitterBasicDemo {}
