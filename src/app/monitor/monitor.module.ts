import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonitorRoutingModule } from './monitor-routing.module';
import { MonitorComponent } from './monitor/monitor.component';
import { MonitorDashboardComponent } from './monitor-dashboard/monitor-dashboard.component';
import { MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule } from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { SharedModule } from '../shared/shared.module';
import { MonitorNavbarComponent } from './monitor-navbar/monitor-navbar.component';
import { MonitorSidebarComponent } from './monitor-sidebar/monitor-sidebar.component';
import { SelectStudyComponent } from './select-study/select-study.component';

@NgModule({
  declarations: [
    MonitorComponent,
    MonitorDashboardComponent,
    MonitorNavbarComponent,
    MonitorSidebarComponent,
    SelectStudyComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MonitorRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
  ]
})
export class MonitorModule { }
