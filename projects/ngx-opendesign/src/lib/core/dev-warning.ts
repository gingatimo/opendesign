declare const ngDevMode: boolean | undefined;

/** Cảnh báo misuse ở dev mode; no-op hoàn toàn ở production build. */
export function gDevWarning(context: string, message: string): void {
  if (typeof ngDevMode === 'undefined' || ngDevMode) {
    console.warn(`[OpenDesign] ${context}: ${message}`);
  }
}
