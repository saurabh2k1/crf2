import { Injectable } from '@angular/core';
import { Observable, Subject, fromEvent, merge, timer } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TimeoutService {

  private idle$: Observable<any>;
  private timer$;
  private timeOut: number;
  private idleSubscription;

  public expired$: Subject<boolean> = new Subject<boolean>();

  constructor() { }

  public startWatching(timeOutSeconds): Observable<any> {
    this.idle$  = merge(
      fromEvent(document, 'mousemove'),
      fromEvent(document, 'click'),
      fromEvent(document, 'mousedown'),
      fromEvent(document, 'keypress'),
      fromEvent(document, 'DOMMouseScroll'),
      fromEvent(document, 'mousewheel'),
      fromEvent(document, 'touchmove'),
      fromEvent(document, 'MSPointerMove'),
      fromEvent(document, 'resize'),
      );

    this.timeOut = timeOutSeconds * 1000;
    this.idleSubscription = this.idle$.subscribe((res) => {
      this.resetTimer();
    });

    this.startTime();
    return this.expired$;

  }

  public startTime() {
    
    this.timer$ = timer(this.timeOut, this.timeOut).subscribe((res) => {
      this.expired$.next(true);
    });
  }

  public resetTimer() {
    this.timer$.unsubscribe();
    this.startTime();
  }

  public stopTimer() {
    this.timer$.unsubscribe();
    this.idleSubscription.unsubscribe();
  }
}
