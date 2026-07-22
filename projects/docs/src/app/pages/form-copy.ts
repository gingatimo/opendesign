import { ApiRow } from '../shared/api-table';
import { GCascadeOption, GSearchFieldOption, GTreeNode } from 'ngx-opendesign';

interface FormPageCopy {
  title: string;
  intro: string;
  apiTitle: string;
  accessibilityTitle: string;
  accessibility: string[];
  apiRows: ApiRow[];
}

interface InputCopy extends FormPageCopy {
  iconTitle: string;
  iconIntro: string;
  iconNote: string;
  groupApiTitle: string;
  groupApiRows: ApiRow[];
  demo: {
    name: string;
    required: string;
    disabled: string;
    search: string;
    password: string;
    showPassword: string;
    hidePassword: string;
  };
}

interface TextareaCopy extends FormPageCopy {
  demo: {
    note: string;
    required: string;
    disabled: string;
  };
}

interface CheckboxCopy extends FormPageCopy {
  demo: {
    agree: string;
    partial: string;
  };
}

interface ToggleCopy extends FormPageCopy {
  demo: {
    label: string;
  };
}

interface RadioCopy extends FormPageCopy {
  radioApiTitle: string;
  radioApiRows: ApiRow[];
  demo: {
    free: string;
    pro: string;
    team: string;
  };
}

interface SelectCopy extends FormPageCopy {
  searchTitle: string;
  searchIntro: string;
  multipleTitle: string;
  multipleIntro: string;
  optionApiTitle: string;
  optionApiRows: ApiRow[];
  demo: {
    countryPlaceholder: string;
    countries: { value: string; label: string }[];
    fruitPlaceholder: string;
    fruits: string[];
    frameworkPlaceholder: string;
    selected: (value: string | null | readonly string[]) => string;
  };
}

interface CascadeSelectCopy extends FormPageCopy {
  demo: {
    placeholder: string;
    options: GCascadeOption[];
    selected: (value: string | null) => string;
  };
}

interface SearchFieldCopy extends FormPageCopy {
  demo: {
    fields: GSearchFieldOption[];
    placeholder: string;
    initial: string;
    empty: string;
    searched: (field: unknown, value: string) => string;
  };
}

interface FileInputCopy extends FormPageCopy {
  multipleTitle: string;
  multipleIntro: string;
  demo: {
    selectedCount: (count: number) => string;
    multiHint: (count: number) => string;
  };
}

interface DatepickerCopy extends FormPageCopy {
  demo: {
    selected: (value: string | null) => string;
  };
}

interface DateRangePickerCopy extends FormPageCopy {
  demo: {
    empty: string;
    range: (start: string, end: string) => string;
  };
}

interface TimePickerCopy extends FormPageCopy {
  demo: {
    selected: (value: string | null) => string;
  };
}

interface SliderCopy extends FormPageCopy {
  demo: {
    valueLabel: string;
    temperatureLabel: string;
    lockedLabel: string;
    disabled: string;
  };
}

interface StepSliderCopy extends FormPageCopy {
  demo: {
    md: string;
    sm: string;
    xs: string;
    ariaMd: string;
    ariaSm: string;
    ariaXs: string;
    selected: (value: number, total: number) => string;
  };
}

interface RatingCopy extends FormPageCopy {
  demo: {
    choose: string;
    sizes: string;
    half: string;
    readonly: string;
    productLabel: string;
    satisfactionLabel: string;
    average: string;
  };
}

interface ColorPickerCopy extends FormPageCopy {
  demo: {
    selected: (value: string) => string;
  };
}

interface InputOtpCopy extends FormPageCopy {
  demo: {
    entered: (value: string) => string;
  };
}

interface ChipsCopy extends FormPageCopy {
  demo: {
    placeholder: string;
    added: (values: readonly string[]) => string;
  };
}

interface TreeSelectCopy extends FormPageCopy {
  multipleTitle: string;
  multipleIntro: string;
  demo: {
    placeholder: string;
    multiplePlaceholder: string;
    options: GTreeNode[];
    multipleOptions: GTreeNode[];
    selected: (value: string | null | readonly string[]) => string;
  };
}

interface FormCopy {
  input: InputCopy;
  textarea: TextareaCopy;
  checkbox: CheckboxCopy;
  toggle: ToggleCopy;
  radio: RadioCopy;
  select: SelectCopy;
  cascadeSelect: CascadeSelectCopy;
  searchField: SearchFieldCopy;
  fileInput: FileInputCopy;
  datepicker: DatepickerCopy;
  dateRangePicker: DateRangePickerCopy;
  timePicker: TimePickerCopy;
  slider: SliderCopy;
  stepSlider: StepSliderCopy;
  rating: RatingCopy;
  colorPicker: ColorPickerCopy;
  inputOtp: InputOtpCopy;
  chips: ChipsCopy;
  treeSelect: TreeSelectCopy;
}

const cvaTextVi = 'Dùng với [formControl], formControlName, hoặc [(ngModel)].';
const cvaTextEn = 'Use with [formControl], formControlName, or [(ngModel)].';

