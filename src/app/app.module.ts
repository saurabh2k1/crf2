
import { MonitorModule } from './monitor/monitor.module';
import { LoaderInterceptorService } from './helpers/loader-interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MaterialModule } from './material.module';
import { ToastrModule } from 'ngx-toastr';

import { SiteModule } from './site/site.module';
import { CommonModule } from '@angular/common';
import { SharedModule } from './shared/shared.module';
import { AdminModule } from './admin/admin.module';
import { JwtInterceptor } from './helpers/jwt-interceptor';
import { ErrorInterceptor } from './helpers/error-interceptor';
import { HomeComponent } from './home/home.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { FieldEditComponent } from './_components/field-edit/field-edit.component';
import { LoaderService } from './_services/loader.service';
import { TimeoutService } from './_services/timeout.service';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ResetPasswordComponent,
    HomeComponent,
    ChangePasswordComponent,
    LoaderComponent,
    FieldEditComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    SharedModule,
    SiteModule,
    AdminModule,
    AppRoutingModule,
    MonitorModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center',
      closeButton: true,
    }),
  ],
  providers: [ LoaderService, TimeoutService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptorService, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  entryComponents: [FieldEditComponent]
})
export class AppModule { }
