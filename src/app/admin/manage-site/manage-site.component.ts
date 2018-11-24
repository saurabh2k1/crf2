import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin.service';
import { Site } from 'src/app/models/site';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-manage-site',
  templateUrl: './manage-site.component.html',
  styleUrls: ['./manage-site.component.scss']
})
export class ManageSiteComponent implements OnInit {

  showList = false;
  showNew = false;
  sites: Site[] = [];
  frmSite: FormGroup;
  constructor(private adminService: AdminService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.frmSite = this.fb.group({
      name: ['', Validators.required],
      code: ['', Validators.required],
      address: ['', Validators.required],
      contact_person: [''],
      department: [''],
    });
    this.activatedRoute.data.subscribe(data => {
      switch (data.kind) {
        case 'list':
          this.listSite();
          this.showList = true;
        break;
        case 'create':
          this.showList = false;
          this.showNew = true;
        break;
        default:
          this.showList = false;
          break;
      }
    });

  }

  listSite() {
    this.adminService.getSites().subscribe((site: Site[]) => {
      this.sites = site;
    });
  }

  onSubmit() {
    this.adminService.saveSite(this.frmSite.value)
      .subscribe(data => {
        console.log(data);
        this.showNew = false;
        this.listSite();
        this.showList = true;
      }, err => {
        console.log(err.error);
      });
  }

}
