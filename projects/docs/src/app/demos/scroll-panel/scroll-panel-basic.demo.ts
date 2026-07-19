import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GScrollPanel } from 'ngx-opendesign';

@Component({
  selector: 'docs-scroll-panel-basic-demo',
  imports: [GScrollPanel],
  template: `
    <g-scroll-panel maxHeight="180px">
      <p>
        OpenDesign là một thư viện component cho Angular, tập trung vào thẩm mỹ hiện đại: control
        dạng pill, bề mặt bo góc nhỏ, và chuyển động mượt mà.
      </p>
      <p>
        Mỗi component được xây dựng với signal, <code>OnPush</code>, và tuân thủ các pattern ARIA để
        đảm bảo khả năng truy cập cho người dùng bàn phím và trình đọc màn hình.
      </p>
      <p>
        Thanh cuộn của <code>g-scroll-panel</code> dùng thuần CSS
        (<code>scrollbar-width</code>/<code>scrollbar-color</code>) theo theme hiện tại, không cần
        JavaScript để vẽ scrollbar tuỳ chỉnh.
      </p>
      <p>
        Khi nội dung bên trong vượt quá <code>maxHeight</code> đã đặt, vùng chứa sẽ tự động hiện
        thanh cuộn dọc thay vì đẩy layout xung quanh giãn ra.
      </p>
      <p>Cuộn xuống để xem hết đoạn văn bản minh hoạ này.</p>
    </g-scroll-panel>
  `,
  styles: `
    :host {
      display: block;
      max-width: 420px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollPanelBasicDemo {}
