import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { TimeoutService } from './_services/timeout.service';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'QDATA EDC';
  user = '';

  constructor(private timeOutService: TimeoutService,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router) {
    this.timeOutService.startWatching(300).subscribe((res) => {
      if(res) {

        this.authService.logout();
        this.router.navigate(['/login']);
        this.toastr.warning('Session Expired!');

      }
    });
  }
}
