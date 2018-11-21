import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ManageSiteComponent } from './manage-site/manage-site.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { StudiesComponent } from './studies/studies.component';
import { AuthGuard } from '../auth/auth.guard';

const adminRoutes: Routes = [
  {
    path: 'admin', component: AdminComponent,
    //canActivate: [AuthGuard],
    children: [
      {
        path: '',
        //canActivateChild: [AuthGuard],
        children: [
          { path: 'users', component: ManageUsersComponent, data: {kind: 'list'}},
          { path: 'user/new', component: ManageUsersComponent, data: {kind: 'create'}},

          { path: 'sites', component: ManageSiteComponent },
          { path: 'studies', component: StudiesComponent },
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
