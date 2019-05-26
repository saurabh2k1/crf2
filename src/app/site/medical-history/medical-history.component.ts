import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/models/patient';
import { SiteService } from '../site.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';




@Component({
  selector: 'app-medical-history',
  templateUrl: './medical-history.component.html',
  styleUrls: ['./medical-history.component.scss']
})
export class MedicalHistoryComponent implements OnInit {

  patID = '';
  patient: Patient;
  // frmMedHistory: FormGroup;
  medHistory: any;
  pageTitle = 'Medical History';
  step = 0;
  genMedHistory: Array<{indication: string, diagnosisDate: Date,
    endDate?: string, isongoing?: string, treatment: string, description: string
  }> = [];
  opMedHistory: Array<{indication: string, eye: string, treatment: string,
     description: string, startDate: Date, isongoing?: string, endDate?: string}> = [];
  medicationHistory: Array<{drugName: string, indication: string, eye: string,
    route: string, dose: string, startDate: Date, endDate?: string, isongoing?: string}> = [];
  showEndDate1 = false;
  showEndDate2 = false;
  showEndDate3 = false;
  addGenMedHistory = true;
  addOpMedHistory = false;
  addMedHistory = false;
  study_id = '';
  site_id = '';
  constructor(private siteService: SiteService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.patID = this.activatedRoute.snapshot.paramMap.get('id');
    const study = JSON.parse(localStorage.getItem('study'));
    const site = JSON.parse(localStorage.getItem('site'));
    if (study && site ) {
      this.study_id = study.id;
      this.site_id = site.id;
    }
    this.siteService.getPatientByID(this.patID).subscribe((data: any) => {
      this.patient = data;
    });
    this.siteService.getMedicalHistory(this.patID).subscribe(data => {
      this.medHistory = data[0];
      this.genMedHistory = data[0].genmedical;
      this.opMedHistory = data[0].opmedical;
      this.medicationHistory = data[0].medical;
      console.log(this.genMedHistory);
    });

  }

  isFieldValid(form: FormGroup, field: string) {
    return !form.get(field).valid ;    // && form.get(field).touched
  }

  getToday(): string {
    return new Date().toISOString().split('T')[0]
 }
  setStep(index: number) {
    this.step = index;
  }
  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  getRefNumber(patID, prefix) {
    return `${prefix}-` + String('00' + patID).slice(-3);
  }

  removeOPRow(index: number) {
    this.opMedHistory.splice(index, 1);
  }

  removeGMRow(index: number) {
    this.genMedHistory.splice(index, 1);
  }

  removeMedRow(index: number) {
    this.medicationHistory.splice(index, 1);
  }

  ongoingChange2(val) {
    if (val === '1') {
       this.showEndDate2 = false;
    } else {
      this.showEndDate2 = true;
    }
  }

  ongoingChange1(val) {
    if (val === '1') {
       this.showEndDate1 = false;
    } else {
      this.showEndDate1 = true;
    }
  }

  ongoingChange3(val) {
    if (val === '1') {
      this.showEndDate3 = false;
    } else {
      this.showEndDate3 = true;
    }
  }

  saveGMRow(f: NgForm) {
    this.genMedHistory.push(f.value);
    f.reset();
    this.addGenMedHistory = false;
  }

  saveOPRow(f: NgForm) {
    this.opMedHistory.push(f.value);
    f.reset();
    this.addOpMedHistory = false;
  }

  saveMedRow(f: NgForm) {
    this.medicationHistory.push(f.value);
    f.reset();
    this.addMedHistory = false;
  }

  saveForm() {
    this.nextStep();
    this.medHistory = {
      pat_id: this.patID,
      // site_id: this.site_id,
      // study_id: this.study_id,
      genMedHistory: this.genMedHistory,
      opMedHistory: this.opMedHistory,
      medicationHistory: this.medicationHistory,
    };
    this.siteService.saveMedicalHistory(this.medHistory).subscribe(data => {
      console.log(data);
    });

    console.log(this.medHistory);

  }
}
