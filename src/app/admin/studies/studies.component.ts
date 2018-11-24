import { Component, OnInit } from '@angular/core';
import { Study } from 'src/app/models/study';
import { AdminService } from 'src/app/admin.service';
import { getSupportedInputTypes } from '@angular/cdk/platform';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Site } from 'src/app/models/site';

@Component({
  selector: 'app-studies',
  templateUrl: './studies.component.html',
  styleUrls: ['./studies.component.scss']
})
export class StudiesComponent implements OnInit {
  studies: Study[] = [];
  sites: Site[] = [];
  showList = false;
  showNew = false;
  frmStudy: FormGroup;
  constructor(private adminService: AdminService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.frmStudy = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      sites: [[]],
    });
    this.activatedRoute.data.subscribe(data => {
      switch (data.kind) {
        case 'list':
          this.showNew = false;
          this.getStudy();
          this.showList = true;
          break;

        case 'create':
          this.showList = false;
          this.getSites();
          this.showNew = true;
          break;
        default:
          break;
      }
    });

  }

  getStudy() {
    this.adminService.getStudies().subscribe((study: Study[]) => {
      this.studies = study;
      console.log(study);
    });
  }

  getSites() {
    this.adminService.getSites().subscribe((data: any) => {
      this.sites = data;
    });
  }

  onSave() {
    this.adminService.saveStudy(this.frmStudy.value).subscribe(data => {
      console.log(data);
      this.showNew = false;
      this.getStudy();
      this.showList = true;
    }, err => {
      console.log(err.error);
    });
  }
}
