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
  onNodeClick(n: GTreeNode): void;
  stateOf(n: GTreeNode): 'checked' | 'indeterminate' | 'unchecked';
  multipleLabel: () => string;
  writeValue(v: unknown): void;
}

function make() {
  const f = TestBed.createComponent(GTreeSelect);
  f.componentRef.setInput('options', NODES);
  f.detectChanges();
  return { f, cmp: f.componentInstance as unknown as Api };
}

function makeMultiple() {
  const f = TestBed.createComponent(GTreeSelect);
  f.componentRef.setInput('options', NODES);
  f.componentRef.setInput('multiple', true);
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

  it('multiple: tích node CHA cascade cả nhánh (lá), cha = checked', () => {
    const { f, cmp } = makeMultiple();
    let v: unknown;
    f.componentInstance.registerOnChange((x) => (v = x));
    cmp.onNodeClick(NODES[0]); // 'Tài liệu' (nhánh)
    expect(v).toEqual(['report', 'contract']);
    expect(cmp.stateOf(NODES[0])).toBe('checked');
  });

  it('multiple: tích một lá con → cha = indeterminate (tri-state)', () => {
    const { cmp } = makeMultiple();
    cmp.onNodeClick(NODES[0].children![0]); // 'Báo cáo'
    expect(cmp.stateOf(NODES[0])).toBe('indeterminate');
    expect(cmp.stateOf(NODES[0].children![0])).toBe('checked');
    expect(cmp.stateOf(NODES[0].children![1])).toBe('unchecked');
  });

  it('multiple: nhãn trigger liệt kê các node LÁ đã chọn (không gộp lên cha)', () => {
    const { cmp } = makeMultiple();
    cmp.onNodeClick(NODES[0]); // tích đủ 'Tài liệu' → cascade 2 lá
    expect(cmp.multipleLabel()).toBe('Báo cáo, Hợp đồng');
    cmp.onNodeClick(NODES[0].children![0]); // bỏ 'Báo cáo' → còn lá 'Hợp đồng'
    expect(cmp.multipleLabel()).toBe('Hợp đồng');
  });

  it('multiple: bỏ chọn node đã tích qua onNodeClick (mở lại cây)', () => {
    const { f, cmp } = makeMultiple();
    let v: unknown;
    f.componentInstance.registerOnChange((x) => (v = x));
    cmp.onNodeClick(NODES[0]); // tích cả nhánh
    cmp.onNodeClick(NODES[0]); // tích lại → bỏ cả nhánh
    expect(v).toEqual([]);
    expect(cmp.multipleLabel()).toBe('');
  });
});
