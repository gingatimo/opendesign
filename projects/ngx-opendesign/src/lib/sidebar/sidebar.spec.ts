import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { vi } from 'vitest';
import { GTooltip } from '../tooltip/tooltip';
import { GSidebar, GSidebarFooter, GSidebarHeader } from './sidebar';
import { GSidebarItem, GSidebarItemIcon, GSidebarItemLabel } from './sidebar-item';
import { GSidebarToggle } from './sidebar-toggle';

// QUYẾT ĐỊNH THIẾT KẾ (xem báo cáo task-1-2-report.md, mục "collapsed"): chọn phương án (a) —
// yêu cầu consumer bọc nhãn chữ trong directive [gSidebarItemLabel]. Nhãn "Trang chủ" / "Cài đặt"
// trong sketch gốc của brief là text node trần — không có phần tử để CSS visually-hidden nhắm
// tới khi collapsed. Bọc trong span[gSidebarItemLabel] cho một điểm neo CSS ổn định, nhất quán
// với các directive slot đánh dấu khác đã có trong thư viện (GCardHeader, GTopbarStart, ...).
@Component({
  imports: [
    GSidebar,
    GSidebarHeader,
    GSidebarFooter,
    GSidebarItem,
    GSidebarItemIcon,
    GSidebarItemLabel,
  ],
  template: `
    <g-sidebar [(collapsed)]="collapsed">
      <div gSidebarHeader>OpenDesign</div>
      <a g-sidebar-item href="#trang-chu">
        <svg gSidebarItemIcon viewBox="0 0 24 24" aria-hidden="true"><path d="M3 12h18" /></svg>
        <span gSidebarItemLabel>Trang chủ</span>
      </a>
      <a g-sidebar-item href="#cai-dat" class="g-active">
        <svg gSidebarItemIcon viewBox="0 0 24 24" aria-hidden="true"><path d="M3 12h18" /></svg>
        <span gSidebarItemLabel>Cài đặt</span>
      </a>
      <div gSidebarFooter>v0.1.0</div>
    </g-sidebar>
  `,
})
class HostComponent {
  readonly collapsed = signal(false);
}

