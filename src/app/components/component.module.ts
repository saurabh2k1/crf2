import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { UnitComponent } from './unit/unit.component';
import { ButtonComponent } from './button/button.component';
import { SelectComponent } from './select/select.component';
import { DateComponent } from './date/date.component';
import { RadiobuttonComponent } from './radiobutton/radiobutton.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { DynamicFieldDirective } from './dynamic-field/dynamic-field.directive';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
@NgModule({
  declarations: [
    InputComponent,
    UnitComponent,
    ButtonComponent,
    SelectComponent,
    DateComponent,
    RadiobuttonComponent,
    CheckboxComponent,
    DynamicFieldDirective,
    DynamicFormComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  entryComponents: [
    InputComponent,
    ButtonComponent,
    SelectComponent,
    DateComponent,
    RadiobuttonComponent,
    CheckboxComponent,
    UnitComponent
  ]
})
export class ComponentModule { }
