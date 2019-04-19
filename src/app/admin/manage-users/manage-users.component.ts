import { ChangePasswordModalComponent } from './../change-password-modal/change-password-modal.component';
import { AlertService } from './../../alert.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from 'src/app/admin.service';
import { User } from 'src/app/models/user';
import { ActivatedRoute,  Router } from '@angular/router';
import {
  MatListSubheaderCssMatStyler,
  MatTableDataSource,
  MatPaginator,
  MatDialog,
  MatDialogConfig,
  MatSort,
} from '@angular/material';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
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
  id: any;
  loading = false;
  showList = false;
  showNew = false;
  isEdit = false;
  frmUser: FormGroup;
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumn: string[] = ['name', 'role', 'site', 'actions'];

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

  constructor(
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private route: Router,
    private alertService: AlertService,
    public dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.frmUser = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: [null, [Validators.required, Validators.minLength(6)]],
      site_id: [''],
      role_id: ['']
    });
    this.getSites();
    this.getRoles();
    this.activatedRoute.data.subscribe(data => {
      switch (data.kind) {
        case 'list':
          this.showNew = false;
          this.listUser();
          this.showList = true;
          this.isEdit = false;
          break;
        case 'edit':
          this.id = this.activatedRoute.snapshot.paramMap.get('id');
          this.showEdit(this.id);
          this.isEdit = true;
          this.showNew = true;
          break;
        default:
          this.showList = false;
          this.isEdit = false;
          this.showNew = true;
          break;
      }
    });
  }

  isFieldValid(form: FormGroup, field: string) {
    return !form.get(field).valid && form.get(field).touched;
  }
  displayFieldCss(form: FormGroup, field: string) {
    return {
      'has-error': this.isFieldValid(form, field),
      'has-feedback': this.isFieldValid(form, field)
    };
  }

  openDialog(user: any): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data =  {name: user.first_name + ' ' + user.last_name, password: user.password, userId: user._id};
    dialogConfig.width = '350px';
    const dialogRef = this.dialog.open(ChangePasswordModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog Closed');
      console.log(result);
      this.resetPassword(result);
    });
  }

  resetPassword(data: any): void {
    this.adminService.resetPassword(data).subscribe((reply: any) => {
      alert(reply.msg);
    }, err => {
      alert(err.error);
    });
  }

  listUser() {
    this.adminService.getUsers().subscribe((user: User[]) => {
      this.users = user;
      this.dataSource = new MatTableDataSource<any>(user);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  showEdit(id: any) {
    this.adminService.getUserById(id).subscribe((user: any) => {
      this.frmUser.patchValue(user);
      this.frmUser.get('site_id').patchValue(user.site._id);
      this.frmUser.get('role_id').patchValue(user.role.id);
      console.log(user);
    });
  }

  getSites() {
    this.loading = true;
    this.adminService.getSites().subscribe((site: any) => {
      this.sites = site;
      this.loading = false;
    });
  }

  getRoles() {
    this.adminService.getRoles().subscribe(role => {
      this.roles = role;
    });
  }

  onSave() {
    this.loading = true;
    if (this.isEdit) {
      console.log(this.frmUser.value);
      this.adminService.updateUser(this.frmUser.value, this.id).subscribe(data => {
        this.alertService.success('Updated successfully');
        this.loading = false;
        this.route.navigate(['/admin/users']);
      }, err => {
        console.log(err.error);
        this.alertService.error(err.error);
        this.loading = false;
      });
    } else {
      this.adminService.saveUser(this.frmUser.value).subscribe(
        data => {
          console.log(data);
          this.listUser();
          this.showNew = false;
          this.showList = true;
          this.loading = false;
        },
        err => {
          this.loading = false;
          console.log(err.error);
        }
      );
    }
  }
}
