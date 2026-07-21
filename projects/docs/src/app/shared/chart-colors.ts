import { ChangeDetectionStrategy, Component } from '@angular/core';

// Phần "Màu sắc" dùng CHUNG cho cả 4 trang chart — quy tắc màu giống hệt nhau nên viết một chỗ,
// tránh 4 bản mô tả lệch nhau về sau.
@Component({
  selector: 'docs-chart-colors',
  template: `
    <h2>Màu sắc</h2>
    <p>
      Không truyền gì thì mỗi chuỗi/múi lấy màu theo <b>bảng màu token</b>
      <code>--g-chart-1</code>…<code>--g-chart-8</code>, <b>lặp vòng</b> khi có hơn 8 (thứ 9 quay
      lại màu 1). Bảng này khai báo cho cả sáng lẫn tối nên đổi theme là chart đổi theo.
    </p>
    <p>
      Muốn màu riêng thì đặt <code>color</code> trên từng phần tử dữ liệu — giá trị đi thẳng vào
      <code>fill</code>/<code>stroke</code> của SVG, nên <b>nhận mọi màu CSS hợp lệ</b>:
    </p>
    <ul>
      <li><code>#e11d48</code>, <code>#2563eb80</code> (hex, có cả kênh alpha)</li>
      <li>
        <code>rgb(225 29 72)</code>, <code>hsl(280 70% 50%)</code>, <code>oklch(0.7 0.2 250)</code>
      </li>
      <li><code>tomato</code> và các tên màu CSS</li>
      <li><code>var(--brand)</code>, kể cả có fallback: <code>var(--brand, #2563eb)</code></li>
      <li><code>color-mix(in srgb, var(--g-chart-1), white 40%)</code></li>
    </ul>
    <p><b>Chưa hỗ trợ:</b></p>
    <ul>
      <li>
        <b>Gradient / pattern</b> — <code>fill</code> cần <code>url(#id)</code> trỏ tới
        <code>&lt;defs&gt;</code> bên trong SVG, mà component chưa mở chỗ để chèn defs.
      </li>
      <li>
        <b>Màu theo từng điểm dữ liệu</b> — màu thuộc về <b>chuỗi</b> (line, bar) hoặc <b>múi</b>
        (pie, donut), không đặt được cho riêng một point.
      </li>
    </ul>
    <p>
      Khi <b>xuất ảnh</b>, mọi dạng trên đều được quy về giá trị đã tính (<code>rgb(…)</code>) rồi
      mới ghi vào file — biến CSS không tồn tại bên ngoài trang, giữ nguyên là mất màu.
    </p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartColors {}
