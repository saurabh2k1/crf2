import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SiteComponent } from './site/site.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { PatientCreateComponent } from './patient-create/patient-create.component';
import { SiteDashboardComponent } from './site-dashboard/site-dashboard.component';
import { AuthGuard } from '../auth/auth.guard';
import { SelectStudyComponent } from './select-study/select-study.component';
import { VisitsComponent } from './visits/visits.component';

const siteRoutes: Routes = [
  {
    path: 'site',
    component: SiteComponent,
    // canActivate: [AuthGuard],
    children: [
      {
        path: '',
        children: [
          {
            path: 'patients', component: PatientListComponent
          },
          { path: 'patient/new', component: PatientCreateComponent, data: {kind: 'new'}},
          { path: 'patient/:id', component: PatientCreateComponent, data: {kind: 'edit'}},
          { path: 'visits', component: VisitsComponent},
          {path: 'dashboard', component: SiteDashboardComponent},
          { path: '', component: SelectStudyComponent},
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
