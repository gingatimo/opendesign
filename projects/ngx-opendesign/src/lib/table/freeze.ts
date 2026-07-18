import { Directive } from '@angular/core';

// Marker rỗng: đánh dấu RANH GIỚI đóng băng (Excel panes). GTable dò qua DOM và áp position:sticky.
// [gFreezeColumn] trên MỘT <th> header: cột 0..index-cột-đó dính left. [gFreezeRow] trên MỘT <tr>:
// hàng 0..hàng-đó (tính từ đỉnh) dính top.
@Directive({ selector: '[gFreezeColumn]' })
export class GFreezeColumn {}

@Directive({ selector: '[gFreezeRow]' })
export class GFreezeRow {}
