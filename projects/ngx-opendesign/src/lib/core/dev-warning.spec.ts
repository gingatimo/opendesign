import { vi } from 'vitest';
import { gDevWarning } from './dev-warning';

describe('gDevWarning', () => {
  it('cảnh báo console.warn với prefix [OpenDesign] ở dev mode', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    gDevWarning('GIconButton', 'thiếu aria-label');
    expect(warnSpy).toHaveBeenCalledWith('[OpenDesign] GIconButton: thiếu aria-label');
    warnSpy.mockRestore();
  });
});
