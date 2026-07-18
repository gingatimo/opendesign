import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, signal } from '@angular/core';
import {
  GBadge,
  GBadgeVariant,
  GFreezeColumn,
  GFreezeRow,
  GIcon,
  GIconButton,
  GInput,
  GPagination,
  GSortHeader,
  GTable,
  gIconEdit,
  gIconSearch,
  gIconTrash,
} from 'ngx-opendesign';

interface Row {
  name: string;
  status: 'active' | 'invited' | 'inactive';
  updatedAt: Date;
}

const STATUS_LABEL: Record<Row['status'], string> = {
  active: 'Đang hoạt động',
  invited: 'Đã mời',
  inactive: 'Ngừng hoạt động',
};

const STATUS_VARIANT: Record<Row['status'], GBadgeVariant> = {
  active: 'success',
  invited: 'warning',
  inactive: 'neutral',
};

const ROWS: Row[] = [
  { name: 'Nguyễn Văn An', status: 'active', updatedAt: new Date(2026, 6, 15, 9, 30) },
  { name: 'Trần Thị Bình', status: 'invited', updatedAt: new Date(2026, 6, 10, 14, 5) },
  { name: 'Lê Hoàng Cường', status: 'active', updatedAt: new Date(2026, 5, 28, 8, 15) },
  { name: 'Phạm Thu Hà', status: 'inactive', updatedAt: new Date(2026, 4, 2, 11, 40) },
  { name: 'Đỗ Minh Khang', status: 'active', updatedAt: new Date(2026, 6, 1, 16, 20) },
  { name: 'Vũ Lan Phương', status: 'invited', updatedAt: new Date(2026, 6, 12, 10, 0) },
  { name: 'Hoàng Đức Mạnh', status: 'active', updatedAt: new Date(2026, 3, 18, 9, 0) },
  { name: 'Bùi Thị Ngọc', status: 'inactive', updatedAt: new Date(2026, 2, 22, 13, 45) },
  { name: 'Ngô Quốc Bảo', status: 'active', updatedAt: new Date(2026, 5, 5, 7, 50) },
  { name: 'Đặng Thị Lan', status: 'invited', updatedAt: new Date(2026, 6, 16, 15, 30) },
  { name: 'Trịnh Văn Đạt', status: 'active', updatedAt: new Date(2026, 1, 14, 9, 10) },
  { name: 'Lý Thị Hồng', status: 'inactive', updatedAt: new Date(2026, 0, 29, 17, 0) },
  { name: 'Phan Văn Hùng', status: 'active', updatedAt: new Date(2026, 4, 20, 10, 25) },
  { name: 'Đinh Thị Kim', status: 'invited', updatedAt: new Date(2026, 5, 30, 12, 15) },
  { name: 'Vương Minh Tuấn', status: 'active', updatedAt: new Date(2026, 6, 8, 8, 40) },
  { name: 'Châu Thị Mai', status: 'inactive', updatedAt: new Date(2026, 3, 5, 14, 50) },
];

const PAGE_SIZE = 5;

