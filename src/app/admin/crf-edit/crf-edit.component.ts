import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/admin.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crf-edit',
  templateUrl: './crf-edit.component.html',
  styleUrls: ['./crf-edit.component.scss']
})
export class CrfEditComponent implements OnInit {

  newForm: FormGroup;
  isLoading = false;
  studies: any;
  visits: any;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private activatedRoutes: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.newForm = this.fb.group({
      study: [null, []],
      code: [null],
      name: [null],
      visits: [[null]],
    });
    const id = this.activatedRoutes.snapshot.paramMap.get('id');
    this.isLoading = true;
    this.adminService.getStudies().subscribe((data: any) => {
      this.studies = data;
    });
    this.adminService.getForm(id).subscribe((data: any) => {
      this.newForm.patchValue(data);
      this.isLoading = false;
    });
  }

  studyChange(event) {
    const study_id = event;
    this.adminService.getVisit(study_id).subscribe((data: any) => {
      this.visits = data;
    });
  }

  onSave() {
    this.isLoading = true;
    console.log(`Form Value: ${this.newForm.value}`);
    this.adminService.addForm(this.newForm.value).subscribe(res => {
      const id = res['id'];
      this.isLoading = false;
      this.router.navigate(['admin/crf-details', id]);
    }, err => {
      console.log(err);
      this.isLoading = false;
    });
  }

}
