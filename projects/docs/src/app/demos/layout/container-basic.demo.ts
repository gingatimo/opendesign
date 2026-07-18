import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GContainer } from 'ngx-opendesign';

@Component({
  selector: 'docs-container-basic-demo',
  imports: [GContainer],
  template: `
    <div gContainer class="demo-container">
      <p>
        Nội dung bên trong <code>gContainer</code> bị giới hạn chiều rộng tối đa và canh giữa theo
        chiều ngang — chiều rộng tối đa lấy từ token <code>--g-container-max-width</code> (mặc định
        960px, demo này ghi đè xuống 480px để thấy rõ hiệu ứng).
      </p>
      <p>Khi vùng chứa rộng hơn giá trị này, khoảng trống hai bên tự chia đều.</p>
    </div>
  `,
  styles: `
    .demo-container {
      --g-container-max-width: 480px;
      background: var(--g-surface);
      border-radius: var(--g-radius-sm);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContainerBasicDemo {}