describe('GSidebar', () => {
  function setup() {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    const sidebar: HTMLElement = fixture.debugElement.query(By.directive(GSidebar)).nativeElement;
    const items = fixture.debugElement
      .queryAll(By.directive(GSidebarItem))
      .map((d) => d.nativeElement as HTMLElement);
    return { fixture, sidebar, items };
  }

  it('KHÔNG tự đặt role navigation (consumer tự bọc <nav> hoặc thêm role)', () => {
    const { sidebar } = setup();
    expect(sidebar.getAttribute('role')).toBeNull();
  });

  it('item dùng phần tử native <a>, giữ nguyên href', () => {
    const { items } = setup();
    expect(items[0].tagName).toBe('A');
    expect(items[0].getAttribute('href')).toBe('#trang-chu');
    expect(items[0].classList).toContain('g-sidebar-item');
  });

  it('chiếu header và footer', () => {
    const { sidebar } = setup();
    expect(sidebar.textContent).toContain('OpenDesign');
    expect(sidebar.textContent).toContain('v0.1.0');
  });

  it('collapsed=true: thêm class collapsed', () => {
    const { fixture, sidebar } = setup();
    fixture.componentInstance.collapsed.set(true);
    fixture.detectChanges();
    expect(sidebar.classList).toContain('g-sidebar--collapsed');
  });

  // Vạch active (mép trái, thay cho nền pill) hoàn toàn bằng CSS, nhắm theo tổ hợp class
  // .g-sidebar--collapsed .g-sidebar-item.g-active — jsdom không dựng layout nên không kiểm
  // được vạch có vẽ ra hay không (xem task-2-report.md, kiểm bằng trình duyệt thật), nhưng
  // kiểm được đúng hợp đồng class mà CSS đó nhắm tới: collapsed KHÔNG được gỡ g-active khỏi
  // item đang active.
  it('collapsed=true: item active vẫn giữ class g-active (CSS vạch mép trái nhắm vào tổ hợp này)', () => {
    const { fixture, items } = setup();
    fixture.componentInstance.collapsed.set(true);
    fixture.detectChanges();
    expect(items[1].classList).toContain('g-active');
  });

  it('QUAN TRỌNG — collapsed=true: item VẪN giữ nguyên accessible name (nhãn không bị xoá khỏi accessibility tree)', () => {
    const { fixture, items } = setup();
    fixture.componentInstance.collapsed.set(true);
    fixture.detectChanges();
    // Nhãn phải còn trong DOM (chỉ ẩn trực quan bằng kỹ thuật visually-hidden).
    // display:none / visibility:hidden sẽ xoá khỏi accessibility tree -> item mất tên.
    // LƯU Ý: jsdom không có accessibility-tree engine nên đây CHỈ chứng minh nhãn còn
    // trong DOM (không bị *ngIf/@if gỡ đi) — KHÔNG chứng minh accessible name thật sự
    // được trình đọc màn hình đọc ra. Việc đó cần kiểm bằng trình duyệt thật (Task 4).
    expect(items[0].textContent).toContain('Trang chủ');
    const label =
      items[0].querySelector('[gSidebarItemLabel]') ??
      items[0].querySelector('.g-sidebar-item__label');
    expect(label).not.toBeNull();
    expect(label?.textContent).toContain('Trang chủ');
  });

  it('collapsed=false: nhãn vẫn là phần tử bình thường trong DOM (không có gì phá vỡ khi mở lại)', () => {
    const { fixture, items } = setup();
    fixture.componentInstance.collapsed.set(true);
    fixture.detectChanges();
    fixture.componentInstance.collapsed.set(false);
    fixture.detectChanges();
    expect(items[0].textContent).toContain('Trang chủ');
  });

  // Thu gọn thì .g-sidebar__header bị ẩn TRỰC QUAN bằng CSS (kỹ thuật visually-hidden, cùng
  // rule với .g-sidebar-item__label) — KHÔNG display:none/*ngIf, nên header vẫn phải còn
  // nguyên trong DOM để trình đọc màn hình đọc được tên app. jsdom không nạp global
  // stylesheet nên không kiểm được rule CSS thật (xem kiểm trình duyệt thật ở report), nhưng
  // kiểm được đúng phần bắt buộc: header không bị gỡ khỏi DOM khi collapsed.
  it('QUAN TRỌNG — collapsed=true: header vẫn còn trong DOM (chỉ ẩn trực quan, không bị gỡ)', () => {
    const { fixture, sidebar } = setup();
    fixture.componentInstance.collapsed.set(true);
    fixture.detectChanges();
    const header = sidebar.querySelector('.g-sidebar__header');
    expect(header).not.toBeNull();
    expect(header?.textContent).toContain('OpenDesign');
  });
});

// Plan 9 Task 1: header + <g-sidebar-toggle /> nay chung một hàng .g-sidebar__top thay vì hai
// slot rời rạc (xem sidebar.ts). `<ng-content select="g-sidebar-toggle" />` chọn theo TÊN THẺ
// của component GSidebarToggle — không phải class/attribute như các slot khác trong thư viện
// (vd. [gSidebarHeader]) — nên cần test riêng xác nhận cơ chế này thực sự kéo được toggle vào
// đúng hàng, không chỉ dựa vào giả định Angular hỗ trợ selector kiểu này.
@Component({
  imports: [GSidebar, GSidebarHeader, GSidebarToggle],
  template: `
    <g-sidebar [(collapsed)]="collapsed">
      <div gSidebarHeader>OpenDesign</div>
      <g-sidebar-toggle />
    </g-sidebar>
  `,
})
class TopRowHostComponent {
  readonly collapsed = signal(false);
}

@Component({
  imports: [GSidebar, GSidebarToggle],
  template: `
    <g-sidebar [(collapsed)]="collapsed">
      <g-sidebar-toggle />
    </g-sidebar>
  `,
})
class ToggleOnlyHostComponent {
  readonly collapsed = signal(false);
}

