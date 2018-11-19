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

@NgModule({
  declarations: [
    SiteDashboardComponent,
    PatientCreateComponent,
    PatientListComponent,
    SiteComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MaterialModule,
    SiteRoutingModule
  ]
})
export class SiteModule { }
