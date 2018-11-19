import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit {

  patients: any = [];
  prefix = '';
  temp = {'status': true, 'pats': [{'id': 3, 'study_id': 1, 'site_id': 1,
  'pat_id': 1, 'initials': 'A_J', 'dob': '1947-06-22', 'Gender': 'F',
  'Race': '1', 'created_at': '2018-06-12 14:03:15', 'created_by': 9,
  'status': 1, 'willing': null, 'lifeexpect': null, 'icf_signed': 'Yes',
  'icf_date': '2018-06-11', 'pat': null, 'created_on': '::1'}], 'pat_prefix': 'VIOL-IND-001-PMCF\/001'};
  constructor() { }

  ngOnInit() {
    this.getPatients();
  }

  getPatients() {
    this.patients = this.temp.pats;
    this.prefix = this.temp.pat_prefix;
  }

  getRefNumber(patID) {
    return `${this.prefix}/` + String('000' + patID).slice(-4);
  }

}
