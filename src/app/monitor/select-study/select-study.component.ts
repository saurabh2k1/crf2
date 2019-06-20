import { Study } from './../../models/study';

import { StudyService } from './../../study.service';
import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';


@Component({
  selector: 'app-select-study',
  templateUrl: './select-study.component.html',
  styleUrls: ['./select-study.component.scss']
})
export class SelectStudyComponent implements OnInit {

  studies: Study[];
  constructor(
    private studyService: StudyService,
    private router: Router) { }

  ngOnInit() {
    this.studyService.getStudies().subscribe(data => {
      console.log('studies =' + data);
      this.studies = data;
    });
  }

  enterStudy(study: any) {
    this.studyService.setStudy(study._id, study.name);
    this.router.navigate(['/monitor/dashboard']);
  }
}
