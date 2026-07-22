import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import {
  GAvatar,
  GBadge,
  GButton,
  GCard,
  GDivider,
  GIcon,
  GTab,
  GTabs,
  GTimeline,
  GTimelineItem,
  gIconEdit,
  gIconTrash,
  GLocaleService,
} from 'ngx-opendesign';
import { playbookCopyFor } from '../../pages/playbook/playbook-copy';

@Component({
  selector: 'docs-detail-page-demo',
  imports: [
    GAvatar,
    GBadge,
    GButton,
    GCard,
    GDivider,
    GIcon,
    GTab,
    GTabs,
    GTimeline,
    GTimelineItem,
  ],
  template: `
    <g-card class="detail-demo__card">
      <div class="detail-demo__header">
        <g-avatar [name]="copy().personName" size="lg" />
        <div class="detail-demo__ident">
          <div class="detail-demo__name-row">
            <h3 class="detail-demo__name">{{ copy().personName }}</h3>
            <g-badge variant="success">{{ copy().status }}</g-badge>
          </div>
          <span class="detail-demo__subtitle">{{ copy().subtitle }}</span>
        </div>
        <div class="detail-demo__actions">
          <button g-button variant="outline">
            <g-icon [icon]="iconEdit" size="sm" /> {{ copy().edit }}
          </button>
          <button g-button variant="danger">
            <g-icon [icon]="iconTrash" size="sm" /> {{ copy().delete }}
          </button>
        </div>
      </div>

      <g-divider />

      <g-tabs [tablistLabel]="copy().tablistLabel">
        <g-tab [label]="copy().profileTab">
          <dl class="detail-demo__grid">
            @for (field of copy().fields; track field.label) {
              <div class="detail-demo__field">
                <dt>{{ field.label }}</dt>
                <dd>{{ field.value }}</dd>
              </div>
            }
          </dl>
        </g-tab>
        <g-tab [label]="copy().activityTab">
          <g-timeline class="detail-demo__timeline">
            @for (item of copy().timeline; track item.title) {
              <g-timeline-item [status]="item.status ?? 'default'">
                <strong>{{ item.title }}</strong>
                <p>{{ item.body }}</p>
              </g-timeline-item>
            }
          </g-timeline>
        </g-tab>
      </g-tabs>
    </g-card>
  `,
  styles: `
    .detail-demo__card {
      max-width: 560px;
    }
    /* GDivider is only a 1px host line, so add vertical room between header and tabs. */
    .detail-demo__card g-divider {
      margin-block: var(--g-space-4);
    }
    .detail-demo__header {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: var(--g-space-4);
    }
    .detail-demo__ident {
      display: flex;
      flex-direction: column;
      gap: var(--g-space-1);
      flex: 1;
      min-width: 0;
    }
    .detail-demo__name-row {
      display: flex;
      align-items: center;
      gap: var(--g-space-3);
    }
    .detail-demo__name {
      margin: 0;
      font-size: var(--g-font-size-lg);
    }
    .detail-demo__subtitle {
      font-size: var(--g-font-size-sm);
      color: var(--g-text-muted);
    }
    .detail-demo__actions {
      display: flex;
      gap: var(--g-space-2);
    }
    .detail-demo__grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: var(--g-space-4);
      margin: 0;
    }
    .detail-demo__field {
      display: flex;
      flex-direction: column;
      gap: var(--g-space-1);
    }
    .detail-demo__field dt {
      font-size: var(--g-font-size-xs);
      color: var(--g-text-muted);
    }
    .detail-demo__field dd {
      margin: 0;
      font-size: var(--g-font-size-md);
      color: var(--g-text);
    }
    .detail-demo__timeline strong {
      display: block;
      margin-bottom: var(--g-space-1);
    }
    .detail-demo__timeline p {
      margin: 0;
      color: var(--g-text-muted);
      font-size: var(--g-font-size-sm);
    }
    @media (max-width: 480px) {
      .detail-demo__grid {
        grid-template-columns: minmax(0, 1fr);
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailPageDemo {
  private readonly i18n = inject(GLocaleService);
  protected readonly copy = computed(() => playbookCopyFor(this.i18n.tag()).detail);
  protected readonly iconEdit = gIconEdit;
  protected readonly iconTrash = gIconTrash;
}
