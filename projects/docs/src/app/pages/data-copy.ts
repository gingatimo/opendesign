import { ApiRow } from '../shared/api-table';

interface DataPageCopy {
  title: string;
  intro: string;
  apiTitle: string;
  accessibilityTitle: string;
  accessibility: string[];
  apiRows: ApiRow[];
}

interface TableCopy extends DataPageCopy {
  overflowNote: string;
  sortTitle: string;
  sortIntro: string;
  freezeTitle: string;
  freezeIntro: string;
  selectTitle: string;
  selectIntro: string;
  containerTitle: string;
  containerIntro: string;
  containerBullets: string[];
  containerNote: string;
  containerApiTitle: string;
  containerApiRows: ApiRow[];
  demo: {
    columns: {
      name: string;
      email: string;
      role: string;
      department: string;
      phone: string;
      position: string;
      note: string;
      status: string;
      city: string;
      region: string;
      population: string;
    };
    basicRows: { name: string; email: string; role: string }[];
    employees: {
      name: string;
      department: string;
      email: string;
      phone: string;
      position: string;
      note: string;
    }[];
    selectRows: {
      id: string;
      name: string;
      role: string;
      status: 'active' | 'invited' | 'inactive';
    }[];
    statusLabels: Record<'active' | 'invited' | 'inactive', string>;
    selectedSummary: (selected: number, total: number) => string;
    selectAll: string;
    selectRow: (name: string) => string;
    cities: { name: string; region: string; population: string }[];
  };
}

interface OrgChartCopy extends DataPageCopy {
  structureTitle: string;
  structureIntro: string;
  demo: {
    defaultCaption: string;
    selectedLabel: string;
    none: string;
    customCaption: string;
    nodes: {
      label: string;
      sublabel: string;
      children?: {
        label: string;
        sublabel: string;
        children?: { label: string; sublabel: string }[];
      }[];
    }[];
  };
}

interface ReorderListCopy extends DataPageCopy {
  demo: {
    tasks: { id: number; name: string }[];
    currentOrder: string;
  };
}

interface DataCopy {
  table: TableCopy;
  orgChart: OrgChartCopy;
  reorderList: ReorderListCopy;
}

