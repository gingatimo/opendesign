# ngx-opendesign

Design system cho Angular với thẩm mỹ pill nhất quán, sáng/tối sẵn có, viết bằng signals — standalone và OnPush.

## Cài đặt

```bash
npm install ngx-opendesign @angular/cdk @angular/forms
```

Thêm CSS của OpenDesign vào `angular.json` (đây là nơi định nghĩa toàn bộ design token `--g-*` và bảng màu sáng/tối):

```json
{
  "projects": {
    "ten-app-cua-ban": {
      "architect": {
        "build": {
          "options": {
            "styles": ["node_modules/ngx-opendesign/styles/opendesign.css", "src/styles.scss"]
          }
        }
      }
    }
  }
}
```

Hoặc `@import 'ngx-opendesign/styles/opendesign.css';` trong `styles.scss` nếu bạn thích cách đó.

`opendesign.css` đã kèm sẵn rule a11y `.cdk-visually-hidden` (Toast dùng `LiveAnnouncer` của CDK để
đọc nội dung cho screen reader), nên bạn **không** phải import thêm `@angular/cdk/a11y-prebuilt.css`
— chỉ một file CSS này là đủ.

## Dùng nhanh

```typescript
import { Component } from '@angular/core';
import { GButton, GCard, GCardHeader } from 'ngx-opendesign';

@Component({
  selector: 'app-vi-du',
  imports: [GButton, GCard, GCardHeader],
  template: `
    <g-card>
      <div gCardHeader>Xin chào</div>
      <p>Thẻ này dùng token của OpenDesign nên tự đổi màu theo theme.</p>
      <button g-button (click)="luu()">Lưu thay đổi</button>
      <button g-button variant="outline">Hủy</button>
    </g-card>
  `,
})
export class ViDuComponent {
  luu(): void {
    console.log('đã lưu');
  }
}
```

## Bật chế độ tối

Đặt thuộc tính `data-g-theme="dark"` lên thẻ `<html>`. Không có thuộc tính này thì mặc định là giao diện sáng; mọi component đều đọc token nên đổi màu đồng loạt, không cần sửa gì thêm.

File theme cũng khai báo sẵn `color-scheme: light`/`dark` tương ứng — đây là thứ CSS variable không làm được: nó báo cho trình duyệt biết bề mặt đang sáng hay tối, để những phần giao diện do _trình duyệt_ tự vẽ (thanh cuộn, ô chọn ngày/giờ, nền autofill, gạch chân spellcheck) cũng đi theo theme.

## Component

Nút (Button, Icon Button) · Form (Input, Textarea, Checkbox, Toggle, Radio, Select, File Input) · Hiển thị (Badge, Spinner, Progress, Chip, Avatar, Card, Icon, Image Preview) · Overlay (Dialog, Tooltip, Toast) · Điều hướng (Tabs, Topbar, Sidebar, Stepper, Link, Pagination) · Cấu trúc (Layout, Container, Stack) · Dữ liệu (Table).

## Yêu cầu

- Angular 22 trở lên (standalone components, signals).
- Peer dependencies: `@angular/core`, `@angular/common`, `@angular/cdk` (overlay của Dialog,
  Tooltip, Toast, Select), `@angular/forms` (các control CVA: Input, Textarea, Checkbox, Toggle,
  Radio, Select).

## Tài liệu

Demo sống, code mẫu và bảng API cho từng component: https://gingatimo.github.io/opendesign/

## License

Apache-2.0
