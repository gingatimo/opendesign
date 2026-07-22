import { ApiRow } from '../shared/api-table';

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

interface FormCopy {
  input: InputCopy;
  textarea: TextareaCopy;
  checkbox: CheckboxCopy;
  toggle: ToggleCopy;
  radio: RadioCopy;
  select: SelectCopy;
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
};

export function formCopyFor(tag: string): FormCopy {
  return tag.startsWith('en') ? EN_FORMS : VI_FORMS;
}