const VI_DATA: DataCopy = {
  table: {
    title: 'Table',
    intro:
      'Directive gTable gắn class lên phần tử <table> native để style — thuần hiển thị: không quản lý dữ liệu, sắp xếp hay phân trang. Consumer tự dựng <thead>/<tbody> và tự lo logic đó.',
    overflowNote:
      'Bọc <table> trong một khối overflow-x: auto để bảng cuộn ngang thay vì tràn trang trên màn hình hẹp.',
    sortTitle: 'Sắp xếp',
    sortIntro:
      '[gSortHeader] đặt trên <th>, nhận trạng thái sort của cột rồi tự đặt aria-sort cùng chỉ báo hướng icon. Logic sắp xếp nằm ở consumer; directive chỉ trình bày trạng thái. Để giữ đúng a11y, đặt một <button> bên trong <th> làm điểm kích hoạt thay vì gắn (click) thẳng lên <th>.',
    freezeTitle: 'Đóng băng cột/hàng',
    freezeIntro:
      'Theo kiểu Excel panes: [gFreezeColumn] đặt trên một <th> làm các cột từ mép trái tới cột đó dính khi cuộn ngang; [gFreezeRow] đặt trên một <tr> làm các hàng từ đỉnh tới hàng đó dính khi cuộn dọc. Bọc bảng trong khối overflow: auto có chiều cao/chiều rộng giới hạn để thấy hiệu ứng cuộn.',
    selectTitle: 'Chọn hàng',
    selectIntro:
      'gTable thuần hiển thị nên chọn hàng cũng do consumer quản lý: cột checkbox GCheckbox mỗi hàng + ô tích ở <th> làm chọn tất cả với trạng thái indeterminate. Tập id đã chọn giữ trong một signal<Set>; hàng đã chọn tô nền nhẹ.',
    containerTitle: 'Vùng cuộn — chiều cao theo số hàng',
    containerIntro:
      'Bọc <table gTable> trong <g-table-container> để có sẵn viền, bo góc và vùng cuộn, đồng thời ràng buộc chiều cao theo số hàng thay vì px thủ công:',
    containerBullets: [
      '[minRows] — giữ tối thiểu bấy nhiêu hàng chiều cao. Đặt minRows bằng số hàng mỗi trang thì bảng không co giật khi kết quả ngắn lại.',
      '[maxRows] — vượt quá bấy nhiêu hàng thì tự cuộn dọc. Kết hợp [stickyHeader] của gTable để giữ hàng tiêu đề khi cuộn.',
    ],
    containerNote:
      'Số hàng được quy ra chiều cao thực bằng cách đo lúc chạy và đo lại khi resize hoặc đổi nội dung, nên hàng cao thấp khác nhau vẫn ra đúng.',
    apiTitle: 'API — GTable',
    containerApiTitle: 'API — GTableContainer',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'Dùng đúng phần tử <table> native cùng <th scope="col"> cho header — screen reader đọc đúng cấu trúc bảng theo hàng/cột mà không cần thêm role nào. gTable chỉ gắn class trình bày, không đụng tới ARIA.',
      '[gSortHeader] phản ánh trạng thái sort qua aria-sort trên chính <th>. Nút kích hoạt sắp xếp phải là một <button> thật bên trong <th> để dùng được bằng bàn phím.',
    ],
    apiRows: [
      {
        name: '[gTable] / striped',
        type: 'boolean',
        default: 'false',
        description: 'Tô nền xen kẽ cho các hàng chẵn trong tbody.',
      },
      {
        name: '[gTable] / stickyHeader',
        type: 'boolean',
        default: 'false',
        description: 'Ghim hàng tiêu đề (thead) khi cuộn dọc.',
      },
      {
        name: '[gSortHeader]',
        type: "'asc' | 'desc' | null",
        default: 'null',
        description:
          'Đặt trên <th> — set aria-sort + chỉ báo hướng icon. Logic sắp xếp do consumer tự xử lý.',
      },
      {
        name: '[gFreezeColumn]',
        type: 'marker',
        default: '—',
        description:
          'Đặt trên một <th> header: các cột từ mép trái tới cột đó dính khi cuộn ngang.',
      },
      {
        name: '[gFreezeRow]',
        type: 'marker',
        default: '—',
        description: 'Đặt trên một <tr>: các hàng từ đỉnh tới hàng đó dính khi cuộn dọc.',
      },
    ],
    containerApiRows: [
      {
        name: 'minRows',
        type: 'number',
        default: '0',
        description:
          'Giữ tối thiểu bấy nhiêu hàng chiều cao (0 = không đặt) — chống giật khi kết quả ngắn lại.',
      },
      {
        name: 'maxRows',
        type: 'number',
        default: '0',
        description: 'Tối đa bấy nhiêu hàng; vượt quá thì cuộn dọc (0 = không giới hạn).',
      },
    ],
    demo: {
      columns: {
        name: 'Tên',
        email: 'Email',
        role: 'Vai trò',
        department: 'Phòng ban',
        phone: 'Điện thoại',
        position: 'Vị trí',
        note: 'Ghi chú',
        status: 'Trạng thái',
        city: 'Thành phố',
        region: 'Vùng',
        population: 'Dân số',
      },
      basicRows: [
        { name: 'Nguyễn Văn An', email: 'an.nguyen@example.com', role: 'Quản trị viên' },
        { name: 'Trần Thị Bình', email: 'binh.tran@example.com', role: 'Biên tập viên' },
        { name: 'Lê Hoàng Cường', email: 'cuong.le@example.com', role: 'Thành viên' },
      ],
      employees: [
        {
          name: 'Nguyễn Văn An',
          department: 'Kỹ thuật',
          email: 'an.nguyen@example.com',
          phone: '090 123 4567',
          position: 'Kỹ sư phần mềm',
          note: 'Phụ trách module thanh toán',
        },
        {
          name: 'Trần Thị Bình',
          department: 'Thiết kế',
          email: 'binh.tran@example.com',
          phone: '090 234 5678',
          position: 'Trưởng nhóm thiết kế',
          note: 'Đang nghỉ phép đến hết tuần',
        },
        {
          name: 'Lê Hoàng Cường',
          department: 'Kinh doanh',
          email: 'cuong.le@example.com',
          phone: '090 345 6789',
          position: 'Chuyên viên kinh doanh',
          note: '—',
        },
        {
          name: 'Phạm Thu Hà',
          department: 'Vận hành',
          email: 'ha.pham@example.com',
          phone: '090 456 7890',
          position: 'Điều phối vận hành',
          note: 'Mới chuyển từ chi nhánh Đà Nẵng',
        },
        {
          name: 'Đỗ Minh Khang',
          department: 'Kỹ thuật',
          email: 'khang.do@example.com',
          phone: '090 567 8901',
          position: 'Kỹ sư kiểm thử',
          note: '—',
        },
        {
          name: 'Vũ Lan Phương',
          department: 'Thiết kế',
          email: 'phuong.vu@example.com',
          phone: '090 678 9012',
          position: 'Nhà thiết kế UX',
          note: 'Đang dẫn dắt dự án redesign',
        },
        {
          name: 'Hoàng Đức Mạnh',
          department: 'Nhân sự',
          email: 'manh.hoang@example.com',
          phone: '090 789 0123',
          position: 'Chuyên viên tuyển dụng',
          note: '—',
        },
        {
          name: 'Bùi Thị Ngọc',
          department: 'Tài chính',
          email: 'ngoc.bui@example.com',
          phone: '090 890 1234',
          position: 'Kế toán trưởng',
          note: 'Phê duyệt ngân sách quý',
        },
      ],
      selectRows: [
        { id: 'u1', name: 'Nguyễn Văn An', role: 'Kỹ thuật', status: 'active' },
        { id: 'u2', name: 'Trần Thị Bình', role: 'Thiết kế', status: 'invited' },
        { id: 'u3', name: 'Lê Hoàng Cường', role: 'Kinh doanh', status: 'active' },
        { id: 'u4', name: 'Phạm Thu Hà', role: 'Vận hành', status: 'inactive' },
        { id: 'u5', name: 'Đỗ Minh Khang', role: 'Kỹ thuật', status: 'active' },
      ],
      statusLabels: {
        active: 'Đang hoạt động',
        invited: 'Đã mời',
        inactive: 'Ngừng hoạt động',
      },
      selectedSummary: (selected: number, total: number) => `Đã chọn ${selected} / ${total} hàng.`,
      selectAll: 'Chọn tất cả',
      selectRow: (name: string) => `Chọn ${name}`,
      cities: [
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
      ],
    },
  },
  orgChart: {
    title: 'Organization Chart',
    intro:
      'Sơ đồ tổ chức dạng cây top-down: node gốc trên cùng, các cấp con toả xuống, nối bằng đường thuần CSS. Data-driven qua [nodes] với cấu trúc đệ quy. Bật selectable để bấm chọn node; bật collapsible để node có con hiện nút +/− thu gọn/mở nhánh con.',
    structureTitle: 'Cấu trúc dữ liệu',
    structureIntro:
      'Mỗi node kiểu GOrgChartNode: label (bắt buộc), sublabel (tuỳ chọn) và children (mảng node con — đệ quy). Node tuỳ biến nhận node hiện tại qua context $implicit.',
    apiTitle: 'API — GOrgChart',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'Cấu trúc ul/li lồng nhau phản ánh đúng phân cấp cho screen reader.',
      'Đường nối chỉ mang tính trang trí (pseudo-element), không chèn nội dung đọc thừa.',
    ],
    apiRows: [
      {
        name: 'nodes',
        type: 'GOrgChartNode[]',
        default: '[]',
        description: 'Các node gốc (thường 1). Mỗi node: `label`, `sublabel?`, `children?`.',
      },
      {
        name: 'selectable',
        type: 'boolean',
        default: 'false',
        description: 'Cho bấm node để chọn (multi-select, bấm lần nữa để bỏ chọn).',
      },
      {
        name: 'selected',
        type: 'GOrgChartNode[]',
        default: '[]',
        description: 'Danh sách node đang chọn (two-way `[(selected)]`).',
      },
      {
        name: 'collapsible',
        type: 'boolean',
        default: 'false',
        description: 'Node có con hiện nút +/− để thu gọn/mở nhánh con bên dưới.',
      },
    ],
    demo: {
      defaultCaption: 'Node mặc định — bấm chọn (multi) + nút +/− thu gọn/mở nhánh',
      selectedLabel: 'Đã chọn:',
      none: '(chưa chọn)',
      customCaption: 'Node tuỳ biến — chiếu <ng-template let-node> (avatar + tên + vai trò)',
      nodes: [
        {
          label: 'Nguyễn An',
          sublabel: 'CEO',
          children: [
            {
              label: 'Trần Bình',
              sublabel: 'CTO',
              children: [
                { label: 'Lê Cường', sublabel: 'TL Backend' },
                { label: 'Phạm Dung', sublabel: 'TL Frontend' },
              ],
            },
            { label: 'Hoàng Em', sublabel: 'CFO' },
            {
              label: 'Vũ Giang',
              sublabel: 'CMO',
              children: [{ label: 'Đỗ Hà', sublabel: 'TP Marketing' }],
            },
          ],
        },
      ],
    },
  },
  reorderList: {
    title: 'Reorder List',
    intro:
      'Danh sách kéo-thả để sắp xếp lại thứ tự (dùng CDK drag-drop). Kéo bằng tay nắm bên trái mỗi hàng; thả xong [(items)] tự cập nhật theo thứ tự mới. Mỗi hàng render bằng <ng-template let-item let-i="index"> bạn chiếu vào.',
    apiTitle: 'API — GReorderList',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'Tay nắm là <button> có aria-label, focus được bằng bàn phím.',
      'Sắp xếp bằng kéo (chuột/cảm ứng). Với người dùng chỉ bàn phím, nên kèm nút chuyển lên/xuống.',
    ],
    apiRows: [
      {
        name: 'items',
        type: 'T[]',
        default: '[]',
        description: 'Danh sách item (two-way `[(items)]`). Thả xong tự set lại theo thứ tự mới.',
      },
    ],
    demo: {
      tasks: [
        { id: 1, name: 'Thiết kế giao diện' },
        { id: 2, name: 'Dựng API' },
        { id: 3, name: 'Viết test' },
        { id: 4, name: 'Kiểm thử QA' },
        { id: 5, name: 'Phát hành' },
      ],
      currentOrder: 'Thứ tự hiện tại:',
    },
  },
};

