import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { GTableContainer } from './table-container';

@Component({
  imports: [GTableContainer],
  template: `<g-table-container id="c" [minRows]="min()" [maxRows]="max()">
    <table>
      <thead>
        <tr>
          <th>H</th>
        </tr>
      </thead>
      <tbody>
        <tr class="empty">
          <td colspan="1">trống</td>
        </tr>
        <tr class="data">
          <td>a</td>
        </tr>
        <tr class="data">
          <td>b</td>
        </tr>
      </tbody>
    </table>
  </g-table-container>`,
})
class Host {
  min = signal(0);
  max = signal(0);
}

function stubRectHeight(el: Element, value: number): void {
  el.getBoundingClientRect = () => ({ height: value }) as DOMRect;
}

describe('GTableContainer', () => {
  it('gắn class g-table-container và chiếu <table> vào trong', () => {
    const f = TestBed.createComponent(Host);
    f.detectChanges();
    const c = f.nativeElement.querySelector('#c') as HTMLElement;
    expect(c.classList.contains('g-table-container')).toBe(true);
    expect(c.querySelector('table')).toBeTruthy();
  });

  it('minRows=0 & maxRows=0 → không đặt min/max-height inline', () => {
    const f = TestBed.createComponent(Host);
    f.detectChanges();
    const c = f.nativeElement.querySelector('#c') as HTMLElement;
    expect(c.style.minHeight).toBe('');
    expect(c.style.maxHeight).toBe('');
  });

  it('quy số hàng ra chiều cao: thead + N × hàng dữ liệu + viền; BỎ QUA hàng colspan', () => {
    const f = TestBed.createComponent(Host);
    f.detectChanges();
    const c = f.nativeElement.querySelector('#c') as HTMLElement;

    // jsdom không layout → tự mock hình học. Hàng colspan ("trống") cố tình cao bất thường để lộ nếu
    // bị lấy nhầm làm đơn vị hàng.
    stubRectHeight(c.querySelector('thead')!, 30);
    stubRectHeight(c.querySelector('tr.empty')!, 200);
    c.querySelectorAll('tr.data').forEach((tr) => stubRectHeight(tr, 20));
    Object.defineProperty(c, 'clientHeight', { get: () => 100, configurable: true });
    Object.defineProperty(c, 'offsetHeight', { get: () => 102, configurable: true }); // chrome = 2 (viền)

    f.componentInstance.min.set(3);
    f.componentInstance.max.set(5);
    f.detectChanges();

    // min: 30 + 3×20 + 2 = 92 ; max: 30 + 5×20 + 2 + 1 (dung sai) = 133 — dùng 20 của hàng data, không 200
    expect(c.style.minHeight).toBe('92px');
    expect(c.style.maxHeight).toBe('133px');
  });
});