const VI_FORMS: FormCopy = {
  input: {
    title: 'Input',
    intro:
      'Directive gInput gắn trên phần tử <input> native, hoạt động với cả reactive forms lẫn ngModel.',
    apiTitle: 'API — gInput',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'Dùng phần tử <input> native nên giữ nguyên hành vi bàn phím/focus chuẩn trình duyệt.',
      'Class g-input--invalid tự thêm khi control invalid và đã touched/dirty — kết hợp với aria-invalid do form của bạn tự gắn nếu cần.',
      'Icon ở gInputPrefix nên để trang trí. Nút ở gInputSuffix phải là <button type="button"> có aria-label đổi theo trạng thái, không dùng <span (click)>.',
    ],
    apiRows: [
      {
        name: '(CVA)',
        type: 'ControlValueAccessor<string>',
        default: '—',
        description: cvaTextVi,
      },
    ],
    iconTitle: 'Input kèm icon — GInputGroup',
    iconIntro:
      'g-input-group bọc <input gInput> cùng icon/nút phụ trợ ở trước (gInputPrefix) hoặc sau (gInputSuffix). Viền + focus ring vẽ quanh cả nhóm, không phải riêng ô input.',
    iconNote:
      'Icon prefix là trang trí; suffix dạng nút phải dùng button thật và accessible name rõ ràng.',
    groupApiTitle: 'API — GInputGroup',
    groupApiRows: [
      {
        name: 'gInputPrefix',
        type: 'directive',
        default: '—',
        description: 'Đánh dấu phần tử chiếu vào trước input trong nhóm.',
      },
      {
        name: 'gInputSuffix',
        type: 'directive',
        default: '—',
        description: 'Đánh dấu phần tử chiếu vào sau input trong nhóm.',
      },
    ],
    demo: {
      name: 'Nhập tên của bạn',
      required: 'Bắt buộc nhập',
      disabled: 'Vô hiệu hóa',
      search: 'Tìm kiếm',
      password: 'Mật khẩu',
      showPassword: 'Hiện mật khẩu',
      hidePassword: 'Ẩn mật khẩu',
    },
  },
  textarea: {
    title: 'Textarea',
    intro:
      'Directive gTextarea gắn trên phần tử <textarea> native, radius nhỏ (khác với các control dạng pill).',
    apiTitle: 'API — gTextarea',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'Dùng phần tử native nên giữ nguyên hành vi bàn phím/focus chuẩn trình duyệt.',
      'Có thể resize theo chiều dọc (resize: vertical).',
      'Class g-textarea--invalid tự thêm khi control invalid và đã touched/dirty — kết hợp với aria-invalid do form của bạn tự gắn nếu cần.',
    ],
    apiRows: [
      {
        name: '(CVA)',
        type: 'ControlValueAccessor<string>',
        default: '—',
        description: cvaTextVi,
      },
    ],
    demo: {
      note: 'Nhập ghi chú...',
      required: 'Bắt buộc nhập',
      disabled: 'Vô hiệu hóa',
    },
  },
  checkbox: {
    title: 'Checkbox',
    intro: 'Component chọn một mục độc lập, hỗ trợ trạng thái indeterminate.',
    apiTitle: 'API — GCheckbox',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'role="checkbox", aria-checked là "mixed" khi indeterminate.',
      'Bàn phím: phím Space để toggle.',
    ],
    apiRows: [
      {
        name: 'indeterminate',
        type: 'boolean',
        default: 'false',
        description: 'Hiển thị trạng thái chọn một phần.',
      },
      {
        name: '(CVA)',
        type: 'ControlValueAccessor<boolean>',
        default: '—',
        description: cvaTextVi,
      },
    ],
    demo: {
      agree: 'Tôi đồng ý với điều khoản',
      partial: 'Chọn một phần',
    },
  },
  toggle: {
    title: 'Toggle',
    intro: 'Công tắc bật/tắt, dùng cho các cài đặt có hiệu lực ngay lập tức.',
    apiTitle: 'API — GToggle',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'role="switch", aria-checked phản ánh trạng thái bật/tắt.',
      'Bàn phím: phím Space để toggle.',
      'Bắt buộc có aria-label hoặc aria-labelledby — thiếu sẽ có cảnh báo console ở dev mode.',
      'Tôn trọng prefers-reduced-motion: thumb trượt ngang là chuyển động theo tương tác, nên khi bật, animation tắt hẳn thay vì chậm lại.',
    ],
    apiRows: [
      {
        name: '(CVA)',
        type: 'ControlValueAccessor<boolean>',
        default: '—',
        description: cvaTextVi,
      },
    ],
    demo: {
      label: 'Bật thông báo',
    },
  },
  radio: {
    title: 'Radio',
    intro: '<g-radio-group> chứa các <g-radio>, chỉ chọn được một giá trị.',
    apiTitle: 'API — GRadioGroup',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'role="radiogroup" trên nhóm, role="radio" trên từng lựa chọn.',
      'Roving tabindex: chỉ radio đang chọn (hoặc radio đầu tiên nếu chưa chọn) nhận được Tab.',
      'Bàn phím: mũi tên lên/xuống/trái/phải di chuyển và chọn luôn giữa các lựa chọn.',
      'Tôn trọng prefers-reduced-motion: dot phóng to khi chọn là chuyển động theo tương tác, nên khi bật, animation tắt hẳn thay vì chậm lại.',
    ],
    apiRows: [
      {
        name: '(CVA)',
        type: 'ControlValueAccessor<unknown>',
        default: '—',
        description: cvaTextVi,
      },
    ],
    radioApiTitle: 'API — GRadio',
    radioApiRows: [
      {
        name: 'value',
        type: 'unknown',
        default: '(bắt buộc)',
        description: 'Giá trị của lựa chọn này.',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Vô hiệu hóa lựa chọn này.',
      },
    ],
    demo: {
      free: 'Miễn phí',
      pro: 'Pro',
      team: 'Team',
    },
  },
  select: {
    title: 'Select',
    intro: 'Trigger dạng pill, panel nổi bằng CDK Overlay, hỗ trợ điều hướng bàn phím đầy đủ.',
    apiTitle: 'API — GSelect',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'role="combobox" trên trigger, role="listbox"/role="option" trên panel — theo pattern combobox của ARIA.',
      'Bàn phím: Enter/Space/mũi tên xuống mở panel, mũi tên lên/xuống di chuyển lựa chọn đang active, Enter chọn, Esc hoặc click ra ngoài đóng panel.',
      'Gõ một ký tự để nhảy nhanh tới option có nhãn bắt đầu bằng ký tự đó (typeahead).',
    ],
    apiRows: [
      {
        name: 'placeholder',
        type: 'string',
        default: "''",
        description: 'Chữ hiển thị khi chưa chọn.',
      },
      {
        name: 'searchable',
        type: 'boolean',
        default: 'false',
        description: 'Hiện ô tìm kiếm trong panel để lọc option (không phân biệt dấu).',
      },
      {
        name: 'multiple',
        type: 'boolean',
        default: 'false',
        description:
          'Cho chọn nhiều mục; giá trị trở thành mảng, trigger liệt kê nhãn các mục đã chọn (cắt bằng … nếu dài).',
      },
      {
        name: 'searchPlaceholder',
        type: 'string',
        default: "'Tìm...'",
        description: 'Chữ mờ của ô tìm kiếm (khi searchable).',
      },
      {
        name: 'compareWith',
        type: '(optionValue: unknown, modelValue: unknown) => boolean',
        default: '(a, b) => a === b',
        description:
          'So sánh giá trị của option với giá trị đang bind của control để xác định option nào đang được chọn.',
      },
      {
        name: '(CVA)',
        type: 'ControlValueAccessor<unknown>',
        default: '—',
        description: cvaTextVi,
      },
    ],
    searchTitle: 'Tìm kiếm',
    searchIntro:
      'Thêm searchable để lọc option bằng ô tìm kiếm trong panel. Lọc không phân biệt dấu tiếng Việt (gõ chuoi khớp Chuối).',
    multipleTitle: 'Chọn nhiều',
    multipleIntro:
      'Thêm multiple để chọn nhiều mục — giá trị là mảng, panel giữ mở. Trigger liệt kê nhãn các mục đã chọn trên một hàng; bỏ chọn bằng cách mở lại panel. Ghép được với searchable.',
    optionApiTitle: 'API — GOption',
    optionApiRows: [
      {
        name: 'value',
        type: 'unknown',
        default: '(bắt buộc)',
        description: 'Giá trị của option này.',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Vô hiệu hóa option này.',
      },
    ],
    demo: {
      countryPlaceholder: 'Chọn quốc gia',
      countries: [
        { value: 'vn', label: 'Việt Nam' },
        { value: 'us', label: 'Hoa Kỳ' },
        { value: 'jp', label: 'Nhật Bản' },
        { value: 'kr', label: 'Hàn Quốc' },
      ],
      fruitPlaceholder: 'Chọn quả',
      fruits: ['Táo', 'Cam', 'Chuối', 'Xoài', 'Dâu tây', 'Nho', 'Ổi', 'Đào', 'Mít', 'Sầu riêng'],
      frameworkPlaceholder: 'Chọn framework',
      selected: (value: string | null | readonly string[]) => {
        const text = Array.isArray(value) ? value.join(', ') : value;
        return `Đã chọn: ${text || 'chưa chọn'}`;
      },
    },
  },
  cascadeSelect: {
    title: 'Cascade Select',
    intro:
      'Chọn một giá trị qua nhiều cấp danh mục lồng nhau. Trigger mở overlay nhiều cột: di chuột hoặc focus vào mục có con sẽ mở cột con bên phải; chỉ mục lá mới chọn được và đóng panel. Giá trị hai chiều qua ControlValueAccessor.',
    apiTitle: 'API — GCascadeSelect',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'Trigger mang role="combobox" với aria-haspopup/aria-expanded; mỗi cột là role="listbox", mỗi mục là role="option" có aria-selected.',
      'Bàn phím: Enter/Space/↓ mở panel; ↑/↓ di chuyển trong cột, → mở cột con, ← quay lại cột trước, Enter chọn mục lá, Esc đóng panel.',
    ],
    apiRows: [
      {
        name: '(CVA)',
        type: 'ControlValueAccessor<unknown>',
        default: '—',
        description: `${cvaTextVi} Giá trị là value của mục lá đang chọn.`,
      },
      {
        name: 'options',
        type: 'GCascadeOption[]',
        default: '[]',
        description:
          'Danh sách tuỳ chọn phân cấp { label, value?, children? }. Chỉ mục không có children mới chọn được.',
      },
      {
        name: 'placeholder',
        type: 'string',
        default: "''",
        description: 'Chữ hiển thị khi chưa chọn giá trị nào.',
      },
      {
        name: 'compareWith',
        type: '(a: unknown, b: unknown) => boolean',
        default: '(a, b) => a === b',
        description: 'So sánh value của option với giá trị đang bind để xác định mục đang chọn.',
      },
    ],
    demo: {
      placeholder: 'Chọn khu vực',
      options: [
        {
          label: 'Châu Á',
          children: [
            {
              label: 'Việt Nam',
              children: [
                { label: 'Hà Nội', value: 'hanoi' },
                { label: 'TP. Hồ Chí Minh', value: 'hcmc' },
              ],
            },
            { label: 'Nhật Bản', value: 'japan' },
          ],
        },
        {
          label: 'Châu Âu',
          children: [{ label: 'Pháp', value: 'france' }],
        },
      ],
      selected: (value: string | null) => `Đã chọn: ${value ?? 'chưa chọn'}`,
    },
  },
  searchField: {
    title: 'Search Field',
    intro:
      'Ô tìm kiếm theo trường: bên trái là GSelect chọn trường, bên phải là ô nhập giá trị — tất cả trong một khung pill. Nhấn Enter phát sự kiện (search) gồm { field, value } để bạn tự chạy truy vấn.',
    apiTitle: 'API — GSearchField',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'Select trường mang aria-label="Trường tìm kiếm", ô nhập mang aria-label="Giá trị tìm kiếm" — screen reader đọc rõ vai trò từng phần.',
      'Bàn phím: Tab tới select chọn trường, Tab sang ô nhập, gõ giá trị rồi Enter để tìm.',
    ],
    apiRows: [
      {
        name: 'fields',
        type: 'GSearchFieldOption[]',
        default: '[]',
        description: 'Danh sách trường tìm kiếm { value, label }.',
      },
      {
        name: 'field',
        type: 'unknown (model)',
        default: 'trường đầu tiên',
        description: 'Trường đang chọn, hai chiều [(field)].',
      },
      {
        name: 'query',
        type: 'string (model)',
        default: "''",
        description: 'Giá trị đang nhập, hai chiều [(query)].',
      },
      { name: 'placeholder', type: 'string', default: "''", description: 'Chữ mờ của ô nhập.' },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Vô hiệu hoá cả select trường lẫn ô nhập.',
      },
      {
        name: '(search)',
        type: 'EventEmitter<{ field: unknown; value: string }>',
        default: '—',
        description: 'Phát khi nhấn Enter trong ô nhập.',
      },
    ],
    demo: {
      fields: [
        { value: 'cusId', label: 'Mã khách hàng' },
        { value: 'citizenId', label: 'CCCD' },
        { value: 'username', label: 'Tên đăng nhập' },
      ],
      placeholder: 'Nhập giá trị rồi Enter',
      initial: 'Chọn trường, nhập giá trị rồi nhấn Enter.',
      empty: '(rỗng)',
      searched: (field, value) => `Tìm theo trường "${field}" = "${value || '(rỗng)'}"`,
    },
  },
  fileInput: {
    title: 'File Input',
    intro:
      'Component chọn tệp thuần trình bày: nút mở picker native + vùng kéo-thả, phát ra File[] qua model — component không tự upload.',
    apiTitle: 'API — GFileInput',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'Vùng kéo-thả bọc quanh input type="file" native ẩn, nên vẫn chọn được tệp bằng bàn phím và hộp thoại hệ điều hành.',
      'Nút mở picker là button có nhãn rõ ràng "Chọn tệp".',
      'Mỗi nút xoá trong danh sách có nhãn riêng ghép từ tên tệp.',
    ],
    apiRows: [
      {
        name: 'files',
        type: 'File[] (model)',
        default: '[]',
        description: 'Danh sách tệp đã chọn, two-way binding qua [(files)].',
      },
      { name: 'accept', type: 'string', default: '—', description: 'Bộ lọc loại tệp.' },
      {
        name: 'multiple',
        type: 'boolean',
        default: 'false',
        description: 'Cho phép chọn/thả nhiều tệp cùng lúc.',
      },
      {
        name: 'showFileList',
        type: 'boolean',
        default: 'true',
        description: 'Hiện danh sách tệp dựng sẵn khi multiple.',
      },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Vô hiệu hoá.' },
    ],
    multipleTitle: 'Nhiều tệp',
    multipleIntro:
      'Bật [multiple]="true": dưới nút chọn hiện danh sách tệp đã chọn, mỗi tệp có tên, dung lượng và nút xoá riêng.',
    demo: {
      selectedCount: (count) => `Đã chọn: ${count} tệp`,
      multiHint: (count) => `${count} tệp — chọn thêm để nối vào danh sách, bấm × để xoá từng tệp.`,
    },
  },
  datepicker: {
    title: 'Datepicker',
    intro:
      'Chọn một ngày qua ô hiển thị read-only + popover lịch. Điều hướng tháng bằng nút ‹ ›, chọn ngày bằng chuột hoặc bàn phím. Giá trị hai chiều qua [(value)] kiểu Date | null.',
    apiTitle: 'API — GDatepicker',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'Nút mở lịch có aria-haspopup="dialog" + aria-expanded; panel là role="dialog" có nhãn.',
      'Lưới ngày điều hướng bằng bàn phím; ngày hôm nay đánh dấu aria-current="date".',
    ],
    apiRows: [
      {
        name: 'value',
        type: 'Date | null (model)',
        default: 'null',
        description: 'Ngày đang chọn, two-way binding qua [(value)].',
      },
      { name: 'min', type: 'Date', default: '—', description: 'Ngày nhỏ nhất được phép chọn.' },
      { name: 'max', type: 'Date', default: '—', description: 'Ngày lớn nhất được phép chọn.' },
      {
        name: 'placeholder',
        type: 'string',
        default: "'dd/MM/yyyy'",
        description: 'Chữ mờ hiển thị khi chưa chọn ngày.',
      },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Vô hiệu hoá.' },
    ],
    demo: {
      selected: (value) => `Đã chọn: ${value ?? 'chưa chọn'}`,
    },
  },
  dateRangePicker: {
    title: 'Date Range Picker',
    intro:
      'Chọn khoảng ngày trên một lịch: bấm ngày đầu rồi ngày cuối. Giá trị hai chiều qua [(value)] kiểu { start, end }.',
    apiTitle: 'API — GDateRangePicker',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'Nút mở có aria-haspopup="dialog" + aria-expanded; lịch là role="dialog" có nhãn.',
      'Bàn phím: mũi tên đổi ngày, PageUp/PageDown đổi tháng, Enter chọn, Esc đóng.',
    ],
    apiRows: [
      {
        name: 'value',
        type: 'GDateRange (model)',
        default: '{ start: null, end: null }',
        description: 'Khoảng ngày { start, end }, two-way binding qua [(value)].',
      },
      { name: 'min', type: 'Date', default: '—', description: 'Ngày nhỏ nhất được phép chọn.' },
      { name: 'max', type: 'Date', default: '—', description: 'Ngày lớn nhất được phép chọn.' },
      {
        name: 'placeholder',
        type: 'string',
        default: "'dd/MM/yyyy – dd/MM/yyyy'",
        description: 'Chữ mờ khi chưa chọn.',
      },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Vô hiệu hoá.' },
    ],
    demo: {
      empty: 'Chưa chọn khoảng',
      range: (start, end) => `Từ ${start} đến ${end}`,
    },
  },
  timePicker: {
    title: 'Time Picker',
    intro:
      'Chọn giờ:phút (24h) qua ô read-only + popover hai cột Giờ/Phút. Giá trị hai chiều qua [(value)] kiểu chuỗi "HH:mm".',
    apiTitle: 'API — GTimePicker',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'Nút mở có aria-haspopup="dialog" + aria-expanded; panel là role="dialog".',
      'Bàn phím: ↑↓ di chuyển trong cột, Enter/Space chọn, Esc đóng.',
    ],
    apiRows: [
      {
        name: 'value',
        type: 'string | null (model)',
        default: 'null',
        description: 'Giờ đang chọn dạng "HH:mm", two-way binding qua [(value)].',
      },
      { name: 'minuteStep', type: 'number', default: '1', description: 'Bước nhảy của cột phút.' },
      { name: 'placeholder', type: 'string', default: "'HH:mm'", description: 'Chữ mờ.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Vô hiệu hoá.' },
    ],
    demo: {
      selected: (value) => `Đã chọn: ${value ?? 'chưa chọn'}`,
    },
  },
  slider: {
    title: 'Slider',
    intro:
      'Thanh trượt chọn một giá trị số trong khoảng min–max theo bước step. Bọc input[type="range"] gốc nên điều khiển được bằng chuột, chạm và bàn phím.',
    apiTitle: 'API — GSlider',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'Dùng input[type="range"] gốc nên có role="slider", aria-valuenow/min/max và điều hướng bàn phím.',
      'Cấp tên qua ariaLabel hoặc liên kết nhãn ngoài.',
    ],
    apiRows: [
      { name: 'value', type: 'number (model)', default: '0', description: 'Giá trị đang chọn.' },
      { name: 'min', type: 'number', default: '0', description: 'Giá trị nhỏ nhất.' },
      { name: 'max', type: 'number', default: '100', description: 'Giá trị lớn nhất.' },
      { name: 'step', type: 'number', default: '1', description: 'Bước nhảy.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Vô hiệu hoá.' },
      { name: 'ariaLabel', type: 'string', default: '—', description: 'Tên cho screen reader.' },
    ],
    demo: {
      valueLabel: 'Giá trị',
      temperatureLabel: 'Nhiệt độ',
      lockedLabel: 'Đã khoá',
      disabled: 'Disabled',
    },
  },
  stepSlider: {
    title: 'Step Slider',
    intro:
      'Thanh trượt rời rạc dạng pill: một dải pill chứa steps chấm đều nhau. Dùng được cả formControlName/ngModel lẫn [(value)].',
    apiTitle: 'API — GStepSlider',
    accessibilityTitle: 'Accessibility',
    accessibility: ['Dải là role="slider" có tabindex, aria-valuemin/max/now và aria-label.'],
    apiRows: [
      { name: 'value', type: 'number', default: '0', description: 'Chỉ số bậc đang chọn.' },
      { name: 'steps', type: 'number', default: '5', description: 'Số bậc.' },
      { name: 'size', type: "'xs' | 'sm' | 'md'", default: "'md'", description: 'Cỡ dải.' },
      {
        name: 'startLabel / endLabel',
        type: 'string',
        default: "''",
        description: 'Nhãn hai đầu dải.',
      },
      { name: 'ariaLabel', type: 'string', default: "'Mức'", description: 'Nhãn screen reader.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Vô hiệu hoá.' },
    ],
    demo: {
      md: 'Cỡ md (mặc định)',
      sm: 'Cỡ sm',
      xs: 'Cỡ xs',
      ariaMd: 'Nhanh hơn hay thông minh hơn',
      ariaSm: 'Nhanh hơn hay thông minh hơn (nhỏ)',
      ariaXs: 'Nhanh hơn hay thông minh hơn (rất nhỏ)',
      selected: (value, total) => `Bậc đang chọn: ${value} / ${total}`,
    },
  },
  rating: {
    title: 'Rating',
    intro:
      'Chấm điểm bằng sao: bấm hoặc rê để chọn, hoặc dùng phím mũi tên. Bật allowHalf cho nửa sao; readonly để chỉ hiển thị.',
    apiTitle: 'API — GRating',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'Khi chọn được: role="slider" có aria-valuemin/max/now và aria-label.',
      'Khi readonly: role="img" với nhãn tự sinh.',
    ],
    apiRows: [
      { name: 'value', type: 'number', default: '0', description: 'Số sao đang chọn.' },
      { name: 'max', type: 'number', default: '5', description: 'Tổng số sao.' },
      { name: 'allowHalf', type: 'boolean', default: 'false', description: 'Cho phép nửa sao.' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Cỡ sao.' },
      { name: 'readonly', type: 'boolean', default: 'false', description: 'Chỉ hiển thị.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Vô hiệu hoá.' },
      { name: 'label', type: 'string', default: "'Đánh giá'", description: 'Nhãn screen reader.' },
    ],
    demo: {
      choose: 'Chọn điểm (bấm hoặc rê, phím ←/→)',
      sizes: 'Các cỡ',
      half: 'Nửa sao (allowHalf) — rê nửa trái/phải của sao',
      readonly: 'Chỉ đọc (readonly)',
      productLabel: 'Chất lượng sản phẩm',
      satisfactionLabel: 'Độ hài lòng',
      average: 'Đánh giá trung bình 4,5',
    },
  },
  colorPicker: {
    title: 'Color Picker',
    intro:
      'Chọn màu qua ô hiển thị + popover: vùng Saturation/Value, thanh Hue, ô nhập hex và hàng màu dựng sẵn.',
    apiTitle: 'API — GColorPicker',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'Nút mở có aria-haspopup="dialog"; panel là role="dialog" có nhãn.',
      'Vùng Saturation/Value focus được, đổi bằng mũi tên; aria-valuetext đọc mã màu hiện tại.',
    ],
    apiRows: [
      {
        name: 'value',
        type: 'string (model)',
        default: "'#000000'",
        description: 'Màu đang chọn dạng hex #rrggbb, two-way binding qua [(value)].',
      },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Vô hiệu hoá.' },
    ],
    demo: {
      selected: (value) => `Đã chọn: ${value}`,
    },
  },
  inputOtp: {
    title: 'Input OTP',
    intro:
      'Ô nhập mã OTP/PIN gồm length ô một ký tự. Gõ tự nhảy sang ô kế tiếp, Backspace lùi lại, dán rải chuỗi vào các ô liên tiếp.',
    apiTitle: 'API — GInputOtp',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'Mỗi ô là input maxlength="1" có aria-label riêng và autocomplete="one-time-code".',
      'Khi integerOnly, mỗi ô có inputmode="numeric".',
    ],
    apiRows: [
      {
        name: '(CVA)',
        type: 'ControlValueAccessor<string>',
        default: '—',
        description: `${cvaTextVi} Giá trị là chuỗi ghép các ô.`,
      },
      { name: 'length', type: 'number', default: '6', description: 'Số ô nhập.' },
      {
        name: 'integerOnly',
        type: 'boolean',
        default: 'false',
        description: 'Chỉ cho nhập chữ số.',
      },
      { name: 'mask', type: 'boolean', default: 'false', description: 'Ẩn ký tự đã nhập.' },
    ],
    demo: {
      entered: (value) => `Mã đã nhập: ${value || 'chưa nhập'}`,
    },
  },
  chips: {
    title: 'Chips',
    intro:
      'Ô nhập nhiều giá trị dạng chip. Gõ rồi nhấn Enter hoặc dấu phẩy để thêm; Backspace khi ô nhập rỗng để xoá chip cuối.',
    apiTitle: 'API — GChips',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'Mỗi chip có nút xoá riêng với aria-label mô tả rõ mục sẽ bị xoá.',
      'Ô nhập có aria-label "Thêm mục"; khi đạt max, ô nhập tự vô hiệu hoá.',
    ],
    apiRows: [
      {
        name: '(CVA)',
        type: 'ControlValueAccessor<string[]>',
        default: '—',
        description: `${cvaTextVi} Giá trị là mảng chuỗi.`,
      },
      {
        name: 'placeholder',
        type: 'string',
        default: "''",
        description: 'Chữ mờ hiển thị trong ô nhập khi chưa có chip nào.',
      },
      { name: 'max', type: 'number', default: '—', description: 'Giới hạn số chip tối đa.' },
      {
        name: 'allowDuplicate',
        type: 'boolean',
        default: 'false',
        description: 'Cho phép thêm giá trị trùng lặp.',
      },
    ],
    demo: {
      placeholder: 'Nhập rồi Enter',
      added: (values) => `Đã thêm: ${values.join(', ') || 'chưa có'}`,
    },
  },
  treeSelect: {
    title: 'Tree Select',
    intro:
      'Chọn một mục từ cấu trúc cây gập/mở. Trigger mở overlay dạng cây; node nhánh lẫn node lá đều chọn được.',
    apiTitle: 'API — GTreeSelect',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'Trigger mang role="combobox" với aria-haspopup="tree"; panel là role="tree".',
      'Bàn phím: ↑/↓ di chuyển, → mở rộng, ← thu gọn, Enter/Space chọn, Esc đóng panel.',
    ],
    apiRows: [
      {
        name: '(CVA)',
        type: 'ControlValueAccessor<unknown>',
        default: '—',
        description: `${cvaTextVi} single: value của node đang chọn; multiple: mảng value các node lá đã chọn.`,
      },
      {
        name: 'multiple',
        type: 'boolean',
        default: 'false',
        description: 'Bật chọn nhiều bằng checkbox.',
      },
      {
        name: 'options',
        type: 'GTreeNode[]',
        default: '[]',
        description: 'Cây tuỳ chọn { label, value?, children? }.',
      },
      {
        name: 'placeholder',
        type: 'string',
        default: "''",
        description: 'Chữ hiển thị khi chưa chọn.',
      },
      {
        name: 'compareWith',
        type: '(a: unknown, b: unknown) => boolean',
        default: '(a, b) => a === b',
        description: 'So sánh value của node với giá trị đang bind.',
      },
    ],
    multipleTitle: 'Chọn nhiều (multiple)',
    multipleIntro:
      'Thêm multiple để chọn nhiều node bằng checkbox. Chọn theo kiểu lan truyền và trigger liệt kê nhãn các node lá đã chọn.',
    demo: {
      placeholder: 'Chọn mục',
      multiplePlaceholder: 'Chọn quyền',
      options: [
        {
          label: 'Tài liệu',
          children: [
            { label: 'Báo cáo', value: 'reports' },
            { label: 'Hợp đồng', value: 'contracts' },
          ],
        },
        { label: 'Hình ảnh', value: 'images' },
      ],
      multipleOptions: [
        {
          label: 'Nội dung',
          children: [
            { label: 'Xem bài viết', value: 'post:read' },
            { label: 'Sửa bài viết', value: 'post:write' },
            { label: 'Xoá bài viết', value: 'post:delete' },
          ],
        },
        {
          label: 'Người dùng',
          children: [
            { label: 'Xem người dùng', value: 'user:read' },
            { label: 'Mời người dùng', value: 'user:invite' },
          ],
        },
        { label: 'Cài đặt hệ thống', value: 'settings' },
      ],
      selected: (value) => {
        const text = Array.isArray(value) ? value.join(', ') : value;
        return `Đã chọn: ${text || 'chưa chọn'}`;
      },
    },
  },
};

