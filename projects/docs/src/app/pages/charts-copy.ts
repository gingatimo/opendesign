import { GCalendarHeatmapDay, GChartSeries, GChartSlice, GHeatmapCell } from 'ngx-opendesign';
import { ApiRow } from '../shared/api-table';

interface ChartPageCopy {
  title: string;
  intro: string;
  apiTitle: string;
  apiRows: ApiRow[];
}

interface LineChartCopy extends ChartPageCopy {
  demo: {
    straight: string;
    smooth: string;
    legend: string;
    title: string;
    filename: string;
    ariaLabel: string;
    labels: string[];
    series: GChartSeries[];
  };
}

interface BarChartCopy extends ChartPageCopy {
  demo: {
    vertical: string;
    horizontal: string;
    title: string;
    filename: string;
    ariaLabel: string;
    labels: string[];
    series: GChartSeries[];
  };
}

interface SliceChartCopy extends ChartPageCopy {
  demo: {
    title: string;
    filename?: string;
    totalLabel?: string;
    ariaLabel: string;
    data: GChartSlice[];
  };
}

interface PolarChartCopy extends SliceChartCopy {
  radiusTitle: string;
  radiusIntro: string;
}

interface RadarChartCopy extends ChartPageCopy {
  avoidTitle: string;
  avoid: string[];
  demo: {
    title: string;
    ariaLabel: string;
    grid: string;
    circle: string;
    polygon: string;
    labels: string[];
    series: GChartSeries[];
  };
}

interface StackedBarCopy extends ChartPageCopy {
  demo: {
    languagesTitle: string;
    languagesAriaLabel: string;
    ordersTitle: string;
    languages: GChartSlice[];
    orders: GChartSlice[];
  };
}

interface HeatmapChartCopy extends ChartPageCopy {
  scaleTitle: string;
  scaleIntro: string;
  demo: {
    title: string;
    scaleMinLabel: string;
    scaleMaxLabel: string;
    weekdays: string[];
    columns: string[];
    data: GHeatmapCell[];
  };
}

interface CalendarHeatmapCopy extends ChartPageCopy {
  notesTitle: string;
  notes: string[];
  demo: {
    title: string;
    unit: string;
    weekStartsOn: string;
    sunday: string;
    monday: string;
    data: GCalendarHeatmapDay[];
  };
}

interface ChartColorsCopy {
  title: string;
  intro: string;
  customColorIntro: string;
  customColorItems: string[];
  duplicateNote: string;
  unsupportedTitle: string;
  unsupported: string[];
  exportNote: string;
}

interface ChartsCopy {
  line: LineChartCopy;
  bar: BarChartCopy;
  pie: SliceChartCopy;
  donut: SliceChartCopy;
  polar: PolarChartCopy;
  radar: RadarChartCopy;
  stackedBar: StackedBarCopy;
  heatmap: HeatmapChartCopy;
  honeycomb: SliceChartCopy & {
    modesTitle: string;
    modes: string[];
    demo: SliceChartCopy['demo'] & {
      colorMode: string;
      heat: string;
      category: string;
    };
  };
  calendarHeatmap: CalendarHeatmapCopy;
  colors: ChartColorsCopy;
}

const CHART_CONTROL_ROWS: ApiRow[] = [
  {
    name: 'title',
    type: 'string',
    default: "''",
    description: 'Tiêu đề hiển thị góc trên-trái.',
  },
  {
    name: 'titlePosition',
    type: "'left' | 'center'",
    default: "'left'",
    description: 'Vị trí tiêu đề trong hàng đầu: sát trái (mặc định) hay giữa khung.',
  },
  {
    name: 'legendPosition',
    type: "'top' | 'right' | 'bottom' | 'left'",
    default: "'bottom'",
    description: 'Vị trí chú giải quanh chart.',
  },
  {
    name: 'exportable / filename',
    type: 'boolean / string',
    default: "false / 'chart'",
    description: 'Hiện nút export PNG/SVG + tên file khi tải.',
  },
  {
    name: 'zoomable',
    type: 'boolean',
    default: 'false',
    description:
      'Hiện nút phóng to: chart phủ gần kín màn hình, Esc hoặc bấm lại để thu. Khi đang phóng to, nút tải ẩn đi.',
  },
  {
    name: 'ariaLabel',
    type: 'string',
    default: "''",
    description: 'Nhãn screen reader cho vùng SVG (role=img).',
  },
];

const EN_CHART_CONTROL_ROWS: ApiRow[] = [
  {
    name: 'title',
    type: 'string',
    default: "''",
    description: 'Title shown in the top-left corner.',
  },
  {
    name: 'titlePosition',
    type: "'left' | 'center'",
    default: "'left'",
    description: 'Title placement in the chart header: left by default, or centered.',
  },
  {
    name: 'legendPosition',
    type: "'top' | 'right' | 'bottom' | 'left'",
    default: "'bottom'",
    description: 'Legend placement around the chart.',
  },
  {
    name: 'exportable / filename',
    type: 'boolean / string',
    default: "false / 'chart'",
    description: 'Shows PNG/SVG export buttons and controls the downloaded file name.',
  },
  {
    name: 'zoomable',
    type: 'boolean',
    default: 'false',
    description:
      'Shows the zoom button: the chart expands close to full screen, then Esc or the same button closes it. Export buttons are hidden while zoomed.',
  },
  {
    name: 'ariaLabel',
    type: 'string',
    default: "''",
    description: 'Screen-reader label for the SVG region (role=img).',
  },
];

