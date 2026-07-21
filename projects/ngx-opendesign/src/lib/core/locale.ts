import {
  computed,
  EnvironmentProviders,
  inject,
  Injectable,
  InjectionToken,
  makeEnvironmentProviders,
  signal,
} from '@angular/core';
import { GLocale } from './locale-types';
import { gLocaleEn } from '../locales/en';

/** Gói ngôn ngữ lúc khởi tạo. Mặc định tiếng Anh; đổi bằng provideGLocale ở appConfig. */
export const G_LOCALE = new InjectionToken<GLocale>('G_LOCALE', {
  providedIn: 'root',
  factory: () => gLocaleEn,
});

export function provideGLocale(locale: GLocale): EnvironmentProviders {
  return makeEnvironmentProviders([{ provide: G_LOCALE, useValue: locale }]);
}

@Injectable({ providedIn: 'root' })
export class GLocaleService {
  // Signal chứ không phải hằng số: đổi ngôn ngữ lúc chạy là yêu cầu, mà thư viện đã OnPush toàn bộ nên
  // gán lại signal là mọi view tự vẽ lại — không cần cơ chế thông báo riêng.
  readonly locale = signal<GLocale>(inject(G_LOCALE));

  readonly strings = computed(() => this.locale().strings);
  readonly tag = computed(() => this.locale().tag);
  readonly firstDayOfWeek = computed(() => this.locale().firstDayOfWeek);

  use(locale: GLocale): void {
    this.locale.set(locale);
  }
}
