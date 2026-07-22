import { GBadgeVariant, GTerminalLine } from 'ngx-opendesign';

export type PlaybookStatus = 'active' | 'invited' | 'inactive';

export interface PlaybookListRow {
  name: string;
  role: string;
  status: PlaybookStatus;
  updatedAt: Date;
}

export interface PlaybookField {
  label: string;
  value: string;
}

export interface PlaybookTimelineItem {
  status?: 'success' | 'warning';
  title: string;
  body: string;
}

export interface PlaybookMessage {
  id: number;
  role: 'bot' | 'user';
  text: string;
}

interface PageCopy {
  title: string;
  intro: string;
}

interface LoginCopy extends PageCopy {
  cardTitle: string;
  email: string;
  emailPlaceholder: string;
  password: string;
  requiredEmail: string;
  invalidEmail: string;
  requiredPassword: string;
  remember: string;
  submit: string;
  submitting: string;
}

interface DashboardCopy extends PageCopy {
  collapseSidebar: string;
  expandSidebar: string;
  notifications: string;
  overview: string;
  orders: string;
  customers: string;
  monthlyRevenue: string;
  revenueValue: string;
  revenueDelta: string;
  newOrders: string;
  ordersValue: string;
  ordersDelta: string;
  quarterGoal: string;
}

interface ListCopy extends PageCopy {
  searchPlaceholder: string;
  statusFilterLabel: string;
  roleFilterLabel: string;
  all: string;
  statuses: Record<PlaybookStatus, string>;
  statusVariants: Record<PlaybookStatus, GBadgeVariant>;
  roles: string[];
  rows: PlaybookListRow[];
  appliedRoles: string;
  removeRole: (role: string) => string;
  columns: {
    name: string;
    role: string;
    status: string;
    updatedAt: string;
    actions: string;
  };
  edit: string;
  delete: string;
  empty: string;
  dateFormat: string;
}

interface DetailCopy extends PageCopy {
  personName: string;
  status: string;
  subtitle: string;
  edit: string;
  delete: string;
  tablistLabel: string;
  profileTab: string;
  activityTab: string;
  fields: PlaybookField[];
  timeline: PlaybookTimelineItem[];
}

interface CreateCopy extends PageCopy {
  cardTitle: string;
  avatar: string;
  fullName: string;
  namePlaceholder: string;
  requiredName: string;
  email: string;
  emailPlaceholder: string;
  requiredEmail: string;
  invalidEmail: string;
  department: string;
  departmentPlaceholder: string;
  requiredDepartment: string;
  departments: { value: string; label: string }[];
  contractType: string;
  contractTypes: { value: string; label: string }[];
  startDate: string;
  requiredStartDate: string;
  accessQuota: string;
  tags: string;
  tagsPlaceholder: string;
  notes: string;
  notesPlaceholder: string;
  activateNow: string;
  agree: string;
  requiredAgree: string;
  reset: string;
  save: string;
  invalidToast: string;
  savedToast: (name: string) => string;
}

interface ChatbotCopy extends PageCopy {
  assistantName: string;
  online: string;
  typing: string;
  quickReplies: string[];
  placeholder: string;
  inputLabel: string;
  send: string;
  record: string;
  initialMessage: string;
  reply: (text: string) => string;
}

interface WorkspaceCopy extends PageCopy {
  assistantShortName: string;
  assistantName: string;
  placeholder: string;
  inputLabel: string;
  send: string;
  initialMessage: string;
  terminal: GTerminalLine[];
  receivedReply: (text: string) => string;
  commandOutput: (cmd: string) => string;
}

interface PlaybookCopy {
  login: LoginCopy;
  dashboard: DashboardCopy;
  list: ListCopy;
  detail: DetailCopy;
  create: CreateCopy;
  chatbot: ChatbotCopy;
  workspace: WorkspaceCopy;
}

