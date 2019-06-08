import { Patient } from 'src/app/models/patient';
import { SiteService } from 'src/app/site/site.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import * as moment from 'moment';
import { DynamicFormComponent } from 'src/app/components/dynamic-form/dynamic-form.component';



@Component({
  selector: 'app-visit1',
  templateUrl: './visit1.component.html',
  styleUrls: ['./visit1.component.scss']
})
export class Visit1Component implements OnInit {

  patID = '';
  patient: Patient;
  visits: any[];
  study_id: string;
  site_id: string;
  showAETable = false;
  showAEForm = false;
  showAEField = false;
  pageTitle = 'Visit';
  frmAEForm: FormGroup;
  frmExclusion: FormGroup;
  aeList: any[] = [];
  crfExclusion: any;
  showEventNameOther = false;
  showEndDate = false;
  showMalfunction = false;
  showOtherMalfunction = false;
  showInformedConsent = false;
  showInclusionExclusion = false;
  showDemographicPage = false;
  showVisitSkipDate = false;
  showVisitSkipComment = false;
  isExclusionDone = false;
  isExclusionMet = false;
  visitDate: Date = null;
  selectedVisit: any;
  visitID = '';
  visitData: any;
  aeSeq = 0;
  ecrfs: any[];
  theForm: any;
  theCRFValue: any;
  crfFormDone = false;
  fields: [];

  @ViewChild(DynamicFormComponent) form: any;
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
    this.ecrfs = [];
    this.siteService.getExclusion(this.patID).subscribe(data => {
      if (data.dov) {
        this.isExclusionDone = true;
        this.crfExclusion = data;
        if (data.exclusion) {
          this.isExclusionMet = true;
        } else {
          this.isExclusionMet = false;
        }
      } else {
        this.isExclusionDone = false;
      }
    });

    const study = JSON.parse(localStorage.getItem('study'));
    const site = JSON.parse(localStorage.getItem('site'));
    if (study && site ) {
      this.study_id = study.id;
      this.site_id = site.id;
      this.exclusionFormBuild();
    }
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

  get exclusion() {
    return this.frmExclusion.get('exclusion');
  }

  exclusionFormBuild(): void {
    this.frmExclusion = this.fb.group({
      'study_id': [this.study_id],
      'site_id': [this.site_id],
      'patient_id': [null],
      'dov': [null, Validators.required],
      'exclusion': ['1'],
      'reason': [null],
      'isUpdated': [false],
      'hasQuestion': [false],
    });
  }

  saveVisit(f: NgForm) {

    console.log(f.value);
    let data = {
      patient_id: this.patID,
      visit_id: this.selectedVisit._id,

      isSkipped: f.controls['isSkipped'].value,
    };
    if (f.controls['visitDate']) {
      data['visit_date']  = f.controls['visitDate'].value;
    } else {
      data['visit_date'] = null;
    }
    if (f.controls['comment']) {
     data['comment'] =  f.controls['comment'].value;
    } else {
      data['comment'] = '';
    }

    this.siteService.addVisit(data).subscribe(d => {
      console.log(d);
      this.visitDate = f.controls['visitDate'].value;
      f.reset();


    });
  }

  showVisit(visit) {
    if (visit.code === 'Visit1') {
      this.visitDate = this.patient.icf_date;
    }
  }

  showIC() {
    this.closeAllPage();
    this.showInformedConsent = true;
    this.pageTitle = 'Informed Consent';
  }

  showIncEx() {
    this.closeAllPage();
    this.showInclusionExclusion = true;
    this.pageTitle = 'Inclusion / Exclusion';

  }

  showDemography() {
    this.closeAllPage();
    this.showDemographicPage = true;
    this.pageTitle = 'Demography';
  }

  saveExclusion(): void {
    this.frmExclusion.controls['patient_id'].patchValue(this.patID);
    this.siteService.saveExclusion(this.frmExclusion.value).subscribe(data => {
      if (data.form) {
        alert('Data Saved');
        this.crfExclusion = data.form;
        this.isExclusionDone = true;
        if (data.form.exclusion) {
          this.isExclusionMet = true;
        } else {
          this.isExclusionMet = false;
        }
      }
    });
  }

  selectVisit(visit) {
    this.closeAllPage();
    this.visitDate = null;
    this.selectedVisit = visit;
    this.visitID = visit._id;
    this.getPatientVisit();
  }

  openForm(form, visit): void {
    this.closeAllPage();
    this.theForm = form;
    this.pageTitle = form.name;
    this.siteService.getCRForm(form._id, this.site_id, this.patID, visit._id)
      .subscribe(data => {
        if (data.value) {
          console.log(data.value);
          this.theCRFValue = data.value;

          this.crfFormDone = true;
        } else {
          this.crfFormDone = false;
        }
        if (data.fields) {
          console.log(data.fields);
          this.fields = data.fields;
          if (this.form) { this.form.fields = this.fields; }
          this.form = DynamicFormComponent;
        } else {
          this.fields = null;
        }
      });
  }

  saveCrForm(value): void {
    console.log(value);
    const crfForm = {
      'form_id': this.theForm._id,
      'site_id': this.site_id,
      'subject_id': this.patID,
      'visit_id': this.visitID,
      'dov': new Date(),
    };
    this.theCRFValue = Object.assign(crfForm, value);
    this.siteService.saveCRForm(this.theCRFValue).subscribe(data => {
      alert(data.msg);
      this.crfFormDone = true;
    });
  }

  getValue(field) {
    const val = this.theCRFValue[field.name];
    const a =  field.options.find(x => x.value === val);
    return a.title;
  }

  hideField(field) {
    if (field.ngShow_field && field.ngShow_value) {
      if (this.theCRFValue[field.ngShow_field] === field.ngShow_value) {
        return false;
      }
      return true;
    }
    return false;
  }
  showForms(visit) {
    this.closeAllPage();
    this.ecrfs = [];
    this.selectedVisit = visit;
    this.getPatientVisit();
    this.pageTitle = visit.description;
    this.showVisit(visit);
    this.ecrfs = visit.forms;
  }

  get fae() { return this.frmAEForm.controls; }

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
    this.showInformedConsent = false;
    this.showInclusionExclusion = false;
    this.showDemographicPage = false;
    this.theForm = null;

    // this.pageTitle = 'Visit';
  }

  showAE(): void {
    this.closeAllPage();
    this.pageTitle = 'Adverse Events';
    this.showAETable = true;
    this.siteService.getAERecordsByPatient(this.patID).subscribe(data => {
      console.log(data);
      this.aeList = data;
    });
  }

  showMedical(): void {
    this.router.navigate([`/site/visits/medicalhistory/${this.patID}`]);
  }

  getPatientVisit() {
    this.siteService.getPatientVisit(this.patID, this.selectedVisit._id).subscribe(data => {
      if (data[0]) {
        this.visitDate = data[0].visit_date;
        this.visitData = data[0];
      }
    });
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
      // this.aeList.push(this.frmAEForm.value);
      this.siteService.saveAERecord(this.frmAEForm.value).subscribe(data => {
        if (data.AE) {
          this.aeList.push(data.AE);
          this.frmAEForm.reset();
          this.closeAllPage();
          this.showAETable = true;
        }
      }, err => {
        console.log(err);
      });

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

 changeVisitSkip(val) {
   if (val === '0') {
    this.showVisitSkipDate = true;
    this.showVisitSkipComment = false;
   } else {
    this.showVisitSkipDate = false;
    this.showVisitSkipComment = true;
   }
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
