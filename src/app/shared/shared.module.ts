import { MaterialModule } from './../material.module';
import { CheckboxComponent } from './../components/checkbox/checkbox.component';
import { RadiobuttonComponent } from './../components/radiobutton/radiobutton.component';
import { DateComponent } from './../components/date/date.component';
import { ButtonComponent } from './../components/button/button.component';
import { InputComponent } from './../components/input/input.component';
import { DynamicFieldDirective } from './../components/dynamic-field/dynamic-field.directive';
import { DynamicFormComponent } from './../components/dynamic-form/dynamic-form.component';
import { AlertComponent } from './../_components/alert.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { FieldErrorDisplayComponent } from './field-error-display/field-error-display.component';
import { ContainsPipe } from '../contains.pipe';
import { SelectComponent } from '../components/select/select.component';
import { UnitComponent } from '../components/unit/unit.component';
import { ComponentModule } from './../components/component.module';
import { Navbar1Component } from './navbar1/navbar1.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { LabelComponent } from '../components/label/label.component';


@NgModule({
  declarations: [
    FooterComponent,
    SidebarComponent,
    NavbarComponent,
    FieldErrorDisplayComponent,
    ContainsPipe,
    AlertComponent,
    DynamicFormComponent,
    DynamicFieldDirective,
    ButtonComponent,
    CheckboxComponent,
    DateComponent,
    UnitComponent,
    SelectComponent,
    RadiobuttonComponent,
    InputComponent,
    LabelComponent,
    Navbar1Component,
    BreadcrumbComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    // ComponentModule
  ],
  exports: [
    FooterComponent,
    SidebarComponent,
    NavbarComponent,
    FieldErrorDisplayComponent,
    ContainsPipe,
    AlertComponent,
    DynamicFormComponent,
    DynamicFieldDirective,
    ButtonComponent,
    CheckboxComponent,
    DateComponent,
    UnitComponent,
    SelectComponent,
    RadiobuttonComponent,
    InputComponent,
    LabelComponent,
    Navbar1Component,
    BreadcrumbComponent
  ],
  entryComponents: [
    InputComponent,
    ButtonComponent,
    SelectComponent,
    DateComponent,
    RadiobuttonComponent,
    CheckboxComponent,
    UnitComponent,
    LabelComponent,
  ]
})
export class SharedModule { }
