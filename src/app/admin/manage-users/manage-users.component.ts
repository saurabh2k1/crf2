import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {

  users: User[] = [];
  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.adminService.getUsers().subscribe((user: User[]) => {
      this.users = user;
    })
  }

}
