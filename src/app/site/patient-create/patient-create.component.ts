import { Component, OnInit, ModuleWithComponentFactories } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import * as moment from 'moment';
import { SiteService } from '../site.service';
import { Router, ActivatedRoute } from '@angular/router';
import {  Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { StudyService } from 'src/app/study.service';

@Component({
  selector: 'app-patient-create',
  templateUrl: './patient-create.component.html',
  styleUrls: ['./patient-create.component.scss']
})
export class PatientCreateComponent implements OnInit {


  frmRegister: FormGroup;
  showNew = false;
  btnText = 'Register';
  pat: Observable<any>;
  patID = '';
  siteID = '';
  studyID = '';
  age = 0;
  isUpdated = false;
  changes: any = [];
  showDobReason = false;
  showChangeLog = false;
  minAge = 0;
  MaxAge = 999;
  constructor(private fb: FormBuilder,
    private siteService: SiteService,
    private studyService: StudyService,
    private route: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
     // TODO: get the max, min age for study from study details
    this.MaxAge = 75;
    this.minAge = 55;
    this.frmRegister = this.fb.group({
      initials: ['', [Validators.required, Validators.pattern('^[a-zA-Z][a-zA-Z/-]{2}$')]],
      dob: ['', [Validators.required]],
      gender: ['', Validators.required],
      race: ['', Validators.required],
      icf: ['', Validators.requiredTrue],
      icf_date: ['', Validators.required],
      reason: [null],
    });
    const study = JSON.parse(localStorage.getItem('study'));
    const site = JSON.parse(localStorage.getItem('site'));
    if (study && site ) {
      this.studyID = study.id;
      this.siteID = site.id;

    } else {
      this.siteService.site.subscribe(ssite => {
        this.siteID = ssite.id;
      });
      this.studyService.study.subscribe(sstudy => {
        this.studyID = sstudy.id;
      });
    }

    this.activatedRoute.data.subscribe(data => {
      switch (data.kind) {
        case 'new':
        this.showNew = true;
        this.btnText = 'Register';
          break;
        case 'edit':
          this.patID = this.activatedRoute.snapshot.paramMap.get('id');
          this.showEdit(this.patID);
          this.btnText = 'Update';
          break;
        default:
        this.showNew = false;

          break;
      }
    });
  }
  isFieldValid(form: FormGroup, field: string) {
    return !form.get(field).valid && form.get(field).touched;
  }
  displayFieldCss(form: FormGroup, field: string) {
    return {
      'has-error': this.isFieldValid(form, field),
      'has-feedback': this.isFieldValid(form, field),
    };
  }

  get icf() {
    return this.frmRegister.get('icf');
  }

  dobChange(val: Date) {
    const dob = new Date(val);
    const timeDiff = Math.abs(Date.now() - dob.getTime());
    this.age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);


    if (this.age < this.minAge || this.age > this.MaxAge) {
      this.showDobReason = true;
    } else {
      this.showDobReason = false;
    }
  }


  onRegister() {
    console.log(this.frmRegister.valid);
    console.log(this.frmRegister.status);
    return;
      const frm = this.frmRegister.controls;

    const pat = {
      initials: frm['initials'].value,
      dob: this.getDateValue(frm['dob'].value),
      gender: frm['gender'].value,
      race: frm['race'].value,
      icf: frm['icf'].value ? 1 : 0,
      icf_date: this.getDateValue(frm['icf_date'].value),
      site_id: this.siteID,
      study_id: this.studyID,
    };
    if (this.showNew) {
      if (this.frmRegister.valid) {
      this.siteService.createPatient(pat).subscribe(data => {
        console.log(data);
        if (data.id) {
          this.route.navigate(['/site/patients']);
        }
      }, err => {
        console.error(err);
      });
    }
    } else {
      // tslint:disable-next-line:prefer-const
      let requestBody = {};
      // tslint:disable-next-line:prefer-const
      for (let control in frm) {
        if (this.frmRegister.get(control).dirty) {
          requestBody[control] = this.frmRegister.get(control).value;
        }
      }
      this.siteService.updatePatient(this.patID, requestBody).subscribe(data => {
        if (data) {
          this.route.navigate(['/site/patients']);
        }
      }, err => {
        console.error(err);
      });
    }

    console.log(pat);


  }

  showEdit(id) {
    this.siteService.getPatientByID(id).subscribe((data: any) => {
      const dob = new Date(data.dob);
      const timeDiff = Math.abs(Date.now() - dob.getTime());
      this.age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
      if (this.age < this.minAge || this.age > this.MaxAge) {
        this.showDobReason = true;
      } else {
        this.showDobReason = false;
      }
      this.frmRegister.patchValue(data);
      this.frmRegister.get('dob').patchValue(new Date(data.dob));
      this.frmRegister.get('icf_date').patchValue(new Date(data.icf_date));
      this.isUpdated = data.isUpdated;
      this.changes = data.audits;
      // this.frmRegister.get('icf').patchValue(true);
      // this.frmRegister.controls['gender'].setValue(data.gender);

    });
  }
  getDateValue(dt) {
    const mDt = new Date(dt);
    return moment(mDt).format('YYYY-MM-DD');
  }

  getToday(): string {
    return new Date().toISOString().split('T')[0]
 }

}
