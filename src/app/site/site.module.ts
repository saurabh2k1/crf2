

import { ButtonComponent } from './../components/button/button.component';
import { CheckboxComponent } from './../components/checkbox/checkbox.component';
import { DateComponent } from './../components/date/date.component';
import { UnitComponent } from './../components/unit/unit.component';
import { SelectComponent } from './../components/select/select.component';
import { RadiobuttonComponent } from './../components/radiobutton/radiobutton.component';
import { InputComponent } from './../components/input/input.component';
import { DynamicFormComponent } from './../components/dynamic-form/dynamic-form.component';
import { DynamicFieldDirective } from './../components/dynamic-field/dynamic-field.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SiteRoutingModule } from './site-routing.module';
import { SiteDashboardComponent } from './site-dashboard/site-dashboard.component';
import { PatientCreateComponent } from './patient-create/patient-create.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { SiteComponent } from './site/site.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material.module';
import { SelectStudyComponent } from './select-study/select-study.component';
import { VisitsComponent } from './visits/visits.component';
import { ProfileComponent } from './profile/profile.component';
import { Visit1Component } from './visit1/visit1.component';
import { SaeComponent } from './sae/sae.component';
import { MedicalHistoryComponent } from './medical-history/medical-history.component';
import { ConcoComponent } from './conco/conco.component';



@NgModule({
  declarations: [
    SiteDashboardComponent,
    PatientCreateComponent,
    PatientListComponent,
    SiteComponent,
    SelectStudyComponent,
    VisitsComponent,
    ProfileComponent,
    Visit1Component,
    SaeComponent,
    MedicalHistoryComponent,
    ConcoComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MaterialModule,
    SiteRoutingModule
  ],
})
export class SiteModule { }
