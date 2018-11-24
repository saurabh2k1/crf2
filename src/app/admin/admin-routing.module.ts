import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ManageSiteComponent } from './manage-site/manage-site.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { StudiesComponent } from './studies/studies.component';
import { AuthGuard } from '../auth/auth.guard';
import { Role } from '../models/role';

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

          { path: 'sites', component: ManageSiteComponent, data: {kind: 'list'} },
          { path: 'site/new', component: ManageSiteComponent, data: {kind: 'create'}},
          { path: 'studies', component: StudiesComponent, data: {kind: 'list'} },
          { path: 'study/new', component: StudiesComponent, data: {kind: 'create'}},
          { path: '', component: AdminDashboardComponent },
          { path: 'dashboard', component: AdminDashboardComponent},
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
