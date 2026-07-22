import { NgTemplateOutlet } from '@angular/common';
import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  ElementRef,
  inject,
  input,
  model,
} from '@angular/core';
import { gDevWarning } from '../core/dev-warning';
import { gNextId } from '../core/id-generator';
import { GTab } from './tab';

@Component({
  selector: 'g-tabs',
  imports: [NgTemplateOutlet],
  template: `
    <div
      class="g-tabs__list"
      role="tablist"
      [attr.aria-label]="tablistLabel()"
      [attr.aria-labelledby]="tablistLabelledBy()"
    >
      @for (tab of tabs(); track $index) {
        <button
          type="button"
          class="g-tabs__tab"
          role="tab"
          [id]="tabId($index)"
          [attr.aria-selected]="$index === activeIndex()"
          [attr.aria-controls]="panelId($index)"
          [attr.tabindex]="$index === activeIndex() ? 0 : -1"
          [class.g-tabs__tab--active]="$index === activeIndex()"
          [disabled]="tab.disabled()"
          (click)="select($index)"
          (keydown)="onKeydown($event, $index)"
        >
          {{ tab.label() }}
        </button>
      }
    </div>

    <!--
      APG Tabs pattern: mỗi tab điều khiển MỘT tabpanel riêng (aria-controls trỏ tới id
      riêng, panel aria-labelledby trỏ ngược lại tab riêng đó) — không dùng chung một
      panelId cho mọi tab. Lý do: nếu dùng chung 1 panel id, aria-controls của các tab
      KHÔNG active vẫn phải trỏ tới cùng id đó (vì chỉ có 1 phần tử panel tồn tại), nghĩa
      là "vùng được điều khiển" mà AT nhảy tới khi dùng aria-controls sẽ không phải nội
      dung của tab đó — sai theo APG. Giải pháp ở đây: render đủ N div role=tabpanel (id
      riêng, ổn định theo từng tab), nhưng CHỈ tab đang active mới instantiate nội dung
      qua ngTemplateOutlet (các panel còn lại rỗng và bị [hidden] — gỡ khỏi accessibility
      tree, đúng ý APG rằng chỉ 1 panel hiển thị tại một thời điểm). Điều này vẫn thoả yêu
      cầu "chỉ render nội dung tab đang chọn".
    -->
    @for (tab of tabs(); track $index) {
      <div
        class="g-tabs__panel"
        role="tabpanel"
        [id]="panelId($index)"
        [attr.aria-labelledby]="tabId($index)"
        tabindex="0"
        [hidden]="$index !== activeIndex()"
      >
        @if ($index === activeIndex()) {
          <ng-container [ngTemplateOutlet]="tab.content()" />
        }
      </div>
    }
  `,
  styleUrl: './tabs.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'g-tabs' },
})
export class GTabs {
  readonly selectedIndex = model(0);

  // APG Tabs pattern yêu cầu tablist phải có accessible name (đặc biệt quan trọng khi một
  // trang có nhiều <g-tabs>, nếu không AT chỉ đọc ra "tablist" trống không phân biệt được).
  // <g-tabs> tự nó không có role gì trên host nên đặt aria-label lên chính thẻ <g-tabs> là
  // vô tác dụng (cùng bài học đã rút ra ở GAvatar) — phải có input riêng bind vào đúng div
  // role="tablist". Hỗ trợ cả hai cách (giống GDialogConfig.ariaLabel/ariaLabelledBy) vì
  // nhiều consumer đã có sẵn heading hiển thị mô tả bộ tab, không cần lặp lại chuỗi.
  readonly tablistLabel = input<string>();
  readonly tablistLabelledBy = input<string>();

  protected readonly tabs = contentChildren(GTab);
  private readonly idPrefix = gNextId('g-tab');
  private readonly panelIdPrefix = gNextId('g-tabpanel');

  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  constructor() {
    // Cùng doctrine với GIconButton/GToggle/GDialog: không có tên mặc định hợp lý cho MỌI
    // tablist (khác GSpinner/GProgress có một default universal như "Đang tải"), nên cảnh
    // báo dev thay vì tự đặt tên chung chung — tên chung chung sẽ vô nghĩa với AT user.
    afterNextRender(() => {
      const tablist = this.elementRef.nativeElement.querySelector('[role="tablist"]');
      if (
        tablist &&
        !tablist.hasAttribute('aria-label') &&
        !tablist.hasAttribute('aria-labelledby')
      ) {
        gDevWarning(
          'GTabs',
          'tablist needs tablistLabel or tablistLabelledBy to have an accessible name',
        );
      }
    });
  }

  // selectedIndex có thể trỏ tới một tab disabled hoặc ngoài khoảng (vd. do consumer set
  // sai, hoặc do binding hai chiều từ bên ngoài) — nếu vậy, rơi về tab enabled đầu tiên để
  // luôn có đúng một tab dùng được bằng bàn phím (roving tabindex không bao giờ "mất tích"
  // hết — cùng bài học với bug đã sửa ở GRadioGroup.isFirst/hasCheckedRadio).
  protected readonly activeIndex = computed(() => {
    const tabs = this.tabs();
    if (tabs.length === 0) return -1;
    const sel = this.selectedIndex();
    if (sel >= 0 && sel < tabs.length && !tabs[sel].disabled()) return sel;
    return tabs.findIndex((t) => !t.disabled());
  });

  protected tabId(index: number): string {
    return `${this.idPrefix}-${index}`;
  }

  protected panelId(index: number): string {
    return `${this.panelIdPrefix}-${index}`;
  }

  protected select(index: number): void {
    const tab = this.tabs()[index];
    if (!tab || tab.disabled()) return;
    this.selectedIndex.set(index);
  }

  protected onKeydown(event: KeyboardEvent, index: number): void {
    const enabledIndices = this.tabs()
      .map((tab, i) => (tab.disabled() ? -1 : i))
      .filter((i) => i !== -1);
    if (enabledIndices.length === 0) return;

    let targetIndex: number;
    switch (event.key) {
      case 'ArrowRight':
        targetIndex = this.stepEnabledIndex(enabledIndices, index, 1);
        break;
      case 'ArrowLeft':
        targetIndex = this.stepEnabledIndex(enabledIndices, index, -1);
        break;
      case 'Home':
        targetIndex = enabledIndices[0];
        break;
      case 'End':
        targetIndex = enabledIndices[enabledIndices.length - 1];
        break;
      default:
        return;
    }

    event.preventDefault();
    this.selectedIndex.set(targetIndex);
    this.focusTab(targetIndex);
  }

  // Cùng cách GRadioGroup.moveSelection đã làm (và đã sửa bug bỏ qua disabled): chỉ xét
  // các tab enabled, tìm vị trí hiện tại trong danh sách đó rồi dịch theo direction có vòng lại.
  private stepEnabledIndex(
    enabledIndices: number[],
    currentIndex: number,
    direction: 1 | -1,
  ): number {
    const pos = enabledIndices.indexOf(currentIndex);
    const basePos = pos === -1 ? 0 : pos;
    const nextPos = (basePos + direction + enabledIndices.length) % enabledIndices.length;
    return enabledIndices[nextPos];
  }

  private focusTab(index: number): void {
    const buttons =
      this.elementRef.nativeElement.querySelectorAll<HTMLButtonElement>('[role="tab"]');
    buttons[index]?.focus();
  }
}
