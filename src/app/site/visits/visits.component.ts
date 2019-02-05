import { Component, OnInit } from '@angular/core';
import { SiteService } from '../site.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material';

@Component({
  selector: 'app-visits',
  templateUrl: './visits.component.html',
  styleUrls: ['./visits.component.scss']
})
export class VisitsComponent implements OnInit {

  site_id = '';
  study_id = '';
  patients = [];
  visits: any[];
  patient_id = '';
  isExclusionDone = false;
  isExclusionMet = false;
  crfExclusion: any;
  frmExclusion: FormGroup;
  maxDate = new Date();
  cardHeader = '';
  theForm: any;

  // treeControl: NestedTreeControl<any>;
  // dataSource: MatTreeNestedDataSource<any>;

  constructor(private siteService: SiteService,
    private fb: FormBuilder) { }

  ngOnInit() {

    const study = JSON.parse(localStorage.getItem('study'));
    const site = JSON.parse(localStorage.getItem('site'));
    if (study && site ) {
      this.study_id = study.id;
      this.site_id = site.id;
      this.getPatients();
      this.exclusionFormBuild();
    }
  }

  getVisits(patID): void {
    this.siteService.getVisitsOfPatient(patID).subscribe(data => {
      this.visits = data;
      // this.treeControl = new NestedTreeControl(node => node.forms);
      // this.dataSource = new MatTreeNestedDataSource();
      // this.dataSource.data = data;
    });
  }

  // hasChild = (_: number, node) => !!node.forms && node.forms.length > 0;

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
  getPatients() {
    this.siteService.getPatients(this.site_id, this.study_id).subscribe( data => {
      console.log(data);
      this.patients = data;
    });
  }

  onPatChange(event): void {
    this.patient_id = event.source.value;
    this.theForm = null;
    this.getExclusion();
  }

  getExclusion(): void {
    this.siteService.getExclusion(this.patient_id).subscribe(data => {
      if (data.dov) {
        this.isExclusionDone = true;
        this.crfExclusion = data;
        if (data.exclusion) {
          this.getVisits(this.patient_id);
          this.isExclusionMet = true;
          this.cardHeader = 'Visit';
        } else {
          this.isExclusionMet = false;
          this.cardHeader = 'CRF: Inclusion/Exclusion';
        }
      } else {
        this.isExclusionDone = false;
        this.cardHeader = 'CRF: Inclusion/Exclusion';
      }
    });
  }

  saveExclusion(): void {
    this.frmExclusion.controls['patient_id'].patchValue(this.patient_id);
    this.siteService.saveExclusion(this.frmExclusion.value).subscribe(data => {
      if (data.form) {
        alert('Data Saved');
        this.crfExclusion = data.form;
        this.isExclusionDone = true;
        this.cardHeader = 'Visit';
        if (data.form.exclusion) {
          this.isExclusionMet = true;
        } else {
          this.isExclusionMet = false;
        }
      }
    });
  }

  getRefNumber(patID, prefix) {
    return `${prefix}/` + String('000' + patID).slice(-4);
  }

  openForm(form): void {
    this.theForm = form;
  }
}