const STATUS_VARIANTS: Record<PlaybookStatus, GBadgeVariant> = {
  active: 'success',
  invited: 'warning',
  inactive: 'neutral',
};

const VI_LIST_ROWS: PlaybookListRow[] = [
  ['Nguyễn Văn An', 'Kỹ thuật', 'active', new Date(2026, 6, 15, 9, 30)],
  ['Trần Thị Bình', 'Thiết kế', 'invited', new Date(2026, 6, 10, 14, 5)],
  ['Lê Hoàng Cường', 'Kinh doanh', 'active', new Date(2026, 5, 28, 8, 15)],
  ['Phạm Thu Hà', 'Vận hành', 'inactive', new Date(2026, 4, 2, 11, 40)],
  ['Đỗ Minh Khang', 'Kỹ thuật', 'active', new Date(2026, 6, 1, 16, 20)],
  ['Vũ Lan Phương', 'Thiết kế', 'invited', new Date(2026, 6, 12, 10, 0)],
  ['Hoàng Đức Mạnh', 'Kinh doanh', 'active', new Date(2026, 3, 18, 9, 0)],
  ['Bùi Thị Ngọc', 'Vận hành', 'inactive', new Date(2026, 2, 22, 13, 45)],
  ['Ngô Quốc Bảo', 'Kỹ thuật', 'active', new Date(2026, 5, 5, 7, 50)],
  ['Đặng Thị Lan', 'Thiết kế', 'invited', new Date(2026, 6, 16, 15, 30)],
  ['Trịnh Văn Đạt', 'Kinh doanh', 'active', new Date(2026, 1, 14, 9, 10)],
  ['Lý Thị Hồng', 'Vận hành', 'inactive', new Date(2026, 0, 29, 17, 0)],
  ['Phan Văn Hùng', 'Kỹ thuật', 'active', new Date(2026, 4, 20, 10, 25)],
  ['Đinh Thị Kim', 'Thiết kế', 'invited', new Date(2026, 5, 30, 12, 15)],
  ['Vương Minh Tuấn', 'Kinh doanh', 'active', new Date(2026, 6, 8, 8, 40)],
  ['Châu Thị Mai', 'Vận hành', 'inactive', new Date(2026, 3, 5, 14, 50)],
].map(([name, role, status, updatedAt]) => ({
  name: name as string,
  role: role as string,
  status: status as PlaybookStatus,
  updatedAt: updatedAt as Date,
}));

const EN_LIST_ROWS: PlaybookListRow[] = [
  ['An Nguyen', 'Engineering', 'active', new Date(2026, 6, 15, 9, 30)],
  ['Bella Tran', 'Design', 'invited', new Date(2026, 6, 10, 14, 5)],
  ['Cuong Le', 'Sales', 'active', new Date(2026, 5, 28, 8, 15)],
  ['Ha Pham', 'Operations', 'inactive', new Date(2026, 4, 2, 11, 40)],
  ['Khang Do', 'Engineering', 'active', new Date(2026, 6, 1, 16, 20)],
  ['Phuong Vu', 'Design', 'invited', new Date(2026, 6, 12, 10, 0)],
  ['Manh Hoang', 'Sales', 'active', new Date(2026, 3, 18, 9, 0)],
  ['Ngoc Bui', 'Operations', 'inactive', new Date(2026, 2, 22, 13, 45)],
  ['Bao Ngo', 'Engineering', 'active', new Date(2026, 5, 5, 7, 50)],
  ['Lan Dang', 'Design', 'invited', new Date(2026, 6, 16, 15, 30)],
  ['Dat Trinh', 'Sales', 'active', new Date(2026, 1, 14, 9, 10)],
  ['Hong Ly', 'Operations', 'inactive', new Date(2026, 0, 29, 17, 0)],
  ['Hung Phan', 'Engineering', 'active', new Date(2026, 4, 20, 10, 25)],
  ['Kim Dinh', 'Design', 'invited', new Date(2026, 5, 30, 12, 15)],
  ['Tuan Vuong', 'Sales', 'active', new Date(2026, 6, 8, 8, 40)],
  ['Mai Chau', 'Operations', 'inactive', new Date(2026, 3, 5, 14, 50)],
].map(([name, role, status, updatedAt]) => ({
  name: name as string,
  role: role as string,
  status: status as PlaybookStatus,
  updatedAt: updatedAt as Date,
}));

