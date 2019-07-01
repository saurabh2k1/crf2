import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonitorRoutingModule } from './monitor-routing.module';
import { MonitorComponent } from './monitor/monitor.component';
import { MonitorDashboardComponent } from './monitor-dashboard/monitor-dashboard.component';
import { LayoutModule } from '@angular/cdk/layout';
import { SharedModule } from '../shared/shared.module';
import { MonitorNavbarComponent } from './monitor-navbar/monitor-navbar.component';
import { MonitorSidebarComponent } from './monitor-sidebar/monitor-sidebar.component';
import { SelectStudyComponent } from './select-study/select-study.component';
import { SitePageComponent } from './site-page/site-page.component';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    MonitorComponent,
    MonitorDashboardComponent,
    MonitorNavbarComponent,
    MonitorSidebarComponent,
    SelectStudyComponent,
    SitePageComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MaterialModule,
    LayoutModule,
    MonitorRoutingModule
  ]
})
export class MonitorModule { }
