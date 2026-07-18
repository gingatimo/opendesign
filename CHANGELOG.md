# Changelog

Mọi thay đổi đáng chú ý của dự án này được ghi lại trong file này.

Định dạng dựa trên [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), dự án tuân theo
[Semantic Versioning](https://semver.org/).

## [0.4.0] — chưa phát hành

### Added

- **Form**: `GFileInput` (chọn tệp + vùng kéo-thả, thuần trình bày — phát `File[]`, consumer tự
  upload). Khi `multiple` hiện danh sách tệp đã chọn (tên + dung lượng + nút xoá từng tệp), chọn
  lần sau nối thêm; input `showFileList` để tắt danh sách khi tự hiển thị preview.
- **Hiển thị**: `GImagePreview` (lưới thumbnail từ URL hoặc `File`; click mở lightbox toàn màn hình
  zoom cuộn/nút/double-click + pan kéo + prev/next + phím tắt; `removable` phát `(remove)`).
- **Hiển thị**: `GImageSlider` (băng chuyền ảnh — 1 ảnh/khung, nút ‹ › + chấm chỉ vị trí + phím
  ←/→, `loop` cuộn vòng, `lightbox` click ảnh mở zoom toàn màn hình; nhận URL hoặc `File`).
- **Playbook**: recipe "Tải ảnh lên" (file input → image preview → lightbox).

## [0.3.0] — chưa phát hành

### Added

- **Điều hướng**: `GPagination` (control phân trang trình bày, có ellipsis; consumer tự cắt dữ liệu).
- **Table (nâng cao, vẫn thuần hiển thị)**: `GSortHeader` (directive `[gSortHeader]` đặt `aria-sort` +
  chỉ báo hướng; logic sort ở consumer), đóng băng cột/hàng kiểu Excel qua marker `[gFreezeColumn]` /
  `[gFreezeRow]` (GTable đo và áp `position: sticky` + nền đục, khớp sọc).
- **Playbook**: recipe "Trang danh sách" (search/filter trên, table trạng thái + thời gian (DatePipe) +
  cột hành động, đóng băng cột Tên + header, phân trang dưới).
- **Icon**: thêm `gIconAngleUp` / `gIconAngleDown` vào icon set; chỉ báo sắp xếp của `GSortHeader`
  đổi từ ký tự ▲▼↕ sang icon angle (mask cùng path, tô theo token).

## [0.2.0] — chưa phát hành

### Added

- **Cấu trúc**: `GLayout` (app-shell topbar + sidebar + content bằng CSS grid, chỉ vùng nội dung cuộn),
  `GContainer` (bọc nội dung max-width canh giữa, token `--g-container-max-width` mặc định 960px),
  `GStack` (flex xếp dọc/ngang, `gap` theo thang token `--g-space-*`).
- **Dữ liệu**: `GTable` (directive thuần hiển thị trên `<table>` native — kẻ dòng, `striped`, `stickyHeader`;
  consumer tự lo dữ liệu/sắp xếp/phân trang, bọc `overflow-x:auto` để cuộn ngang).
- **Điều hướng**: `GStepper` + `GStep` (wizard nhiều bước, `[(activeStep)]` hai chiều, ngang/dọc, chỉ
  render nội dung bước đang chọn, ARIA `aria-current="step"`).

## [0.1.0] — chưa phát hành

### Added

#### Component (22)

- **Nút**: `GButton`, `GIconButton`
- **Form**: `GInput`, `GTextarea`, `GCheckbox`, `GToggle`, `GRadioGroup` + `GRadio`, `GSelect` +
  `GOption` (trigger có mũi tên xuống, xoay khi mở panel), `GInputGroup` (input kèm icon/nút phụ
  trợ trước/sau qua `GInputPrefix`/`GInputSuffix`)
- **Hiển thị**: `GBadge`, `GSpinner`, `GProgress`, `GChip`, `GAvatar`, `GCard`, `GIcon` (+ bộ 28
  icon SVG tree-shakable)
- **Overlay**: Dialog (qua `GDialogService`), `GTooltip`, Toast (qua `GToastService` — cấu hình vị
  trí qua `setPosition(GToastPosition)`, mặc định `top-right`, hỗ trợ 6 góc)
- **Điều hướng**: `GTabs`, `GTopbar`, `GSidebar` (thu gọn: ẩn header, item active hiện vạch mép
  trái, icon căn giữa, tooltip nhãn xổ sang phải), `GSidebarToggle` (nút thu gọn/mở lại — mở rộng thì nằm trái header, thu gọn thì
  căn giữa cùng cấp các mục nav), `GLink`

Toàn bộ component: standalone, `ChangeDetectionStrategy.OnPush`, signal input/output, ARIA đúng
pattern, điều hướng bàn phím đầy đủ. Theme sáng/tối qua design token `--g-*`, đổi bằng thuộc tính
`data-g-theme` trên `<html>`.

#### Hạ tầng

- Design token (`projects/ngx-opendesign/styles/opendesign.scss`): màu sắc, typography, radius,
  spacing — hai bảng màu sáng/tối, `color-scheme` để UI gốc trình duyệt (thanh cuộn, autofill...)
  đi theo theme. Kèm luôn rule `.cdk-visually-hidden` (tương đương `@angular/cdk/a11y-prebuilt.css`)
  vì `GToastService` dùng `LiveAnnouncer` — CDK tự inject style overlay nhưng KHÔNG tự inject style
  a11y, thiếu rule này thì vùng live-region đọc cho screen reader render như block thường và sinh
  một thanh cuộn dọc thừa mỗi lần bắn toast. Nhờ vậy consumer chỉ cần import `opendesign.css`.
- Docs site tiếng Việt (`projects/docs`): trang Nền tảng (màu sắc, typography, radius & spacing,
  dark mode), trang riêng cho từng component (demo sống + code mẫu đọc từ file nguồn + bảng API +
  ghi chú accessibility), Playbook (4 recipe ghép component thành màn hình thực chiến — form đăng
  nhập, trang cài đặt, dashboard layout, danh sách có filter).
- CI (`.github/workflows/ci.yml`): lint, format check, test, build lib + build docs trên mỗi push
  và pull request.
- Hạ tầng phát hành: `release.yml` (publish `ngx-opendesign` lên npm kèm provenance khi push tag
  `v*`), `deploy-docs.yml` (deploy docs site lên GitHub Pages khi push nhánh `main`).

[0.1.0]: https://github.com/gingatimo/opendesign/releases/tag/v0.1.0
