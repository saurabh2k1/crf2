import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FieldConfig } from 'src/app/field.interface';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';

@Component({
  selector: 'app-field-edit',
  templateUrl: './field-edit.component.html',
  styleUrls: ['./field-edit.component.scss']
})
export class FieldEditComponent implements OnInit {

  form: FormGroup;
  field: any;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<FieldEditComponent>, @Inject(MAT_DIALOG_DATA) data) {
      this.field = data.field;
     }

  ngOnInit() {
    // this.form = this.createControl();
    console.log('Field in ngOnInit');
    console.log(this.field);
    this.form = this.fb.group({
      reason: ['', Validators.required],
    });
    this.form.addControl(this.field.name, this.fb.control('', Validators.required));
  }

  createControl() {
    const group = this.fb.group({
      reason: ['', Validators.required],
    });
    const control = this.fb.control('');
    group.addControl(this.field.name, control);
    return group;
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    if (this.form.valid){
      this.dialogRef.close(this.form.value);
    }
  }
}
