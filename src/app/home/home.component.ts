import { AlertService } from './../alert.service';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Role } from '../models/role';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService,
    private router: Router,
    private alertService: AlertService) { }

  ngOnInit() {
    const user = this.authService.currentUserValue;
    if (user) {
      switch (user.role) {
        case Role.Admin:
        this.router.navigate(['/admin']);
        break;
      case Role.User:
        this.router.navigate(['/site']);
        break;
      default:
        this.alertService.error('You are not authorised to access any pages. Please contact system administrator.!');
        break;
      }
    }
  }

}
