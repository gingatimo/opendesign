import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { GFreezeColumn, GFreezeRow, GSortHeader, GTable } from 'ngx-opendesign';

interface Employee {
  name: string;
  department: string;
  email: string;
  phone: string;
  position: string;
  note: string;
}

const EMPLOYEES: Employee[] = [
  {
    name: 'Nguyễn Văn An',
    department: 'Kỹ thuật',
    email: 'an.nguyen@example.com',
    phone: '090 123 4567',
    position: 'Kỹ sư phần mềm',
    note: 'Phụ trách module thanh toán',
  },
  {
    name: 'Trần Thị Bình',
    department: 'Thiết kế',
    email: 'binh.tran@example.com',
    phone: '090 234 5678',
    position: 'Trưởng nhóm thiết kế',
    note: 'Đang nghỉ phép đến hết tuần',
  },
  {
    name: 'Lê Hoàng Cường',
    department: 'Kinh doanh',
    email: 'cuong.le@example.com',
    phone: '090 345 6789',
    position: 'Chuyên viên kinh doanh',
    note: '—',
  },
  {
    name: 'Phạm Thu Hà',
    department: 'Vận hành',
    email: 'ha.pham@example.com',
    phone: '090 456 7890',
    position: 'Điều phối vận hành',
    note: 'Mới chuyển từ chi nhánh Đà Nẵng',
  },
  {
    name: 'Đỗ Minh Khang',
    department: 'Kỹ thuật',
    email: 'khang.do@example.com',
    phone: '090 567 8901',
    position: 'Kỹ sư kiểm thử',
    note: '—',
  },
  {
    name: 'Vũ Lan Phương',
    department: 'Thiết kế',
    email: 'phuong.vu@example.com',
    phone: '090 678 9012',
    position: 'Nhà thiết kế UX',
    note: 'Đang dẫn dắt dự án redesign',
  },
  {
    name: 'Hoàng Đức Mạnh',
    department: 'Nhân sự',
    email: 'manh.hoang@example.com',
    phone: '090 789 0123',
    position: 'Chuyên viên tuyển dụng',
    note: '—',
  },
  {
    name: 'Bùi Thị Ngọc',
    department: 'Tài chính',
    email: 'ngoc.bui@example.com',
    phone: '090 890 1234',
    position: 'Kế toán trưởng',
    note: 'Phê duyệt ngân sách quý',
  },
];

@Component({
  selector: 'docs-table-advanced-demo',
  imports: [GTable, GSortHeader, GFreezeColumn, GFreezeRow],
  template: `
    <div
      style="max-width: 520px; max-height: 220px; overflow: auto; border: 1px solid var(--g-border); border-radius: var(--g-radius-md)"
    >
      <table gTable [striped]="true">
        <thead>
          <tr gFreezeRow>
            <th scope="col" gFreezeColumn [gSortHeader]="sortDir()">
              <button type="button" class="table-advanced-demo__sort-btn" (click)="toggleSort()">
                Tên
              </button>
            </th>
            <th scope="col">Phòng ban</th>
            <th scope="col">Email</th>
            <th scope="col">Điện thoại</th>
            <th scope="col">Vị trí</th>
            <th scope="col">Ghi chú</th>
          </tr>
        </thead>
        <tbody>
          @for (row of rows(); track row.name) {
            <tr>
              <td>{{ row.name }}</td>
              <td>{{ row.department }}</td>
              <td>{{ row.email }}</td>
              <td>{{ row.phone }}</td>
              <td>{{ row.position }}</td>
              <td>{{ row.note }}</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
  styles: `
    .table-advanced-demo__sort-btn {
      background: none;
      border: none;
      font: inherit;
      color: inherit;
      cursor: pointer;
      padding: 0;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableAdvancedDemo {
  protected readonly sortDir = signal<'asc' | 'desc' | null>('asc');

  protected readonly rows = computed(() => {
    const dir = this.sortDir();
    if (dir === null) return EMPLOYEES;
    const sorted = [...EMPLOYEES].sort((a, b) => a.name.localeCompare(b.name, 'vi'));
    return dir === 'asc' ? sorted : sorted.reverse();
  });

  protected toggleSort(): void {
    this.sortDir.update((dir) => (dir === 'asc' ? 'desc' : dir === 'desc' ? null : 'asc'));
  }
}
