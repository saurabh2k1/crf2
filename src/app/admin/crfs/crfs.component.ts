import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin.service';

@Component({
  selector: 'app-crfs',
  templateUrl: './crfs.component.html',
  styleUrls: ['./crfs.component.scss']
})
export class CrfsComponent implements OnInit {

  studies: any;
  studyId = '';
  forms: any;
  isLoadingResult = true;
  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.getStudies();
  }

  getForms(event): void {
    this.isLoadingResult = true;
    this.studyId = event.source.value;
    this.adminService.getAllForms(this.studyId).subscribe( data => {
      this.forms = data;
      this.isLoadingResult = false;
    });
  }

  getStudies(): void {
    this.adminService.getStudies().subscribe((data: any) => {
      this.studies = data;
      this.isLoadingResult = false;
    });
  }

}
