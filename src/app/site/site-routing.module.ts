import { ProfileComponent } from './profile/profile.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SiteComponent } from './site/site.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { PatientCreateComponent } from './patient-create/patient-create.component';
import { SiteDashboardComponent } from './site-dashboard/site-dashboard.component';
import { AuthGuard } from '../auth/auth.guard';
import { SelectStudyComponent } from './select-study/select-study.component';
import { VisitsComponent } from './visits/visits.component';
import { Role } from '../models/role';

const siteRoutes: Routes = [
  {
    path: 'site',
    component: SiteComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.User], breadcrumb: 'Home'},
    children: [
      {
        path: '',
        children: [
          {
            path: 'patients', component: PatientListComponent, data: {breadcrumb: 'Subject'},
          },
          { path: 'patient/new', component: PatientCreateComponent, data: {kind: 'new', breadcrumb: 'New'}},
          { path: 'patient/:id', component: PatientCreateComponent, data: {kind: 'edit', breadcrumb: 'Edit'}},
          { path: 'visits', component: VisitsComponent},
          { path: 'profile', component: ProfileComponent},
          {path: 'dashboard', component: SiteDashboardComponent, data: {breadcrumb: 'Dashboard'}},
          { path: '', component: SelectStudyComponent, data: {breadcrumb: 'Study'}},
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
