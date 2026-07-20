---
name: ngx-opendesign
description: >-
  Dùng khi xây UI Angular bằng thư viện component ngx-opendesign (prefix selector `g`, token CSS
  `--g-*`, thẩm mỹ pill, sáng/tối qua thuộc tính `data-g-theme`). Bao gồm cài đặt, các pattern BẮT
  BUỘC (standalone imports, signals, form control CVA), các bẫy thường gặp, và bảng tra cứu đầy đủ
  component + selector. Nạp skill này trước khi thêm/sửa component OpenDesign trong dự án Angular.
---

# ngx-opendesign — hướng dẫn cho coding agent

Design system cho **Angular 22**: standalone + `OnPush` + signals, **0 dependency bên thứ ba** (chỉ
peer `@angular/cdk` + `@angular/forms`). Mọi thứ mang prefix `g`, tô màu bằng token CSS `--g-*`, thẩm
mỹ pill (bo tròn), có sẵn sáng/tối. Import mọi thứ từ package `'ngx-opendesign'`.

## 1. Cài đặt (một lần cho cả app)

```bash
npm install ngx-opendesign @angular/cdk @angular/forms
```

Thêm CSS của thư viện vào mảng `styles` trong `angular.json` (đây là nơi định nghĩa **toàn bộ** token
`--g-*` và bảng màu sáng/tối — thiếu file này thì mọi component mất màu):

```json
"styles": ["node_modules/ngx-opendesign/styles/opendesign.css", "src/styles.scss"]
```

File CSS đã kèm sẵn rule a11y của CDK (`.cdk-visually-hidden` cho Toast) — **không** cần import thêm
`@angular/cdk/a11y-prebuilt.css`.

**Chế độ tối:** đặt `data-g-theme="dark"` lên thẻ `<html>` (không có = sáng, mặc định). Mọi component
đọc token nên đổi màu đồng loạt, không cần build lại:

```ts
document.documentElement.setAttribute('data-g-theme', 'dark'); // hoặc xoá để về sáng
```

## 2. Pattern BẮT BUỘC

- **Standalone, không NgModule.** Import trực tiếp từng class `G*` vào `imports: [...]` của component
  đang dùng. Ví dụ: `imports: [GButton, GCard, GSelect, GOption]`.
- **Import từ `'ngx-opendesign'`** (một entry point duy nhất), không import theo đường dẫn sâu.
- **Selector HỖN HỢP** — kiểm bảng ở mục 5 trước khi viết. Một số là _element_ (`<g-select>`), một số
  là _attribute_ trên phần tử native (`<button g-button>`, `<input gInput>`, `<table gTable>`).
- **KHÔNG hardcode màu/khoảng cách.** Dùng token: `var(--g-primary)`, `var(--g-space-4)`,
  `var(--g-radius-pill)`, `var(--g-danger-solid)`… Nhờ đó tự đúng theo theme sáng/tối.
- **Icon** dùng `GIcon` + hằng `gIcon*` (tree-shakable — chỉ hằng nào import mới vào bundle):
  `import { GIcon, gIconCheck } from 'ngx-opendesign'` → `<g-icon [icon]="gIconCheck" />`.
- **Nút chỉ có icon PHẢI có `aria-label`** (`<button g-icon-button aria-label="Xoá">`).
- Tương thích signals/`OnPush` sẵn — không cần thao tác đổi phát hiện thủ công.

## 3. Form control — value binding (đây là bẫy hay sai nhất)

Chia làm hai nhóm theo cách bind giá trị:

**A. Control CVA — bind bằng `formControlName` / `[formControl]` / `[(ngModel)]`** (cần
`ReactiveFormsModule` hoặc `FormsModule`). KHÔNG có input `[value]` riêng:

`GInput`, `GTextarea`, `GCheckbox`, `GToggle`, `GRadioGroup` (+`GRadio`), `GSelect` (+`GOption`),
`GCascadeSelect`, `GTreeSelect`, `GChips`, `GInputOtp`, `GDatepicker`, `GTimePicker`, `GDateRangePicker`.

> ⚠️ **`GSelect` là CVA-only**: KHÔNG có `[value]`/`(valueChange)`. Bind giá trị **bắt buộc** qua
> `formControlName`/`[formControl]`/`[(ngModel)]`. Muốn ghép ngoài form thì bắc cầu bằng
> `[ngModel]`/`(ngModelChange)` + `FormsModule`.

