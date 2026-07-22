import { vi } from 'vitest';
import { gDevWarning } from './dev-warning';

describe('gDevWarning', () => {
  it('cảnh báo console.warn với prefix [OpenDesign] ở dev mode', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    gDevWarning('GIconButton', 'missing aria-label');
    expect(warnSpy).toHaveBeenCalledWith('[OpenDesign] GIconButton: missing aria-label');
    warnSpy.mockRestore();
  });
});
