import { AlertComponent } from './../_components/alert.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { FieldErrorDisplayComponent } from './field-error-display/field-error-display.component';
import { ContainsPipe } from '../contains.pipe';


@NgModule({
  declarations: [
    FooterComponent,
    SidebarComponent,
    NavbarComponent,
    FieldErrorDisplayComponent,
    ContainsPipe,
    AlertComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    FooterComponent,
    SidebarComponent,
    NavbarComponent,
    FieldErrorDisplayComponent,
    ContainsPipe,
    AlertComponent
  ]
})
export class SharedModule { }
