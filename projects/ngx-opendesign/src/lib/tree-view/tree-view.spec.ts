import { TestBed } from '@angular/core/testing';
import { GTreeView, GTreeViewNode } from './tree-view';

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
});
