import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin/admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ManageSiteComponent } from './manage-site/manage-site.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material.module';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { StudiesComponent } from './studies/studies.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManageVisitComponent } from './manage-visit/manage-visit.component';
import { CrfsComponent } from './crfs/crfs.component';
import { CrfDetailComponent } from './crf-detail/crf-detail.component';
import { CrfAddComponent } from './crf-add/crf-add.component';
import { CrfEditComponent } from './crf-edit/crf-edit.component';
import { ChangePasswordModalComponent } from './change-password-modal/change-password-modal.component';
import { CrfDisplayComponent } from './crf-display/crf-display.component';



@NgModule({
  declarations: [
    AdminComponent,
    AdminDashboardComponent,
    ManageSiteComponent,
    ManageUsersComponent,
    AdminSidebarComponent,
    AdminNavbarComponent,
    StudiesComponent,
    ManageVisitComponent,
    CrfsComponent,
    CrfDetailComponent,
    CrfAddComponent,
    CrfEditComponent,
    ChangePasswordModalComponent,
    CrfDisplayComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MaterialModule,
    AdminRoutingModule
  ],
  entryComponents: [ChangePasswordModalComponent, CrfDisplayComponent]
})
export class AdminModule { }
