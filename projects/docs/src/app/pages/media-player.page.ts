import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiRow, ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { MediaPlayerBasicDemo } from '../demos/media-player/media-player-basic.demo';

@Component({
  imports: [MediaPlayerBasicDemo, CodeBlock, ApiTable, DemoSection],
  template: `
    <h1>Media Player</h1>
    <p>
      Trình phát bọc <code>&lt;audio&gt;</code>/<code>&lt;video&gt;</code> native (ẩn control gốc)
      và dựng control bar riêng theo brand: play/pause, thời gian, thanh tua, mute + âm lượng, và
      nút toàn màn hình cho video. Chọn loại bằng <code>type</code>, nguồn qua <code>src</code>.
    </p>

    <docs-demo-section>
      <docs-media-player-basic-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/media-player/media-player-basic.demo.ts" />

    <h2>API — GMediaPlayer</h2>
    <docs-api-table [rows]="apiRows" />

    <h2>Accessibility</h2>
    <ul>
      <li>
        Mỗi nút điều khiển có <code>aria-label</code> tiếng Việt và đổi theo trạng thái (Phát/Tạm
        dừng, Tắt tiếng/Bật tiếng, Toàn màn hình/Thoát toàn màn hình).
      </li>
      <li>
        Thanh tua và thanh âm lượng là <code>input[type="range"]</code> gốc nên điều khiển được bằng
        bàn phím (mũi tên), có nhãn <code>Tua</code> / <code>Âm lượng</code>.
      </li>
    </ul>

    <p class="note">
      Asset trong demo là tệp mẫu công khai (SoundHelix, Google sample videos) — chỉ để minh hoạ.
    </p>
  `,
  styles: `
    .note {
      color: var(--g-text-muted);
      font-size: var(--g-font-size-sm);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MediaPlayerPage {
  protected readonly apiRows: ApiRow[] = [
    {
      name: 'src',
      type: 'string (required)',
      default: '—',
      description: 'URL của tệp media.',
    },
    {
      name: 'type',
      type: `'audio' | 'video'`,
      default: `'audio'`,
      description: 'Render thẻ <audio> hay <video>.',
    },
    {
      name: 'poster',
      type: 'string',
      default: '—',
      description: 'Ảnh nền hiển thị trước khi phát video.',
    },
    {
      name: 'loop',
      type: 'boolean',
      default: 'false',
      description: 'Tự phát lại từ đầu khi kết thúc.',
    },
  ];
}
