import { TestBed } from '@angular/core/testing';
import { GLocaleService } from '../core/locale';
import { gLocaleEn } from '../locales/en';
import { gLocaleVi } from '../locales/vi';
import { GTreeReorderEvent, GTreeView, GTreeViewNode } from './tree-view';

const NODES: GTreeViewNode[] = [
  {
    id: 'farm',
    label: 'Nông trại',
    children: [
      { id: 'garden', label: 'Vườn' },
      { id: 'pond', label: 'Ao' },
    ],
  },
  { id: 'disabled', label: 'Đã lưu trữ', disabled: true },
];

async function makeTree(expandedIds: readonly string[] = []) {
  const fixture = TestBed.createComponent(GTreeView);
  fixture.componentRef.setInput('nodes', NODES);
  fixture.componentRef.setInput('ariaLabel', 'Cấu trúc nông trại');
  fixture.componentRef.setInput('expandedIds', expandedIds);
  await fixture.whenStable();

  const root = fixture.nativeElement as HTMLElement;
  const rows = () => [...root.querySelectorAll<HTMLElement>('[role="treeitem"]')];

  return { fixture, rows };
}

describe('GTreeView', () => {
  it('chỉ render con của node đã expand và phản ánh selection bằng ARIA', async () => {
    const fixture = TestBed.createComponent(GTreeView);
    fixture.componentRef.setInput('nodes', NODES);
    fixture.componentRef.setInput('ariaLabel', 'Cấu trúc nông trại');
    fixture.componentRef.setInput('expandedIds', ['farm']);
    fixture.componentRef.setInput('selectedId', 'pond');
    await fixture.whenStable();

    const root = fixture.nativeElement as HTMLElement;
    const rows = [...root.querySelectorAll<HTMLElement>('[role="treeitem"]')];
    expect(rows.map((row) => row.textContent?.trim())).toEqual([
      'Nông trại',
      'Vườn',
      'Ao',
      'Đã lưu trữ',
    ]);
    expect(rows[2].getAttribute('aria-selected')).toBe('true');
    expect(rows[3].getAttribute('aria-disabled')).toBe('true');
  });

  it('dùng phím mũi tên và Home/End để điều hướng các node khả dụng', async () => {
    const { fixture, rows } = await makeTree();
    rows()[0].focus();
    rows()[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    await fixture.whenStable();
    expect(fixture.componentInstance.expandedIds()).toEqual(['farm']);

    rows()[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    await fixture.whenStable();
    expect(document.activeElement?.textContent?.trim()).toBe('Vườn');

    document.activeElement?.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'End', bubbles: true }),
    );
    await fixture.whenStable();
    expect(document.activeElement?.textContent?.trim()).toBe('Ao');
  });

  it('chỉ phát loadChildren một lần trong khi node đang loading', async () => {
    const fixture = TestBed.createComponent(GTreeView);
    fixture.componentRef.setInput('nodes', [{ id: 'lazy', label: 'Thiết bị', hasChildren: true }]);
    fixture.componentRef.setInput('ariaLabel', 'Thiết bị');
    fixture.componentRef.setInput('loadingIds', ['lazy']);
    const loaded: string[] = [];
    fixture.componentInstance.loadChildren.subscribe((node) => loaded.push(node.id));
    await fixture.whenStable();

    const toggle = (fixture.nativeElement as HTMLElement).querySelector<HTMLButtonElement>(
      '.g-tree-view__toggle',
    );
    toggle?.click();
    toggle?.click();
    toggle?.click();

    expect(loaded).toEqual(['lazy']);
  });

  it('phát reorder intent nhưng không đổi input nodes', async () => {
    const fixture = TestBed.createComponent(GTreeView);
    const nodes = [
      { id: 'a', label: 'A' },
      { id: 'b', label: 'B' },
    ];
    fixture.componentRef.setInput('nodes', nodes);
    fixture.componentRef.setInput('ariaLabel', 'Thứ tự');
    fixture.componentRef.setInput('reorderable', true);
    const events: GTreeReorderEvent[] = [];
    fixture.componentInstance.reorder.subscribe((event) => events.push(event));
    await fixture.whenStable();

    (
      fixture.componentInstance as unknown as {
        emitReorder(sourceId: string, targetId: string, ratio: number): void;
      }
    ).emitReorder('a', 'b', 0.9);

    expect(events).toEqual([{ sourceId: 'a', targetId: 'b', position: 'after' }]);
    expect(fixture.componentInstance.nodes()).toBe(nodes);
  });

  it('cập nhật nhãn điều khiển khi đổi locale', async () => {
    const locale = TestBed.inject(GLocaleService);
    locale.use(gLocaleEn);
    const { fixture } = await makeTree();
    const root = fixture.nativeElement as HTMLElement;

    expect(root.querySelector('.g-tree-view__toggle')?.getAttribute('aria-label')).toBe(
      'Expand Nông trại',
    );

    locale.use(gLocaleVi);
    await fixture.whenStable();
    expect(root.querySelector('.g-tree-view__toggle')?.getAttribute('aria-label')).toBe(
      'Mở Nông trại',
    );
  });
});
