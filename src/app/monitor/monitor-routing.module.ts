import { AuthGuard } from './../auth/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MonitorComponent } from './monitor/monitor.component';
import { MonitorDashboardComponent } from './monitor-dashboard/monitor-dashboard.component';
import { Role } from '../models/role';

const monitorRoutes: Routes = [
  {
    path: 'monitor',
    component: MonitorComponent,
    children: [
      {
        path: 'dashboard', component: MonitorDashboardComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(monitorRoutes)],
  exports: [RouterModule]
})
export class MonitorRoutingModule { }
