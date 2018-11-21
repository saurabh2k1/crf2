import { Component, OnInit } from '@angular/core';
import { Study } from 'src/app/models/study';
import { AdminService } from 'src/app/admin.service';
import { getSupportedInputTypes } from '@angular/cdk/platform';

@Component({
  selector: 'app-studies',
  templateUrl: './studies.component.html',
  styleUrls: ['./studies.component.scss']
})
export class StudiesComponent implements OnInit {
  studies: Study[] = [];

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.getStudy();
  }

  getStudy() {
    this.adminService.getStudies().subscribe((study: Study[]) => {
      this.studies = study;
      console.log(study);
    });
  }
}
