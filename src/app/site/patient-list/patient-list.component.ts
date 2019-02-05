import { Component, OnInit } from '@angular/core';
import { SiteService } from '../site.service';
import { StudyService } from 'src/app/study.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit {

  patients: any = [];
  site_id = '';
  study_id = '';
  prefix = '';
  temp = {'status': true, 'pats': [{'id': 3, 'study_id': 1, 'site_id': 1,
  'pat_id': 1, 'initials': 'A_J', 'dob': '1947-06-22', 'Gender': 'F',
  'Race': '1', 'created_at': '2018-06-12 14:03:15', 'created_by': 9,
  'status': 1, 'willing': null, 'lifeexpect': null, 'icf_signed': 'Yes',
  'icf_date': '2018-06-11', 'pat': null, 'created_on': '::1'}], 'pat_prefix': 'VIOL-IND-001-PMCF\/001'};

  constructor(private siteService: SiteService,
    private studyService: StudyService) { }

  ngOnInit() {

    const study = JSON.parse(localStorage.getItem('study'));
    const site = JSON.parse(localStorage.getItem('site'));
    if (study && site ) {
      this.study_id = study.id;
      this.site_id = site.id;
      this.getPatients();
    }


  }

  getPatients() {
    this.siteService.getPatients(this.site_id, this.study_id).subscribe( data => {
      console.log(data);
      this.patients = data;
    });
  }

  getRefNumber(patID, prefix) {
    return `${prefix}/` + String('000' + patID).slice(-4);
  }

}