const VI_COPY: PlaybookCopy = {
  login: {
    title: 'Đăng nhập',
    intro:
      'Màn đăng nhập tối giản dựng bằng GCard, GInput, GCheckbox và GButton. Reactive forms với Validators.required và Validators.email; lỗi chỉ hiện khi trường đã touched và invalid. Nút submit chuyển sang loading thật trong lúc gọi API để chặn double-submit.',
    cardTitle: 'Đăng nhập',
    email: 'Email',
    emailPlaceholder: 'ban@vidu.com',
    password: 'Mật khẩu',
    requiredEmail: 'Vui lòng nhập email.',
    invalidEmail: 'Email không đúng định dạng.',
    requiredPassword: 'Vui lòng nhập mật khẩu.',
    remember: 'Ghi nhớ đăng nhập',
    submit: 'Đăng nhập',
    submitting: 'Đang đăng nhập...',
  },
  dashboard: {
    title: 'Dashboard',
    intro:
      'GTopbar + GSidebar + vùng nội dung ghép thành một layout dashboard hoàn chỉnh với thẻ số liệu, thanh tiến độ và danh sách hoạt động. Demo thu nhỏ trong khung có chiều cao cố định để không phá layout của chính trang docs này.',
    collapseSidebar: 'Thu gọn thanh bên',
    expandSidebar: 'Mở rộng thanh bên',
    notifications: 'Thông báo',
    overview: 'Tổng quan',
    orders: 'Đơn hàng',
    customers: 'Khách hàng',
    monthlyRevenue: 'Doanh thu tháng',
    revenueValue: '128,4tr ₫',
    revenueDelta: '+12% so với tháng trước',
    newOrders: 'Đơn hàng mới',
    ordersValue: '342',
    ordersDelta: '-4% so với tháng trước',
    quarterGoal: 'Tiến độ mục tiêu quý',
  },
  list: {
    title: 'Danh sách',
    intro:
      'Màn danh sách đầy đủ ba khối: tìm kiếm theo tên, lọc theo trạng thái và vai trò, và bảng kết quả. Bảng đóng băng cột Tên + hàng tiêu đề để cuộn ngang/dọc không mất mốc, cột trạng thái dùng GBadge, thời gian format qua DatePipe, hành động là hai GIconButton. Phân trang thật ở dưới; đổi bộ lọc hoặc tìm kiếm thì tự quay về trang 1.',
    searchPlaceholder: 'Tìm theo tên...',
    statusFilterLabel: 'Lọc theo trạng thái',
    roleFilterLabel: 'Lọc theo vai trò',
    all: 'Tất cả',
    statuses: {
      active: 'Đang hoạt động',
      invited: 'Đã mời',
      inactive: 'Ngừng hoạt động',
    },
    statusVariants: STATUS_VARIANTS,
    roles: ['Kỹ thuật', 'Thiết kế', 'Kinh doanh', 'Vận hành'],
    rows: VI_LIST_ROWS,
    appliedRoles: 'Đang lọc vai trò:',
    removeRole: (role) => `Bỏ lọc ${role}`,
    columns: {
      name: 'Tên',
      role: 'Vai trò',
      status: 'Trạng thái',
      updatedAt: 'Cập nhật',
      actions: 'Hành động',
    },
    edit: 'Sửa',
    delete: 'Xoá',
    empty: 'Không có dữ liệu khớp bộ lọc.',
    dateFormat: 'dd/MM/yyyy HH:mm',
  },
  detail: {
    title: 'Chi tiết',
    intro:
      'Màn xem hồ sơ một bản ghi: header có GAvatar, tên, GBadge trạng thái và nút Sửa/Xoá. GTabs tách Thông tin và Hoạt động; tab hoạt động dựng bằng GTimeline với marker màu theo trạng thái từng mốc.',
    personName: 'Nguyễn Văn An',
    status: 'Đang hoạt động',
    subtitle: 'Kỹ thuật · Nhân viên #NV-0142',
    edit: 'Sửa',
    delete: 'Xoá',
    tablistLabel: 'Chi tiết nhân viên',
    profileTab: 'Thông tin',
    activityTab: 'Hoạt động',
    fields: [
      { label: 'Email', value: 'an.nguyen@vidu.com' },
      { label: 'Điện thoại', value: '0901 234 567' },
      { label: 'Phòng ban', value: 'Kỹ thuật' },
      { label: 'Chức danh', value: 'Kỹ sư phần mềm' },
      { label: 'Ngày vào làm', value: '02/03/2024' },
      { label: 'Quản lý trực tiếp', value: 'Lê Hoàng Cường' },
    ],
    timeline: [
      {
        status: 'warning',
        title: 'Nhắc gia hạn hợp đồng',
        body: 'Hợp đồng lao động sắp hết hạn — còn 30 ngày.',
      },
      {
        status: 'success',
        title: 'Cập nhật hồ sơ',
        body: 'Đổi số điện thoại liên hệ — 15/07/2026, 09:30.',
      },
      {
        status: 'success',
        title: 'Hoàn thành onboarding',
        body: 'Đã ký hợp đồng và nhận thiết bị — 05/03/2024.',
      },
      { title: 'Tạo tài khoản', body: 'Khởi tạo tài khoản nội bộ — 02/03/2024.' },
    ],
  },
  create: {
    title: 'Thêm mới',
    intro:
      'Form tạo bản ghi gom gần đủ họ input của OpenDesign: GInput, GTextarea, GSelect, GRadioGroup, GCheckbox, GToggle, GDatepicker, GSlider, GChips và GFileInput + GImagePreview. Validation qua reactive forms, nút Lưu bắn toast. GSlider dùng model [(value)] nên giữ ngoài form group rồi gộp tay lúc submit.',
    cardTitle: 'Thêm nhân viên mới',
    avatar: 'Ảnh đại diện',
    fullName: 'Họ tên',
    namePlaceholder: 'Nguyễn Văn A',
    requiredName: 'Vui lòng nhập họ tên.',
    email: 'Email',
    emailPlaceholder: 'ban@vidu.com',
    requiredEmail: 'Vui lòng nhập email.',
    invalidEmail: 'Email không đúng định dạng.',
    department: 'Phòng ban',
    departmentPlaceholder: 'Chọn phòng ban',
    requiredDepartment: 'Vui lòng chọn phòng ban.',
    departments: [
      { value: 'engineering', label: 'Kỹ thuật' },
      { value: 'design', label: 'Thiết kế' },
      { value: 'sales', label: 'Kinh doanh' },
      { value: 'ops', label: 'Vận hành' },
    ],
    contractType: 'Loại hợp đồng',
    contractTypes: [
      { value: 'fulltime', label: 'Chính thức' },
      { value: 'probation', label: 'Thử việc' },
      { value: 'contractor', label: 'Cộng tác' },
    ],
    startDate: 'Ngày vào làm',
    requiredStartDate: 'Vui lòng chọn ngày vào làm.',
    accessQuota: 'Hạn mức truy cập',
    tags: 'Kỹ năng / thẻ',
    tagsPlaceholder: 'Nhập rồi Enter',
    notes: 'Ghi chú',
    notesPlaceholder: 'Thông tin thêm về nhân viên...',
    activateNow: 'Kích hoạt tài khoản ngay',
    agree: 'Tôi xác nhận thông tin là chính xác',
    requiredAgree: 'Cần xác nhận trước khi lưu.',
    reset: 'Đặt lại',
    save: 'Lưu nhân viên',
    invalidToast: 'Vui lòng kiểm tra lại các trường bắt buộc.',
    savedToast: (name) => `Đã lưu nhân viên "${name}".`,
  },
  chatbot: {
    title: 'Chatbot',
    intro:
      'Khung chat tương tác thật: gõ tin hoặc bấm chip gợi ý, bot soạn rồi trả lời mẫu theo từ khoá. Ghép GCard, GAvatar, GBadge, GScrollPanel, GChip và GInputGroup với nút suffix đổi icon theo ngữ cảnh.',
    assistantName: 'Trợ lý OpenDesign',
    online: 'Đang hoạt động',
    typing: 'Đang soạn tin',
    quickReplies: ['Giới thiệu OpenDesign', 'Hỗ trợ dark mode?', 'Có bao nhiêu component?'],
    placeholder: 'Nhập tin nhắn...',
    inputLabel: 'Nội dung tin nhắn',
    send: 'Gửi',
    record: 'Ghi âm',
    initialMessage: 'Chào bạn. Mình là trợ lý OpenDesign. Bạn cần hỗ trợ gì?',
    reply: (text) => {
      const t = text.toLowerCase();
      if (t.includes('dark') || t.includes('tối')) {
        return 'OpenDesign có sẵn sáng/tối: đặt data-g-theme="dark" lên <html> là mọi component đổi màu ngay, không cần build lại.';
      }
      if (t.includes('component') || t.includes('bao nhiêu')) {
        return 'Thư viện hiện có 78 component, tất cả standalone + OnPush + signals.';
      }
      if (t.includes('giới thiệu') || t.includes('opendesign') || t.includes('là gì')) {
        return 'OpenDesign là design system cho Angular 22: thẩm mỹ pill, token --g-*, không có dependency ngoài @angular/cdk và @angular/forms.';
      }
      if (t.includes('chào') || t.includes('hello')) {
        return 'Chào bạn. Mình có thể giúp gì về OpenDesign?';
      }
      return `Mình đã ghi nhận: "${text}". Đây là demo nên phản hồi là câu mẫu.`;
    },
  },
  workspace: {
    title: 'Chat + Terminal',
    intro:
      'Bố cục kiểu IDE: GSplitter chia đôi, bên trái là khung chat và bên phải là terminal. Kéo thanh giữa để đổi tỉ lệ hai bên; cả hai panel tương tác thật.',
    assistantShortName: 'Trợ lý',
    assistantName: 'Trợ lý OpenDesign',
    placeholder: 'Hỏi gì đó...',
    inputLabel: 'Tin nhắn',
    send: 'Gửi',
    initialMessage: 'Chào bạn. Bên phải là terminal — thử gõ một lệnh xem.',
    terminal: [
      { text: 'opendesign@dev ~ %', kind: 'output' },
      { text: 'npm run build:lib', kind: 'command' },
      { text: 'Build complete. [1245ms]', kind: 'success' },
    ],
    receivedReply: (text) => `Đã nhận: "${text}". (phản hồi mẫu)`,
    commandOutput: (cmd) => `Đã chạy: ${cmd} (kết quả mẫu)`,
  },
};

