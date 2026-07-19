import { version } from '../package.json';
import { OPENDESIGN_VERSION } from './public-api';

describe('public-api', () => {
  // Đọc version động từ package.json thay vì hardcode → không phải sửa tay test này mỗi lần bump version.
  it('OPENDESIGN_VERSION khớp version trong package.json', () => {
    expect(OPENDESIGN_VERSION).toBe(version);
  });
});
