import { Component, OnInit } from '@angular/core';
import { StudyService } from 'src/app/study.service';
import { Study } from 'src/app/models/study';
import { AdminService } from 'src/app/admin.service';
import { SiteService } from '../site.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-site-dashboard',
  templateUrl: './site-dashboard.component.html',
  styleUrls: ['./site-dashboard.component.scss']
})
export class SiteDashboardComponent implements OnInit {

  siteId = '';
  studyName = '';
  studyId = '';
  studies: Study[] = [];
  patientCount = '';

  constructor(private studyService: StudyService,
    private siteService: SiteService,
    private router: Router) { }

  ngOnInit() {
    const study = JSON.parse(localStorage.getItem('study'));
    const site = JSON.parse(localStorage.getItem('site'));
    if (study && site ) {
      this.studyName = study.name;
      this.studyId = study.id;
      this.siteId = site.id;
      this.getDashboard();
    }

  }



  getDashboard() {
    this.siteService.getSiteStatics(this.siteId, this.studyId).subscribe((data: any) => {
      console.log(data);
      this.patientCount = data.pat_count;
    });
  }
  enterStudy(study: any) {
    this.studyName = study.name;
    this.studyService.setStudy(study.id, study.name);
  }

}
