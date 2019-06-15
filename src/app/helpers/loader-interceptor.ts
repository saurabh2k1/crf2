import { HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { LoaderService } from './../_services/loader.service';
import { HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class LoaderInterceptorService implements HttpInterceptor {
    constructor(private loaderService: LoaderService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // this.showLoader();
        this.loaderService.show();
        // return next.handle(req).pipe(tap((event: HttpEvent<any>) => {
        //     if (event instanceof HttpResponse) {
        //         this.onEnd();
        //     }
        // }, (err: any) => {
        //     this.onEnd();
        // }));
        return next.handle(req).pipe(
          finalize(() => this.loaderService.hide())
        );
    }

    private onEnd(): void {
        this.hideLoader();
    }

    private showLoader(): void {
        this.loaderService.show();
    }

    private hideLoader(): void {
        this.loaderService.hide();
    }
}
