import { TestBed } from '@angular/core/testing';
import { GTreeNode, GTreeSelect } from './tree-select';

const NODES: GTreeNode[] = [
  {
    label: 'Tài liệu',
    value: 'docs',
    children: [
      { label: 'Báo cáo', value: 'report' },
      { label: 'Hợp đồng', value: 'contract' },
    ],
  },
  { label: 'Hình ảnh', value: 'images' },
];

interface Row {
  node: GTreeNode;
  level: number;
}
interface Api {
  open: () => boolean;
  rows: () => Row[];
  selectedLabel: () => string;
  isExpanded(n: GTreeNode): boolean;
  toggleExpand(e: Event, n: GTreeNode): void;
  selectNode(n: GTreeNode): void;
  writeValue(v: unknown): void;
}

function make() {
  const f = TestBed.createComponent(GTreeSelect);
  f.componentRef.setInput('options', NODES);
  f.detectChanges();
  return { f, cmp: f.componentInstance as unknown as Api };
}

describe('GTreeSelect', () => {
  it('mặc định chỉ hiện node gốc (chưa expand)', () => {
    const { cmp } = make();
    expect(cmp.rows().map((r) => r.node.label)).toEqual(['Tài liệu', 'Hình ảnh']);
  });

  it('toggleExpand hiện con', () => {
    const { cmp } = make();
    cmp.toggleExpand(new Event('click'), NODES[0]);
    expect(cmp.rows().map((r) => r.node.label)).toEqual([
      'Tài liệu',
      'Báo cáo',
      'Hợp đồng',
      'Hình ảnh',
    ]);
  });

  it('selectNode đặt value (chọn được cả nhánh) + đóng', () => {
    const { f, cmp } = make();
    let changed: unknown;
    f.componentInstance.registerOnChange((v) => (changed = v));
    cmp.selectNode(NODES[0]); // node nhánh
    expect(changed).toBe('docs');
    expect(cmp.open()).toBe(false);
  });

  it('selectedLabel theo value (writeValue), kể cả node con', () => {
    const { f, cmp } = make();
    cmp.writeValue('contract');
    f.detectChanges();
    expect(cmp.selectedLabel()).toBe('Hợp đồng');
  });
});
