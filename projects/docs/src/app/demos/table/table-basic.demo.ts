import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GTable } from 'ngx-opendesign';

@Component({
  selector: 'docs-table-basic-demo',
  imports: [GTable],
  template: `
    <div style="overflow-x: auto">
      <table gTable [striped]="true">
        <thead>
          <tr>
            <th scope="col">Tên</th>
            <th scope="col">Email</th>
            <th scope="col">Vai trò</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Nguyễn Văn An</td>
            <td>an.nguyen&#64;example.com</td>
            <td>Quản trị viên</td>
          </tr>
          <tr>
            <td>Trần Thị Bình</td>
            <td>binh.tran&#64;example.com</td>
            <td>Biên tập viên</td>
          </tr>
          <tr>
            <td>Lê Hoàng Cường</td>
            <td>cuong.le&#64;example.com</td>
            <td>Thành viên</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableBasicDemo {}
