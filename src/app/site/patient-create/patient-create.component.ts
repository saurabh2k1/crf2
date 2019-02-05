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

  maxDate = new Date();
  frmRegister: FormGroup;
  showNew = false;
  btnText = 'Register';
  pat: Observable<any>;
  patID = '';
  siteID = '';
  studyID = '';
  constructor(private fb: FormBuilder,
    private siteService: SiteService,
    private studyService: StudyService,
    private route: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.frmRegister = this.fb.group({
      initials: ['', [Validators.required, Validators.pattern('^[a-zA-Z][a-zA-Z_]{2}$')]],
      dob: ['', [Validators.required]],
      gender: ['', Validators.required],
      race: ['', Validators.required],
      icf: ['', Validators.required],
      icf_date: [null, Validators.required]
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



  onRegister() {
    // console.log(this.frmRegister.value);

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
      this.siteService.createPatient(pat).subscribe(data => {
        console.log(data);
        if (data.id) {
          this.route.navigate(['/site/patients']);
        }
      }, err => {
        console.error(err);
      });
    } else {
      this.siteService.updatePatient(this.patID, pat).subscribe(data => {
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
      this.frmRegister.patchValue(data);
      this.frmRegister.get('dob').patchValue(new Date(data.dob));
      this.frmRegister.get('icf_date').patchValue(new Date(data.icf_date));
      // this.frmRegister.get('icf').patchValue(true);
      // this.frmRegister.controls['gender'].setValue(data.gender);

    });
  }
  getDateValue(dt) {
    const mDt = new Date(dt);
    return moment(mDt).format('YYYY-MM-DD');
  }

}