const EN_FORMS: FormCopy = {
  input: {
    title: 'Input',
    intro: 'Native input directive for <input>, compatible with reactive forms and ngModel.',
    apiTitle: 'API — gInput',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'Uses the native <input> element, so browser keyboard and focus behavior stay intact.',
      'The g-input--invalid class is added when the control is invalid and touched/dirty; pair it with aria-invalid from your form when needed.',
      'Icons in gInputPrefix should be decorative. Buttons in gInputSuffix must be real <button type="button"> elements with state-aware aria-label text.',
    ],
    apiRows: [
      {
        name: '(CVA)',
        type: 'ControlValueAccessor<string>',
        default: '—',
        description: cvaTextEn,
      },
    ],
    iconTitle: 'Input with icon — GInputGroup',
    iconIntro:
      'g-input-group wraps an <input gInput> with supporting icons or buttons before it (gInputPrefix) or after it (gInputSuffix). Border and focus ring are drawn around the whole group.',
    iconNote:
      'Projected prefix elements are decorative by default; suffix buttons need a clear accessible name.',
    groupApiTitle: 'API — GInputGroup',
    groupApiRows: [
      {
        name: 'gInputPrefix',
        type: 'directive',
        default: '—',
        description: 'Projected prefix element before the input.',
      },
      {
        name: 'gInputSuffix',
        type: 'directive',
        default: '—',
        description: 'Projected suffix element after the input.',
      },
    ],
    demo: {
      name: 'Your name',
      required: 'Required field',
      disabled: 'Disabled',
      search: 'Search',
      password: 'Password',
      showPassword: 'Show password',
      hidePassword: 'Hide password',
    },
  },
  textarea: {
    title: 'Textarea',
    intro:
      'Native textarea directive for <textarea>, with a small radius that differs from pill-shaped controls.',
    apiTitle: 'API — gTextarea',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'Uses a native element, so browser keyboard and focus behavior stay intact.',
      'Resizable vertically (resize: vertical).',
      'The g-textarea--invalid class is added when the control is invalid and touched/dirty; pair it with aria-invalid from your form when needed.',
    ],
    apiRows: [
      {
        name: '(CVA)',
        type: 'ControlValueAccessor<string>',
        default: '—',
        description: cvaTextEn,
      },
    ],
    demo: {
      note: 'Add a note...',
      required: 'Required field',
      disabled: 'Disabled',
    },
  },
  checkbox: {
    title: 'Checkbox',
    intro: 'Independent single-item selection, with support for the indeterminate state.',
    apiTitle: 'API — GCheckbox',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'role="checkbox"; aria-checked is "mixed" when indeterminate.',
      'Keyboard: Space toggles the checkbox.',
    ],
    apiRows: [
      {
        name: 'indeterminate',
        type: 'boolean',
        default: 'false',
        description: 'Show the partially selected state.',
      },
      {
        name: '(CVA)',
        type: 'ControlValueAccessor<boolean>',
        default: '—',
        description: cvaTextEn,
      },
    ],
    demo: {
      agree: 'I agree to the terms',
      partial: 'Partially selected',
    },
  },
  toggle: {
    title: 'Toggle',
    intro: 'On/off switch for settings that take effect immediately.',
    apiTitle: 'API — GToggle',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'role="switch"; aria-checked reflects the current on/off state.',
      'Keyboard: Space toggles the switch.',
      'Required: aria-label or aria-labelledby. Missing labels warn in dev mode.',
      'Respects prefers-reduced-motion: the thumb moves as interaction feedback, so reduced motion disables the animation entirely.',
    ],
    apiRows: [
      {
        name: '(CVA)',
        type: 'ControlValueAccessor<boolean>',
        default: '—',
        description: cvaTextEn,
      },
    ],
    demo: {
      label: 'Enable notifications',
    },
  },
  radio: {
    title: 'Radio',
    intro: '<g-radio-group> contains g-radio options, allowing exactly one selected value.',
    apiTitle: 'API — GRadioGroup',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'role="radiogroup" on the group and role="radio" on each option.',
      'Roving tabindex: only the selected radio, or the first radio when none is selected, receives Tab.',
      'Arrow keys move and select between options.',
      'Respects prefers-reduced-motion: the selected dot appears immediately when reduced motion is enabled.',
    ],
    apiRows: [
      {
        name: '(CVA)',
        type: 'ControlValueAccessor<unknown>',
        default: '—',
        description: cvaTextEn,
      },
    ],
    radioApiTitle: 'API — GRadio',
    radioApiRows: [
      {
        name: 'value',
        type: 'unknown',
        default: '(required)',
        description: 'Value for this option.',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Disable this option.',
      },
    ],
    demo: {
      free: 'Free',
      pro: 'Pro',
      team: 'Team',
    },
  },
  select: {
    title: 'Select',
    intro: 'Pill trigger with a CDK Overlay panel and full keyboard navigation.',
    apiTitle: 'API — GSelect',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'role="combobox" on the trigger and role="listbox"/role="option" in the panel, following the ARIA combobox pattern.',
      'Keyboard: Enter/Space/ArrowDown opens the panel, arrows move the active option, Enter selects, and Esc or outside click closes.',
      'Type one character to jump to the next option whose label starts with that character.',
    ],
    apiRows: [
      {
        name: 'placeholder',
        type: 'string',
        default: "''",
        description: 'Text shown before a value is selected.',
      },
      {
        name: 'searchable',
        type: 'boolean',
        default: 'false',
        description: 'Show a search box in the panel to filter options accent-insensitively.',
      },
      {
        name: 'multiple',
        type: 'boolean',
        default: 'false',
        description:
          'Allow multiple selections; the value becomes an array and the trigger lists selected labels.',
      },
      {
        name: 'searchPlaceholder',
        type: 'string',
        default: "'Search...'",
        description: 'Placeholder for the search input when searchable.',
      },
      {
        name: 'compareWith',
        type: '(optionValue: unknown, modelValue: unknown) => boolean',
        default: '(a, b) => a === b',
        description:
          'Compare an option value with the current model value to determine selected state.',
      },
      {
        name: '(CVA)',
        type: 'ControlValueAccessor<unknown>',
        default: '—',
        description: cvaTextEn,
      },
    ],
    searchTitle: 'Search',
    searchIntro:
      'Add searchable to filter options with a search input in the panel. Matching is accent-insensitive.',
    multipleTitle: 'Multiple selection',
    multipleIntro:
      'Add multiple to choose several items. The value is an array, the panel stays open, and the trigger lists selected labels.',
    optionApiTitle: 'API — GOption',
    optionApiRows: [
      {
        name: 'value',
        type: 'unknown',
        default: '(required)',
        description: 'Value for this option.',
      },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable this option.' },
    ],
    demo: {
      countryPlaceholder: 'Choose a country',
      countries: [
        { value: 'vn', label: 'Vietnam' },
        { value: 'us', label: 'United States' },
        { value: 'jp', label: 'Japan' },
        { value: 'kr', label: 'South Korea' },
      ],
      fruitPlaceholder: 'Choose a fruit',
      fruits: [
        'Apple',
        'Orange',
        'Banana',
        'Mango',
        'Strawberry',
        'Grape',
        'Guava',
        'Peach',
        'Jackfruit',
        'Durian',
      ],
      frameworkPlaceholder: 'Choose frameworks',
      selected: (value: string | null | readonly string[]) => {
        const text = Array.isArray(value) ? value.join(', ') : value;
        return `Selected: ${text || 'none'}`;
      },
    },
  },
  cascadeSelect: {
    title: 'Cascade Select',
    intro:
      'Choose one value through nested categories. The trigger opens a multi-column overlay: hovering or focusing a parent item opens the child column to the right; only leaf items can be selected and close the panel. Value binding uses ControlValueAccessor.',
    apiTitle: 'API — GCascadeSelect',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'The trigger has role="combobox" with aria-haspopup/aria-expanded; each column is role="listbox", and each item is role="option" with aria-selected.',
      'Keyboard: Enter/Space/ArrowDown opens the panel; ArrowUp/ArrowDown moves within a column, ArrowRight opens the child column, ArrowLeft returns to the previous column, Enter selects a leaf item, and Esc closes the panel.',
    ],
    apiRows: [
      {
        name: '(CVA)',
        type: 'ControlValueAccessor<unknown>',
        default: '—',
        description: `${cvaTextEn} Value is the selected leaf item value.`,
      },
      {
        name: 'options',
        type: 'GCascadeOption[]',
        default: '[]',
        description:
          'Hierarchical option list { label, value?, children? }. Only items without children can be selected.',
      },
      {
        name: 'placeholder',
        type: 'string',
        default: "''",
        description: 'Text shown before a value is selected.',
      },
      {
        name: 'compareWith',
        type: '(a: unknown, b: unknown) => boolean',
        default: '(a, b) => a === b',
        description: 'Compare an option value with the current model value to determine selection.',
      },
    ],
    demo: {
      placeholder: 'Choose a region',
      options: [
        {
          label: 'Asia',
          children: [
            {
              label: 'Vietnam',
              children: [
                { label: 'Hanoi', value: 'hanoi' },
                { label: 'Ho Chi Minh City', value: 'hcmc' },
              ],
            },
            { label: 'Japan', value: 'japan' },
          ],
        },
        {
          label: 'Europe',
          children: [{ label: 'France', value: 'france' }],
        },
      ],
      selected: (value: string | null) => `Selected: ${value ?? 'none'}`,
    },
  },
  searchField: {
    title: 'Search Field',
    intro:
      'Field-based search input: a field selector on the left, a value input on the right, and a single pill-shaped frame around both. Press Enter to emit (search) with { field, value }.',
    apiTitle: 'API — GSearchField',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'The field select uses aria-label="Search field" and the value input uses aria-label="Search value".',
      'Keyboard: Tab to the field select, Tab to the input, type a value, then press Enter to search.',
    ],
    apiRows: [
      {
        name: 'fields',
        type: 'GSearchFieldOption[]',
        default: '[]',
        description: 'Searchable fields { value, label }.',
      },
      {
        name: 'field',
        type: 'unknown (model)',
        default: 'first field',
        description: 'Selected field, two-way bound with [(field)].',
      },
      {
        name: 'query',
        type: 'string (model)',
        default: "''",
        description: 'Current input value, two-way bound with [(query)].',
      },
      {
        name: 'placeholder',
        type: 'string',
        default: "''",
        description: 'Placeholder for the value input.',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Disable both the field select and value input.',
      },
      {
        name: '(search)',
        type: 'EventEmitter<{ field: unknown; value: string }>',
        default: '—',
        description: 'Emits when Enter is pressed in the value input.',
      },
    ],
    demo: {
      fields: [
        { value: 'cusId', label: 'Customer ID' },
        { value: 'citizenId', label: 'National ID' },
        { value: 'username', label: 'Username' },
      ],
      placeholder: 'Enter a value, then press Enter',
      initial: 'Choose a field, enter a value, then press Enter.',
      empty: '(empty)',
      searched: (field, value) => `Search field "${field}" = "${value || '(empty)'}"`,
    },
  },
  fileInput: {
    title: 'File Input',
    intro:
      'Presentation-only file picker: native picker button plus drag-and-drop area, emitting File[] through a model. The component does not upload by itself.',
    apiTitle: 'API — GFileInput',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'The drop area wraps a hidden native input type="file", so files can still be selected by keyboard and the operating-system picker.',
      'The picker opener is a button with a clear "Choose file" label.',
      'Each remove button in the file list has a label derived from the file name.',
    ],
    apiRows: [
      {
        name: 'files',
        type: 'File[] (model)',
        default: '[]',
        description: 'Selected files, two-way bound with [(files)].',
      },
      { name: 'accept', type: 'string', default: '—', description: 'File type filter.' },
      {
        name: 'multiple',
        type: 'boolean',
        default: 'false',
        description: 'Allow selecting or dropping multiple files.',
      },
      {
        name: 'showFileList',
        type: 'boolean',
        default: 'true',
        description: 'Show the built-in file list when multiple is enabled.',
      },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the control.' },
    ],
    multipleTitle: 'Multiple files',
    multipleIntro:
      'Enable [multiple]="true" to show the selected file list under the picker, with name, size, and per-file remove buttons.',
    demo: {
      selectedCount: (count) => `Selected: ${count} ${count === 1 ? 'file' : 'files'}`,
      multiHint: (count) =>
        `${count} ${count === 1 ? 'file' : 'files'} — choose more to append, press × to remove each file.`,
    },
  },
  datepicker: {
    title: 'Datepicker',
    intro:
      'Pick one date through a read-only display field and calendar popover. Navigate months with ‹ › and select a date with pointer or keyboard. Value is Date | null via [(value)].',
    apiTitle: 'API — GDatepicker',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'The calendar opener has aria-haspopup="dialog" and aria-expanded; the panel is a labelled role="dialog".',
      'The date grid supports keyboard navigation, and today is marked with aria-current="date".',
    ],
    apiRows: [
      {
        name: 'value',
        type: 'Date | null (model)',
        default: 'null',
        description: 'Selected date, two-way bound with [(value)].',
      },
      { name: 'min', type: 'Date', default: '—', description: 'Earliest selectable date.' },
      { name: 'max', type: 'Date', default: '—', description: 'Latest selectable date.' },
      {
        name: 'placeholder',
        type: 'string',
        default: "'MM/dd/yyyy'",
        description: 'Placeholder shown before a date is selected.',
      },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the control.' },
    ],
    demo: {
      selected: (value) => `Selected: ${value ?? 'none'}`,
    },
  },
  dateRangePicker: {
    title: 'Date Range Picker',
    intro:
      'Pick a date range on one calendar: choose the start date, then the end date. Value is { start, end } via [(value)].',
    apiTitle: 'API — GDateRangePicker',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'The opener has aria-haspopup="dialog" and aria-expanded; the calendar is a labelled dialog.',
      'Keyboard: arrows move dates, PageUp/PageDown changes months, Enter selects, and Esc closes.',
    ],
    apiRows: [
      {
        name: 'value',
        type: 'GDateRange (model)',
        default: '{ start: null, end: null }',
        description: 'Date range { start, end }, two-way bound with [(value)].',
      },
      { name: 'min', type: 'Date', default: '—', description: 'Earliest selectable date.' },
      { name: 'max', type: 'Date', default: '—', description: 'Latest selectable date.' },
      {
        name: 'placeholder',
        type: 'string',
        default: "'MM/dd/yyyy – MM/dd/yyyy'",
        description: 'Placeholder shown before a range is selected.',
      },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the control.' },
    ],
    demo: {
      empty: 'No range selected',
      range: (start, end) => `From ${start} to ${end}`,
    },
  },
  timePicker: {
    title: 'Time Picker',
    intro:
      'Pick an HH:mm time through a read-only field and a two-column Hour/Minute popover. Value is an "HH:mm" string via [(value)].',
    apiTitle: 'API — GTimePicker',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'The opener has aria-haspopup="dialog" and aria-expanded; the panel is role="dialog".',
      'Keyboard: ArrowUp/ArrowDown moves within a column, Enter/Space selects, and Esc closes.',
    ],
    apiRows: [
      {
        name: 'value',
        type: 'string | null (model)',
        default: 'null',
        description: 'Selected time as "HH:mm", two-way bound with [(value)].',
      },
      { name: 'minuteStep', type: 'number', default: '1', description: 'Minute column step.' },
      { name: 'placeholder', type: 'string', default: "'HH:mm'", description: 'Placeholder text.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the control.' },
    ],
    demo: {
      selected: (value) => `Selected: ${value ?? 'none'}`,
    },
  },
  slider: {
    title: 'Slider',
    intro:
      'Select a numeric value between min and max using step increments. It wraps a native input[type="range"], so pointer, touch, and keyboard input work.',
    apiTitle: 'API — GSlider',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'Uses native input[type="range"], so role="slider", aria-valuenow/min/max, and keyboard navigation are built in.',
      'Provide a name through ariaLabel or an external label.',
    ],
    apiRows: [
      { name: 'value', type: 'number (model)', default: '0', description: 'Selected value.' },
      { name: 'min', type: 'number', default: '0', description: 'Minimum value.' },
      { name: 'max', type: 'number', default: '100', description: 'Maximum value.' },
      { name: 'step', type: 'number', default: '1', description: 'Increment step.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the slider.' },
      {
        name: 'ariaLabel',
        type: 'string',
        default: '—',
        description: 'Name for screen readers.',
      },
    ],
    demo: {
      valueLabel: 'Value',
      temperatureLabel: 'Temperature',
      lockedLabel: 'Locked',
      disabled: 'Disabled',
    },
  },
  stepSlider: {
    title: 'Step Slider',
    intro:
      'Discrete pill-shaped slider: a pill track with evenly spaced steps. Works with formControlName/ngModel and [(value)].',
    apiTitle: 'API — GStepSlider',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'The track is role="slider" with tabindex, aria-valuemin/max/now, and aria-label.',
    ],
    apiRows: [
      { name: 'value', type: 'number', default: '0', description: 'Selected step index.' },
      { name: 'steps', type: 'number', default: '5', description: 'Number of steps.' },
      { name: 'size', type: "'xs' | 'sm' | 'md'", default: "'md'", description: 'Track size.' },
      {
        name: 'startLabel / endLabel',
        type: 'string',
        default: "''",
        description: 'Labels at the two ends of the track.',
      },
      {
        name: 'ariaLabel',
        type: 'string',
        default: "'Level'",
        description: 'Screen-reader label.',
      },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the control.' },
    ],
    demo: {
      md: 'Size md (default)',
      sm: 'Size sm',
      xs: 'Size xs',
      ariaMd: 'Faster or smarter',
      ariaSm: 'Faster or smarter (small)',
      ariaXs: 'Faster or smarter (extra small)',
      selected: (value, total) => `Selected step: ${value} / ${total}`,
    },
  },
  rating: {
    title: 'Rating',
    intro:
      'Star rating input: click, hover, or use arrow keys to choose a value. Enable allowHalf for half stars and readonly for display-only ratings.',
    apiTitle: 'API — GRating',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'Interactive mode uses role="slider" with aria-valuemin/max/now and aria-label.',
      'Readonly mode uses role="img" with a generated label.',
    ],
    apiRows: [
      { name: 'value', type: 'number', default: '0', description: 'Selected star count.' },
      { name: 'max', type: 'number', default: '5', description: 'Total star count.' },
      {
        name: 'allowHalf',
        type: 'boolean',
        default: 'false',
        description: 'Allow half-star steps.',
      },
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Star size.' },
      { name: 'readonly', type: 'boolean', default: 'false', description: 'Display only.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the control.' },
      {
        name: 'label',
        type: 'string',
        default: "'Rating'",
        description: 'Screen-reader label for interactive mode.',
      },
    ],
    demo: {
      choose: 'Choose a rating (click, hover, or use ←/→)',
      sizes: 'Sizes',
      half: 'Half stars (allowHalf) — hover the left or right half',
      readonly: 'Read only (readonly)',
      productLabel: 'Product quality',
      satisfactionLabel: 'Satisfaction',
      average: 'Average rating 4.5',
    },
  },
  colorPicker: {
    title: 'Color Picker',
    intro:
      'Pick a color through a display swatch and popover: Saturation/Value area, Hue slider, hex input, and preset swatches.',
    apiTitle: 'API — GColorPicker',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'The opener has aria-haspopup="dialog"; the panel is a labelled role="dialog".',
      'The Saturation/Value area is focusable and adjusts with arrow keys; aria-valuetext reads the current color.',
    ],
    apiRows: [
      {
        name: 'value',
        type: 'string (model)',
        default: "'#000000'",
        description: 'Selected color as #rrggbb hex, two-way bound with [(value)].',
      },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the control.' },
    ],
    demo: {
      selected: (value) => `Selected: ${value}`,
    },
  },
  inputOtp: {
    title: 'Input OTP',
    intro:
      'OTP/PIN input made of length one-character cells. Typing advances to the next cell, Backspace moves back, and paste spreads text across cells.',
    apiTitle: 'API — GInputOtp',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'Each cell is an input maxlength="1" with its own aria-label and autocomplete="one-time-code".',
      'With integerOnly, each cell uses inputmode="numeric".',
    ],
    apiRows: [
      {
        name: '(CVA)',
        type: 'ControlValueAccessor<string>',
        default: '—',
        description: `${cvaTextEn} Value is the concatenated string from all cells.`,
      },
      { name: 'length', type: 'number', default: '6', description: 'Number of cells.' },
      {
        name: 'integerOnly',
        type: 'boolean',
        default: 'false',
        description: 'Allow digits only.',
      },
      { name: 'mask', type: 'boolean', default: 'false', description: 'Mask entered characters.' },
    ],
    demo: {
      entered: (value) => `Entered code: ${value || 'empty'}`,
    },
  },
  chips: {
    title: 'Chips',
    intro:
      'Multi-value chip input. Type and press Enter or comma to add; press Backspace on an empty input to remove the last chip.',
    apiTitle: 'API — GChips',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'Each chip has its own remove button with an aria-label describing the item being removed.',
      'The input has aria-label "Add item"; when max is reached, the input disables itself.',
    ],
    apiRows: [
      {
        name: '(CVA)',
        type: 'ControlValueAccessor<string[]>',
        default: '—',
        description: `${cvaTextEn} Value is a string array.`,
      },
      {
        name: 'placeholder',
        type: 'string',
        default: "''",
        description: 'Placeholder shown in the input before chips exist.',
      },
      { name: 'max', type: 'number', default: '—', description: 'Maximum chip count.' },
      {
        name: 'allowDuplicate',
        type: 'boolean',
        default: 'false',
        description: 'Allow duplicate values.',
      },
    ],
    demo: {
      placeholder: 'Type then press Enter',
      added: (values) => `Added: ${values.join(', ') || 'none'}`,
    },
  },
  treeSelect: {
    title: 'Tree Select',
    intro:
      'Choose an item from a collapsible tree. The trigger opens a tree overlay; both branch and leaf nodes can be selected.',
    apiTitle: 'API — GTreeSelect',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'The trigger has role="combobox" with aria-haspopup="tree"; the panel is role="tree".',
      'Keyboard: ArrowUp/ArrowDown moves, ArrowRight expands, ArrowLeft collapses, Enter/Space selects, and Esc closes.',
    ],
    apiRows: [
      {
        name: '(CVA)',
        type: 'ControlValueAccessor<unknown>',
        default: '—',
        description: `${cvaTextEn} single: selected node value; multiple: selected leaf node values.`,
      },
      {
        name: 'multiple',
        type: 'boolean',
        default: 'false',
        description: 'Enable checkbox-based multiple selection.',
      },
      {
        name: 'options',
        type: 'GTreeNode[]',
        default: '[]',
        description: 'Tree options { label, value?, children? }.',
      },
      {
        name: 'placeholder',
        type: 'string',
        default: "''",
        description: 'Text shown before a value is selected.',
      },
      {
        name: 'compareWith',
        type: '(a: unknown, b: unknown) => boolean',
        default: '(a, b) => a === b',
        description: 'Compare a node value with the current model value.',
      },
    ],
    multipleTitle: 'Multiple selection',
    multipleIntro:
      'Add multiple to select nodes with checkboxes. Parent selection cascades to descendants, and the trigger lists selected leaf labels.',
    demo: {
      placeholder: 'Choose an item',
      multiplePlaceholder: 'Choose permissions',
      options: [
        {
          label: 'Documents',
          children: [
            { label: 'Reports', value: 'reports' },
            { label: 'Contracts', value: 'contracts' },
          ],
        },
        { label: 'Images', value: 'images' },
      ],
      multipleOptions: [
        {
          label: 'Content',
          children: [
            { label: 'Read posts', value: 'post:read' },
            { label: 'Edit posts', value: 'post:write' },
            { label: 'Delete posts', value: 'post:delete' },
          ],
        },
        {
          label: 'Users',
          children: [
            { label: 'View users', value: 'user:read' },
            { label: 'Invite users', value: 'user:invite' },
          ],
        },
        { label: 'System settings', value: 'settings' },
      ],
      selected: (value) => {
        const text = Array.isArray(value) ? value.join(', ') : value;
        return `Selected: ${text || 'none'}`;
      },
    },
  },
};

export function formCopyFor(tag: string): FormCopy {
  return tag.startsWith('en') ? EN_FORMS : VI_FORMS;
}
