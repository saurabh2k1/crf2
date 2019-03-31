import { AlertService } from './../alert.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { first } from 'rxjs/operators';
import { Role } from '../models/role';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  frmLogin: FormGroup;
  returnUrl: string;
  loading = false;
  submitted = false;
  error = '';

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService) {
      // redirect to home if already logged in
      if (this.authService.currentUserValue) {
        this.router.navigate(['/']);
      }
    }

  ngOnInit() {
    // const card = document.getElementsByClassName('card')[0];
    // setTimeout(function() {
    //   card.classList.remove('card-hidden');
    // }, 700);
    this.frmLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    // this.authService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() { return this.frmLogin.controls; }

  onLogin() {
    this.submitted = true;
    if (this.frmLogin.invalid) { return; }
    this.loading = true;
    this.authService.login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          if (data) {
            switch (data.role) {
              case Role.Admin:
                this.router.navigate(['/admin']);
                break;
              case Role.User:
                this.router.navigate(['/site']);
                break;
              case Role.Monitor:
                this.router.navigate(['/monitor']);
                break;
              default:
                this.router.navigate(['/login']);
                break;
            }
          }
        },
        error => {
          // this.error = error;
          this.alertService.error('Wrong username or password!');
          this.loading = false;
        });
  }
}
