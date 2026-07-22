import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { GLocaleService, gLocaleEn, gLocaleVi, provideGLocale } from 'ngx-opendesign';
import PlaybookChatbotPage from './chatbot.page';
import PlaybookCreatePage from './create.page';
import PlaybookDashboardPage from './dashboard.page';
import PlaybookDetailPage from './detail.page';
import PlaybookListPage from './list.page';
import PlaybookLoginPage from './login.page';
import PlaybookSplitWorkspacePage from './split-workspace.page';

class NoopResizeObserver {
  observe(): void {
    return undefined;
  }
  unobserve(): void {
    return undefined;
  }
  disconnect(): void {
    return undefined;
  }
}

function renderEn<T>(component: Type<T>): HTMLElement {
  const fixture = TestBed.createComponent(component);
  fixture.detectChanges();
  TestBed.inject(GLocaleService).use(gLocaleEn);
  fixture.detectChanges();
  return fixture.nativeElement as HTMLElement;
}

describe('playbook pages i18n', () => {
  beforeEach(() => {
    if (!globalThis.ResizeObserver) {
      Object.defineProperty(globalThis, 'ResizeObserver', {
        configurable: true,
        value: NoopResizeObserver,
      });
    }

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        provideGLocale(gLocaleVi),
      ],
    });
  });

  it('dịch Login và Dashboard sang tiếng Anh', () => {
    const login = renderEn(PlaybookLoginPage);
    const dashboard = renderEn(PlaybookDashboardPage);
    const loginText = login.textContent ?? '';
    const dashboardText = dashboard.textContent ?? '';

    expect(loginText).toContain('Minimal login screen');
    expect(loginText).toContain('Password');
    expect(loginText).toContain('Remember me');
    expect(loginText).toContain('Sign in');
    expect(loginText).not.toContain('Đăng nhập');

    expect(dashboardText).toContain('Complete dashboard layout');
    expect(dashboardText).toContain('Monthly revenue');
    expect(dashboardText).toContain('Orders');
    expect(dashboardText).toContain('Customers');
    expect(dashboard.querySelector('[aria-label="Notifications"]')).toBeTruthy();
    expect(dashboardText).not.toContain('Tổng quan');
  });

  it('dịch List và Detail sang tiếng Anh', () => {
    const list = renderEn(PlaybookListPage);
    const detailFixture = TestBed.createComponent(PlaybookDetailPage);
    detailFixture.detectChanges();
    TestBed.inject(GLocaleService).use(gLocaleEn);
    detailFixture.detectChanges();
    const detail = detailFixture.nativeElement as HTMLElement;
    const listText = list.textContent ?? '';
    const detailText = detail.textContent ?? '';

    expect(listText).toContain('Full list screen');
    expect(list.querySelector('input[placeholder="Search by name..."]')).toBeTruthy();
    expect(listText).toContain('Active');
    expect(listText).toContain('Engineering');
    expect(list.querySelector('button[aria-label="Edit"]')).toBeTruthy();
    expect(listText).not.toContain('Đang hoạt động');

    expect(detailText).toContain('Record detail screen');
    expect(detail.querySelector('[role="tablist"][aria-label="Employee details"]')).toBeTruthy();
    expect(detailText).toContain('Profile');
    const activityTab = Array.from(detail.querySelectorAll<HTMLButtonElement>('[role="tab"]')).find(
      (tab) => tab.textContent?.trim() === 'Activity',
    );
    activityTab?.click();
    detailFixture.detectChanges();
    expect(detail.textContent ?? '').toContain('Contract renewal reminder');
    expect(detailText).not.toContain('Thông tin');
  });

  it('dịch Create, Chatbot và Chat + Terminal sang tiếng Anh', () => {
    const create = renderEn(PlaybookCreatePage);
    const chatbot = renderEn(PlaybookChatbotPage);
    const workspace = renderEn(PlaybookSplitWorkspacePage);
    const createText = create.textContent ?? '';
    const chatbotText = chatbot.textContent ?? '';
    const workspaceText = workspace.textContent ?? '';

    expect(createText).toContain('Create record form');
    expect(createText).toContain('Add employee');
    expect(createText).toContain('Full name');
    expect(createText).toContain('Save employee');
    expect(create.querySelector('g-select[aria-label="Department"]')).toBeTruthy();
    expect(createText).not.toContain('Thêm nhân viên');

    expect(chatbotText).toContain('Interactive chat frame');
    expect(chatbotText).toContain('OpenDesign assistant');
    expect(chatbotText).toContain('Online');
    expect(chatbotText).toContain('Introduce OpenDesign');
    expect(chatbot.querySelector('input[aria-label="Message content"]')).toBeTruthy();
    expect(chatbotText).not.toContain('Trợ lý OpenDesign');

    expect(workspaceText).toContain('IDE-style layout');
    expect(workspaceText).toContain('OpenDesign assistant');
    expect(workspaceText).toContain('Build complete');
    expect(workspace.querySelector('input[placeholder="Ask something..."]')).toBeTruthy();
    expect(workspaceText).not.toContain('Hỏi gì đó');
  });
});
