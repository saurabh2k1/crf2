import { AuthGuard } from './../auth/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MonitorComponent } from './monitor/monitor.component';
import { MonitorDashboardComponent } from './monitor-dashboard/monitor-dashboard.component';
import { Role } from '../models/role';
import { SelectStudyComponent } from './select-study/select-study.component';

const monitorRoutes: Routes = [
  {
    path: 'monitor',
    component: MonitorComponent,
    children: [
      {
        path: 'dashboard', component: MonitorDashboardComponent
      },
      {
        path: '', component: SelectStudyComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(monitorRoutes)],
  exports: [RouterModule]
})
export class MonitorRoutingModule { }
