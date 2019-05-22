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
  frmMedHistory: FormGroup;
  pageTitle = 'Medical History';
  step = 0;
  genMedHistory: Array<{indication: string, diagnosisDate: Date,
    endDate?: string, isongoing?: string, treatment: string, description: string
  }> = [];
  addGenMedHistory = true;
  opMedHistory = [{indication: '', eye: '', treatment: '', description: '', startDate: '', endDate: ''}];
  medicationHistory = [{drugName: '', indication: '', eye: '', route: '', dose: '', startDate: '', endDate: ''}];
  showEndDate1 = false;
  showEndDate2 = false;
  addOpMedHistory = false;
  constructor(private siteService: SiteService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.patID = this.activatedRoute.snapshot.paramMap.get('id');
    this.siteService.getPatientByID(this.patID).subscribe((data: any) => {
      this.patient = data;
    });
    this.frmMedHistory = this.fb.group({
      patID: [this.patID],
      genMedHistory: this.fb.array([]),
      opMedHistory: this.fb.array([]),
      medicationHistory: this.fb.array([]),
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

  ongoingChange1(val) {
    if (val === '1') {
       this.showEndDate1 = false;
    } else {
      this.showEndDate1 = true;
    }
  }
  removeOPRow(index: number) {
    this.opMedHistory.splice(index, 1);
  }

  removeGMRow(index: number) {
    this.genMedHistory.splice(index, 1);
  }
  ongoingChange2(val) {
    if (val === '1') {
       this.showEndDate2 = false;
    } else {
      this.showEndDate2 = true;
    }
  }

  saveGMRow(f: NgForm) {
    this.genMedHistory.push(f.value);
    f.reset();
    this.addGenMedHistory = false;
  }

}
