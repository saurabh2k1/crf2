import { CrfDisplayComponent } from './../crf-display/crf-display.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from 'src/app/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { defaultFormat } from 'moment';
import { element } from '@angular/core/src/render3';
import { MatDialogConfig, MatDialog, } from '@angular/material';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-crf-detail',
  templateUrl: './crf-detail.component.html',
  styleUrls: ['./crf-detail.component.scss']
})
export class CrfDetailComponent implements OnInit {

  dForm: any;
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  isLoadingResult = true;
  field_required = true;
  isAddField = true;
  hasOption = false;
  fields: any[] = [];
  formId = '';
  isFieldEdit = false;
  field_index = 0;
  baseURL = environment.baseUrl;

  // @ViewChild('stepper') stepper;

  constructor(private adminService: AdminService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.dForm = {name: ''};
    this.formId = this.route.snapshot.params['id'];
    this.getFormDetails(this.formId);
    this.buildFieldForm();
  }

  buildFieldForm(): void {
    this.firstFormGroup = this.fb.group({
      field_type: [null, Validators.required],
      field_code: [null, Validators.required],
      field_title: [null, Validators.required],
      field_value: [null],
      field_unit: [null],
    // });
    // this.secondFormGroup = this.fb.group({
      field_required: [true, Validators.required],
      hasOption: [false],
      min: [null],
      max: [null],
      regex: [null],
      options: this.fb.array([this.buildOptions()]),

    // });
    // this.thirdFormGroup = this.fb.group({
      ngShow_field: [null],
      ngShow_value: [null],
      // id: [null],
      // form_id: [null],
      // field_id: [null],
      // field_disabled: [null],
      // isEditable: [false],
      // created_at: [null],
      // updated_at: [null],
    });
  }

  get options(): FormArray {
    // return <FormArray>this.secondFormGroup.get('options');
    return <FormArray>this.firstFormGroup.get('options');
  }

  addOptions(): void {
    this.options.push(this.buildOptions());
  }

  removeOption(index): void {
    if (this.options.length > 1) {
      this.options.removeAt(index);
    } else {
      alert('You can not delete all');
    }
  }

  buildOptions(): FormGroup {
    return this.fb.group({
      // id: [null],
      option_title: [null],
      option_value: [null],
      // crf_form_id: [null],
      // option_id: [null],
      // created_at: [null],
      // updated_at: [null],
    });
  }

  getFormDetails(id) {
    this.adminService.getForm(id).subscribe(data => {
      this.dForm = data;
      this.fields = data.fields;
      this.isLoadingResult = false;
    });
  }

  onFieldTypeChange(e) {
   if (e.value === 'radiobutton' || e.value === 'select' || e.value === 'checkbox' ) {
    this.hasOption = true;
    // this.secondFormGroup.controls['hasOption'].setValue(true);
    this.firstFormGroup.controls['hasOption'].setValue(true);
   } else {
     this.hasOption = false;
    //  this.secondFormGroup.controls['hasOption'].setValue(false);
    this.firstFormGroup.controls['hasOption'].setValue(false);
   }

  }

  addNewField(): void {
    this.field_index = 0;
    this.isAddField = true;
    this.isFieldEdit = false;
    this.resetForm();
  }

  onAddingField(): void {
    // const fp = Object.assign(this.firstFormGroup.value, this.secondFormGroup.value, this.thirdFormGroup.value) ;
    console.log(this.firstFormGroup.value);
    if (this.isFieldEdit) {
      this.fields[this.field_index] = this.firstFormGroup.value;
    } else {
      this.fields.push(this.firstFormGroup.value);
    }
    // this.stepper.reset();
    // this.stepper.selectedIndex = 0;
    this.resetForm();
  }

  resetForm(): void {
    this.firstFormGroup = null;
    this.hasOption = false;
    this.buildFieldForm();

  }

  saveFormFields(): void {
    this.adminService.addFields({fields: this.fields}, this.formId).subscribe( data => {
      console.log(data);
      alert('CRF saved successfully');
      this.router.navigate(['/admin/crfs']);
    });
  }

  editField(index) {
    this.hasOption = this.fields[index].hasOption;
    if (this.hasOption) {
      for (let i = 0; i < this.fields[index].options.length - 1; i++) {
        this.addOptions();
      }
    } else {
      // this.removeOption(0);
    }

    this.firstFormGroup.patchValue(this.fields[index]);
    this.isFieldEdit = true;
    this.field_index = index;
  }

  removeField(index: number) {
    this.fields.slice(index, 1);
  }

  goToLink(): void {
      const dialogConfig = new MatDialogConfig();
      // dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data =  {form: this.dForm};
      dialogConfig.width = '750px';
      const dialogRef = this.dialog.open(CrfDisplayComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
        console.log('Dialog Closed');
        console.log(result);
      });
  }


}
