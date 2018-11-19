import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-patient-create',
  templateUrl: './patient-create.component.html',
  styleUrls: ['./patient-create.component.scss']
})
export class PatientCreateComponent implements OnInit {

  maxDate = new Date();
  frmRegister: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.frmRegister = this.fb.group({
      initials: ['', [Validators.required, Validators.pattern('^[a-zA-Z][a-zA-Z_]{2}$')]],
      dob: ['', [Validators.required]],
      Gender: ['', Validators.required],
      Race: ['', Validators.required],
      ICF: ['', Validators.required],
      icf_date: [null, Validators.required]
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
    console.log(this.frmRegister.value);
  }

}
