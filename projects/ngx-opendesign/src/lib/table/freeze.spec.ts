import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { GTable } from './table';
import { GFreezeColumn, GFreezeRow } from './freeze';

@Component({
  imports: [GTable, GFreezeColumn, GFreezeRow],
  template: `
    <table gTable id="t">
      <thead>
        <tr gFreezeRow>
          <th gFreezeColumn>A</th>
          <th>B</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>2</td>
        </tr>
      </tbody>
    </table>
  `,
})
class Host {}

@Component({
  imports: [GTable],
  template: `<table gTable id="t2">
    <tbody>
      <tr>
        <td>x</td>
      </tr>
    </tbody>
  </table>`,
})
class HostNoFreeze {}

describe('GTable freeze', () => {
  it('có marker gFreezeColumn/gFreezeRow → GTable thêm class g-table--freeze', async () => {
    const f = TestBed.createComponent(Host);
    f.detectChanges();
    await f.whenStable();
    const t = f.nativeElement.querySelector('#t') as HTMLElement;
    expect(t.classList.contains('g-table--freeze')).toBe(true);
  });
  it('không marker → KHÔNG có class g-table--freeze', async () => {
    const f = TestBed.createComponent(HostNoFreeze);
    f.detectChanges();
    await f.whenStable();
    const t = f.nativeElement.querySelector('#t2') as HTMLElement;
    expect(t.classList.contains('g-table--freeze')).toBe(false);
  });
});
