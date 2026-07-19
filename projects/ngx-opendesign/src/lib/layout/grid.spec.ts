import { TestBed } from '@angular/core/testing';
import { GGrid } from './grid';

describe('GGrid', () => {
  it('mặc định: repeat(2, 1fr), gap var(--g-space-4)', () => {
    const f = TestBed.createComponent(GGrid);
    f.detectChanges();
    const host = f.nativeElement as HTMLElement;
    expect(host.style.gridTemplateColumns).toBe('repeat(2, 1fr)');
    expect(host.style.gap).toBe('var(--g-space-4)');
    expect(host.style.display).toBe('grid');
  });

  it('cols=4 → repeat(4, 1fr)', () => {
    const f = TestBed.createComponent(GGrid);
    f.componentRef.setInput('cols', 4);
    f.detectChanges();
    expect((f.nativeElement as HTMLElement).style.gridTemplateColumns).toBe('repeat(4, 1fr)');
  });

  it('minColWidth ưu tiên → auto-fill minmax', () => {
    const f = TestBed.createComponent(GGrid);
    f.componentRef.setInput('cols', 4);
    f.componentRef.setInput('minColWidth', '200px');
    f.detectChanges();
    expect((f.nativeElement as HTMLElement).style.gridTemplateColumns).toBe(
      'repeat(auto-fill, minmax(200px, 1fr))',
    );
  });

  it('gap=3 → var(--g-space-3)', () => {
    const f = TestBed.createComponent(GGrid);
    f.componentRef.setInput('gap', 3);
    f.detectChanges();
    expect((f.nativeElement as HTMLElement).style.gap).toBe('var(--g-space-3)');
  });
});
