import { Component, OnInit, ViewChild } from '@angular/core';
import { SiteService } from '../site.service';
import { StudyService } from 'src/app/study.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Patient } from 'src/app/models/patient';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit {

  displayedColumn: string[] = ['patid', 'initials', 'dob', 'enrollment', 'actions'];
  dataSource: MatTableDataSource<Patient>;
  patients: any = [];
  site_id = '';
  study_id = '';
  prefix = '';

  @ViewChild(MatPaginator) Paginator: MatPaginator;

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
      this.dataSource = new MatTableDataSource<Patient>(data);
      this.dataSource.paginator = this.Paginator;
    });
  }

  getRefNumber(patID, prefix) {
    return `${prefix}/` + String('000' + patID).slice(-4);
  }

}
