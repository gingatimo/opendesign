import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import {
  GBadge,
  GChip,
  GFreezeColumn,
  GFreezeRow,
  GIcon,
  GIconButton,
  GInput,
  GInputGroup,
  GInputSuffix,
  GPagination,
  GSortHeader,
  GTable,
  GTableContainer,
  GLocaleService,
  gIconEdit,
  gIconSearch,
  gIconTrash,
} from 'ngx-opendesign';
import { PlaybookStatus, playbookCopyFor } from '../../pages/playbook/playbook-copy';

const PAGE_SIZE = 5;

@Component({
  selector: 'docs-list-page-demo',
  imports: [
    GInput,
    GInputGroup,
    GInputSuffix,
    GChip,
    GBadge,
    GTable,
    GTableContainer,
    GSortHeader,
    GFreezeColumn,
    GFreezeRow,
    GPagination,
    GIconButton,
    GIcon,
    DatePipe,
  ],
  template: `
    <div class="list-page-demo__toolbar">
      <g-input-group class="list-page-demo__search">
        <input
          gInput
          type="text"
          [placeholder]="copy().searchPlaceholder"
          [value]="search()"
          (input)="search.set($any($event.target).value)"
        />
        <g-icon gInputSuffix [icon]="iconSearch" size="sm" />
      </g-input-group>

      <div
        class="list-page-demo__status-filter"
        role="group"
        [attr.aria-label]="copy().statusFilterLabel"
      >
        <button
          type="button"
          class="list-page-demo__status-btn"
          [class.list-page-demo__status-btn--active]="statusFilter() === 'all'"
          [attr.aria-pressed]="statusFilter() === 'all'"
          (click)="statusFilter.set('all')"
        >
          {{ copy().all }}
        </button>
        <button
          type="button"
          class="list-page-demo__status-btn"
          [class.list-page-demo__status-btn--active]="statusFilter() === 'active'"
          [attr.aria-pressed]="statusFilter() === 'active'"
          (click)="statusFilter.set('active')"
        >
          <g-badge variant="success">{{ copy().statuses.active }}</g-badge>
        </button>
        <button
          type="button"
          class="list-page-demo__status-btn"
          [class.list-page-demo__status-btn--active]="statusFilter() === 'invited'"
          [attr.aria-pressed]="statusFilter() === 'invited'"
          (click)="statusFilter.set('invited')"
        >
          <g-badge variant="warning">{{ copy().statuses.invited }}</g-badge>
        </button>
        <button
          type="button"
          class="list-page-demo__status-btn"
          [class.list-page-demo__status-btn--active]="statusFilter() === 'inactive'"
          [attr.aria-pressed]="statusFilter() === 'inactive'"
          (click)="statusFilter.set('inactive')"
        >
          <g-badge variant="neutral">{{ copy().statuses.inactive }}</g-badge>
        </button>
      </div>
    </div>

    <div class="list-page-demo__roles" role="group" [attr.aria-label]="copy().roleFilterLabel">
      @for (role of copy().roles; track $index) {
        <g-chip
          class="list-page-demo__chip"
          [class.list-page-demo__chip--active]="activeRoles().has(role)"
          role="button"
          tabindex="0"
          [attr.aria-pressed]="activeRoles().has(role)"
          (click)="toggleRole(role)"
          (keydown.enter)="toggleRole(role)"
          (keydown.space)="onRoleSpace($event, role)"
          >{{ role }}</g-chip
        >
      }
    </div>

    @if (activeRoles().size > 0) {
      <div class="list-page-demo__applied">
        <span class="list-page-demo__applied-label">{{ copy().appliedRoles }}</span>
        @for (role of activeRoles(); track role) {
          <g-chip
            [removable]="true"
            [removeLabel]="copy().removeRole(role)"
            (removed)="toggleRole(role)"
          >
            {{ role }}
          </g-chip>
        }
      </div>
    }

    <g-table-container [minRows]="pageSize">
      <table gTable [striped]="true">
        <thead>
          <tr gFreezeRow>
            <th scope="col" gFreezeColumn [gSortHeader]="sortDir()">
              <button type="button" class="list-page-demo__sort-btn" (click)="toggleSort()">
                {{ copy().columns.name }}
              </button>
            </th>
            <th scope="col">{{ copy().columns.role }}</th>
            <th scope="col">{{ copy().columns.status }}</th>
            <th scope="col">{{ copy().columns.updatedAt }}</th>
            <th scope="col">{{ copy().columns.actions }}</th>
          </tr>
        </thead>
        <tbody>
          @for (row of pageRows(); track row.name) {
            <tr>
              <td>{{ row.name }}</td>
              <td>{{ row.role }}</td>
              <td>
                <g-badge [variant]="statusVariant(row.status)">{{
                  statusLabel(row.status)
                }}</g-badge>
              </td>
              <td>{{ row.updatedAt | date: copy().dateFormat }}</td>
              <td>
                <button type="button" g-icon-button [attr.aria-label]="copy().edit">
                  <g-icon [icon]="iconEdit" />
                </button>
                <button type="button" g-icon-button [attr.aria-label]="copy().delete">
                  <g-icon [icon]="iconTrash" />
                </button>
              </td>
            </tr>
          } @empty {
            <tr>
              <td colspan="5" class="list-page-demo__empty">{{ copy().empty }}</td>
            </tr>
          }
        </tbody>
      </table>
    </g-table-container>

    <div class="list-page-demo__pagination">
      <g-pagination [(page)]="page" [pageCount]="pageCount()" />
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
    .list-page-demo__toolbar {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--g-space-3);
      margin-bottom: var(--g-space-3);
    }
    .list-page-demo__search {
      flex: 1;
      min-width: 200px;
    }
    /* The search suffix icon is decorative, so mute it like placeholder text. */
    .list-page-demo__search [gInputSuffix] {
      color: var(--g-text-muted);
    }
    .list-page-demo__status-filter {
      display: flex;
      flex-wrap: wrap;
      gap: var(--g-space-2);
    }
    .list-page-demo__status-btn {
      background: none;
      border: 1px solid transparent;
      border-radius: var(--g-radius-pill);
      padding: var(--g-space-1) var(--g-space-2);
      font: inherit;
      color: inherit;
      cursor: pointer;
    }
    .list-page-demo__status-btn:focus-visible {
      outline: none;
      box-shadow: var(--g-focus-ring);
    }
    .list-page-demo__status-btn--active {
      border-color: var(--g-primary);
    }
    .list-page-demo__roles {
      display: flex;
      flex-wrap: wrap;
      gap: var(--g-space-2);
      margin-bottom: var(--g-space-3);
    }
    .list-page-demo__chip {
      cursor: pointer;
    }
    .list-page-demo__chip:focus-visible {
      outline: none;
      box-shadow: var(--g-focus-ring);
    }
    .list-page-demo__chip.list-page-demo__chip--active {
      background: var(--g-primary);
      color: var(--g-on-primary);
    }
    .list-page-demo__applied {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--g-space-2);
      margin-bottom: var(--g-space-3);
    }
    .list-page-demo__applied-label {
      font-size: var(--g-font-size-sm);
      color: var(--g-text-muted);
    }
    .list-page-demo__sort-btn {
      background: none;
      border: none;
      font: inherit;
      color: inherit;
      cursor: pointer;
      padding: 0;
    }
    .list-page-demo__empty {
      text-align: center;
      color: var(--g-text-muted);
      padding: var(--g-space-4);
    }
    .list-page-demo__pagination {
      margin-top: var(--g-space-3);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListPageDemo {
  private readonly i18n = inject(GLocaleService);
  protected readonly copy = computed(() => playbookCopyFor(this.i18n.tag()).list);

  protected readonly search = signal('');
  protected readonly statusFilter = signal<PlaybookStatus | 'all'>('all');
  protected readonly activeRoles = signal<ReadonlySet<string>>(new Set());
  protected readonly sortDir = signal<'asc' | 'desc' | null>(null);
  protected readonly page = signal(1);

  protected readonly pageSize = PAGE_SIZE;
  protected readonly iconEdit = gIconEdit;
  protected readonly iconTrash = gIconTrash;
  protected readonly iconSearch = gIconSearch;

  private readonly filtered = computed(() => {
    const term = this.search().trim().toLowerCase();
    const status = this.statusFilter();
    const roles = this.activeRoles();
    return this.copy().rows.filter((row) => {
      const matchesTerm = !term || row.name.toLowerCase().includes(term);
      const matchesStatus = status === 'all' || row.status === status;
      const matchesRole = roles.size === 0 || roles.has(row.role);
      return matchesTerm && matchesStatus && matchesRole;
    });
  });

  private readonly sorted = computed(() => {
    const dir = this.sortDir();
    if (!dir) return this.filtered();
    const list = [...this.filtered()].sort((a, b) => a.name.localeCompare(b.name, this.i18n.tag()));
    return dir === 'asc' ? list : list.reverse();
  });

  protected readonly pageCount = computed(() =>
    Math.max(1, Math.ceil(this.sorted().length / PAGE_SIZE)),
  );

  protected readonly pageRows = computed(() => {
    const start = (this.page() - 1) * PAGE_SIZE;
    return this.sorted().slice(start, start + PAGE_SIZE);
  });

  constructor() {
    effect(() => {
      this.search();
      this.statusFilter();
      this.activeRoles();
      this.copy();
      this.page.set(1);
    });

    effect(() => {
      const roles = this.copy().roles;
      this.activeRoles.update(
        (current) => new Set([...current].filter((role) => roles.includes(role))),
      );
    });
  }

  protected toggleSort(): void {
    this.sortDir.update((dir) => (dir === 'asc' ? 'desc' : dir === 'desc' ? null : 'asc'));
  }

  protected toggleRole(role: string): void {
    this.activeRoles.update((current) => {
      const next = new Set(current);
      if (next.has(role)) {
        next.delete(role);
      } else {
        next.add(role);
      }
      return next;
    });
  }

  protected onRoleSpace(event: Event, role: string): void {
    event.preventDefault();
    this.toggleRole(role);
  }

  protected statusLabel(status: PlaybookStatus): string {
    return this.copy().statuses[status];
  }

  protected statusVariant(status: PlaybookStatus) {
    return this.copy().statusVariants[status];
  }
}