const CALENDAR_DAYS = Array.from({ length: 365 }, (_, i) => {
  const from = new Date(2025, 6, 22);
  const date = new Date(from.getTime() + i * 86_400_000);
  const weekend = date.getDay() === 0 || date.getDay() === 6;
  const recent = i / 365;
  const base = Math.round(((i * 7919) % 11) * recent);
  return { date, value: weekend ? Math.max(0, base - 6) : base };
});

function heatmapData(days: string[], columns: string[]): GHeatmapCell[] {
  return days.flatMap((row, r) =>
    columns.map((col, c) => {
      const officeHours = c >= 3 && c <= 6 ? 3 : 1;
      const weekend = r >= 5 ? 0.4 : 1;
      return {
        row,
        col,
        value: Math.round(((c * 7 + r * 3) % 5) + officeHours * 4 * weekend),
      };
    }),
  );
}

const VI_HEATMAP_COLUMNS = ['0h', '3h', '6h', '9h', '12h', '15h', '18h', '21h'];
const VI_HEATMAP_DAYS = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
const EN_HEATMAP_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const VI_CHARTS: ChartsCopy = {
  line: {
    title: 'Line Chart',
    intro:
      'Biểu đồ đường vẽ bằng SVG thuần (0 thư viện ngoài). Nối các mốc bằng đường thẳng hoặc cong trơn (spline Catmull-Rom). Trục y tự chọn vạch tròn trịa + gridline; responsive theo bề rộng. Nhiều series tự kèm chú giải.',
    apiTitle: 'API — GLineChart',
    apiRows: [
      {
        name: 'series',
        type: 'GChartSeries[]',
        default: '[]',
        description: 'Các chuỗi { name, values, color? }.',
      },
      {
        name: 'labels',
        type: 'string[]',
        default: '[]',
        description: 'Nhãn trục x (cùng độ dài values).',
      },
      {
        name: 'curve',
        type: "'straight' | 'smooth'",
        default: "'straight'",
        description: 'Nối thẳng hay cong trơn.',
      },
      { name: 'height', type: 'number', default: '280', description: 'Chiều cao (px).' },
      {
        name: 'showGrid / showDots / showLegend',
        type: 'boolean',
        default: 'true',
        description: 'Bật/tắt lưới, điểm, chú giải.',
      },
      ...CHART_CONTROL_ROWS,
    ],
    demo: {
      straight: 'Nối thẳng',
      smooth: 'Nối cong',
      legend: 'Legend:',
      title: 'Doanh thu & chi phí',
      filename: 'doanh-thu-chi-phi',
      ariaLabel: 'Doanh thu và chi phí 6 tháng',
      labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6'],
      series: [
        { name: 'Doanh thu', values: [42, 55, 48, 72, 66, 88] },
        { name: 'Chi phí', values: [30, 34, 38, 40, 45, 52] },
      ],
    },
  },
  bar: {
    title: 'Bar Chart',
    intro:
      'Biểu đồ cột (SVG thuần). Đổi chiều bằng orientation: cột đứng hoặc cột nằm. Nhiều series tạo cột nhóm cạnh nhau; một series thì tô màu theo từng mốc. Miền giá trị luôn gồm 0.',
    apiTitle: 'API — GBarChart',
    apiRows: [
      {
        name: 'series',
        type: 'GChartSeries[]',
        default: '[]',
        description: 'Các chuỗi { name, values, color? }.',
      },
      { name: 'labels', type: 'string[]', default: '[]', description: 'Nhãn mốc (danh mục).' },
      {
        name: 'orientation',
        type: "'vertical' | 'horizontal'",
        default: "'vertical'",
        description: 'Cột đứng hay nằm.',
      },
      { name: 'height', type: 'number', default: '280', description: 'Chiều cao (px).' },
      {
        name: 'showGrid / showLegend',
        type: 'boolean',
        default: 'true',
        description: 'Bật/tắt lưới, chú giải.',
      },
      ...CHART_CONTROL_ROWS,
    ],
    demo: {
      vertical: 'Cột đứng',
      horizontal: 'Cột nằm',
      title: 'Số đơn theo quý',
      filename: 'don-theo-quy',
      ariaLabel: 'Số đơn theo quý, hai khu vực',
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      series: [
        { name: 'Miền Bắc', values: [120, 145, 132, 168] },
        { name: 'Miền Nam', values: [98, 110, 125, 140] },
      ],
    },
  },
  pie: {
    title: 'Pie Chart',
    intro:
      'Biểu đồ tròn (SVG thuần). Mỗi múi là hình quạt tỉ lệ theo giá trị, kèm nhãn % trên múi đủ lớn. Nhận data là GChartSlice[]. Chú giải sẵn, đặt được 4 phía qua legendPosition; bật exportable để tải PNG/SVG.',
    apiTitle: 'API — GPieChart',
    apiRows: [
      {
        name: 'data',
        type: 'GChartSlice[]',
        default: '[]',
        description: 'Các múi { name, value, color? }.',
      },
      {
        name: 'height',
        type: 'number',
        default: '280',
        description: 'Chiều cao (px); bán kính theo min(rộng, cao).',
      },
      {
        name: 'showLabels',
        type: 'boolean',
        default: 'true',
        description: 'Hiện % trên múi (chỉ múi >= 5%).',
      },
      ...CHART_CONTROL_ROWS,
    ],
    demo: {
      title: 'Nguồn truy cập',
      filename: 'nguon-truy-cap',
      ariaLabel: 'Tỉ trọng nguồn truy cập',
      data: [
        { name: 'Trực tiếp', value: 38 },
        { name: 'Tìm kiếm', value: 27 },
        { name: 'Mạng xã hội', value: 21 },
        { name: 'Giới thiệu', value: 14 },
      ],
    },
  },
  donut: {
    title: 'Donut Chart',
    intro:
      'Biểu đồ vành khuyên (SVG thuần) giống pie nhưng có lỗ giữa hiện tổng, kèm chú giải sẵn và nút export ra PNG/SVG. thickness chỉnh tỉ lệ lỗ. Export tự resolve màu từ biến CSS nên file ra giữ đúng màu.',
    apiTitle: 'API — GDonutChart',
    apiRows: [
      {
        name: 'data',
        type: 'GChartSlice[]',
        default: '[]',
        description: 'Các múi { name, value, color? }.',
      },
      {
        name: 'thickness',
        type: 'number',
        default: '0.6',
        description: 'Tỉ lệ bán kính lỗ giữa (0..1).',
      },
      {
        name: 'showTotal / totalLabel',
        type: 'boolean / string',
        default: "true / 'Tổng'",
        description: 'Tổng ở giữa + nhãn dưới nó.',
      },
      {
        name: 'showLegend',
        type: 'boolean',
        default: 'true',
        description: 'Hiện chú giải dưới chart.',
      },
      { name: 'height', type: 'number', default: '280', description: 'Chiều cao (px).' },
      ...CHART_CONTROL_ROWS,
    ],
    demo: {
      title: 'Đơn theo kênh',
      filename: 'don-hang-theo-kenh',
      totalLabel: 'Đơn',
      ariaLabel: 'Đơn hàng theo kênh',
      data: [
        { name: 'Website', value: 1240 },
        { name: 'App', value: 860 },
        { name: 'Đại lý', value: 540 },
        { name: 'Khác', value: 210 },
      ],
    },
  },
  polar: {
    title: 'Polar Chart',
    intro:
      'Biểu đồ cực (polar area, SVG thuần): mỗi hạng mục chiếm góc bằng nhau, còn bán kính thay đổi theo giá trị. Hợp khi so sánh độ lớn của các hạng mục cùng loại và có thứ tự vòng quanh: mùa trong năm, hướng gió, giờ trong ngày.',
    radiusTitle: 'Vì sao bán kính tỉ lệ tuyến tính?',
    radiusIntro:
      'Bán kính tăng tuyến tính theo giá trị để khớp với các vòng lưới có nhãn số. Lấy căn bậc hai sẽ cho diện tích đúng tỉ lệ, nhưng khi đó múi không còn chạm đúng vòng lưới nên khó đối chiếu.',
    apiTitle: 'API — GPolarChart',
    apiRows: [
      {
        name: 'data',
        type: 'GChartSlice[]',
        default: '[]',
        description: 'Các hạng mục { name, value, color? }. Mỗi hạng mục chiếm một góc bằng nhau.',
      },
      { name: 'height', type: 'number', default: '300', description: 'Chiều cao vùng vẽ (px).' },
      {
        name: 'showLabels / showLegend',
        type: 'boolean',
        default: 'true / true',
        description: 'Ghi tên quanh vành ngoài; hiện chú giải.',
      },
      ...CHART_CONTROL_ROWS,
    ],
    demo: {
      title: 'Lượng mưa theo mùa (mm)',
      ariaLabel: 'Lượng mưa trung bình theo mùa',
      data: [
        { name: 'Xuân', value: 120 },
        { name: 'Hạ', value: 310 },
        { name: 'Thu', value: 240 },
        { name: 'Đông', value: 90 },
      ],
    },
  },
  radar: {
    title: 'Radar Chart',
    intro:
      'Biểu đồ radar (spider/web, SVG thuần): mỗi trục toả từ tâm là một tiêu chí, mỗi chuỗi nối các điểm thành một đa giác. Đọc được hình dáng tổng thể và so sánh vài chuỗi chồng lên nhau.',
    avoidTitle: 'Khi nào KHÔNG nên dùng',
    avoid: [
      'Các trục khác thang đo: mọi trục dùng chung một thang giá trị, nên hãy chuẩn hoá dữ liệu trước.',
      'Quá 3 chuỗi: các đa giác che nhau, dùng bar chart nhóm sẽ rõ hơn.',
      'Ít hơn 3 trục: không thành hình đa giác, dùng bar chart.',
    ],
    apiTitle: 'API — GRadarChart',
    apiRows: [
      {
        name: 'labels',
        type: 'string[]',
        default: '[]',
        description: 'Tên các trục toả từ tâm. values của mỗi chuỗi phải cùng độ dài.',
      },
      {
        name: 'series',
        type: 'GChartSeries[]',
        default: '[]',
        description: 'Các chuỗi { name, values, color? }. Mỗi chuỗi là một đa giác.',
      },
      {
        name: 'shape',
        type: "'circle' | 'polygon'",
        default: "'circle'",
        description: 'Lưới nền là vòng tròn hay đa giác nối các trục.',
      },
      { name: 'height', type: 'number', default: '320', description: 'Chiều cao vùng vẽ (px).' },
      ...CHART_CONTROL_ROWS,
    ],
    demo: {
      title: 'Đánh giá ứng viên',
      ariaLabel: 'So sánh kỹ năng hai ứng viên',
      grid: 'Lưới:',
      circle: 'Vòng tròn',
      polygon: 'Đa giác',
      labels: ['Kỹ thuật', 'Giao tiếp', 'Thiết kế', 'Chủ động', 'Cộng tác', 'Tốc độ'],
      series: [
        { name: 'Ứng viên A', values: [9, 6, 7, 8, 5, 7] },
        { name: 'Ứng viên B', values: [6, 9, 5, 6, 9, 8] },
      ],
    },
  },
  stackedBar: {
    title: 'Stacked Bar',
    intro:
      'Thanh tỉ lệ một dòng (SVG thuần): cả tập dữ liệu nằm trên một thanh ngang, mỗi phần rộng theo tỉ lệ, chú giải kèm phần trăm bên dưới. Chọn nó thay cho pie/donut khi chỉ cần thấy cơ cấu của một tổng thể.',
    apiTitle: 'API — GStackedBar',
    apiRows: [
      {
        name: 'data',
        type: 'GChartSlice[]',
        default: '[]',
        description: 'Các phần { name, value, color? }. Bề rộng mỗi đoạn tính theo tỉ lệ với tổng.',
      },
      { name: 'barHeight', type: 'number', default: '12', description: 'Độ dày thanh (px).' },
      {
        name: 'showLegend / showPercent',
        type: 'boolean',
        default: 'true / true',
        description: 'Hiện chú giải; hiện phần trăm ngay sau tên trong chú giải.',
      },
      ...CHART_CONTROL_ROWS,
    ],
    demo: {
      languagesTitle: 'Ngôn ngữ',
      languagesAriaLabel: 'Tỉ lệ ngôn ngữ trong dự án',
      ordersTitle: 'Trạng thái đơn (thanh dày, không hiện %)',
      languages: [
        { name: 'TypeScript', value: 86.1 },
        { name: 'SCSS', value: 13.5 },
        { name: 'Khác', value: 0.4 },
      ],
      orders: [
        { name: 'Hoàn tất', value: 412 },
        { name: 'Đang giao', value: 168 },
        { name: 'Chờ xác nhận', value: 94 },
        { name: 'Huỷ', value: 37 },
      ],
    },
  },
  heatmap: {
    title: 'Heatmap',
    intro:
      'Bản đồ nhiệt dạng ma trận: mỗi ô là giao của một hàng và một cột, đậm dần theo giá trị. Hợp cho giờ trong ngày x thứ trong tuần, sản phẩm x khu vực. Rê chuột vào ô để xem giá trị.',
    scaleTitle: 'Thang màu',
    scaleIntro:
      'Thang chia 4 bậc theo tỉ lệ với giá trị lớn nhất trong dữ liệu, nên cùng một bộ màu dùng được cho mọi thang số. Bậc 0 là ô trống; các bậc còn lại pha từ color bằng color-mix.',
    apiTitle: 'API — GHeatmapChart',
    apiRows: [
      {
        name: 'data',
        type: 'GHeatmapCell[]',
        default: '[]',
        description: 'Các ô { row, col, value }. Ô không có trong mảng coi như giá trị 0.',
      },
      {
        name: 'rows / columns',
        type: 'string[]',
        default: '[] / []',
        description: 'Thứ tự hàng/cột. Bỏ trống thì lấy theo thứ tự xuất hiện trong data.',
      },
      {
        name: 'cellSize',
        type: 'number',
        default: '28',
        description: 'Cạnh tối đa của một ô (px).',
      },
      {
        name: 'color',
        type: 'string',
        default: "'var(--g-chart-2)'",
        description: 'Màu đậm nhất của thang; các bậc nhạt hơn được pha từ màu này.',
      },
      {
        name: 'showScale',
        type: 'boolean',
        default: 'true',
        description: 'Hiện dải thang màu ở góc dưới-phải.',
      },
      {
        name: 'scaleMinLabel / scaleMaxLabel',
        type: 'string',
        default: "'Ít' / 'Nhiều'",
        description: 'Nhãn hai đầu thang màu.',
      },
      ...CHART_CONTROL_ROWS,
    ],
    demo: {
      title: 'Lượt truy cập theo giờ',
      scaleMinLabel: 'Vắng',
      scaleMaxLabel: 'Đông',
      weekdays: VI_HEATMAP_DAYS,
      columns: VI_HEATMAP_COLUMNS,
      data: heatmapData(VI_HEATMAP_DAYS, VI_HEATMAP_COLUMNS),
    },
  },
  honeycomb: {
    title: 'Honeycomb Chart',
    intro:
      'Biểu đồ tổ ong (honeycomb/hexagon, SVG thuần): mỗi hạng mục là một ô lục giác, xếp so le như tổ ong. Đọc nhanh cái nào nổi bật trong một tập nhiều hạng mục cùng loại.',
    modesTitle: 'Hai cách tô màu',
    modes: [
      'colorMode="heat" (mặc định): đậm dần theo độ lớn giá trị, thang 4 bậc tính theo tỉ lệ với giá trị lớn nhất.',
      'colorMode="category": mỗi ô một màu trong bảng phân loại. Dùng khi các hạng mục rời rạc và màu chỉ để phân biệt.',
    ],
    apiTitle: 'API — GHoneycombChart',
    apiRows: [
      {
        name: 'data',
        type: 'GChartSlice[]',
        default: '[]',
        description: 'Các hạng mục { name, value, color? }; mỗi hạng mục là một ô lục giác.',
      },
      {
        name: 'columns',
        type: 'number',
        default: '0',
        description: 'Số ô mỗi hàng. Bỏ trống (0) thì tự chia cho lưới gần vuông nhất.',
      },
      {
        name: 'colorMode / color',
        type: "'heat' | 'category' / string",
        default: "'heat' / 'var(--g-chart-2)'",
        description: 'Tô theo độ lớn giá trị hay theo bảng màu phân loại.',
      },
      {
        name: 'showLabels / showValues',
        type: 'boolean',
        default: 'true / true',
        description: 'Ghi tên và giá trị trong ô. Ô nhỏ hơn 26px thì tự ẩn chữ.',
      },
      ...CHART_CONTROL_ROWS,
    ],
    demo: {
      title: 'Số việc theo thành viên',
      ariaLabel: 'Số việc đã xử lý theo thành viên',
      colorMode: 'Tô màu:',
      heat: 'Theo độ lớn',
      category: 'Phân loại',
      data: [
        { name: 'An', value: 42 },
        { name: 'Bình', value: 28 },
        { name: 'Chi', value: 35 },
        { name: 'Dũng', value: 12 },
        { name: 'Giang', value: 47 },
        { name: 'Hà', value: 19 },
        { name: 'Khánh', value: 31 },
        { name: 'Linh', value: 8 },
        { name: 'Minh', value: 24 },
        { name: 'Nam', value: 39 },
      ],
    },
  },
  calendarHeatmap: {
    title: 'Calendar Heatmap',
    intro:
      'Lịch nhiệt theo ngày: mỗi cột là một tuần, mỗi hàng là một thứ, ô đậm dần theo giá trị. Dùng để thấy nhịp hoạt động theo thời gian: ngày nào nhiều, quãng nào nghỉ.',
    notesTitle: 'Ghi chú',
    notes: [
      'Tuần bắt đầu từ Chủ nhật (mặc định) hoặc Thứ hai qua weekStart; ô nằm ngoài khoảng ngày vẫn giữ chỗ để lưới không lệch hàng.',
      'Ngày quy về giờ địa phương khi gom nhóm, tránh lệch ngày ở múi giờ phía đông.',
      'Nhiều bản ghi cùng một ngày thì cộng dồn, nên truyền thẳng danh sách sự kiện cũng được.',
      'Một năm là 53 cột: khung hẹp thì cuộn ngang chứ không bóp méo ô.',
    ],
    apiTitle: 'API — GCalendarHeatmap',
    apiRows: [
      {
        name: 'data',
        type: 'GCalendarHeatmapDay[]',
        default: '[]',
        description: 'Các ngày { date, value }; date nhận Date hoặc chuỗi YYYY-MM-DD.',
      },
      {
        name: 'from / to',
        type: 'string | Date',
        default: '1 năm gần nhất',
        description: 'Khoảng ngày hiển thị. Bỏ trống thì lấy tròn một năm tính ngược từ hôm nay.',
      },
      {
        name: 'weekStart',
        type: "'sunday' | 'monday'",
        default: "'sunday'",
        description: 'Hàng đầu của lưới là Chủ nhật hay Thứ hai.',
      },
      {
        name: 'unit',
        type: 'string',
        default: "'đóng góp'",
        description: 'Đơn vị trong tooltip.',
      },
      {
        name: 'showScale',
        type: 'boolean',
        default: 'true',
        description: 'Hiện dải thang màu (Ít -> Nhiều) ở góc dưới-phải.',
      },
      ...CHART_CONTROL_ROWS,
    ],
    demo: {
      title: 'Hoạt động một năm qua',
      unit: 'lần commit',
      weekStartsOn: 'Tuần bắt đầu từ:',
      sunday: 'Chủ nhật',
      monday: 'Thứ hai',
      data: CALENDAR_DAYS,
    },
  },
  colors: {
    title: 'Màu sắc',
    intro:
      'Không truyền gì thì mỗi chuỗi/múi lấy màu theo bảng màu token --g-chart-1...--g-chart-18, lặp vòng khi vượt quá 18. Bảng khai báo cho cả sáng lẫn tối nên đổi theme là chart đổi theo.',
    customColorIntro:
      'Muốn màu riêng thì đặt color trên từng phần tử dữ liệu; giá trị đi thẳng vào fill/stroke của SVG, nên nhận mọi màu CSS hợp lệ:',
    customColorItems: [
      '#e11d48, #2563eb80 (hex, có cả kênh alpha)',
      'rgb(225 29 72), hsl(280 70% 50%), oklch(0.7 0.2 250)',
      'tomato và các tên màu CSS',
      'var(--brand), kể cả có fallback: var(--brand, #2563eb)',
      'color-mix(in srgb, var(--g-chart-1), white 40%)',
    ],
    duplicateNote:
      'Bảng màu không đảm bảo không trùng: quá 18 hạng mục là lặp lại đúng màu cũ, màu bạn tự truyền cũng không được kiểm tra trùng.',
    unsupportedTitle: 'Chưa hỗ trợ:',
    unsupported: [
      'Gradient / pattern: fill cần url(#id) trỏ tới <defs> bên trong SVG, mà component chưa mở chỗ để chèn defs.',
      'Màu theo từng điểm dữ liệu: màu thuộc về chuỗi hoặc múi, không đặt được cho riêng một point.',
    ],
    exportNote:
      'Khi xuất ảnh, mọi dạng trên đều được quy về giá trị đã tính rồi mới ghi vào file; biến CSS không tồn tại bên ngoài trang.',
  },
};

