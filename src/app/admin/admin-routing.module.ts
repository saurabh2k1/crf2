import { CrfDisplayComponent } from './crf-display/crf-display.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ManageSiteComponent } from './manage-site/manage-site.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { StudiesComponent } from './studies/studies.component';
import { AuthGuard } from '../auth/auth.guard';
import { Role } from '../models/role';
import { ManageVisitComponent } from './manage-visit/manage-visit.component';
import { CrfsComponent } from './crfs/crfs.component';
import { CrfDetailComponent } from './crf-detail/crf-detail.component';
import { CrfAddComponent } from './crf-add/crf-add.component';
import { CrfEditComponent } from './crf-edit/crf-edit.component';

const adminRoutes: Routes = [
  {
    path: 'admin', component: AdminComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.Admin]},
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          { path: 'users', component: ManageUsersComponent, data: {kind: 'list'}},
          { path: 'user/new', component: ManageUsersComponent, data: {kind: 'create'}},
          { path: 'users/edit/:id', component: ManageUsersComponent, data: {kind: 'edit'}},
          { path: 'sites', component: ManageSiteComponent, data: {kind: 'list'} },
          { path: 'site/new', component: ManageSiteComponent, data: {kind: 'create'}},
          { path: 'sites/edit/:id', component: ManageSiteComponent, data: {kind: 'edit'}},
          { path: 'visits', component: ManageVisitComponent, data: {kind: 'list'} },
          { path: 'visit/new', component: ManageVisitComponent, data: {kind: 'create'}},
          { path: 'visit/edit/:id', component: ManageVisitComponent, data: {kind: 'edit'}},
          { path: 'studies', component: StudiesComponent, data: {kind: 'list'} },
          { path: 'study/new', component: StudiesComponent, data: {kind: 'create'}},
          { path: 'studies/edit/:id', component: StudiesComponent, data: {kind: 'edit'}},
          { path: '', component: AdminDashboardComponent },
          { path: 'dashboard', component: AdminDashboardComponent},
          { path: 'crfs', component: CrfsComponent, data: { title: 'List of CRFs'}},
          { path: 'crf-details/:id', component: CrfDetailComponent, data: { title: 'CRF Details'}},
          { path: 'crf-add', component: CrfAddComponent, data: { title: 'Add CRF'}},
          { path: 'crf-edit/:id', component: CrfEditComponent, data: { title: 'Edit CRF'}},
          { path: 'crf/display/:id', component: CrfDisplayComponent},
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