@Component({
  selector: 'docs-list-page-demo',
  imports: [
    GInput,
    GBadge,
    GTable,
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
      <div class="list-page-demo__search">
        <g-icon [icon]="iconSearch" size="sm" />
        <input
          gInput
          type="text"
          placeholder="Tìm theo tên…"
          [value]="search()"
          (input)="search.set($any($event.target).value)"
        />
      </div>

      <div class="list-page-demo__status-filter" role="group" aria-label="Lọc theo trạng thái">
        <button
          type="button"
          class="list-page-demo__status-btn"
          [class.list-page-demo__status-btn--active]="statusFilter() === 'all'"
          [attr.aria-pressed]="statusFilter() === 'all'"
          (click)="statusFilter.set('all')"
        >
          Tất cả
        </button>
        <button
          type="button"
          class="list-page-demo__status-btn"
          [class.list-page-demo__status-btn--active]="statusFilter() === 'active'"
          [attr.aria-pressed]="statusFilter() === 'active'"
          (click)="statusFilter.set('active')"
        >
          <g-badge variant="success">Đang hoạt động</g-badge>
        </button>
        <button
          type="button"
          class="list-page-demo__status-btn"
          [class.list-page-demo__status-btn--active]="statusFilter() === 'invited'"
          [attr.aria-pressed]="statusFilter() === 'invited'"
          (click)="statusFilter.set('invited')"
        >
          <g-badge variant="warning">Đã mời</g-badge>
        </button>
        <button
          type="button"
          class="list-page-demo__status-btn"
          [class.list-page-demo__status-btn--active]="statusFilter() === 'inactive'"
          [attr.aria-pressed]="statusFilter() === 'inactive'"
          (click)="statusFilter.set('inactive')"
        >
          <g-badge variant="neutral">Ngừng hoạt động</g-badge>
        </button>
      </div>
    </div>

    <div
      style="overflow: auto; border: 1px solid var(--g-border); border-radius: var(--g-radius-md)"
    >
      <table gTable [striped]="true">
        <thead>
          <tr gFreezeRow>
            <th scope="col" gFreezeColumn [gSortHeader]="sortDir()">
              <button type="button" class="list-page-demo__sort-btn" (click)="toggleSort()">
                Tên
              </button>
            </th>
            <th scope="col">Trạng thái</th>
            <th scope="col">Cập nhật</th>
            <th scope="col">Hành động</th>
          </tr>
        </thead>
        <tbody>
          @for (row of pageRows(); track row.name) {
            <tr>
              <td>{{ row.name }}</td>
              <td>
                <g-badge [variant]="statusVariant(row.status)">{{
                  statusLabel(row.status)
                }}</g-badge>
              </td>
              <td>{{ row.updatedAt | date: 'dd/MM/yyyy HH:mm' }}</td>
              <td>
                <button type="button" g-icon-button aria-label="Sửa">
                  <g-icon [icon]="iconEdit" />
                </button>
                <button type="button" g-icon-button aria-label="Xoá">
                  <g-icon [icon]="iconTrash" />
                </button>
              </td>
            </tr>
          } @empty {
            <tr>
              <td colspan="4" class="list-page-demo__empty">Không có dữ liệu khớp bộ lọc.</td>
            </tr>
          }
        </tbody>
      </table>
    </div>

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
      display: flex;
      align-items: center;
      gap: var(--g-space-2);
      flex: 1;
      min-width: 200px;
      color: var(--g-text-muted);
    }
    .list-page-demo__search input {
      flex: 1;
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
  protected readonly search = signal('');
  protected readonly statusFilter = signal<Row['status'] | 'all'>('all');
  protected readonly sortDir = signal<'asc' | 'desc' | null>(null);
  protected readonly page = signal(1);

  protected readonly iconEdit = gIconEdit;
  protected readonly iconTrash = gIconTrash;
  protected readonly iconSearch = gIconSearch;

  private readonly filtered = computed(() => {
    const term = this.search().trim().toLowerCase();
    const status = this.statusFilter();
    return ROWS.filter((row) => {
      const matchesTerm = !term || row.name.toLowerCase().includes(term);
      const matchesStatus = status === 'all' || row.status === status;
      return matchesTerm && matchesStatus;
    });
  });

  private readonly sorted = computed(() => {
    const dir = this.sortDir();
    if (!dir) return this.filtered();
    const list = [...this.filtered()].sort((a, b) => a.name.localeCompare(b.name, 'vi'));
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
    // search/statusFilter đổi -> danh sách lọc ngắn lại, trang hiện tại có thể vượt quá pageCount
    // mới. Quay về trang 1 để tránh bảng trống. Effect chỉ ĐỌC search/statusFilter, chỉ GHI page —
    // không đọc lại page() nên không tự kích hoạt lại chính nó (không vòng lặp).
    effect(() => {
      this.search();
      this.statusFilter();
      this.page.set(1);
    });
  }

  protected toggleSort(): void {
    this.sortDir.update((dir) => (dir === 'asc' ? 'desc' : dir === 'desc' ? null : 'asc'));
  }

  protected statusLabel(status: Row['status']): string {
    return STATUS_LABEL[status];
  }

  protected statusVariant(status: Row['status']): GBadgeVariant {
    return STATUS_VARIANT[status];
  }
}
