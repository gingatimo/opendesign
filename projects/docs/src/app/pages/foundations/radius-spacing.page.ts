import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { GLocaleService } from 'ngx-opendesign';
import { DemoSection } from '../../shared/demo-section';
import { TokenTable } from '../../shared/token-table';
import { foundationCopyFor } from './foundation-copy';

@Component({
  imports: [TokenTable, DemoSection],
  template: `
    <h1>{{ radiusSpacing().title }}</h1>
    <p>{{ radiusSpacing().intro }}</p>

    <h2>{{ radiusSpacing().radiusTitle }}</h2>
    <docs-demo-section>
      <div class="radius-demo">
        <div class="radius-demo__box" style="border-radius: var(--g-radius-pill)">pill</div>
        <div class="radius-demo__box" style="border-radius: var(--g-radius-sm)">sm</div>
        <div class="radius-demo__box" style="border-radius: var(--g-radius-md)">md</div>
      </div>
    </docs-demo-section>
    <docs-token-table [rows]="radiusSpacing().radiusRows" />
    <p class="note">{{ radiusSpacing().radiusNote }}</p>

    <h2>{{ radiusSpacing().controlTitle }}</h2>
    <docs-token-table [rows]="radiusSpacing().controlRows" />

    <h2>{{ radiusSpacing().spacingTitle }}</h2>
    <docs-demo-section>
      <div class="spacing-demo">
        @for (space of radiusSpacing().spacingRows; track space.name) {
          <div class="spacing-demo__row">
            <code class="spacing-demo__label">{{ space.name }}</code>
            <span class="spacing-demo__bar" [style.width]="space.value"></span>
            <span class="spacing-demo__value">{{ space.value }}</span>
          </div>
        }
      </div>
    </docs-demo-section>
    <docs-token-table [rows]="radiusSpacing().spacingRows" />

    <h2>{{ radiusSpacing().elevationMotionTitle }}</h2>
    <docs-token-table [rows]="radiusSpacing().elevationMotionRows" />
  `,
  styles: `
    .radius-demo {
      display: flex;
      gap: var(--g-space-4);
    }
    .radius-demo__box {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 96px;
      height: 64px;
      background: var(--g-secondary-bg);
      color: var(--g-text);
      font-size: var(--g-font-size-xs);
    }
    .spacing-demo {
      display: flex;
      flex-direction: column;
      gap: var(--g-space-2);
    }
    .spacing-demo__row {
      display: flex;
      align-items: center;
      gap: var(--g-space-3);
    }
    .spacing-demo__label {
      width: 96px;
      font-size: var(--g-font-size-xs);
      color: var(--g-text-muted);
    }
    .spacing-demo__bar {
      display: block;
      height: var(--g-space-3);
      background: var(--g-primary);
      border-radius: var(--g-radius-sm);
    }
    .spacing-demo__value {
      font-size: var(--g-font-size-xs);
      color: var(--g-text-muted);
    }
    .note {
      color: var(--g-text-muted);
      font-size: var(--g-font-size-sm);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RadiusSpacingPage {
  private readonly i18n = inject(GLocaleService);
  protected readonly radiusSpacing = computed(
    () => foundationCopyFor(this.i18n.tag()).radiusSpacing,
  );
}
