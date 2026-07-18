import { booleanAttribute, Directive, input } from '@angular/core';

// Table thuần hiển thị: gắn class cho <table> native (giữ semantics/ARIA của bảng), style trong
// opendesign.scss. Consumer lo dữ liệu/sắp xếp/phân trang và bọc <table> trong khối overflow-x:auto
// để cuộn ngang responsive.
@Directive({
  selector: 'table[gTable]',
  host: {
    class: 'g-table',
    '[class.g-table--striped]': 'striped()',
    '[class.g-table--sticky]': 'stickyHeader()',
  },
})
export class GTable {
  readonly striped = input(false, { transform: booleanAttribute });
  readonly stickyHeader = input(false, { transform: booleanAttribute });
}
