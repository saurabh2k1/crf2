import { LoaderService } from './../../_services/loader.service';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoaderState } from './../loader/loader';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit, OnDestroy {

  color = 'primary';
  mode = 'indeterminate';
  value = 70;
  isLoading: Subject<boolean> = this.loaderService.isLoading;
  show = false;

  private subscription: Subscription;

  constructor(private loaderService: LoaderService) { }

  ngOnInit() {
    // this.subscription = this.loaderService.loaderState.subscribe((state: LoaderState) => {
    //   this.show = state.show;
    // });
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }

}
