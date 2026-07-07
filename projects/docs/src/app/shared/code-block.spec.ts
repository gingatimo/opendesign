import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { CodeBlock } from './code-block';

describe('CodeBlock', () => {
  function setup() {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    const fixture = TestBed.createComponent(CodeBlock);
    fixture.componentRef.setInput('src', 'demo-sources/button/button-basic.demo.ts');
    fixture.detectChanges();
    const http = TestBed.inject(HttpTestingController);
    return { fixture, http };
  }

  it('fetch source từ src và render vào <code>', async () => {
    const { fixture, http } = setup();
    http.expectOne('demo-sources/button/button-basic.demo.ts').flush('const x = 1;');
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    const code: HTMLElement = fixture.nativeElement.querySelector('code');
    expect(code.textContent).toContain('const x = 1;');
  });

  it('nút copy ghi source vào clipboard và báo Đã copy', async () => {
    const { fixture, http } = setup();
    http.expectOne('demo-sources/button/button-basic.demo.ts').flush('const x = 1;');
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('.docs-code-block__copy');
    button.click();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(writeText).toHaveBeenCalledWith('const x = 1;');
    expect(button.textContent).toContain('Đã copy');
  });

  it('fetch lỗi: không crash, hiện thông báo fallback, và src đổi sau đó vẫn fetch lại được', async () => {
    const { fixture, http } = setup();

    expect(() => {
      http.expectOne('demo-sources/button/button-basic.demo.ts').flush('không tìm thấy', {
        status: 404,
        statusText: 'Not Found',
      });
      fixture.detectChanges();
    }).not.toThrow();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('code').textContent).toContain(
      'Không tải được mã nguồn.',
    );

    fixture.componentRef.setInput('src', 'demo-sources/button/button-loading.demo.ts');
    fixture.detectChanges();
    http.expectOne('demo-sources/button/button-loading.demo.ts').flush('const y = 2;');
    await fixture.whenStable();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('code').textContent).toContain('const y = 2;');
  });

  it('nguồn chứa HTML nguy hiểm bị hljs escape nên không tạo phần tử thật trong DOM', async () => {
    const { fixture, http } = setup();
    http
      .expectOne('demo-sources/button/button-basic.demo.ts')
      .flush('<img src=x onerror="alert(1)">');
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const code: HTMLElement = fixture.nativeElement.querySelector('code');
    expect(code.querySelector('img')).toBeNull();
    expect(code.innerHTML).toContain('&lt;img');
    expect(code.textContent).toContain('<img src=x onerror="alert(1)">');
  });

  describe('[code] inline (snippet không đến từ file demo)', () => {
    function setupInline(code: string, language = 'bash') {
      TestBed.configureTestingModule({
        providers: [provideHttpClient(), provideHttpClientTesting()],
      });
      const fixture = TestBed.createComponent(CodeBlock);
      fixture.componentRef.setInput('code', code);
      fixture.componentRef.setInput('language', language);
      fixture.detectChanges();
      const http = TestBed.inject(HttpTestingController);
      return { fixture, http };
    }

    it('render code inline và KHÔNG gọi HTTP (không có src để fetch)', () => {
      const { fixture, http } = setupInline('npm install ngx-opendesign @angular/cdk');
      const code: HTMLElement = fixture.nativeElement.querySelector('code');
      expect(code.textContent).toContain('npm install ngx-opendesign @angular/cdk');
      // Không có src -> tuyệt đối không được phát request nào.
      http.verify();
    });

    it('nút copy ghi đúng code inline vào clipboard', async () => {
      const { fixture } = setupInline('npm install ngx-opendesign @angular/cdk');
      const writeText = vi.fn().mockResolvedValue(undefined);
      Object.assign(navigator, { clipboard: { writeText } });
      const button: HTMLButtonElement =
        fixture.nativeElement.querySelector('.docs-code-block__copy');
      button.click();
      await fixture.whenStable();
      fixture.detectChanges();
      expect(writeText).toHaveBeenCalledWith('npm install ngx-opendesign @angular/cdk');
    });

    it('code inline chứa HTML cũng bị hljs escape, giữ nguyên bất biến an toàn', () => {
      const { fixture } = setupInline('<img src=x onerror="alert(1)">', 'xml');
      const code: HTMLElement = fixture.nativeElement.querySelector('code');
      // Bất biến thật: không có phần tử <img> SỐNG nào được tạo ra.
      expect(code.querySelector('img')).toBeNull();
      // Với language='xml', hljs tách token nên chèn <span> vào giữa '&lt;' và 'img' —
      // không assert chuỗi '&lt;img' liền mạch như test của nhánh src (dùng typescript).
      expect(code.innerHTML).toContain('&lt;');
      expect(code.textContent).toBe('<img src=x onerror="alert(1)">');
    });
  });
});