describe('GSidebar — hàng top gộp header + toggle (Plan 9 Task 1)', () => {
  it('có header: cả header và <g-sidebar-toggle /> cùng nằm trong .g-sidebar__top', () => {
    const fixture = TestBed.createComponent(TopRowHostComponent);
    fixture.detectChanges();
    const sidebar: HTMLElement = fixture.debugElement.query(By.directive(GSidebar)).nativeElement;
    const top = sidebar.querySelector('.g-sidebar__top');
    expect(top).not.toBeNull();
    expect(top?.querySelector('.g-sidebar__header')).not.toBeNull();
    expect(top?.querySelector('g-sidebar-toggle')).not.toBeNull();
    // Toggle không còn nằm trong .g-sidebar__body (khác Plan 8 — trước đây nó là item đầu tiên
    // của body vì rơi vào <ng-content /> mặc định).
    expect(sidebar.querySelector('.g-sidebar__body g-sidebar-toggle')).toBeNull();
  });

  it('không có header: <g-sidebar-toggle /> vẫn rơi đúng vào .g-sidebar__top (top row chỉ chứa toggle)', () => {
    const fixture = TestBed.createComponent(ToggleOnlyHostComponent);
    fixture.detectChanges();
    const sidebar: HTMLElement = fixture.debugElement.query(By.directive(GSidebar)).nativeElement;
    const top = sidebar.querySelector('.g-sidebar__top');
    expect(top).not.toBeNull();
    expect(top?.querySelector('g-sidebar-toggle')).not.toBeNull();
  });
});

@Component({
  imports: [GSidebar, GSidebarItem, GSidebarItemLabel],
  template: `
    <g-sidebar [(collapsed)]="thuGon">
      <a g-sidebar-item href="#"
        ><span gSidebarItemLabel>{{ nhan() }}</span></a
      >
    </g-sidebar>
  `,
})
class TooltipHostComponent {
  readonly thuGon = signal(false);
  readonly nhan = signal('Trang chủ');
}

@Component({
  imports: [GSidebarItem, GSidebarItemLabel],
  template: `<a g-sidebar-item href="#"><span gSidebarItemLabel>Đơn lẻ</span></a>`,
})
class NgoaiSidebarItemHostComponent {}

@Component({
  imports: [GSidebar, GSidebarItem],
  template: `<g-sidebar [collapsed]="true"><a g-sidebar-item href="#">Không nhãn</a></g-sidebar>`,
})
class KhongNhanHostComponent {}

describe('GSidebarItem — tooltip tự động khi thu gọn', () => {
  afterEach(() => {
    document.querySelectorAll('[role="tooltip"]').forEach((el) => el.remove());
  });

  function hover(fixture: ComponentFixture<unknown>): void {
    const item: HTMLElement = fixture.debugElement.query(By.directive(GSidebarItem)).nativeElement;
    item.dispatchEvent(new MouseEvent('mouseenter'));
    fixture.detectChanges();
  }

  it('sidebar mở rộng: hover item KHÔNG hiện tooltip (nhãn đang hiện rồi)', () => {
    const fixture = TestBed.createComponent(TooltipHostComponent);
    fixture.detectChanges();
    hover(fixture);
    expect(document.querySelector('[role="tooltip"]')).toBeNull();
  });

  it('sidebar thu gọn: hover item hiện tooltip mang đúng text của nhãn', () => {
    const fixture = TestBed.createComponent(TooltipHostComponent);
    fixture.componentInstance.thuGon.set(true);
    fixture.detectChanges();
    hover(fixture);
    const tip = document.querySelector('[role="tooltip"]');
    expect(tip).not.toBeNull();
    expect(tip?.textContent).toContain('Trang chủ');
  });

  // Test này chính là cái chặn việc cache text lúc init: nhãn trong docs là interpolation động,
  // text node đổi giá trị thì không signal nào báo.
  it('nhãn đổi động: tooltip hiện text MỚI, không phải text cũ', () => {
    const fixture = TestBed.createComponent(TooltipHostComponent);
    fixture.componentInstance.thuGon.set(true);
    fixture.detectChanges();

    fixture.componentInstance.nhan.set('Cài đặt');
    fixture.detectChanges();

    hover(fixture);
    const tip = document.querySelector('[role="tooltip"]');
    expect(tip?.textContent).toContain('Cài đặt');
    expect(tip?.textContent).not.toContain('Trang chủ');
  });

  it('mở rộng lại sau khi thu gọn: hover KHÔNG còn hiện tooltip', () => {
    const fixture = TestBed.createComponent(TooltipHostComponent);
    fixture.componentInstance.thuGon.set(true);
    fixture.detectChanges();
    fixture.componentInstance.thuGon.set(false);
    fixture.detectChanges();
    hover(fixture);
    expect(document.querySelector('[role="tooltip"]')).toBeNull();
  });

  it('item ngoài <g-sidebar>: không hiện tooltip, không throw', () => {
    const fixture = TestBed.createComponent(NgoaiSidebarItemHostComponent);
    expect(() => fixture.detectChanges()).not.toThrow();
    hover(fixture);
    expect(document.querySelector('[role="tooltip"]')).toBeNull();
  });

  it('item không có gSidebarItemLabel: không hiện tooltip, không throw', () => {
    const fixture = TestBed.createComponent(KhongNhanHostComponent);
    expect(() => fixture.detectChanges()).not.toThrow();
    hover(fixture);
    expect(document.querySelector('[role="tooltip"]')).toBeNull();
  });
});

