import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/models/patient';
import { SiteService } from '../site.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-conco',
  templateUrl: './conco.component.html',
  styleUrls: ['./conco.component.scss']
})
export class ConcoComponent implements OnInit {

  patID = '';
  patient: Patient;
  pageTitle = 'Concomitant Medication';
  study_id = '';
  site_id = '';
  medicationHistory: Array<{
    drugName: string, indication: string, eye: string,
    route: string, dose: string, startDate: Date, endDate?: string, isongoing?: string
  }> = [];
  addMedHistory = false;
  showEndDate3 = false;
  constructor(
    private siteService: SiteService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.patID = this.activatedRoute.snapshot.paramMap.get('id');
    const study = JSON.parse(localStorage.getItem('study'));
    const site = JSON.parse(localStorage.getItem('site'));
    if (study && site) {
      this.study_id = study.id;
      this.site_id = site.id;
    }
    this.siteService.getPatientByID(this.patID).subscribe((data: any) => {
      this.patient = data;
    });
  }

  getRefNumber(patID, prefix) {
    return `${prefix}-` + String('00' + patID).slice(-3);
  }

  isFieldValid(form: FormGroup, field: string) {
    return !form.get(field).valid;    // && form.get(field).touched
  }

  getToday(): string {
    return new Date().toISOString().split('T')[0]
  }

  ongoingChange3(val) {
    if (val === '1') {
      this.showEndDate3 = false;
    } else {
      this.showEndDate3 = true;
    }
  }

  removeMedRow(index: number) {
    this.medicationHistory.splice(index, 1);
  }

  saveMedRow(f: NgForm) {
    this.medicationHistory.push(f.value);
    f.reset();
    this.addMedHistory = false;
  }
}
