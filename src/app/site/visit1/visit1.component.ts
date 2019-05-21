import { Patient } from 'src/app/models/patient';
import { SiteService } from 'src/app/site/site.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  showAEForm = false;
  showAEField = false;
  pageTitle = 'Visit';
  frmAEForm: FormGroup;
  aeList: any[] = [];
  showEventNameOther = false;
  showEndDate = false;
  showMalfunction = false;
  showOtherMalfunction = false;
  aeSeq = 0;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
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
      pat_id: [this.patID],
      VISDAT: ['', Validators.required],
      AETERM: ['', Validators.required],
      eventName: ['', Validators.required],
      otherEventName: [''],
      AESTDATE: ['', Validators.required],
      AEONGO: [false, Validators.required],
      AEENDAT: [''],
      AEOUT: ['', Validators.required],
      AESEV: ['', Validators.required],
      AESER: ['', Validators.required],
      AEACNOTH: [''],
      AEREL: [''],
      AEACN: ['', Validators.required],
      AEDEVREL: [''],
      aeSeq: [''],
      // isEyeAffected: [false, Validators.required],

      // eventOccurOn: [null, Validators.required],



      SAECLASS: [''],
      // causalityIOL: ['', Validators.required],
      // causalitySurgical: ['', Validators.required],
      // isDeviceMalfunction: ['', Validators.required],
      // deviceMalfunction: [''],
      // otherMalfunction: [''],




    });
  }

  get fae() { return this.frmAEForm.controls;}

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
    this.showAEForm = false;
    this.pageTitle = 'Visit';
  }

  showAE(): void {
    this.closeAllPage();
    this.pageTitle = 'Adverse Events';
    this.showAETable = true;

  }

  get onlySAEList() {
    return this.aeList.filter( ae => ae.AESER === '1');
  }


  addAE(): void {
    this.closeAllPage();
    this.pageTitle = 'Adverse Event';
    this.showAEForm = true;
  }

  saveAE(): void {

    if (this.frmAEForm.valid) {
      // this.siteService.createAE(this.frmAEForm.value).subscribe(data =>{
      //   console.log(data);
      // });
      this.aeSeq++;
      this.frmAEForm.controls['aeSeq'].setValue(`${this.getRefNumber(this.patient.pat_id, this.patient.prefix)}-${this.aeSeq}`);
      this.aeList.push(this.frmAEForm.value);
      this.frmAEForm.reset();
      this.closeAllPage();
      this.showAETable = true;
    }

  }

  getRefNumber(patID, prefix) {
    return `${prefix}-` + String('00' + patID).slice(-3);
  }

  getDateValue(dt) {
    const mDt = new Date(dt);
    return moment(mDt).format('YYYY-MM-DD');
  }

  getToday(): string {
    return new Date().toISOString().split('T')[0]
 }

 eventNameChange(val) {
  if (val === 'Other') {
    this.showEventNameOther = true;
    this.frmAEForm.controls['otherEventName'].setValidators(Validators.required);
  } else {
    this.showEventNameOther = false;
    this.frmAEForm.controls['otherEventName'].setValue(null);
    this.frmAEForm.controls['otherEventName'].setValidators(null);
  }
  this.frmAEForm.controls['otherEventName'].updateValueAndValidity();
 }

 ongoingChange(val) {
   if (val === '1') {
      this.showEndDate = false;
      // this.frmAEForm.controls['resolution'].setValue('Ongoing');
   } else {
     this.showEndDate = true;
     // this.frmAEForm.controls['resolution'].setValue('');
   }
   console.log(this.showEndDate);
 }

 isSAEChange(val) {
   if (val === '1') {
    // this.router.navigate(['/site/visits/sae/' + this.patID]);
    this.showAEField = true;
   } else {
    this.showAEField = false;
   }
 }

 iolMalfunctionChange(val) {
   if (val === '1') {
    this.showMalfunction = true;
   } else {
     this.showMalfunction = false;
   }
 }

 onMalfunctionChange(val) {
   if (val === 'Other') {
    this.frmAEForm.controls['otherMalfunction'].setValidators(Validators.required);
    this.showOtherMalfunction = true;
   } else {
     this.showOtherMalfunction = false;
     this.frmAEForm.controls['otherMalfunction'].setValidators(null);
     this.frmAEForm.controls['otherMalfunction'].setValue(null);
   }
   this.frmAEForm.controls['otherMalfunction'].updateValueAndValidity();
 }

}
