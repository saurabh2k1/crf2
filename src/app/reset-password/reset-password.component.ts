import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AlertService } from '../alert.service';

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
  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private alertService: AlertService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const token = this.activatedRoute.snapshot.paramMap.get('token');
    if (token) {
      this.hasToken = true;
    }
    this.frmReset = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
    });
    this.frmPassword = this.fb.group({
      password: [null, [Validators.required, Validators.min(6)]]
    });
    const body = document.getElementsByTagName('body')[0];
      body.classList.add('lock-page');
      body.classList.add('off-canvas-sidebar');
      const card = document.getElementsByClassName('card')[0];
        setTimeout(function() {
            // after 1000 ms we add the class animated to the login/register card
            card.classList.remove('card-hidden');
        }, 1000);
  }
  get f() { return this.frmReset.controls; }
  get fp() { return this.frmPassword.controls;}

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

  resetPassword() {
    
  }

}