```ts
<g-select formControlName="phongBan" placeholder="Chọn phòng ban">
  <g-option value="kt">Kỹ thuật</g-option>
  <g-option value="tk">Thiết kế</g-option>
</g-select>
```

**B. Control model — bind bằng `[(value)]` (KHÔNG phải CVA, không dùng formControlName):**

`GSlider` (`[(value)]` number), `GColorPicker` (`[(value)]` hex `#rrggbb`),
`GFileInput` (`[(files)]` `File[]`).

> `GDatepicker`/`GTimePicker`/`GDateRangePicker` hỗ trợ **cả hai**: `formControlName` (trong form,
> tự validate) HOẶC `[(value)]` (ngoài form). Chọn một.

**Trạng thái invalid:** từ v0.13.0 mọi control CVA **tự tô viền đỏ** khi control `invalid` và đã
`touched`/`dirty` (giống `GInput`). Chỉ cần đặt validator (`Validators.required`, …) và để form đánh
dấu touched (vd `form.markAllAsTouched()` lúc submit) — không phải tự style.

## 4. Bẫy thường gặp

- `g-button` / `g-icon-button` / `g-fab` là **attribute trên `<button>`/`<a>`**, KHÔNG phải element:
  `<button g-button variant="outline">Lưu</button>`.
- `gInput`, `gTextarea`, `gTable` là **attribute trên phần tử native** (`<input gInput>`,
  `<textarea gTextarea>`, `<table gTable>`) — giữ được toàn bộ ngữ nghĩa/a11y gốc.
- **`GDialog` và `GToast` là SERVICE**, không có element. Inject `GDialogService` / `GToastService`
  rồi gọi — không cần đặt container thủ công (dùng CDK overlay, tự tạo):
  ```ts
  private dialog = inject(GDialogService);
  private toast = inject(GToastService);
  this.dialog.open(MyDialogComponent, { data: {...} });   // trả GDialogRef
  this.toast.show({ message: 'Đã lưu', variant: 'success' });
  ```
- Overlay (Dialog, Tooltip, Toast, Select, các picker) cần `@angular/cdk`; control CVA cần
  `@angular/forms` — đã là peerDependencies, nhớ cài.
- `GCard` nhận header/footer qua attribute chiếu: `<div gCardHeader>…</div>`, `<div gCardFooter>…</div>`.

## 5. Bảng tra component (import → selector → ghi chú)

**Nút:** `GButton` `button[g-button]`/`a[g-button]` (`variant` primary|secondary|outline|ghost|danger,
`size` sm|md|lg, `[loading]`) · `GIconButton` `button[g-icon-button]` (cần `aria-label`) · `GFab` `button[g-fab]`
(`position` fixed, `extended`).

**Form:** `GInput` `input[gInput]` · `GTextarea` `textarea[gTextarea]` · `GInputGroup` `g-input-group`
(bọc `<input gInput>` + `<g-icon gInputPrefix/gInputSuffix>`) · `GCheckbox` `g-checkbox` ·
`GToggle` `g-toggle` · `GRadioGroup`+`GRadio` `g-radio-group`/`g-radio` · `GSelect`+`GOption`
`g-select`/`g-option` (`searchable`, `multiple`) · `GCascadeSelect` `g-cascade-select`
(`[options]` cây danh mục) · `GTreeSelect` `g-tree-select` (`multiple` cascade) · `GChips` `g-chips`
(value `string[]`) · `GInputOtp` `g-input-otp` (`length`, `integerOnly`, `mask`) · `GDatepicker`
`g-datepicker` · `GDateRangePicker` `g-date-range-picker` · `GTimePicker` `g-timepicker` ·
`GColorPicker` `g-color-picker` · `GSlider` `g-slider` · `GFileInput` `g-file-input`
(`[(files)]`, `accept`, `multiple`) · `GSearchField` `g-search-field` (select trường + ô nhập,
`(search)`).

