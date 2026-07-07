import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { GAvatar, GBadge, GBadgeVariant, GChip } from 'ngx-opendesign';

interface TeamMember {
  name: string;
  role: string;
  status: 'active' | 'invited' | 'inactive';
}

const STATUS_LABEL: Record<TeamMember['status'], string> = {
  active: 'Đang hoạt động',
  invited: 'Đã mời',
  inactive: 'Ngừng hoạt động',
};

const STATUS_VARIANT: Record<TeamMember['status'], GBadgeVariant> = {
  active: 'success',
  invited: 'warning',
  inactive: 'neutral',
};

const MEMBERS: TeamMember[] = [
  { name: 'Nguyễn Văn An', role: 'Kỹ thuật', status: 'active' },
  { name: 'Trần Thị Bình', role: 'Thiết kế', status: 'invited' },
  { name: 'Lê Hoàng Cường', role: 'Kinh doanh', status: 'active' },
  { name: 'Phạm Thu Hà', role: 'Vận hành', status: 'inactive' },
  { name: 'Đỗ Minh Khang', role: 'Kỹ thuật', status: 'active' },
  { name: 'Vũ Lan Phương', role: 'Thiết kế', status: 'active' },
];

@Component({
  selector: 'docs-filterable-list-demo',
  imports: [GChip, GAvatar, GBadge],
  template: `
    <div class="filterable-list-demo__filters">
      @for (role of roles; track role) {
        <g-chip
          class="filterable-list-demo__chip"
          [class.filterable-list-demo__chip--active]="activeRoles().has(role)"
          role="button"
          tabindex="0"
          [attr.aria-pressed]="activeRoles().has(role)"
          (click)="toggleRole(role)"
          (keydown.enter)="toggleRole(role)"
          (keydown.space)="onFilterKeydownSpace($event, role)"
          >{{ role }}</g-chip
        >
      }
    </div>

    @if (activeRoles().size > 0) {
      <div class="filterable-list-demo__applied">
        <span class="filterable-list-demo__applied-label">Đang lọc:</span>
        @for (role of activeRoles(); track role) {
          <g-chip [removable]="true" [removeLabel]="'Bỏ lọc ' + role" (removed)="toggleRole(role)">
            {{ role }}
          </g-chip>
        }
      </div>
    }

    <ul class="filterable-list-demo__list">
      @for (member of filteredMembers(); track member.name) {
        <li class="filterable-list-demo__item">
          <g-avatar [name]="member.name" size="sm" />
          <div class="filterable-list-demo__info">
            <span class="filterable-list-demo__name">{{ member.name }}</span>
            <span class="filterable-list-demo__role">{{ member.role }}</span>
          </div>
          <g-badge [variant]="statusVariant(member.status)">{{
            statusLabel(member.status)
          }}</g-badge>
        </li>
      } @empty {
        <li class="filterable-list-demo__empty">Không có thành viên nào khớp bộ lọc.</li>
      }
    </ul>
  `,
  styles: `
    :host {
      display: block;
    }
    .filterable-list-demo__filters {
      display: flex;
      flex-wrap: wrap;
      gap: var(--g-space-2);
      margin-bottom: var(--g-space-3);
    }
    .filterable-list-demo__chip {
      cursor: pointer;
    }
    .filterable-list-demo__chip:focus-visible {
      outline: none;
      box-shadow: var(--g-focus-ring);
    }
    .filterable-list-demo__chip.filterable-list-demo__chip--active {
      background: var(--g-primary);
      color: var(--g-on-primary);
    }
    .filterable-list-demo__applied {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--g-space-2);
      margin-bottom: var(--g-space-4);
    }
    .filterable-list-demo__applied-label {
      font-size: var(--g-font-size-sm);
      color: var(--g-text-muted);
    }
    .filterable-list-demo__list {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: var(--g-space-2);
    }
    .filterable-list-demo__item {
      display: flex;
      align-items: center;
      gap: var(--g-space-3);
      padding: var(--g-space-3);
      border: 1px solid var(--g-border);
      border-radius: var(--g-radius-sm);
    }
    .filterable-list-demo__info {
      display: flex;
      flex-direction: column;
      flex: 1;
      min-width: 0;
    }
    .filterable-list-demo__name {
      font-size: var(--g-font-size-md);
      color: var(--g-text);
    }
    .filterable-list-demo__role {
      font-size: var(--g-font-size-xs);
      color: var(--g-text-muted);
    }
    .filterable-list-demo__empty {
      color: var(--g-text-muted);
      font-size: var(--g-font-size-sm);
      padding: var(--g-space-3);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterableListDemo {
  protected readonly roles = ['Kỹ thuật', 'Thiết kế', 'Kinh doanh', 'Vận hành'];
  protected readonly members = MEMBERS;

  protected readonly activeRoles = signal<ReadonlySet<string>>(new Set());

  protected readonly filteredMembers = computed(() => {
    const active = this.activeRoles();
    if (active.size === 0) return this.members;
    return this.members.filter((member) => active.has(member.role));
  });

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

  // Space cuộn trang theo mặc định của trình duyệt khi trên một phần tử role="button" —
  // chặn hành vi đó trước khi toggle, giống cách GCheckbox/GToggle của thư viện tự làm.
  protected onFilterKeydownSpace(event: Event, role: string): void {
    event.preventDefault();
    this.toggleRole(role);
  }

  protected statusLabel(status: TeamMember['status']): string {
    return STATUS_LABEL[status];
  }

  protected statusVariant(status: TeamMember['status']): GBadgeVariant {
    return STATUS_VARIANT[status];
  }
}