const EN_DATA: DataCopy = {
  table: {
    title: 'Table',
    intro:
      'Presentation-only table directive. gTable attaches styling to a native <table>; it does not manage data, sorting, or pagination. Consumers build <thead>/<tbody> and own that logic.',
    overflowNote:
      'Wrap <table> in an overflow-x: auto block so wide tables scroll horizontally instead of overflowing narrow screens.',
    sortTitle: 'Sorting',
    sortIntro:
      '[gSortHeader] goes on <th>, receives the current sort state, and sets aria-sort plus a direction icon. Sorting logic stays in consumer code. Use a real <button> inside <th> as the trigger instead of attaching click directly to <th>.',
    freezeTitle: 'Frozen columns/rows',
    freezeIntro:
      'Excel-style panes: [gFreezeColumn] on a <th> makes columns from the left edge through that column sticky during horizontal scroll; [gFreezeRow] on a <tr> makes rows from the top through that row sticky during vertical scroll.',
    selectTitle: 'Select rows',
    selectIntro:
      'gTable is presentation-only, so selection is consumer-owned: combine a GCheckbox column per row with a header checkbox for select all and indeterminate state. Keep selected ids in a signal<Set> and style selected rows.',
    containerTitle: 'Scroll region — height by row count',
    containerIntro:
      'Wrap <table gTable> in <g-table-container> to get border, radius, scrolling, and height constraints based on row count instead of hand-written pixels:',
    containerBullets: [
      '[minRows] keeps at least that many rows of height, preventing table jumps when filtered or paginated results become shorter.',
      '[maxRows] scrolls vertically after that many rows. Combine it with [stickyHeader] on gTable to keep the header visible while scrolling.',
    ],
    containerNote:
      'Rows are converted to real height by measuring at runtime and remeasuring on resize/content changes, so varied row heights still work.',
    apiTitle: 'API — GTable',
    containerApiTitle: 'API — GTableContainer',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'Use native <table> with <th scope="col"> headers so screen readers understand row/column structure without extra roles. gTable only attaches presentation classes and does not alter ARIA.',
      '[gSortHeader] reflects sort state with aria-sort on the <th>. The sorting trigger should be a real <button> inside <th> so keyboard users can tab to it and activate with Enter/Space.',
    ],
    apiRows: [
      {
        name: '[gTable] / striped',
        type: 'boolean',
        default: 'false',
        description: 'Adds alternating background to even rows in tbody.',
      },
      {
        name: '[gTable] / stickyHeader',
        type: 'boolean',
        default: 'false',
        description: 'Keeps the table header (thead) sticky while vertically scrolling.',
      },
      {
        name: '[gSortHeader]',
        type: "'asc' | 'desc' | null",
        default: 'null',
        description:
          'Place on <th>; sets aria-sort and a direction icon. Sorting logic is handled by the consumer.',
      },
      {
        name: '[gFreezeColumn]',
        type: 'marker',
        default: '—',
        description: 'Place on a header <th>; columns from the left edge through it stay sticky.',
      },
      {
        name: '[gFreezeRow]',
        type: 'marker',
        default: '—',
        description: 'Place on a <tr>; rows from the top through it stay sticky.',
      },
    ],
    containerApiRows: [
      {
        name: 'minRows',
        type: 'number',
        default: '0',
        description: 'Minimum row-height count to reserve (0 = unset), preventing jumps.',
      },
      {
        name: 'maxRows',
        type: 'number',
        default: '0',
        description: 'Maximum number of rows before vertical scrolling starts (0 = unlimited).',
      },
    ],
    demo: {
      columns: {
        name: 'Name',
        email: 'Email',
        role: 'Role',
        department: 'Department',
        phone: 'Phone',
        position: 'Position',
        note: 'Note',
        status: 'Status',
        city: 'City',
        region: 'Region',
        population: 'Population',
      },
      basicRows: [
        { name: 'Alex Nguyen', email: 'alex.nguyen@example.com', role: 'Administrator' },
        { name: 'Bella Tran', email: 'bella.tran@example.com', role: 'Editor' },
        { name: 'Chris Le', email: 'chris.le@example.com', role: 'Member' },
      ],
      employees: [
        {
          name: 'Alex Nguyen',
          department: 'Engineering',
          email: 'alex.nguyen@example.com',
          phone: '+1 202 555 0101',
          position: 'Software Engineer',
          note: 'Owns the billing module',
        },
        {
          name: 'Bella Tran',
          department: 'Design',
          email: 'bella.tran@example.com',
          phone: '+1 202 555 0102',
          position: 'Design Lead',
          note: 'On leave until end of week',
        },
        {
          name: 'Chris Le',
          department: 'Sales',
          email: 'chris.le@example.com',
          phone: '+1 202 555 0103',
          position: 'Sales Specialist',
          note: '—',
        },
        {
          name: 'Hannah Pham',
          department: 'Operations',
          email: 'hannah.pham@example.com',
          phone: '+1 202 555 0104',
          position: 'Operations Coordinator',
          note: 'Recently transferred from Austin',
        },
        {
          name: 'Kai Do',
          department: 'Engineering',
          email: 'kai.do@example.com',
          phone: '+1 202 555 0105',
          position: 'QA Engineer',
          note: '—',
        },
        {
          name: 'Paula Vu',
          department: 'Design',
          email: 'paula.vu@example.com',
          phone: '+1 202 555 0106',
          position: 'UX Designer',
          note: 'Leading the redesign project',
        },
        {
          name: 'Mark Hoang',
          department: 'People',
          email: 'mark.hoang@example.com',
          phone: '+1 202 555 0107',
          position: 'Recruiter',
          note: '—',
        },
        {
          name: 'Nora Bui',
          department: 'Finance',
          email: 'nora.bui@example.com',
          phone: '+1 202 555 0108',
          position: 'Chief Accountant',
          note: 'Approves quarterly budget',
        },
      ],
      selectRows: [
        { id: 'u1', name: 'Alex Nguyen', role: 'Engineering', status: 'active' },
        { id: 'u2', name: 'Bella Tran', role: 'Design', status: 'invited' },
        { id: 'u3', name: 'Chris Le', role: 'Sales', status: 'active' },
        { id: 'u4', name: 'Hannah Pham', role: 'Operations', status: 'inactive' },
        { id: 'u5', name: 'Kai Do', role: 'Engineering', status: 'active' },
      ],
      statusLabels: {
        active: 'Active',
        invited: 'Invited',
        inactive: 'Inactive',
      },
      selectedSummary: (selected: number, total: number) => `Selected ${selected} / ${total} rows.`,
      selectAll: 'Select all',
      selectRow: (name: string) => `Select ${name}`,
      cities: [
        { name: 'New York', region: 'Northeast', population: '8.3M' },
        { name: 'Los Angeles', region: 'West', population: '3.8M' },
        { name: 'Chicago', region: 'Midwest', population: '2.7M' },
        { name: 'Houston', region: 'South', population: '2.3M' },
        { name: 'Phoenix', region: 'West', population: '1.6M' },
        { name: 'Philadelphia', region: 'Northeast', population: '1.6M' },
        { name: 'San Antonio', region: 'South', population: '1.5M' },
        { name: 'San Diego', region: 'West', population: '1.4M' },
        { name: 'Dallas', region: 'South', population: '1.3M' },
        { name: 'San Jose', region: 'West', population: '1.0M' },
        { name: 'Austin', region: 'South', population: '1.0M' },
        { name: 'Jacksonville', region: 'South', population: '0.99M' },
      ],
    },
  },
  orgChart: {
    title: 'Organization Chart',
    intro:
      'Top-down organization tree: the root node sits at the top, child levels fan downward, and connectors are pure CSS. Data comes from recursive [nodes]. Enable selectable for multi-select nodes and collapsible for +/− branch controls.',
    structureTitle: 'Data structure',
    structureIntro:
      'Each GOrgChartNode has label (required), optional sublabel, and recursive children. A custom node template receives the current node as $implicit.',
    apiTitle: 'API — GOrgChart',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'Nested ul/li structure reflects the hierarchy for screen readers.',
      'Connectors are decorative pseudo-elements and do not add extra readable content.',
    ],
    apiRows: [
      {
        name: 'nodes',
        type: 'GOrgChartNode[]',
        default: '[]',
        description:
          'Root nodes, usually one. Each node has `label`, `sublabel?`, and `children?`.',
      },
      {
        name: 'selectable',
        type: 'boolean',
        default: 'false',
        description: 'Allows clicking nodes to select them; click again to deselect.',
      },
      {
        name: 'selected',
        type: 'GOrgChartNode[]',
        default: '[]',
        description: 'Selected nodes, two-way bound with `[(selected)]`.',
      },
      {
        name: 'collapsible',
        type: 'boolean',
        default: 'false',
        description: 'Shows +/− controls on parent nodes to collapse or expand child branches.',
      },
    ],
    demo: {
      defaultCaption: 'Default nodes — multi-select plus +/− collapse controls',
      selectedLabel: 'Selected:',
      none: '(none)',
      customCaption: 'Custom nodes — projected <ng-template let-node> with avatar, name, and role',
      nodes: [
        {
          label: 'Alex Nguyen',
          sublabel: 'CEO',
          children: [
            {
              label: 'Bella Tran',
              sublabel: 'CTO',
              children: [
                { label: 'Chris Le', sublabel: 'Backend Lead' },
                { label: 'Dana Pham', sublabel: 'Frontend Lead' },
              ],
            },
            { label: 'Ethan Hoang', sublabel: 'CFO' },
            {
              label: 'Gia Vu',
              sublabel: 'CMO',
              children: [{ label: 'Harper Do', sublabel: 'Marketing Manager' }],
            },
          ],
        },
      ],
    },
  },
  reorderList: {
    title: 'Reorder List',
    intro:
      'Drag-and-drop list for changing item order, powered by CDK drag-drop. Drag from the grip on the left of each row; after drop, [(items)] updates to the new order. Each row is rendered with your projected <ng-template let-item let-i="index">.',
    apiTitle: 'API — GReorderList',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'The grip is a focusable <button> with an aria-label.',
      'Ordering is drag-based for pointer/touch users. Add move up/down buttons when the experience must support keyboard-only reordering.',
    ],
    apiRows: [
      {
        name: 'items',
        type: 'T[]',
        default: '[]',
        description: 'List of items, two-way bound with `[(items)]`; drop updates the order.',
      },
    ],
    demo: {
      tasks: [
        { id: 1, name: 'Design UI' },
        { id: 2, name: 'Build API' },
        { id: 3, name: 'Write tests' },
        { id: 4, name: 'Run QA' },
        { id: 5, name: 'Release' },
      ],
      currentOrder: 'Current order:',
    },
  },
};

export function dataCopyFor(tag: string): DataCopy {
  return tag.startsWith('en') ? EN_DATA : VI_DATA;
}
