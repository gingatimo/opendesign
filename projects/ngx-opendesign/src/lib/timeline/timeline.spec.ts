import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { GTimeline } from './timeline';
import { GTimelineItem } from './timeline-item';

@Component({
  imports: [GTimeline, GTimelineItem],
  template: `
    <g-timeline>
      <g-timeline-item>Sự kiện 1</g-timeline-item>
      <g-timeline-item status="success">Sự kiện 2</g-timeline-item>
    </g-timeline>
  `,
})
class Host {}

describe('GTimeline', () => {
  it('render các item với marker + nội dung', () => {
    const f = TestBed.createComponent(Host);
    f.detectChanges();
    const items = f.nativeElement.querySelectorAll('g-timeline-item');
    expect(items.length).toBe(2);
    expect(items[0].querySelector('.g-timeline-item__marker')).not.toBeNull();
    expect(items[0].querySelector('.g-timeline-item__content')?.textContent).toContain('Sự kiện 1');
  });

  it('status tô class trạng thái lên item', () => {
    const f = TestBed.createComponent(Host);
    f.detectChanges();
    const items = f.nativeElement.querySelectorAll('g-timeline-item');
    expect(items[0].classList.contains('g-timeline-item--success')).toBe(false); // mặc định
    expect(items[1].classList.contains('g-timeline-item--success')).toBe(true);
  });
});
