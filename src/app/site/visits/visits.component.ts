import { DynamicFormComponent } from './../../components/dynamic-form/dynamic-form.component';
import { Component, ViewChild, OnInit } from '@angular/core';
import { SiteService } from '../site.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
  visit_id = '';
  patient_id = '';
  isExclusionDone = false;
  isExclusionMet = false;
  crfExclusion: any;
  frmExclusion: FormGroup;
  maxDate = new Date();
  cardHeader = '';
  theForm: any;
  fields: [];
  theCRFValue: any;
  crfFormDone = false;
  dov: Date;
  showDOVForm = false;
  showExclusionDetails = false;

  @ViewChild(DynamicFormComponent) form: any;

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
      //  this.treeControl = new NestedTreeControl(node => node.forms);
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

  openExclusionForm(visit): void {
    this.visit_id = visit._id;
    this.dov = visit.exdov;
    this.showExclusionDetails = true;
  }

  openForm(form, visit): void {
    this.visit_id = visit._id;
    this.dov = visit.dov;
    // if (!this.dov) {
    //   this.showDOVForm = true;
    //   return;
    // }
    this.showDOVForm = false;
    this.showExclusionDetails = false;
    this.theForm = form;
    this.siteService.getCRForm(form._id, this.site_id, this.patient_id, this.visit_id).subscribe(data => {
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
        this.form = DynamicFormComponent;
      } else {
        this.fields = null;
      }
    });


  }

  saveCrForm(value) {
    const crfForm = {
      'form_id': this.theForm._id,
      'site_id': this.site_id,
      'subject_id': this.patient_id,
      'visit_id': this.visit_id,
      'dov': new Date(),
    };
    this.theCRFValue = Object.assign(crfForm, value);
    this.siteService.saveCRForm(this.theCRFValue).subscribe(data => {
      alert(data);
    });
  }
}
