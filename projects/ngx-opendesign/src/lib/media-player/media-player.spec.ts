import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { GMediaPlayer, GMediaType } from './media-player';

@Component({
  imports: [GMediaPlayer],
  template: `<g-media-player [src]="src" [type]="type()" [poster]="poster" />`,
})
class Host {
  src = 'https://example.com/clip.mp4';
  poster = 'https://example.com/poster.jpg';
  type = signal<GMediaType>('audio');
}

function setup(type: GMediaType = 'audio') {
  const f = TestBed.createComponent(Host);
  f.componentInstance.type.set(type);
  f.detectChanges();
  const hostEl = f.nativeElement.querySelector('g-media-player') as HTMLElement;
  return { f, hostEl };
}

describe('GMediaPlayer', () => {
  it('audio: class audio, có <audio>, không <video>, không nút fullscreen', () => {
    const { hostEl } = setup('audio');
    expect(hostEl.classList.contains('g-media-player--audio')).toBe(true);
    expect(hostEl.querySelector('audio')).not.toBeNull();
    expect(hostEl.querySelector('video')).toBeNull();
    // 2 nút: play + mute (không có fullscreen)
    expect(hostEl.querySelectorAll('.g-media-player__btn').length).toBe(2);
  });

  it('video: class video, có <video> kèm src + poster, có nút fullscreen', () => {
    const { hostEl } = setup('video');
    expect(hostEl.classList.contains('g-media-player--video')).toBe(true);
    const video = hostEl.querySelector('video');
    expect(video).not.toBeNull();
    expect(video?.getAttribute('src')).toBe('https://example.com/clip.mp4');
    expect(video?.getAttribute('poster')).toBe('https://example.com/poster.jpg');
    // 3 nút: play + mute + fullscreen
    expect(hostEl.querySelectorAll('.g-media-player__btn').length).toBe(3);
  });

  it('nút play có aria-label "Phát" khi chưa phát', () => {
    const { hostEl } = setup('audio');
    const playBtn = hostEl.querySelector('.g-media-player__btn') as HTMLButtonElement;
    expect(playBtn.getAttribute('aria-label')).toBe('Phát');
  });

  it('có thanh seek + volume với aria-label', () => {
    const { hostEl } = setup('audio');
    const seek = hostEl.querySelector('.g-media-player__seek');
    const volume = hostEl.querySelector('.g-media-player__volume');
    expect(seek?.getAttribute('aria-label')).toBe('Tua');
    expect(volume?.getAttribute('aria-label')).toBe('Âm lượng');
  });

  it('thời gian hiển thị 0:00 / 0:00 khi mới tải', () => {
    const { hostEl } = setup('audio');
    const time = hostEl.querySelector('.g-media-player__time') as HTMLElement;
    expect(time.textContent?.trim()).toBe('0:00 / 0:00');
  });
});
