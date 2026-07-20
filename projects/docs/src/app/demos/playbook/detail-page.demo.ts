import { ChangeDetectionStrategy, Component } from '@angular/core';
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
} from 'ngx-opendesign';

interface Field {
  label: string;
  value: string;
}

const FIELDS: Field[] = [
  { label: 'Email', value: 'an.nguyen@vidu.com' },
  { label: 'Điện thoại', value: '0901 234 567' },
  { label: 'Phòng ban', value: 'Kỹ thuật' },
  { label: 'Chức danh', value: 'Kỹ sư phần mềm' },
  { label: 'Ngày vào làm', value: '02/03/2024' },
  { label: 'Quản lý trực tiếp', value: 'Lê Hoàng Cường' },
];

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
        <g-avatar name="Nguyễn Văn An" size="lg" />
        <div class="detail-demo__ident">
          <div class="detail-demo__name-row">
            <h3 class="detail-demo__name">Nguyễn Văn An</h3>
            <g-badge variant="success">Đang hoạt động</g-badge>
          </div>
          <span class="detail-demo__subtitle">Kỹ thuật · Nhân viên #NV-0142</span>
        </div>
        <div class="detail-demo__actions">
          <button g-button variant="outline"><g-icon [icon]="iconEdit" size="sm" /> Sửa</button>
          <button g-button variant="danger"><g-icon [icon]="iconTrash" size="sm" /> Xoá</button>
        </div>
      </div>

      <g-divider />

      <g-tabs tablistLabel="Chi tiết nhân viên">
        <g-tab label="Thông tin">
          <dl class="detail-demo__grid">
            @for (field of fields; track field.label) {
              <div class="detail-demo__field">
                <dt>{{ field.label }}</dt>
                <dd>{{ field.value }}</dd>
              </div>
            }
          </dl>
        </g-tab>
        <g-tab label="Hoạt động">
          <g-timeline class="detail-demo__timeline">
            <g-timeline-item status="warning">
              <strong>Nhắc gia hạn hợp đồng</strong>
              <p>Hợp đồng lao động sắp hết hạn — còn 30 ngày.</p>
            </g-timeline-item>
            <g-timeline-item status="success">
              <strong>Cập nhật hồ sơ</strong>
              <p>Đổi số điện thoại liên hệ — 15/07/2026, 09:30.</p>
            </g-timeline-item>
            <g-timeline-item status="success">
              <strong>Hoàn thành onboarding</strong>
              <p>Đã ký hợp đồng và nhận thiết bị — 05/03/2024.</p>
            </g-timeline-item>
            <g-timeline-item>
              <strong>Tạo tài khoản</strong>
              <p>Khởi tạo tài khoản nội bộ — 02/03/2024.</p>
            </g-timeline-item>
          </g-timeline>
        </g-tab>
      </g-tabs>
    </g-card>
  `,
  styles: `
    .detail-demo__card {
      max-width: 560px;
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
  protected readonly fields = FIELDS;
  protected readonly iconEdit = gIconEdit;
  protected readonly iconTrash = gIconTrash;
}
