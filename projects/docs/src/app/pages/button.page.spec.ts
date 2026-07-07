import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import ButtonPage from './button.page';

describe('ButtonPage', () => {
  it('render demo sống, code block và bảng API', () => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    const fixture = TestBed.createComponent(ButtonPage);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('h1')?.textContent).toContain('Button');
    expect(el.querySelector('docs-button-basic-demo')).toBeTruthy();
    expect(el.querySelector('docs-code-block')).toBeTruthy();
    expect(el.querySelector('docs-api-table')).toBeTruthy();
  });
});
