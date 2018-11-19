import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SiteComponent } from './site/site.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { PatientCreateComponent } from './patient-create/patient-create.component';
import { SiteDashboardComponent } from './site-dashboard/site-dashboard.component';
import { AuthGuard } from '../auth/auth.guard';

const siteRoutes: Routes = [
  {
    path: 'site',
    component: SiteComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        children: [
          {
            path: 'patients', component: PatientListComponent
          },
          { path: 'patient/new', component: PatientCreateComponent},
          {path: 'dashboard', component: SiteDashboardComponent},
          { path: '', component: SiteDashboardComponent},
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(siteRoutes)],
  exports: [RouterModule]
})
export class SiteRoutingModule { }
