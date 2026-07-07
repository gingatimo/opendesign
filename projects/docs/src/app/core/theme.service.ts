import { DOCUMENT } from '@angular/common';
import { effect, inject, Injectable, signal } from '@angular/core';

export type DocsTheme = 'light' | 'dark';

const STORAGE_KEY = 'opendesign-theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly themeSignal = signal<DocsTheme>(this.readInitial());

  readonly theme = this.themeSignal.asReadonly();

  constructor() {
    effect(() => {
      const theme = this.themeSignal();
      const root = this.document.documentElement;
      if (theme === 'dark') {
        root.setAttribute('data-g-theme', 'dark');
      } else {
        root.removeAttribute('data-g-theme');
      }
      try {
        localStorage.setItem(STORAGE_KEY, theme);
      } catch {
        // localStorage có thể bị chặn (private mode) — bỏ qua, theme vẫn hoạt động trong phiên.
      }
    });
  }

  toggle(): void {
    this.themeSignal.update((t) => (t === 'light' ? 'dark' : 'light'));
  }

  private readInitial(): DocsTheme {
    try {
      return localStorage.getItem(STORAGE_KEY) === 'dark' ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  }
}
