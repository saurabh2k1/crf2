import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/admin.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Study } from 'src/app/models/study';

@Component({
  selector: 'app-crf-edit',
  templateUrl: './crf-edit.component.html',
  styleUrls: ['./crf-edit.component.scss']
})
export class CrfEditComponent implements OnInit {

  newForm: FormGroup;
  isLoading = false;
  studies: Study;
  visits: any;
  id: string;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private activatedRoutes: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.newForm = this.fb.group({
      code: [''],
      name: [''],
      visits: [[null]],
    });
    this.id = this.activatedRoutes.snapshot.paramMap.get('id');
    this.isLoading = true;
    this.adminService.getForm(this.id).subscribe((data: any) => {
      this.newForm.patchValue(data);
      this.studies = data.study;
      this.studyChange();
      this.isLoading = false;
    });
  }

  get f() {
    return this.newForm.controls;
  }

  studyChange() {
    const study_id = this.studies._id;
    this.adminService.getVisit(study_id).subscribe((data: any) => {
      this.visits = data;
    });
  }

  onSave() {
    this.isLoading = true;
    console.log(`Form Value: ${this.newForm.value}`);
    this.adminService.updateForm(this.newForm.value, this.id).subscribe(res => {
      console.log(res);
      alert(res.msg);
      this.isLoading = false;
      this.router.navigate(['admin/crfs']);
    }, err => {
      console.log(err);
      this.isLoading = false;
    });
  }

}