const EN_CHARTS: ChartsCopy = {
  line: {
    ...VI_CHARTS.line,
    intro:
      'Pure SVG line chart with no external charting dependency. It connects points with straight segments or a smooth Catmull-Rom spline. The y-axis chooses rounded ticks and gridlines, resizes with the container, and shows a legend automatically for multiple series.',
    apiRows: [
      {
        name: 'series',
        type: 'GChartSeries[]',
        default: '[]',
        description: 'Series objects: { name, values, color? }.',
      },
      {
        name: 'labels',
        type: 'string[]',
        default: '[]',
        description: 'X-axis labels with the same length as each values array.',
      },
      {
        name: 'curve',
        type: "'straight' | 'smooth'",
        default: "'straight'",
        description: 'Straight or smooth line interpolation.',
      },
      { name: 'height', type: 'number', default: '280', description: 'Chart height in pixels.' },
      {
        name: 'showGrid / showDots / showLegend',
        type: 'boolean',
        default: 'true',
        description: 'Toggles gridlines, point markers, and the legend.',
      },
      ...EN_CHART_CONTROL_ROWS,
    ],
    demo: {
      straight: 'Straight',
      smooth: 'Smooth',
      legend: 'Legend:',
      title: 'Revenue & cost',
      filename: 'revenue-cost',
      ariaLabel: 'Revenue and cost across six months',
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      series: [
        { name: 'Revenue', values: [42, 55, 48, 72, 66, 88] },
        { name: 'Cost', values: [30, 34, 38, 40, 45, 52] },
      ],
    },
  },
  bar: {
    ...VI_CHARTS.bar,
    intro:
      'Pure SVG bar chart. Switch orientation between vertical and horizontal. Multiple series render grouped bars; a single series colors each category. The value domain always includes zero.',
    apiRows: [
      {
        name: 'series',
        type: 'GChartSeries[]',
        default: '[]',
        description: 'Series objects: { name, values, color? }.',
      },
      { name: 'labels', type: 'string[]', default: '[]', description: 'Category labels.' },
      {
        name: 'orientation',
        type: "'vertical' | 'horizontal'",
        default: "'vertical'",
        description: 'Vertical or horizontal bars.',
      },
      { name: 'height', type: 'number', default: '280', description: 'Chart height in pixels.' },
      {
        name: 'showGrid / showLegend',
        type: 'boolean',
        default: 'true',
        description: 'Toggles gridlines and the legend.',
      },
      ...EN_CHART_CONTROL_ROWS,
    ],
    demo: {
      vertical: 'Vertical',
      horizontal: 'Horizontal',
      title: 'Orders by quarter',
      filename: 'orders-by-quarter',
      ariaLabel: 'Orders by quarter across two regions',
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      series: [
        { name: 'North', values: [120, 145, 132, 168] },
        { name: 'South', values: [98, 110, 125, 140] },
      ],
    },
  },
  pie: {
    ...VI_CHARTS.pie,
    intro:
      'Pure SVG pie chart. Each slice is proportional to its value, with percent labels on slices large enough to read. Pass data as GChartSlice[]. The built-in legend can be placed on any side, and exportable enables PNG/SVG downloads.',
    apiRows: [
      {
        name: 'data',
        type: 'GChartSlice[]',
        default: '[]',
        description: 'Slices: { name, value, color? }.',
      },
      {
        name: 'height',
        type: 'number',
        default: '280',
        description: 'Chart height in pixels; radius follows the smaller chart dimension.',
      },
      {
        name: 'showLabels',
        type: 'boolean',
        default: 'true',
        description: 'Shows percentages on slices that are at least 5%.',
      },
      ...EN_CHART_CONTROL_ROWS,
    ],
    demo: {
      title: 'Traffic sources',
      filename: 'traffic-sources',
      ariaLabel: 'Traffic source share',
      data: [
        { name: 'Direct', value: 38 },
        { name: 'Search', value: 27 },
        { name: 'Social', value: 21 },
        { name: 'Referral', value: 14 },
      ],
    },
  },
  donut: {
    ...VI_CHARTS.donut,
    intro:
      'Pure SVG donut chart, like pie but with a center hole that can show the total. It includes a legend and export buttons for PNG/SVG. thickness controls the hole ratio, and export resolves CSS variables so downloaded files keep their colors.',
    apiRows: [
      {
        name: 'data',
        type: 'GChartSlice[]',
        default: '[]',
        description: 'Slices: { name, value, color? }.',
      },
      {
        name: 'thickness',
        type: 'number',
        default: '0.6',
        description: 'Center-hole radius ratio from 0 to 1.',
      },
      {
        name: 'showTotal / totalLabel',
        type: 'boolean / string',
        default: "true / 'Total'",
        description: 'Shows the total in the center with the label below it.',
      },
      {
        name: 'showLegend',
        type: 'boolean',
        default: 'true',
        description: 'Shows the chart legend.',
      },
      { name: 'height', type: 'number', default: '280', description: 'Chart height in pixels.' },
      ...EN_CHART_CONTROL_ROWS,
    ],
    demo: {
      title: 'Orders by channel',
      filename: 'orders-by-channel',
      totalLabel: 'Orders',
      ariaLabel: 'Orders by channel',
      data: [
        { name: 'Website', value: 1240 },
        { name: 'App', value: 860 },
        { name: 'Reseller', value: 540 },
        { name: 'Other', value: 210 },
      ],
    },
  },
  polar: {
    ...VI_CHARTS.polar,
    intro:
      'Pure SVG polar area chart: every category gets the same angle while radius changes with the value. It works best for comparable categories arranged around a cycle, such as seasons, wind directions, or hours of the day.',
    radiusTitle: 'Why is radius linear?',
    radiusIntro:
      'Radius grows linearly with value so slices align with numeric grid rings. Square-root scaling would make area proportional, but then slices would not line up with the grid, making comparisons harder.',
    apiRows: [
      {
        name: 'data',
        type: 'GChartSlice[]',
        default: '[]',
        description: 'Categories: { name, value, color? }. Each category occupies the same angle.',
      },
      {
        name: 'height',
        type: 'number',
        default: '300',
        description: 'Drawing area height in pixels.',
      },
      {
        name: 'showLabels / showLegend',
        type: 'boolean',
        default: 'true / true',
        description: 'Shows labels around the rim and the legend.',
      },
      ...EN_CHART_CONTROL_ROWS,
    ],
    demo: {
      title: 'Rainfall by season (mm)',
      ariaLabel: 'Average rainfall by season',
      data: [
        { name: 'Spring', value: 120 },
        { name: 'Summer', value: 310 },
        { name: 'Autumn', value: 240 },
        { name: 'Winter', value: 90 },
      ],
    },
  },
  radar: {
    ...VI_CHARTS.radar,
    intro:
      'Pure SVG radar chart: each axis radiates from the center as a criterion, and each series connects points into a polygon. It is useful for reading the overall shape and comparing a few overlapping series.',
    avoidTitle: 'When not to use it',
    avoid: [
      'Axes on different scales: normalize first, because every axis shares one value scale.',
      'More than 3 series: overlapping polygons become hard to read; grouped bars are clearer.',
      'Fewer than 3 axes: there is no useful polygon, so use a bar chart.',
    ],
    apiRows: [
      {
        name: 'labels',
        type: 'string[]',
        default: '[]',
        description:
          'Axis names radiating from the center. Each series values array must match this length.',
      },
      {
        name: 'series',
        type: 'GChartSeries[]',
        default: '[]',
        description: 'Series objects: { name, values, color? }. Each series forms one polygon.',
      },
      {
        name: 'shape',
        type: "'circle' | 'polygon'",
        default: "'circle'",
        description: 'Background grid as circles or polygons connecting the axes.',
      },
      {
        name: 'height',
        type: 'number',
        default: '320',
        description: 'Drawing area height in pixels.',
      },
      ...EN_CHART_CONTROL_ROWS,
    ],
    demo: {
      title: 'Candidate scorecard',
      ariaLabel: 'Skill comparison for two candidates',
      grid: 'Grid:',
      circle: 'Circle',
      polygon: 'Polygon',
      labels: ['Technical', 'Communication', 'Design', 'Initiative', 'Collaboration', 'Speed'],
      series: [
        { name: 'Candidate A', values: [9, 6, 7, 8, 5, 7] },
        { name: 'Candidate B', values: [6, 9, 5, 6, 9, 8] },
      ],
    },
  },
  stackedBar: {
    ...VI_CHARTS.stackedBar,
    intro:
      'Single-line proportional bar rendered in SVG: the whole dataset sits on one horizontal bar, each segment is sized by share, and the legend can show percentages below it. Use it instead of pie or donut when you only need the composition of one total.',
    apiRows: [
      {
        name: 'data',
        type: 'GChartSlice[]',
        default: '[]',
        description: 'Segments: { name, value, color? }. Each width is proportional to the total.',
      },
      { name: 'barHeight', type: 'number', default: '12', description: 'Bar thickness in pixels.' },
      {
        name: 'showLegend / showPercent',
        type: 'boolean',
        default: 'true / true',
        description: 'Shows the legend and percentages after legend labels.',
      },
      ...EN_CHART_CONTROL_ROWS,
    ],
    demo: {
      languagesTitle: 'Languages',
      languagesAriaLabel: 'Project language share',
      ordersTitle: 'Order status (thick bar, no %)',
      languages: [
        { name: 'TypeScript', value: 86.1 },
        { name: 'SCSS', value: 13.5 },
        { name: 'Other', value: 0.4 },
      ],
      orders: [
        { name: 'Completed', value: 412 },
        { name: 'Delivering', value: 168 },
        { name: 'Awaiting confirmation', value: 94 },
        { name: 'Cancelled', value: 37 },
      ],
    },
  },
  heatmap: {
    ...VI_CHARTS.heatmap,
    intro:
      'Matrix heatmap: each cell is the intersection of one row and one column, darkening as the value increases. It fits patterns such as hour of day x weekday or product x region. Hover a cell to inspect its value.',
    scaleTitle: 'Color scale',
    scaleIntro:
      'The scale is split into 4 proportional levels based on the maximum value in the dataset, not absolute thresholds. Level 0 is empty; other levels mix from color with color-mix.',
    apiRows: [
      {
        name: 'data',
        type: 'GHeatmapCell[]',
        default: '[]',
        description: 'Cells: { row, col, value }. Missing cells are treated as 0.',
      },
      {
        name: 'rows / columns',
        type: 'string[]',
        default: '[] / []',
        description: 'Row and column order. Empty arrays use first-seen order from data.',
      },
      {
        name: 'cellSize',
        type: 'number',
        default: '28',
        description: 'Maximum square cell size in pixels.',
      },
      {
        name: 'color',
        type: 'string',
        default: "'var(--g-chart-2)'",
        description: 'Darkest scale color; lighter levels are mixed from this color.',
      },
      {
        name: 'showScale',
        type: 'boolean',
        default: 'true',
        description: 'Shows the color scale in the bottom-right corner.',
      },
      {
        name: 'scaleMinLabel / scaleMaxLabel',
        type: 'string',
        default: "'Less' / 'More'",
        description: 'Labels at the two ends of the color scale.',
      },
      ...EN_CHART_CONTROL_ROWS,
    ],
    demo: {
      title: 'Visits by hour',
      scaleMinLabel: 'Sparse',
      scaleMaxLabel: 'Busy',
      weekdays: EN_HEATMAP_DAYS,
      columns: VI_HEATMAP_COLUMNS,
      data: heatmapData(EN_HEATMAP_DAYS, VI_HEATMAP_COLUMNS),
    },
  },
  honeycomb: {
    ...VI_CHARTS.honeycomb,
    intro:
      'Pure SVG honeycomb chart: each category is a hexagon, staggered like a honeycomb grid. It helps scan which items stand out in a larger set of comparable categories.',
    modesTitle: 'Two color modes',
    modes: [
      'colorMode="heat" (default): darker cells represent larger values, with 4 proportional levels based on the maximum value.',
      'colorMode="category": each cell gets a categorical palette color. Use it for discrete categories where color separates items rather than rank.',
    ],
    apiRows: [
      {
        name: 'data',
        type: 'GChartSlice[]',
        default: '[]',
        description: 'Categories: { name, value, color? }; each category is one hexagon.',
      },
      {
        name: 'columns',
        type: 'number',
        default: '0',
        description: 'Cells per row. 0 chooses a near-square grid automatically.',
      },
      {
        name: 'colorMode / color',
        type: "'heat' | 'category' / string",
        default: "'heat' / 'var(--g-chart-2)'",
        description: 'Colors by value magnitude or by the categorical palette.',
      },
      {
        name: 'showLabels / showValues',
        type: 'boolean',
        default: 'true / true',
        description:
          'Shows names and values inside cells. Text hides automatically in very small cells.',
      },
      ...EN_CHART_CONTROL_ROWS,
    ],
    demo: {
      title: 'Tasks by member',
      ariaLabel: 'Completed tasks by member',
      colorMode: 'Color mode:',
      heat: 'By value',
      category: 'Category',
      data: [
        { name: 'An', value: 42 },
        { name: 'Binh', value: 28 },
        { name: 'Chi', value: 35 },
        { name: 'Dung', value: 12 },
        { name: 'Giang', value: 47 },
        { name: 'Ha', value: 19 },
        { name: 'Khanh', value: 31 },
        { name: 'Linh', value: 8 },
        { name: 'Minh', value: 24 },
        { name: 'Nam', value: 39 },
      ],
    },
  },
  calendarHeatmap: {
    ...VI_CHARTS.calendarHeatmap,
    intro:
      'Daily calendar heatmap: each column is a week, each row is a weekday, and each cell darkens with value. Use it to see activity rhythm over time: busy days, quiet days, and long gaps.',
    notesTitle: 'Notes',
    notes: [
      'Week starts on Sunday by default, or Monday via weekStart; cells outside the date range keep their space so the grid stays aligned.',
      'Dates are grouped in local time to avoid off-by-one-day shifts in eastern time zones.',
      'Multiple records on the same day are summed, so an event list can be passed directly.',
      'A year has 53 columns: narrow containers scroll horizontally instead of distorting cells. Month labels use compact names such as Jan, Feb, and Mar.',
    ],
    apiRows: [
      {
        name: 'data',
        type: 'GCalendarHeatmapDay[]',
        default: '[]',
        description: 'Days: { date, value }; date accepts a Date or YYYY-MM-DD string.',
      },
      {
        name: 'from / to',
        type: 'string | Date',
        default: 'last 1 year',
        description: 'Displayed date range. Empty values show a full year ending today.',
      },
      {
        name: 'weekStart',
        type: "'sunday' | 'monday'",
        default: "'sunday'",
        description: 'Whether the first grid row is Sunday or Monday.',
      },
      {
        name: 'unit',
        type: 'string',
        default: "'contributions'",
        description: 'Tooltip unit.',
      },
      {
        name: 'showScale',
        type: 'boolean',
        default: 'true',
        description: 'Shows the color scale (Less -> More) in the bottom-right corner.',
      },
      ...EN_CHART_CONTROL_ROWS,
    ],
    demo: {
      title: 'Activity over the past year',
      unit: 'commits',
      weekStartsOn: 'Week starts on:',
      sunday: 'Sunday',
      monday: 'Monday',
      data: CALENDAR_DAYS,
    },
  },
  colors: {
    title: 'Colors',
    intro:
      'When no color is provided, each series or slice uses the token palette --g-chart-1 through --g-chart-18 and wraps after 18 items. The palette has light and dark values, so charts follow theme changes.',
    customColorIntro:
      'For a custom color, set color on each data item. The value is written directly to SVG fill/stroke and accepts any valid CSS color:',
    customColorItems: [
      '#e11d48, #2563eb80 (hex, including alpha)',
      'rgb(225 29 72), hsl(280 70% 50%), oklch(0.7 0.2 250)',
      'tomato and other CSS color names',
      'var(--brand), including fallback: var(--brand, #2563eb)',
      'color-mix(in srgb, var(--g-chart-1), white 40%)',
    ],
    duplicateNote:
      'The palette does not guarantee uniqueness: item 19 repeats item 1, user-provided colors are not checked for duplicates, and some built-in colors are visually close.',
    unsupportedTitle: 'Not supported yet:',
    unsupported: [
      'Gradient / pattern: fill needs url(#id) pointing to SVG defs, and the component does not expose a slot for defs yet.',
      'Per-point colors: color belongs to a series or slice, not to an individual point.',
    ],
    exportNote:
      'During export, colors are resolved to computed values before writing the file because CSS variables do not exist outside the page.',
  },
};

export function chartsCopyFor(tag: string): ChartsCopy {
  return tag.toLowerCase().startsWith('vi') ? VI_CHARTS : EN_CHARTS;
}
