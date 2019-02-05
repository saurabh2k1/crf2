import { Component, OnInit } from '@angular/core';
import { Study } from 'src/app/models/study';
import { SiteService } from '../site.service';
import { StudyService } from 'src/app/study.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-study',
  templateUrl: './select-study.component.html',
  styleUrls: ['./select-study.component.scss']
})
export class SelectStudyComponent implements OnInit {

  studies: Study[] = [];

  constructor(private siteService: SiteService,
    private studyService: StudyService,
    private router: Router) { }

  ngOnInit() {
    this.siteService.getStudies('1').subscribe(data => {
      this.studies = data;
    }, err => {
      console.log(err);
    });
  }

  enterStudy(study: any) {
    this.studyService.setStudy(study._id, study.name);
    this.router.navigate(['/site/dashboard']);
  }

}
