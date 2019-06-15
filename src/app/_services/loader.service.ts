import { LoaderState } from './../shared/loader/loader';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  // private loaderSubject = new Subject<LoaderState>();
  // loaderState = this.loaderSubject.asObservable();
  isLoading = new Subject<boolean>();

  constructor() { }

  show() {
    // this.loaderSubject.next(<LoaderState>{ show: true});
    this.isLoading.next(true);
  }

  hide() {
    // this.loaderSubject.next(<LoaderState>{ show: false});
    this.isLoading.next(false);
  }
}
