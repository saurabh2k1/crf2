import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import {ErrorStateMatcher} from '@angular/material/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AlertService } from '../alert.service';
import { PasswordValidation } from './password-validator.component';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  frmReset: FormGroup;
  frmPassword: FormGroup;
  submitted = false;
  loading = false;
  hasToken = false;
  token: string;
  validPasswordRegister = false;
  validEmailRegister = false;
  validConfirmPasswordRegister = false;
  constructor(private fb: FormBuilder,
  private authService: AuthService,
  private alertService: AlertService,
  private activatedRoute: ActivatedRoute) { }
  matcher = new MyErrorStateMatcher();
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);


  ngOnInit() {
    this.token = this.activatedRoute.snapshot.paramMap.get('token');
    if (this.token) {
      this.hasToken = true;
    }
    this.frmReset = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
    });
    this.frmPassword = this.fb.group({
      email: [null, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      password: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      password_confirmation: [null, Validators.required],
      token: [null],
    }, {
      validator: PasswordValidation.MatchPassword // your validation method
  });
    const body = document.getElementsByTagName('body')[0];
      body.classList.add('lock-page');
      body.classList.add('off-canvas-sidebar');
      // const card = document.getElementsByClassName('card')[0];
        // setTimeout(function() {
        //     // after 1000 ms we add the class animated to the login/register card
        //     card.classList.remove('card-hidden');
        // }, 1000);
  }
  get f() { return this.frmReset.controls; }
  get fp() { return this.frmPassword.controls; }

  sendRequest() {
    this.submitted = true;
    this.loading = true;
    if (this.f.email.errors) {
      this.alertService.error('Please check the email address you eneterd!');
      this.loading = false;
      this.submitted = false;
      return;
    }
    this.authService.sendResetLink(this.frmReset.value).subscribe(data => {
      if (data.success) {
        this.alertService.success('Password reset link sent to this email address.');
      } else {
        this.alertService.error('Please check the email address');
      }
      this.loading = false;
    }, err => {
      this.alertService.error(err);
      this.loading = false;
    });
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

  isFieldValid(form: FormGroup, field: string) {
    return !form.get(field).valid && form.get(field).touched;
  }

  displayFieldCss(form: FormGroup, field: string) {
    return {
      'has-error': this.isFieldValid(form, field),
      'has-feedback': this.isFieldValid(form, field)
    };
  }

  confirmPasswordValidationRegister(e) {
    if (this.frmPassword.controls['password'].value === e) {
        this.validConfirmPasswordRegister = true;
    } else {
      this.validConfirmPasswordRegister = false;
    }
  }

  emailValidationRegister(e) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(e).toLowerCase())) {
        this.validEmailRegister = true;
    } else {
      this.validEmailRegister = false;
    }
  }
  passwordValidationRegister(e) {
    if (e.length > 5) {
        this.validPasswordRegister = true;
    } else {
      this.validPasswordRegister = false;
    }
}

  resetPassword() {
    if (this.frmPassword.valid) {
      this.frmPassword.controls['token'].setValue(this.token);
      this.authService.resetPassword(this.frmPassword.value, this.token).subscribe(data => {
        if (data.success) {
          this.alertService.success('Password reset successful. Please login');
        } else {
          this.alertService.error('Wrong Information');
        }
      }, err => {
        if (err) {
          this.alertService.error('Wrong Information');
        }
      });
    } else {
      this.validateAllFormFields(this.frmPassword);
    }
  }

}

