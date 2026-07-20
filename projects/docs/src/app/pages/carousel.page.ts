import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiRow, ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { CarouselBasicDemo } from '../demos/carousel/carousel-basic.demo';

@Component({
  imports: [CarouselBasicDemo, ApiTable, CodeBlock, DemoSection],
  template: `
    <h1>Carousel</h1>
    <p>
      Băng chuyền ngang cho <b>nội dung bất kỳ</b> — chiếu các card vào qua
      <code>&lt;ng-content&gt;</code>. Track dùng scroll-snap: mỗi item giữ
      <b>bề rộng tự nhiên</b> nên cả item <b>cùng kích thước</b> lẫn <b>khác kích thước</b> (vd. thẻ
      ngang kiểu thẻ tín dụng xen thẻ dọc) đều chạy đúng. Nút prev/next cuộn đúng một item mỗi lần
      và tự ẩn ở biên. Khác <code>GImageSlider</code> (một ảnh/khung trượt).
    </p>

    <docs-demo-section>
      <docs-carousel-basic-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/carousel/carousel-basic.demo.ts" />

    <h2>Cách dùng</h2>
    <p>
      Đặt các item (card) làm con trực tiếp của <code>&lt;g-carousel&gt;</code> và cho mỗi item một
      bề rộng (cố định hoặc theo nội dung). Carousel tự lo cuộn/snap/nút — item không bắt buộc phải
      là ảnh, có thể là card, thẻ sản phẩm, biểu đồ…
    </p>

    <h2>API — GCarousel</h2>
    <docs-api-table [rows]="apiRows" />

    <h2>Accessibility</h2>
    <ul>
      <li>
        Track là vùng cuộn có <code>tabindex="0"</code> + <code>role="group"</code> (<code
          >aria-roledescription="băng chuyền"</code
        >); focus vào track rồi dùng phím ←/→ để cuộn.
      </li>
      <li>Hai nút điều hướng có <code>aria-label</code> và tự <code>disabled</code>/ẩn ở biên.</li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CarouselPage {
  protected readonly apiRows: ApiRow[] = [
    {
      name: 'navPlacement',
      type: "'overlay' | 'flanking'",
      default: "'flanking'",
      description:
        "Vị trí nút prev/next. 'flanking' nằm ngoài track (không đè lên card); 'overlay' đè lên track, mờ nhẹ lúc nghỉ, rê/focus vào hiện rõ.",
    },
    {
      name: 'align',
      type: "'stretch' | 'start' | 'center' | 'end'",
      default: "'stretch'",
      description:
        'Căn item theo trục dọc khi các item khác chiều cao (map align-items của track).',
    },
    {
      name: 'center',
      type: 'boolean',
      default: 'false',
      description:
        'Căn giữa các item khi chúng vừa khung; khi tràn tự lùi về mép trái để vẫn cuộn/hiện nút.',
    },
  ];
}
