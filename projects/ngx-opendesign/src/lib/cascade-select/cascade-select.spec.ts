import { TestBed } from '@angular/core/testing';
import { GCascadeOption, GCascadeSelect } from './cascade-select';

const OPTS: GCascadeOption[] = [
  {
    label: 'Châu Á',
    children: [
      {
        label: 'Việt Nam',
        children: [
          { label: 'Hà Nội', value: 'hn' },
          { label: 'TP.HCM', value: 'hcm' },
        ],
      },
      { label: 'Nhật', value: 'jp' },
    ],
  },
  { label: 'Châu Âu', children: [{ label: 'Pháp', value: 'fr' }] },
];

interface Api {
  open: () => boolean;
  columns: () => GCascadeOption[][];
  selectedLabel: () => string;
  expand(ci: number, opt: GCascadeOption): void;
  onClick(ci: number, opt: GCascadeOption): void;
  writeValue(v: unknown): void;
}

function make() {
  const f = TestBed.createComponent(GCascadeSelect);
  f.componentRef.setInput('options', OPTS);
  f.detectChanges();
  return { f, cmp: f.componentInstance as unknown as Api };
}

describe('GCascadeSelect', () => {
  it('placeholder khi chưa chọn; 1 cột ban đầu', () => {
    const { cmp } = make();
    expect(cmp.selectedLabel()).toBe('');
    expect(cmp.columns().length).toBe(1);
    expect(cmp.columns()[0].length).toBe(2);
  });

  it('expand nhánh mở thêm cột con', () => {
    const { cmp } = make();
    cmp.expand(0, OPTS[0]); // Châu Á
    expect(cmp.columns().length).toBe(2);
    expect(cmp.columns()[1].map((o) => o.label)).toEqual(['Việt Nam', 'Nhật']);
  });

  it('click lá đặt value + đóng', () => {
    const { f, cmp } = make();
    let changed: unknown;
    f.componentInstance.registerOnChange((v) => (changed = v));
    cmp.expand(0, OPTS[0]);
    cmp.onClick(1, OPTS[0].children![1]); // Nhật (lá)
    expect(changed).toBe('jp');
    expect(cmp.open()).toBe(false);
  });

  it('click nhánh chỉ mở cột, không chọn', () => {
    const { f, cmp } = make();
    let changed: unknown = 'chưa';
    f.componentInstance.registerOnChange((v) => (changed = v));
    cmp.onClick(0, OPTS[0]); // Châu Á có con → expand
    expect(changed).toBe('chưa');
    expect(cmp.columns().length).toBe(2);
  });

  it('selectedLabel = đường dẫn nhãn theo value (writeValue)', () => {
    const { f, cmp } = make();
    cmp.writeValue('hn');
    f.detectChanges();
    expect(cmp.selectedLabel()).toBe('Châu Á / Việt Nam / Hà Nội');
  });
});