const EN_COPY: PlaybookCopy = {
  login: {
    ...VI_COPY.login,
    title: 'Login',
    intro:
      'Minimal login screen built with GCard, GInput, GCheckbox, and GButton. Reactive forms use Validators.required and Validators.email; errors appear only after a field is touched and invalid. The submit button enters a real loading state while the API call is simulated to prevent double submit.',
    cardTitle: 'Sign in',
    password: 'Password',
    requiredEmail: 'Enter an email address.',
    invalidEmail: 'Enter a valid email address.',
    requiredPassword: 'Enter a password.',
    remember: 'Remember me',
    submit: 'Sign in',
    submitting: 'Signing in...',
  },
  dashboard: {
    ...VI_COPY.dashboard,
    intro:
      'Complete dashboard layout built from GTopbar, GSidebar, and a content area with metric cards and progress. The demo is constrained to a fixed-height frame so it does not interfere with the docs shell, which also uses a real topbar and sidebar.',
    collapseSidebar: 'Collapse sidebar',
    expandSidebar: 'Expand sidebar',
    notifications: 'Notifications',
    overview: 'Overview',
    orders: 'Orders',
    customers: 'Customers',
    monthlyRevenue: 'Monthly revenue',
    revenueValue: '$128.4k',
    revenueDelta: '+12% vs last month',
    newOrders: 'New orders',
    ordersDelta: '-4% vs last month',
    quarterGoal: 'Quarter goal progress',
  },
  list: {
    ...VI_COPY.list,
    title: 'List',
    intro:
      'Full list screen with three blocks: name search, status and role filters, and a result table. The table freezes the Name column and header row while scrolling, uses GBadge for status, DatePipe for timestamps, and GIconButton for actions. Pagination sits below; changing filters or search resets back to page 1.',
    searchPlaceholder: 'Search by name...',
    statusFilterLabel: 'Filter by status',
    roleFilterLabel: 'Filter by role',
    all: 'All',
    statuses: {
      active: 'Active',
      invited: 'Invited',
      inactive: 'Inactive',
    },
    roles: ['Engineering', 'Design', 'Sales', 'Operations'],
    rows: EN_LIST_ROWS,
    appliedRoles: 'Filtering roles:',
    removeRole: (role) => `Remove ${role} filter`,
    columns: {
      name: 'Name',
      role: 'Role',
      status: 'Status',
      updatedAt: 'Updated',
      actions: 'Actions',
    },
    edit: 'Edit',
    delete: 'Delete',
    empty: 'No data matches the current filters.',
    dateFormat: 'MM/dd/yyyy HH:mm',
  },
  detail: {
    ...VI_COPY.detail,
    title: 'Detail',
    intro:
      'Record detail screen for a single profile: the header combines GAvatar, name, status badge, and Edit/Delete buttons. GTabs separates Profile from Activity, and the activity tab uses GTimeline with status-colored markers.',
    personName: 'An Nguyen',
    status: 'Active',
    subtitle: 'Engineering · Employee #EMP-0142',
    edit: 'Edit',
    delete: 'Delete',
    tablistLabel: 'Employee details',
    profileTab: 'Profile',
    activityTab: 'Activity',
    fields: [
      { label: 'Email', value: 'an.nguyen@example.com' },
      { label: 'Phone', value: '0901 234 567' },
      { label: 'Department', value: 'Engineering' },
      { label: 'Title', value: 'Software engineer' },
      { label: 'Start date', value: '03/02/2024' },
      { label: 'Manager', value: 'Cuong Le' },
    ],
    timeline: [
      {
        status: 'warning',
        title: 'Contract renewal reminder',
        body: 'Employment contract expires soon — 30 days left.',
      },
      {
        status: 'success',
        title: 'Profile updated',
        body: 'Changed contact phone number — 07/15/2026, 09:30.',
      },
      {
        status: 'success',
        title: 'Onboarding completed',
        body: 'Signed contract and received equipment — 03/05/2024.',
      },
      { title: 'Account created', body: 'Internal account initialized — 03/02/2024.' },
    ],
  },
  create: {
    ...VI_COPY.create,
    title: 'Create',
    intro:
      'Create record form that combines most OpenDesign input families: GInput, GTextarea, GSelect, GRadioGroup, GCheckbox, GToggle, GDatepicker, GSlider, GChips, and GFileInput + GImagePreview. Validation uses reactive forms, and Save fires a toast. GSlider uses [(value)] and is merged manually on submit.',
    cardTitle: 'Add employee',
    avatar: 'Avatar',
    fullName: 'Full name',
    namePlaceholder: 'Alex Nguyen',
    requiredName: 'Enter a full name.',
    requiredEmail: 'Enter an email address.',
    invalidEmail: 'Enter a valid email address.',
    department: 'Department',
    departmentPlaceholder: 'Choose department',
    requiredDepartment: 'Choose a department.',
    departments: [
      { value: 'engineering', label: 'Engineering' },
      { value: 'design', label: 'Design' },
      { value: 'sales', label: 'Sales' },
      { value: 'ops', label: 'Operations' },
    ],
    contractType: 'Contract type',
    contractTypes: [
      { value: 'fulltime', label: 'Full-time' },
      { value: 'probation', label: 'Probation' },
      { value: 'contractor', label: 'Contractor' },
    ],
    startDate: 'Start date',
    requiredStartDate: 'Choose a start date.',
    accessQuota: 'Access quota',
    tags: 'Skills / tags',
    tagsPlaceholder: 'Type then Enter',
    notes: 'Notes',
    notesPlaceholder: 'Additional employee notes...',
    activateNow: 'Activate account now',
    agree: 'I confirm the information is accurate',
    requiredAgree: 'Confirm before saving.',
    reset: 'Reset',
    save: 'Save employee',
    invalidToast: 'Check the required fields.',
    savedToast: (name) => `Saved employee "${name}".`,
  },
  chatbot: {
    ...VI_COPY.chatbot,
    intro:
      'Interactive chat frame: type a message or click a suggestion chip, then the bot types and returns a canned keyword-based reply. It combines GCard, GAvatar, GBadge, GScrollPanel, GChip, and GInputGroup with a suffix button whose icon changes by context.',
    assistantName: 'OpenDesign assistant',
    online: 'Online',
    typing: 'Typing message',
    quickReplies: ['Introduce OpenDesign', 'Dark mode support?', 'How many components?'],
    placeholder: 'Type a message...',
    inputLabel: 'Message content',
    send: 'Send',
    record: 'Record audio',
    initialMessage: 'Hello. I am the OpenDesign assistant. What can I help with?',
    reply: (text) => {
      const t = text.toLowerCase();
      if (t.includes('dark')) {
        return 'OpenDesign supports light and dark themes: set data-g-theme="dark" on <html> and every component updates without rebuilding.';
      }
      if (t.includes('component') || t.includes('many')) {
        return 'The library currently ships 78 components, all standalone, OnPush, and signal-friendly.';
      }
      if (t.includes('introduce') || t.includes('opendesign') || t.includes('what')) {
        return 'OpenDesign is a design system for Angular 22 with pill aesthetics, --g-* tokens, and no dependency beyond @angular/cdk and @angular/forms.';
      }
      if (t.includes('hello') || t.includes('hi')) {
        return 'Hello. I can help with OpenDesign usage and component patterns.';
      }
      return `I noted: "${text}". This is a demo, so the response is a canned sample.`;
    },
  },
  workspace: {
    ...VI_COPY.workspace,
    intro:
      'IDE-style layout: GSplitter divides the space into a chat panel on the left and a terminal on the right. Drag the middle handle to change the ratio; both panels are interactive.',
    assistantShortName: 'Assistant',
    assistantName: 'OpenDesign assistant',
    placeholder: 'Ask something...',
    inputLabel: 'Message',
    send: 'Send',
    initialMessage: 'Hello. The terminal is on the right — try running a command.',
    receivedReply: (text) => `Received: "${text}". (sample reply)`,
    commandOutput: (cmd) => `Ran: ${cmd} (sample result)`,
  },
};

export function playbookCopyFor(tag: string): PlaybookCopy {
  return tag.toLowerCase().startsWith('vi') ? VI_COPY : EN_COPY;
}
