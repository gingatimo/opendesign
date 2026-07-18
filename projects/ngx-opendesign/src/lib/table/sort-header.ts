import { computed, Directive, input } from '@angular/core';

// Directive TRÌNH BÀY cho <th> sort được: đặt aria-sort + class để CSS hiện chỉ báo icon angle
// lên/xuống (mask, cùng path gIconAngleUp/Down). KHÔNG xử lý
// click — consumer đặt <button> trong <th> để kích hoạt và tự lo logic sort (giữ triết lý thuần hiển thị).
@Directive({
  selector: '[gSortHeader]',
  host: {
    class: 'g-sort-header',
    '[attr.aria-sort]': 'ariaSort()',
  },
})
export class GSortHeader {
  readonly sort = input<'asc' | 'desc' | null>(null, { alias: 'gSortHeader' });

  protected readonly ariaSort = computed(() => {
    const s = this.sort();
    return s === 'asc' ? 'ascending' : s === 'desc' ? 'descending' : 'none';
  });
}
