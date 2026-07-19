import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GTable, GTableContainer } from 'ngx-opendesign';

interface City {
  name: string;
  region: string;
  population: string;
}

const CITIES: City[] = [
  { name: 'Hà Nội', region: 'Đồng bằng sông Hồng', population: '8,4 triệu' },
  { name: 'TP. Hồ Chí Minh', region: 'Đông Nam Bộ', population: '9,3 triệu' },
  { name: 'Hải Phòng', region: 'Đồng bằng sông Hồng', population: '2,1 triệu' },
  { name: 'Đà Nẵng', region: 'Duyên hải Nam Trung Bộ', population: '1,2 triệu' },
  { name: 'Cần Thơ', region: 'Đồng bằng sông Cửu Long', population: '1,2 triệu' },
  { name: 'Biên Hòa', region: 'Đông Nam Bộ', population: '1,1 triệu' },
  { name: 'Huế', region: 'Bắc Trung Bộ', population: '0,65 triệu' },
  { name: 'Nha Trang', region: 'Duyên hải Nam Trung Bộ', population: '0,54 triệu' },
  { name: 'Buôn Ma Thuột', region: 'Tây Nguyên', population: '0,38 triệu' },
  { name: 'Quy Nhơn', region: 'Duyên hải Nam Trung Bộ', population: '0,46 triệu' },
  { name: 'Vũng Tàu', region: 'Đông Nam Bộ', population: '0,53 triệu' },
  { name: 'Nam Định', region: 'Đồng bằng sông Hồng', population: '0,36 triệu' },
];

@Component({
  selector: 'docs-table-container-demo',
  imports: [GTable, GTableContainer],
  template: `
    <!-- maxRows=5: hiện 5 hàng rồi cuộn. stickyHeader để tiêu đề dính lại khi cuộn. -->
    <g-table-container [maxRows]="5" style="max-width: 480px">
      <table gTable [striped]="true" [stickyHeader]="true">
        <thead>
          <tr>
            <th scope="col">Thành phố</th>
            <th scope="col">Vùng</th>
            <th scope="col">Dân số</th>
          </tr>
        </thead>
        <tbody>
          @for (row of cities; track row.name) {
            <tr>
              <td>{{ row.name }}</td>
              <td>{{ row.region }}</td>
              <td>{{ row.population }}</td>
            </tr>
          }
        </tbody>
      </table>
    </g-table-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableContainerDemo {
  protected readonly cities = CITIES;
}
