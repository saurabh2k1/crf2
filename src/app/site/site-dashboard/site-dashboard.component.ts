import { Component, OnInit } from '@angular/core';
import { StudyService } from 'src/app/study.service';
import { Study } from 'src/app/models/study';
import { AdminService } from 'src/app/admin.service';
import { SiteService } from '../site.service';

@Component({
  selector: 'app-site-dashboard',
  templateUrl: './site-dashboard.component.html',
  styleUrls: ['./site-dashboard.component.scss']
})
export class SiteDashboardComponent implements OnInit {

  siteId = '';
  studyName = '';
  studies: Study[] = [];

  constructor(private studyService: StudyService,
    private adminService: AdminService,
    private siteService: SiteService) { }

  ngOnInit() {
    this.studyService.study.subscribe((study: any) => {
      this.studyName = study.name;
  });
  this.siteService.site.subscribe((site: any) => {
    this.siteId = site.id;
  });

   this.getStudies();
  }

  getStudies() {
    this.adminService.getStudies(+this.siteId).subscribe(studies => {
      this.studies = studies;
    });
  }
  enterStudy(study: any) {
    this.studyName = study.name;
    this.studyService.setStudy(study.id, study.name);
  }

}
