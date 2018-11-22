import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MaterialModule } from './material.module';

import { SiteModule } from './site/site.module';
import { CommonModule } from '@angular/common';
import { SharedModule } from './shared/shared.module';
import { AdminModule } from './admin/admin.module';
import { JwtInterceptor } from './helpers/jwt-interceptor';
import { ErrorInterceptor } from './helpers/error-interceptor';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ResetPasswordComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    MaterialModule,
    SharedModule,
    SiteModule,
    AdminModule,
    AppRoutingModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
