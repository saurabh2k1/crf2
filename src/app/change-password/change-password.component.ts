import { AlertService } from './../alert.service';
import { AuthService } from 'src/app/auth/auth.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  frmPassword: FormGroup;
  emailid: string;
  submitted = false;
  loading = false;
  validPasswordRegister = false;
  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.emailid = this.authService.currentUserValue.email;
    this.frmPassword = this.fb.group({
      email: [this.emailid],
      password: [null, Validators.required],
      newpassword: [null, [Validators.required, Validators.min(6)]]
    });
  }

  get f() { return this.frmPassword.controls; }

  isFieldValid(form: FormGroup, field: string) {
    return !form.get(field).valid && form.get(field).touched;
  }
  displayFieldCss(form: FormGroup, field: string) {
    return {
      'has-error': this.isFieldValid(form, field),
      'has-feedback': this.isFieldValid(form, field)
    };
  }
  passwordValidationRegister(e) {
    if (e.length > 5) {
        this.validPasswordRegister = true;
    } else {
      this.validPasswordRegister = false;
    }
}
validateAllFormFields(formGroup: FormGroup) {
  Object.keys(formGroup.controls).forEach(field => {
    const control = formGroup.get(field);
    if (control instanceof FormControl) {
      control.markAsTouched({ onlySelf: true });
    } else if (control instanceof FormGroup) {
      this.validateAllFormFields(control);
    }
  });
}
resetPassword() {
  if (this.frmPassword.valid) {
    this.authService.changePassword(this.frmPassword.value).subscribe(data => {
      console.log(data);
        this.alertService.success('Password changed successfully.');
    }, err => {
      if (err) {
        this.alertService.error('There was a problem changing the password.');
      }
    });
  } else {
    this.validateAllFormFields(this.frmPassword);
  }
}

}
