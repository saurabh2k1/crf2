import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin.service';
import { User } from 'src/app/models/user';
import { ActivatedRoute } from '@angular/router';
import { MatListSubheaderCssMatStyler } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {

  users: User[] = [];
  showList = false;
  frmUser: FormGroup;
  constructor(private adminService: AdminService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder ) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => {
      switch (data.kind) {
        case 'list':
          this.listUser();
          this.showList = true;
          break;

        default:
          this.showList = false;
          break;
      }
    });

  }

  listUser() {
    this.adminService.getUsers().subscribe((user: User[]) => {
      this.users = user;
    });
  }

}
