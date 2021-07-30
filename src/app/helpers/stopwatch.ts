import { NEVER, Observable, Observer, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

export function stopwatch(
  start: Observable<boolean>,
  pause: Observable<boolean>,
  fps: number
): Observable<number> {
  return new Observable((obs: Observer<number>) => {
    let i = 100;

    const runTimer = start.pipe(
      switchMap((start) => {
        if (start) return timer(0, 1000 / fps).pipe(map((_) => i++));
        i = 0;
        return NEVER;
      })
    );

    const p = pause.pipe(switchMap((paused) => (paused ? NEVER : runTimer)));

    return p.subscribe({
      next: (val) => obs.next(val),
      error: (err) => obs.error(err),
      complete: () => obs.complete(),
    });
  });
}