@Component({
  imports: [GSidebar, GSidebarItem, GSidebarItemLabel, GTooltip],
  template: `
    <g-sidebar [(collapsed)]="thuGon">
      <a g-sidebar-item href="#" gTooltip="Tooltip của tôi"
        ><span gSidebarItemLabel>Trang chủ</span></a
      >
    </g-sidebar>
  `,
})
class TuGanGTooltipHostComponent {
  readonly thuGon = signal(false);
}

// Khoá lại hành vi v1: gTooltip tự gắn lên g-sidebar-item PHẢI còn dùng được — GSidebarItem
// mang GTooltip qua hostDirectives để tự cấp text khi collapsed, nhưng điều đó không được
// nuốt mất giá trị gTooltip mà chính consumer truyền vào.
describe('GSidebarItem — tự gắn gTooltip (khôi phục hành vi v1)', () => {
  afterEach(() => {
    document.querySelectorAll('[role="tooltip"]').forEach((el) => el.remove());
  });

  function hover(fixture: ComponentFixture<unknown>): void {
    const item: HTMLElement = fixture.debugElement.query(By.directive(GSidebarItem)).nativeElement;
    item.dispatchEvent(new MouseEvent('mouseenter'));
    fixture.detectChanges();
  }

  it('sidebar mở rộng: hover hiện tooltip với text từ gTooltip tự gắn', () => {
    const fixture = TestBed.createComponent(TuGanGTooltipHostComponent);
    fixture.detectChanges();
    hover(fixture);
    const tip = document.querySelector('[role="tooltip"]');
    expect(tip).not.toBeNull();
    expect(tip?.textContent).toContain('Tooltip của tôi');
  });

  it('sidebar thu gọn: text gTooltip tự gắn vẫn thắng — không bị nhãn item ghi đè', () => {
    const fixture = TestBed.createComponent(TuGanGTooltipHostComponent);
    fixture.componentInstance.thuGon.set(true);
    fixture.detectChanges();
    hover(fixture);
    const tip = document.querySelector('[role="tooltip"]');
    expect(tip).not.toBeNull();
    expect(tip?.textContent).toContain('Tooltip của tôi');
    expect(tip?.textContent).not.toContain('Trang chủ');
  });
});

// Sidebar dọc, hẹp khi thu gọn: tooltip phải xổ sang PHẢI, không xổ lên trên (mặc định
// GTooltip) — xổ lên trên sẽ chồng lên item liền kề trong danh sách dọc (xem sidebar-item.ts).
describe('GSidebarItem — tooltip xổ sang phải (sidebar dọc)', () => {
  it('constructor gọi gTooltipSetPosition("right") trên GTooltip mang qua hostDirectives', () => {
    const spy = vi.spyOn(GTooltip.prototype, 'gTooltipSetPosition');
    const fixture = TestBed.createComponent(TooltipHostComponent);
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith('right');
  });
});
