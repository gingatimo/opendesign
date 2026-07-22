import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { GLocaleService, gLocaleEn, gLocaleVi, provideGLocale } from 'ngx-opendesign';
import AlertPage from './alert.page';
import AvatarPage from './avatar.page';
import BadgePage from './badge.page';
import CardPage from './card.page';
import CarouselPage from './carousel.page';
import ChipPage from './chip.page';
import CoverflowPage from './coverflow.page';
import DividerPage from './divider.page';
import GalleryPage from './gallery.page';
import IconPage from './icon.page';
import ImagePreviewPage from './image-preview.page';
import ImageSliderPage from './image-slider.page';
import MediaPlayerPage from './media-player.page';
import ProgressPage from './progress.page';
import SkeletonPage from './skeleton.page';
import SpinnerPage from './spinner.page';
import TerminalPage from './terminal.page';
import TimelinePage from './timeline.page';

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

describe('display pages i18n', () => {
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

  it('dịch trang Alert và demo sang tiếng Anh', () => {
    const text = renderEn(AlertPage).textContent ?? '';

    expect(text).toContain('Inline block notification');
    expect(text).toContain('Saved');
    expect(text).toContain('Server returned a 500 error.');
    expect(text).toContain('Visual severity.');
    expect(text).not.toContain('Máy chủ trả về lỗi 500');
  });

  it('dịch trang Badge và demo sang tiếng Anh', () => {
    const text = renderEn(BadgePage).textContent ?? '';

    expect(text).toContain('Small pill label');
    expect(text).toContain('Success');
    expect(text).toContain('Error');
    expect(text).toContain('Visual tone of the badge.');
    expect(text).not.toContain('Thành công');
  });

  it('dịch trang Spinner và aria-label demo sang tiếng Anh', () => {
    const el = renderEn(SpinnerPage);
    const text = el.textContent ?? '';

    expect(text).toContain('Circular loading indicator');
    expect(el.querySelector('g-spinner[aria-label="Loading product list"]')).toBeTruthy();
    expect(text).toContain('Spinner size');
    expect(text).not.toContain('Đang tải danh sách sản phẩm');
  });

  it('dịch trang Progress và demo sang tiếng Anh', () => {
    const el = renderEn(ProgressPage);
    const text = el.textContent ?? '';

    expect(text).toContain('Progress indicators');
    expect(text).toContain('seconds');
    expect(el.querySelector('g-progress[aria-label="Upload progress"]')).toBeTruthy();
    expect(el.querySelector('g-progress-circle[aria-label="Countdown"]')).toBeTruthy();
    expect(text).toContain('Diameter of the circle');
    expect(text).not.toContain('giây');
  });

  it('dịch trang Skeleton sang tiếng Anh', () => {
    const text = renderEn(SkeletonPage).textContent ?? '';

    expect(text).toContain('Placeholder loading state');
    expect(text).toContain('Shape of the placeholder block.');
    expect(text).toContain('prefers-reduced-motion');
    expect(text).not.toContain('Khối placeholder');
  });

  it('dịch trang Timeline và demo sang tiếng Anh', () => {
    const text = renderEn(TimelinePage).textContent ?? '';

    expect(text).toContain('Vertical event timeline');
    expect(text).toContain('Order placed');
    expect(text).toContain('Shipment delayed');
    expect(text).toContain('A timeline event');
    expect(text).not.toContain('Đặt hàng thành công');
  });

  it('dịch trang Chip và demo sang tiếng Anh', () => {
    const el = renderEn(ChipPage);
    const text = el.textContent ?? '';

    expect(text).toContain('Small removable pill label');
    expect(text).toContain('Design');
    expect(text).toContain('Cannot remove');
    expect(el.querySelector('button[aria-label="Remove Angular"]')).toBeTruthy();
    expect(text).not.toContain('Không xóa được');
  });

  it('dịch trang Avatar và demo sang tiếng Anh', () => {
    const el = renderEn(AvatarPage);
    const text = el.textContent ?? '';

    expect(text).toContain('User avatar');
    expect(el.querySelector('g-avatar[aria-label="Alex Nguyen"]')).toBeTruthy();
    expect(text).toContain('User name used to derive initials');
    expect(text).not.toContain('Nguyễn Văn An');
  });

  it('dịch trang Card và demo sang tiếng Anh', () => {
    const text = renderEn(CardPage).textContent ?? '';

    expect(text).toContain('Content surface');
    expect(text).toContain('Account information');
    expect(text).toContain('Marks the card header section');
    expect(text).not.toContain('Thông tin tài khoản');
  });

  it('dịch trang Icon và demo sang tiếng Anh', () => {
    const text = renderEn(IconPage).textContent ?? '';

    expect(text).toContain('Tree-shakable icon set');
    expect(text).toContain('Complete icon set');
    expect(text).toContain('Click a cell to copy the name');
    expect(text).toContain('Required.');
    expect(text).not.toContain('Toàn bộ icon set');
  });

  it('dịch trang Image Preview sang tiếng Anh', () => {
    const text = renderEn(ImagePreviewPage).textContent ?? '';

    expect(text).toContain('Thumbnail grid for image lists');
    expect(text).toContain('Each thumbnail is a');
    expect(text).toContain('Emits when the remove button is pressed');
    expect(text).not.toContain('Lưới thumbnail');
  });

  it('dịch trang Image Slider sang tiếng Anh', () => {
    const text = renderEn(ImageSliderPage).textContent ?? '';

    expect(text).toContain('One-image-per-frame slider');
    expect(text).toContain('Previous image');
    expect(text).toContain('Clicking the active image opens');
    expect(text).not.toContain('Ảnh trước');
  });

  it('dịch trang Carousel và demo sang tiếng Anh', () => {
    const text = renderEn(CarouselPage).textContent ?? '';

    expect(text).toContain('Horizontal carousel for any content');
    expect(text).toContain('Equal-size items');
    expect(text).toContain('Credit card');
    expect(text).toContain('Where prev/next buttons are placed.');
    expect(text).not.toContain('Item cùng kích thước');
  });

  it('dịch trang Coverflow và demo sang tiếng Anh', () => {
    const text = renderEn(CoverflowPage).textContent ?? '';

    expect(text).toContain('Focused carousel');
    expect(text).toContain('Same-size cards');
    expect(text).toContain('Active card index');
    expect(text).not.toContain('Card cùng kích thước');
  });

  it('dịch trang Gallery và nhãn ảnh demo sang tiếng Anh', () => {
    const el = renderEn(GalleryPage);
    const text = el.textContent ?? '';

    expect(text).toContain('Product-style image gallery');
    expect(el.querySelector('img[alt="Image 1"]')).toBeTruthy();
    expect(text).toContain('String URL or File');
    expect(text).not.toContain('Ảnh 1');
  });

  it('dịch trang Media Player sang tiếng Anh', () => {
    const text = renderEn(MediaPlayerPage).textContent ?? '';

    expect(text).toContain('Branded wrapper around native');
    expect(text).toContain('Play/Pause');
    expect(text).toContain('Public sample files');
    expect(text).not.toContain('Trình phát bọc');
  });

  it('dịch trang Terminal và demo sang tiếng Anh', () => {
    const text = renderEn(TerminalPage).textContent ?? '';

    expect(text).toContain('Simulated command-line window');
    expect(text).toContain('Try typing a command');
    expect(text).toContain('Emits the command string');
    expect(text).not.toContain('Thử gõ một lệnh');
  });

  it('dịch trang Divider và demo sang tiếng Anh', () => {
    const text = renderEn(DividerPage).textContent ?? '';

    expect(text).toContain('Separator line between content blocks');
    expect(text).toContain('Content above.');
    expect(text).toContain('OR');
    expect(text).toContain('Line orientation.');
    expect(text).not.toContain('Đoạn nội dung phía trên');
  });
});
