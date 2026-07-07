import { computed, Signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { catchError, Observable, of, switchMap } from 'rxjs';

export function derivedAsync<TIn, TOut>(
  sourceInput: () => TIn,
  load: (value: TIn) => Observable<TOut>,
  initial: TOut,
): Signal<TOut> {
  const input$ = toObservable(computed(sourceInput));
  return toSignal(
    input$.pipe(switchMap((value) => load(value).pipe(catchError(() => of(initial))))),
    { initialValue: initial },
  );
}
