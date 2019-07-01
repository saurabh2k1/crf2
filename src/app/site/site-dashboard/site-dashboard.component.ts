import { Component, OnInit, ViewChild } from '@angular/core';
import { StudyService } from 'src/app/study.service';
import { Study } from 'src/app/models/study';
import { AdminService } from 'src/app/admin.service';
import { SiteService } from '../site.service';
import { Router } from '@angular/router';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Patient } from 'src/app/models/patient';

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
  patients: any;
  patientCount = '';
  displayedColumn: string[] = ['patid',  'status'];
  dataSource: MatTableDataSource<Patient>;
  nonConformant = 0;
  openQuery = 0;
  stickyNotes = 0;
  overDue = 0;

  dashboardCount = {
    skippedVisitCount: 'NA',
    completedCount: 'NA',
    pendingCount: 'NA',
    updated_at: 'NA',
    AECount: 'NA',
    SAE: 'NA'
  };
  @ViewChild(MatPaginator) Paginator: MatPaginator;
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
      this.getPatients();
    }

  }

  getPatients() {
    this.siteService.getPatientStatus(this.siteId, this.studyId).subscribe(data => {
      this.patients = data;
      this.dataSource = new MatTableDataSource<Patient>(data);
      this.dataSource.paginator = this.Paginator;
    });

    // this.siteService.getPatients(this.siteId, this.studyId).subscribe(data => {
    //   console.log(data);
    //   this.patients = data;
    //   this.dataSource = new MatTableDataSource<Patient>(data);
    //   this.dataSource.paginator = this.Paginator;
    // });
  }

  getDashboard() {
    this.siteService.getSiteStatics(this.siteId, this.studyId).subscribe((data: any) => {
      console.log(data);
      this.patientCount = data.pat_count;
    });
    this.siteService.getCrfCount(this.studyId, this.siteId).subscribe((data: any) => {
      this.dashboardCount = data;
    });
  }
  enterStudy(study: any) {
    this.studyName = study.name;
    this.studyService.setStudy(study.id, study.name);
  }

  getRefNumber(patID, prefix) {
    return `${prefix}-` + String('00' + patID).slice(-3);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
