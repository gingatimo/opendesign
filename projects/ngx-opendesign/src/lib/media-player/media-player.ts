import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  HostListener,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { GIcon } from '../icon/icon';
import {
  gIconMaximize,
  gIconPause,
  gIconPlay,
  gIconVolume,
  gIconVolumeMute,
} from '../icon/icons';

export type GMediaType = 'audio' | 'video';

// Trình phát media: bọc <audio>/<video> native (ẩn control gốc), render control bar tuỳ biến trên
// brand — play/pause, thời gian, thanh seek, mute + volume, fullscreen (chỉ video). Consumer cấp src.
@Component({
  selector: 'g-media-player',
  imports: [GIcon],
  template: `
    <div class="g-media-player__stage">
      @if (type() === 'video') {
        <video
          #media
          class="g-media-player__media"
          [src]="src()"
          [poster]="poster() || null"
          [loop]="loop()"
          playsinline
          (timeupdate)="currentTime.set(media.currentTime)"
          (loadedmetadata)="duration.set(media.duration || 0)"
          (durationchange)="duration.set(media.duration || 0)"
          (play)="playing.set(true)"
          (pause)="playing.set(false)"
          (ended)="playing.set(false)"
          (volumechange)="onVolumeChange(media)"
        ></video>
      } @else {
        <audio
          #media
          [src]="src()"
          [loop]="loop()"
          (timeupdate)="currentTime.set(media.currentTime)"
          (loadedmetadata)="duration.set(media.duration || 0)"
          (durationchange)="duration.set(media.duration || 0)"
          (play)="playing.set(true)"
          (pause)="playing.set(false)"
          (ended)="playing.set(false)"
          (volumechange)="onVolumeChange(media)"
        ></audio>
      }
    </div>

    <div class="g-media-player__controls">
      <button
        type="button"
        class="g-media-player__btn"
        [attr.aria-label]="playing() ? 'Tạm dừng' : 'Phát'"
        (click)="togglePlay()"
      >
        <g-icon [icon]="playing() ? iconPause : iconPlay" size="sm" />
      </button>

      <span class="g-media-player__time">{{ fmt(currentTime()) }} / {{ fmt(duration()) }}</span>

      <input
        type="range"
        class="g-media-player__seek"
        min="0"
        [max]="duration() || 0"
        step="any"
        [value]="currentTime()"
        [style.--g-seek-fill]="seekFill() + '%'"
        aria-label="Tua"
        (input)="onSeek($event)"
      />

      <button
        type="button"
        class="g-media-player__btn"
        [attr.aria-label]="isMuted() ? 'Bật tiếng' : 'Tắt tiếng'"
        (click)="toggleMute()"
      >
        <g-icon [icon]="isMuted() ? iconVolumeMute : iconVolume" size="sm" />
      </button>

      <input
        type="range"
        class="g-media-player__volume"
        min="0"
        max="1"
        step="0.05"
        [value]="isMuted() ? 0 : volume()"
        aria-label="Âm lượng"
        (input)="onVolumeInput($event)"
      />

      @if (type() === 'video') {
        <button
          type="button"
          class="g-media-player__btn"
          [attr.aria-label]="isFullscreen() ? 'Thoát toàn màn hình' : 'Toàn màn hình'"
          (click)="toggleFullscreen()"
        >
          <g-icon [icon]="iconMaximize" size="sm" />
        </button>
      }
    </div>
  `,
  host: {
    class: 'g-media-player',
    '[class.g-media-player--video]': `type() === 'video'`,
    '[class.g-media-player--audio]': `type() === 'audio'`,
  },
  styleUrl: './media-player.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GMediaPlayer {
  readonly src = input.required<string>();
  readonly type = input<GMediaType>('audio');
  readonly poster = input<string>();
  readonly loop = input(false, { transform: booleanAttribute });

  protected readonly iconPlay = gIconPlay;
  protected readonly iconPause = gIconPause;
  protected readonly iconVolume = gIconVolume;
  protected readonly iconVolumeMute = gIconVolumeMute;
  protected readonly iconMaximize = gIconMaximize;

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly media = viewChild<ElementRef<HTMLMediaElement>>('media');

  protected readonly playing = signal(false);
  protected readonly currentTime = signal(0);
  protected readonly duration = signal(0);
  protected readonly volume = signal(1);
  protected readonly muted = signal(false);
  protected readonly isFullscreen = signal(false);

  // Coi là "tắt tiếng" cả khi kéo volume về 0 (icon + nhãn theo đó).
  protected readonly isMuted = computed(() => this.muted() || this.volume() === 0);
  // % đã phát để tô phần đầu thanh seek (CSS var).
  protected readonly seekFill = computed(() => {
    const d = this.duration();
    return d > 0 ? (this.currentTime() / d) * 100 : 0;
  });

  protected togglePlay(): void {
    const el = this.media()?.nativeElement;
    if (!el) return;
    if (el.paused) void el.play();
    else el.pause();
  }

  protected onSeek(event: Event): void {
    const el = this.media()?.nativeElement;
    if (el) el.currentTime = (event.target as HTMLInputElement).valueAsNumber;
  }

  protected toggleMute(): void {
    const el = this.media()?.nativeElement;
    if (el) el.muted = !el.muted;
  }

  protected onVolumeInput(event: Event): void {
    const el = this.media()?.nativeElement;
    if (!el) return;
    const v = (event.target as HTMLInputElement).valueAsNumber;
    el.volume = v;
    el.muted = v === 0;
  }

  protected onVolumeChange(el: HTMLMediaElement): void {
    this.volume.set(el.volume);
    this.muted.set(el.muted);
  }

  protected toggleFullscreen(): void {
    if (typeof document === 'undefined') return;
    if (document.fullscreenElement) void document.exitFullscreen();
    else void this.host.nativeElement.requestFullscreen?.();
  }

  @HostListener('document:fullscreenchange')
  protected onFullscreenChange(): void {
    this.isFullscreen.set(
      typeof document !== 'undefined' && document.fullscreenElement === this.host.nativeElement,
    );
  }

  protected fmt(sec: number): string {
    if (!isFinite(sec) || sec < 0) return '0:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  }
}
