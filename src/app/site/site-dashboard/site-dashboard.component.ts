import { Component, OnInit } from '@angular/core';
import { StudyService } from 'src/app/study.service';

@Component({
  selector: 'app-site-dashboard',
  templateUrl: './site-dashboard.component.html',
  styleUrls: ['./site-dashboard.component.scss']
})
export class SiteDashboardComponent implements OnInit {

  studyName = '';
  studies = [
    {id: '1', name: 'Vivinex Study', description: ''}
  ];

  constructor(private studyService: StudyService) { }

  ngOnInit() {
    if (localStorage.getItem('Study')) {
      this.studyName = localStorage.getItem('studyName');
    }
  }

  enterStudy(study: any) {
    this.studyName = study.name;
    this.studyService.setStudy(study.id, study.name);
  }

}
