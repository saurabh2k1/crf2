import { Component } from '@angular/core';
// import { HTTPStatus } from './helpers/jwt-interceptor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'QDATA EDC';
  HTTPActivity: boolean;

  // constructor(private httpStatus: HTTPStatus) {
  //   this.httpStatus.getHttpStatus().subscribe((status: boolean) => {
  //     this.HTTPActivity = status;
  //     console.log(status);
  //   });
  // }
}
