import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin.service';
import { User } from 'src/app/models/user';
import { ActivatedRoute } from '@angular/router';
import { MatListSubheaderCssMatStyler } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Site } from 'src/app/models/site';
import { getMatScrollStrategyAlreadyAttachedError } from '@angular/cdk/overlay/typings/scroll/scroll-strategy';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {

  users: User[] = [];
  sites: Site[] = [];
  roles: any[] = [];
  showList = false;
  showNew = false;
  frmUser: FormGroup;
  constructor(private adminService: AdminService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder ) { }

  ngOnInit() {
    this.frmUser = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      site_id: [''],
      role_id: [''],
    });
    this.getSites();
    this.getRoles();
    this.activatedRoute.data.subscribe(data => {
      switch (data.kind) {
        case 'list':
          this.showNew = false;
          this.listUser();
          this.showList = true;
          break;

        default:
          this.showList = false;
          this.showNew = true;
          break;
      }
    });

  }

  listUser() {
    this.adminService.getUsers().subscribe((user: User[]) => {
      this.users = user;
    });
  }

  getSites() {
    this.adminService.getSites().subscribe((site: any) => {
      this.sites = site;
    });
  }

  getRoles() {
    this.adminService.getRoles().subscribe(role => {
      this.roles = role;
    });
  }

  onSave() {
    this.adminService.saveUser(this.frmUser.value).subscribe(data => {
      console.log(data);
      this.listUser();
      this.showNew = false;
      this.showList = true;
    }, (err => {
      console.log(err.error);
    }));
  }

}
