import { OPENDESIGN_VERSION } from './public-api';

describe('public-api', () => {
  it('should export OPENDESIGN_VERSION', () => {
    expect(OPENDESIGN_VERSION).toBe('0.1.0');
  });
});