**Hiển thị:** `GAlert` `g-alert` (callout inline note/cảnh báo/lỗi; `variant`
neutral|success|warning|danger, `heading`, `dismissible`, `[(open)]`, nội dung qua slot) ·
`GBadge` `g-badge` (`variant`) · `GSpinner` `g-spinner` (`size` sm…2xl) · `GProgress`
`g-progress` (thanh ngang) · `GProgressCircle` `g-progress-circle` (vòng tròn; `[value]`, `[size]`,
`[stroke]`, nhãn giữa qua nội dung) · `GChip` `g-chip` (`removable`, `(removed)`) · `GAvatar` `g-avatar`
(`[name]`, `shape`) · `GCard` `g-card` (+`gCardHeader`/`gCardFooter`) · `GIcon` `g-icon` (`[icon]`) ·
`GDivider` `g-divider` (`vertical`, nhãn qua nội dung) · `GImagePreview` `g-image-preview`
(lưới thumbnail + lightbox) · `GImageSlider` `g-image-slider` · `GCarousel` `g-carousel`
(băng chuyền scroll-snap cho item bất kỳ qua slot; item cùng/khác kích thước; `center` căn giữa khi
vừa khung; `navPlacement` overlay|flanking; `align` căn dọc) · `GCoverflow` `g-coverflow` (băng chuyền
tâm điểm: khung 3 card, card giữa phóng to, 2 bên peek; `[(active)]`; `loop` quay vòng + dot) · `GGallery` `g-gallery`
(`[images]` string|File; ảnh chính + dải thumbnail căn giữa/có nút trái-phải khi dài + lightbox) ·
`GMediaPlayer` `g-media-player` ·
`GSkeleton` `g-skeleton` · `GTimeline`+`GTimelineItem` `g-timeline`/`g-timeline-item` (`status`).

**Overlay:** `GDialogService` (service, `.open()`) · `GTooltip` `[gTooltip]` (attribute,
`gTooltipPosition`) · `GToastService` (service, `.show()`) · `GDrawer` `g-drawer`
(`side`, `[(open)]`) · `GContextMenu` `[gContextMenu]="tpl"` (attribute, chuột phải mở menu tại con trỏ;
tpl là `<ng-template>` chứa `<button g-menu-item>`).

**Điều hướng:** `GTabs`+`GTab` `g-tabs`/`g-tab` (`tablistLabel`, `label`) · `GTopbar` `g-topbar`
(+`gTopbarStart`/`gTopbarCenter`/`gTopbarEnd`) · `GSidebar` `g-sidebar`
(+`a[g-sidebar-item]`, `gSidebarItemIcon`/`gSidebarItemLabel`, `gSidebarHeader`/`gSidebarFooter`,
`GSidebarToggle`) · `GStepper`+`GStep` `g-stepper`/`g-step` · `GLink` `a[gLink]` · `GPagination`
`g-pagination` (`[(page)]`, `[pageCount]`) · `GBreadcrumb` `nav[g-breadcrumb]`
(+`a[g-breadcrumb-item]`) · `GMenu`+`GSubmenu` `g-menu`/`g-submenu` (+`a[g-menu-item]`) ·
`GAccordion`+`GAccordionPanel` `g-accordion`/`g-accordion-panel` (`multiple`) · `GDockMenu`
`g-dock-menu`.

**Cấu trúc:** `GContainer` `[gContainer]` · `GStack` `g-stack` · `GGrid` `g-grid`
(`cols` hoặc `minColWidth`) · `GLayout` `g-layout` · `GSplitter` `g-splitter` (chia panel có thanh kéo;
panel qua `<ng-template gSplitterPanel>`; `orientation`, `[sizes]`) · `GScrollPanel` `g-scroll-panel`.

**Dữ liệu:** `GTable` `table[gTable]` (`striped`) · `GTableContainer` `g-table-container`
(`minRows`/`maxRows`) · `GSortHeader` `[gSortHeader]` · `GFreezeColumn`/`GFreezeRow`
`[gFreezeColumn]`/`[gFreezeRow]` (đóng băng cột/hàng khi cuộn) · `GOrgChart` `g-org-chart`
(sơ đồ tổ chức dạng cây; `[nodes]` `GOrgChartNode[]` đệ quy; node mặc định label+sublabel hoặc
tuỳ biến qua `<ng-template let-node>`; `selectable` + `[(selected)]` bấm chọn node multi) ·
`GReorderList` `g-reorder-list` (danh sách kéo-thả sắp xếp lại; `[(items)]` two-way; hàng qua
`<ng-template let-item let-i="index">`).

## 6. Tài liệu đầy đủ

Demo sống, code mẫu và bảng API cho từng component: **https://gingatimo.github.io/opendesign/**
