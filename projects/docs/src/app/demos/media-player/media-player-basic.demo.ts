import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GMediaPlayer } from 'ngx-opendesign';

@Component({
  selector: 'docs-media-player-basic-demo',
  imports: [GMediaPlayer],
  template: `
    <div class="group">
      <span class="label">Audio</span>
      <g-media-player src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" />
    </div>

    <div class="group">
      <span class="label">Video</span>
      <g-media-player
        type="video"
        src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
        poster="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg"
      />
    </div>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--g-space-5);
    }
    .group {
      display: flex;
      flex-direction: column;
      gap: var(--g-space-2);
    }
    .label {
      font-size: var(--g-font-size-sm);
      color: var(--g-text-muted);
    }
    .group g-media-player {
      max-width: 480px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediaPlayerBasicDemo {}
