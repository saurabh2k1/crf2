import { Patient } from 'src/app/models/patient';
import { SiteService } from 'src/app/site/site.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-visit1',
  templateUrl: './visit1.component.html',
  styleUrls: ['./visit1.component.scss']
})
export class Visit1Component implements OnInit {

  patID = '';
  patient: Patient;
  visits: any[];
  showAETable = false;
  showAEForm = true;
  pageTitle = 'Visit';
  frmAEForm: FormGroup;
  constructor(
    private activatedRoute: ActivatedRoute,
    private siteService: SiteService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.patID = this.activatedRoute.snapshot.paramMap.get('id');
    this.siteService.getPatientByID(this.patID).subscribe((data: any) => {
      this.patient = data;
      this.getVisits(this.patID);
    });
    this.frmAEForm = this.fb.group({
      isEventOccur: [false],
      examDate: [],
      firstObservedDate: [],
      isEyeAffected: [false],
      eventName: [''],
      eventCriteria: [''],
      onsetDate: [],
      endDate: [],
      isongoing: [false],
      actionTaken: [],
      resolution: [''],
      relationshipIOL: [''],
      relationshipSurgical: [''],
      isDeviceRelated: [false],
    });
  }

  isFieldValid(form: FormGroup, field: string) {
    return !form.get(field).valid ;    // && form.get(field).touched
  }

  getVisits(patID): void {
    this.siteService.getVisitsOfPatient(patID).subscribe(data => {
      this.visits = data;
    });
  }

  closeAllPage() {
    this.showAETable = false;
    this.pageTitle = 'Visit';
  }

  showAE(): void {
    this.closeAllPage();
    this.pageTitle = 'Adverse Events';
    this.showAETable = true;

  }

  addAE(): void {
    this.closeAllPage();
    this.pageTitle = 'Adverse Event';
    this.showAEForm = true;
  }

  getRefNumber(patID, prefix) {
    return `${prefix}-` + String('00' + patID).slice(-4);
  }

  getDateValue(dt) {
    const mDt = new Date(dt);
    return moment(mDt).format('YYYY-MM-DD');
  }

  getToday(): string {
    return new Date().toISOString().split('T')[0]
 }

}
