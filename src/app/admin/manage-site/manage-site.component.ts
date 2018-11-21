import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin.service';
import { Site } from 'src/app/models/site';

@Component({
  selector: 'app-manage-site',
  templateUrl: './manage-site.component.html',
  styleUrls: ['./manage-site.component.scss']
})
export class ManageSiteComponent implements OnInit {

  sites: Site[] = [];
  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.adminService.getSites().subscribe((site: Site[]) => {
      this.sites = site;
      console.log(site);
    });
  }


}
