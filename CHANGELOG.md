# Changelog

Mọi thay đổi đáng chú ý của dự án này được ghi lại trong file này.

Định dạng dựa trên [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), dự án tuân theo
[Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added

- **`GAlert`** (`g-alert`): thông báo **inline** (callout) cho ghi chú/cảnh báo/lỗi — `variant`
  `neutral | success | warning | danger` (màu + icon riêng), `heading` tuỳ chọn, `dismissible` +
  hai chiều `[(open)]`, nội dung qua slot. Khác `GToast` (overlay tạm) và `GBadge` (nhãn nhỏ). Mức độ
  truyền cho screen reader qua tiền tố ẩn.
- **`GProgressCircle`** (`g-progress-circle`): tiến độ dạng **vòng tròn** — `[value]` 0–100 vẽ cung,
  `[size]`/`[stroke]` chỉnh đường kính/độ dày, nội dung chiếu vào **giữa** vòng qua `<ng-content>`
  (số đếm ngược, phần trăm…). Docs: trang Progress thêm mục "Vòng tròn (đếm ngược)" với demo hẹn giờ.
- **`GCarousel`** (`g-carousel`): băng chuyền ngang cho **nội dung bất kỳ** (chiếu card qua slot). Track
  dùng scroll-snap giữ **bề rộng tự nhiên** của item nên chạy đúng cả khi item **cùng kích thước** lẫn
  **khác kích thước** (thẻ ngang kiểu thẻ tín dụng xen thẻ dọc). Nút prev/next cuộn đúng một item và tự
  ẩn/`disabled` ở biên; track điều hướng được bằng phím ←/→. `center` căn giữa item khi vừa khung (tràn
  thì tự lùi về mép trái để vẫn cuộn/hiện nút). Khác `GImageSlider` (một ảnh/khung).
- **`GGallery`** (`g-gallery`): gallery ảnh kiểu trang bán hàng — ảnh chính lớn + dải thumbnail, bấm
  thumbnail đổi ảnh chính, bấm ảnh chính mở lightbox. Dải thumbnail dùng `GCarousel` (center): **căn
  giữa** khi ít ảnh, tự có **nút trái/phải** khi danh sách dài. `[images]` nhận `string | File` (File tự
  tạo/thu hồi objectURL). Khác `GImagePreview` (lưới thumbnail).

## [0.14.0] — 2026-07-20

### Added

- **`SKILL.md`** ship kèm npm package — hướng dẫn cho AI coding agent (pattern bắt buộc, form control
  CVA, bẫy thường gặp, bảng tra component + selector). Agent trong dự án consumer đọc được ở
  `node_modules/ngx-opendesign/SKILL.md`. README npm cũng đưa "Tài liệu" lên trước "Cài đặt".
- **Icon**: thêm `gIconSend` (máy bay giấy) và `gIconMic` (micro) vào bộ public (47 → 49).
- **Docs**: thêm màn **Chatbot** vào Playbook — khung chat tương tác (gõ/chip gợi ý → typing → bot trả
  lời mẫu; tự cuộn xuống đáy) ghép GCard + GScrollPanel + GAvatar + GChip + `GInputGroup` với nút
  suffix đổi icon `gIconMic` ↔ `gIconSend` theo có chữ chưa.
- **Docs**: trang **Table** thêm mục **Chọn hàng** — ví dụ ghép cột `GCheckbox` + ô chọn-tất-cả
  tri-state (`indeterminate` khi chọn một phần), tập id chọn giữ trong `signal<Set>`, hàng chọn tô nền.

### Changed

- **GTooltip**: thêm **mũi nhọn** (arrow) chỉ về phía trigger. Cạnh đặt mũi bám theo vị trí THỰC TẾ
  của overlay (kể cả khi CDK lật sang hướng fallback vì thiếu chỗ); các vị trí góc dịch mũi về gần
  mép trái/phải. Không phá "hover bridge" (mũi `pointer-events: none`).
- **GInputGroup**: prefix/suffix (icon kính lúp, nút con mắt mật khẩu, nút gửi chat…) nay **nép sát
  mép** của nó — thu padding bên có adornment xuống, để icon/nút ôm sát đầu bo pill (đường bao pill
  song song với adornment) thay vì lơ lửng cách mép một khoảng padding dành cho chữ. Áp cả hai bên,
  cho cả icon lẫn nút.

## [0.13.0] — 2026-07-20

### Added

- **Forms — trạng thái invalid nhất quán**: mọi form control nay **tô viền đỏ** khi control invalid +
  đã touched/dirty (trước chỉ `GInput`/`GTextarea` có): `GSelect`, `GCascadeSelect`, `GTreeSelect`,
  `GChips`, `GInputOtp`, `GCheckbox`, `GRadioGroup` tự nhận qua `NgControl`.
- **GDatepicker / GTimePicker / GDateRangePicker**: nay là **`ControlValueAccessor`** — dùng được
  `formControlName`/`[formControl]` (kèm tô invalid tự động), đồng thời **giữ nguyên `[(value)]`** cho
  dùng ngoài form (không breaking). `[disabled]` vẫn hoạt động, cộng thêm `formControl.disable()`.

### Changed

- **GSelect**: panel dropdown nay rộng **tối thiểu bằng trigger** rồi tự nới theo nội dung option (thay
  vì rộng cố định đúng bằng trigger) — nhãn option dài không còn bị xuống dòng khi trigger hẹp (vd.
  `GSearchField` đặt select `max-content`). Trigger đủ rộng thì panel giữ nguyên bằng trigger như cũ.
- **GTabs**: track (thanh chứa tab) thêm **viền** để bộ tab luôn hiện rõ kể cả khi đặt trên nền cùng
  màu `--g-surface` (vd. trong `GCard`) — trước đây nền track trùng nền cha nên vô hình.
- **Docs**: tách trang **Playbook** thành nhóm 5 màn theo view phổ biến (Đăng nhập, Dashboard, Danh
  sách, Chi tiết, Thêm mới) thay cho một trang gộp 6 recipe — mỗi view một route riêng; trang Danh
  sách gộp tìm kiếm + lọc trạng thái + lọc vai trò (chip); thêm mới Chi tiết (tabs + timeline) và
  Thêm mới (form đủ họ input + validation).

## [0.12.0] — 2026-07-20

### Added

- **Form**: `GSearchField` (ô tìm kiếm theo TRƯỜNG — `GSelect` chọn trường bên trái + ô nhập bên
  phải trong khung pill; Enter phát `(search)` = `{ field, value }`, hai chiều `[(field)]`/`[(query)]`).

### Changed

- **GSidebar**: rộng 240 → 248px và thêm `padding-inline` cho vùng cuộn nav (khớp cả top row) để
  **focus ring của item không bị mép sidebar cắt** (trước đây item sát mép, ring bị `overflow` clip).
- **GInputGroup**: `<input>` bên trong chừa `padding: 0 2px` để con trỏ khi ô RỖNG không bị input tự
  clip ở mép content-box (trước đó caret sát mép trái bị cắt mất phần trái nên trông bé/mảnh).
- **GSelect** (multiple): trigger **liệt kê nhãn** các mục đã chọn (nối `, `, một hàng, tràn thì cắt
  bằng `…`) thay vì chip có nút bỏ — bỏ chọn bằng cách mở lại panel. Nhất quán với GTreeSelect
  multiple.
- **GSelect** (searchable): ô tìm kiếm nay nổi trên danh sách khi cuộn (không bị option đè viền/ring);
  danh sách option dùng **thanh cuộn mảnh** theo theme (như GScrollPanel) thay cho scrollbar mặc định.

## [0.11.0] — 2026-07-20

### Added

- **GTreeSelect**: chế độ `multiple` — chọn nhiều node bằng checkbox lan truyền (cascade) + tri-state
  (cha "một phần" khi chỉ vài con được tích); nút gập/mở sang phải, checkbox bên trái; trigger **liệt
  kê nhãn** các node lá đã chọn trên một hàng (tràn thì cắt bằng `…`), bỏ chọn bằng cách mở lại cây.
  Giá trị = mảng value các node lá.
- **GSpinner**: thêm cỡ `xl` (48px) và `2xl` (64px).
- **GPagination**: thêm nút về **trang đầu** và tới **trang cuối** (icon « »). Thêm icon công khai
  `gIconChevronsLeft` / `gIconChevronsRight`.

### Changed

- **GChips**: nhiều chip thì **xuống dòng**; khi đã xuống nhiều dòng, ô đổi từ bo viên (pill) sang bo
  **chữ nhật radius nhỏ** (pill trên khối cao nhiều dòng trông kỳ) — trạng thái wrap đo lúc chạy.
- **GSelect**: option nay có hiệu ứng **hover** (tô nền nhẹ) như trạng thái active bàn phím.
- **GIconButton**: hover của variant `ghost`/`outline` dùng `--g-border` thay vì `--g-surface` để
  **hiện rõ trên nền sọc** hàng chẵn của bảng (trước đây trùng màu nên như không có hover).
- **GMediaPlayer**: căn thẳng thanh trượt âm lượng với các icon control trên thanh.

## [0.10.0] — 2026-07-19

### Added

- **Form**: `GCascadeSelect` (chọn qua danh mục lồng — overlay flyout nhiều cột, chọn lá; CVA).
- **Form**: `GTreeSelect` (chọn một node từ cây — overlay cây gập/mở, chọn node bất kỳ; CVA).
- **Form**: `GChips` (nhập nhiều giá trị dạng chip — Enter/dấu phẩy thêm, ×/Backspace xoá, chống trùng; CVA `string[]`).
- **Form**: `GInputOtp` (nhập mã OTP/PIN — N ô một ký tự, tự nhảy, dán rải, `integerOnly`/`mask`; CVA).
- **Hiển thị**: `GTimeline` + `GTimelineItem` (dòng thời gian dọc — marker + đường nối, marker tuỳ biến;
  `status: 'default' | 'success' | 'warning' | 'danger'` tô màu marker theo trạng thái).
- **Điều hướng**: `GAccordion` + `GAccordionPanel` (panel gập/mở — single-open hoặc `multiple`, animate, ARIA).
- **Điều hướng**: `GDockMenu` (thanh dock kiểu macOS — hover phóng to icon + cho icon trồi lên trên
  thanh, không phóng item hàng xóm; tooltip; `position` bottom/static).
- **Cấu trúc**: `GScrollPanel` (vùng cuộn thanh cuộn mảnh theo theme).
- **Cấu trúc**: `GTableContainer` (vùng cuộn bao `<table gTable>` — viền/bo góc + `minRows`/`maxRows`
  quy chiều cao theo số hàng: `minRows` chống giật khi kết quả ngắn lại, `maxRows` tự cuộn khi dài).

### Changed

- **GTooltip**: `gTooltipPosition` thêm 4 vị trí góc — `top-left`, `top-right`, `bottom-left`,
  `bottom-right`.
- **GSelect**: item option nay bo dạng viên (pill) cho nhất quán với thẩm mỹ chung.

## [0.9.0] — 2026-07-19

### Added

- **Hiển thị**: `GSkeleton` (khối placeholder loading — variant `text`/`circular`/`rectangular`,
  `width`/`height`, `lines` cho text nhiều dòng; hiệu ứng shimmer, `prefers-reduced-motion` tắt).

### Changed

- **GSelect**: thêm `searchable` (ô tìm kiếm trong panel, lọc option không phân biệt dấu tiếng Việt)
  và `multiple` (chọn nhiều — giá trị mảng, hiển thị chip có nút bỏ, panel giữ mở, dấu check ở option
  đã chọn); ghép được với nhau. Tương thích ngược (mặc định single, non-searchable).

## [0.8.0] — 2026-07-19

### Added

- **Form**: `GTimePicker` (chọn giờ:phút 24h — ô read-only + popover 2 cột Giờ/Phút, `minuteStep`,
  value `"HH:mm"`, bàn phím ↑↓/Enter/Esc).
- **Form**: `GDateRangePicker` (chọn khoảng ngày trên 1 lịch — tô dải + xem trước khi hover, value
  `GDateRange { start, end }`, `min`/`max`, bàn phím như Datepicker).
- **Form**: `GColorPicker` (chọn màu — vùng Saturation/Value kéo chuột, thanh Hue, ô hex, swatch;
  value hex `#rrggbb`).
- **Icon**: thêm `gIconClock` vào bộ public (44 → 45).

### Changed

- **GSlider**: track nền dùng biến `--g-slider-track` (mặc định giữ nguyên fill) để consumer thay
  hẳn nền track — `GColorPicker` đặt dải Hue cầu vồng cho thanh Hue.

## [0.7.0] — 2026-07-19

### Added

- **Overlay**: `GDrawer` (bottom sheet + side panel hợp nhất — `side="bottom|left|right|top"`, mở/đóng
  hai chiều `[(open)]`, trượt từ mép + nền mờ, focus trap, `Esc`/click nền đóng, khoá scroll body,
  `size` tuỳ chỉnh rộng/cao).
- **Hiển thị**: `GMediaPlayer` (trình phát audio/video — bọc `<audio>`/`<video>` native, control bar
  tuỳ biến: play/pause, thời gian, thanh tua, mute + âm lượng, toàn màn hình cho video).
- **Form**: `GSlider` (thanh trượt chọn giá trị số — bọc `input[type=range]` native, `[(value)]`,
  `min`/`max`/`step`/`disabled`, phần đã chọn tô màu chính).
- **Icon**: thêm 5 icon media vào bộ public (39 → 44): `gIconPlay`, `gIconPause`, `gIconVolume`,
  `gIconVolumeMute`, `gIconMaximize`.

### Changed

- **GSidebar**: thanh cuộn chỉ hiện khi rê chuột vào vùng sidebar (ẩn thumb mặc định).

## [0.6.0] — 2026-07-19

### Added

- **Hiển thị**: `GAvatar` thêm `shape: 'circle' | 'square'` (vuông bo góc nhẹ `--g-radius-md`).
- **Overlay**: `GToast` thêm `title` tuỳ chọn (hiển thị đậm trên message; screen reader đọc cả hai).
- **Icon**: thêm 7 icon vào bộ public (32 → 39): `gIconBell`, `gIconCopy`, `gIconLink`, `gIconImage`,
  `gIconGrid`, `gIconLayout`, `gIconTable`.
- **Điều hướng**: `GMenu` + `GMenuItem` + `GSubmenu` (menu điều hướng có mục con phân cấp —
  `orientation="vertical"` mở/gập inline accordion, `orientation="horizontal"` bung dropdown; lồng được nhiều cấp).
- **Điều hướng**: `GBreadcrumb` + `GBreadcrumbItem` (đường dẫn phân cấp, dấu `›` tự chèn, mục cuối `aria-current="page"`).

### Changed

- **GButton**: variant `danger` nay là **outline mặc định**, hover mới tô đặc (nhẹ nhàng hơn cho hành
  động phá huỷ).
- **GFileInput**: khi chỉ có 1 tệp trong danh sách, gom dòng sát trái để nút xoá nằm cạnh tên (nhiều
  tệp vẫn dàn đều).
- **Docs**: mọi icon trong docs (nav sidebar + demo) chuyển sang dùng `<g-icon>` với glyph docs-local
  (`core/nav-icons.ts`, `core/demo-icons.ts`) thay cho inline `<svg>` — dogfood chính `GIcon`. Trang
  Icon: bấm vào ô để copy tên hằng.

## [0.5.0] — 2026-07-19

### Added

- **Hiển thị**: `GDivider` (vạch phân cách ngang/dọc, nhãn giữa tuỳ chọn qua nội dung chiếu).
- **Nút**: `GFab` (nút hành động nổi — `position: fixed` ở góc màn hình, dạng tròn hoặc `extended` có nhãn).
- **Cấu trúc**: `GGrid` (primitive CSS grid — `cols` cột đều hoặc `minColWidth` responsive auto-fill, `gap` token).
- **Form**: `GDatepicker` (chọn 1 ngày — ô read-only + popover lịch, điều hướng tháng, bàn phím
  ←→↑↓/Enter/Esc/PageUp-Down, `min`/`max`, định dạng `dd/MM/yyyy`).

### Changed

- **GStack**: thêm input `wrap` (bật `flex-wrap: wrap`).
- **GStepper**: chế độ `vertical` nay có đường nối dọc giữa các bước và thụt lề nội dung.
- **Icon**: thêm `gIconCalendar` (32 icon).

## [0.4.0] — 2026-07-18

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

[0.9.0]: https://github.com/gingatimo/opendesign/releases/tag/v0.9.0
[0.8.0]: https://github.com/gingatimo/opendesign/releases/tag/v0.8.0
[0.7.0]: https://github.com/gingatimo/opendesign/releases/tag/v0.7.0
[0.6.0]: https://github.com/gingatimo/opendesign/releases/tag/v0.6.0
[0.5.0]: https://github.com/gingatimo/opendesign/releases/tag/v0.5.0
[0.4.0]: https://github.com/gingatimo/opendesign/releases/tag/v0.4.0
[0.1.0]: https://github.com/gingatimo/opendesign/releases/tag/v0.1.0
