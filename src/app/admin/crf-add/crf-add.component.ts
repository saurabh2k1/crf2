import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-crf-add',
  templateUrl: './crf-add.component.html',
  styleUrls: ['./crf-add.component.scss']
})
export class CrfAddComponent implements OnInit {
  newForm: FormGroup;
  isLoadingResult = false;
  studies: any;
  visits: any;
  constructor(private router: Router, private adminService: AdminService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.adminService.getStudies().subscribe((data: any) => {
      this.studies = data;
    });
    this.newForm = this.formBuilder.group({
      'study': [null, Validators.required],
      code: [null, Validators.required],
      name: [null, Validators.required],
      visits: [[null]],
    });
  }

  studyChange(event) {
    const study_id = event;
    alert(study_id);
    this.adminService.getVisit(study_id).subscribe((data: any) => {
      this.visits = data;
    });
  }
  onSave() {
    this.isLoadingResult = true;
    console.log(`Form Value: ${this.newForm.value}`);
    this.adminService.addForm(this.newForm.value).subscribe(res => {
      const id = res['id'];
      this.isLoadingResult = false;
      this.router.navigate(['admin/crf-details', id]);
    }, err => {
      console.log(err);
      this.isLoadingResult = false;
    });
  }

}
