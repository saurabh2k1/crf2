import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SiteService } from '../site.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.scss']
})
export class FileuploadComponent implements OnInit {

  form: FormGroup;
  error: string;
  uploadResponse = { status: '', message: '', filePath: ''};
  patID = '';
  visitID = '';
  pageTitle = 'File Upload';
  patient: any;

    constructor(
    private siteService: SiteService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.patID = this.activatedRoute.snapshot.paramMap.get('patID');
    this.visitID = this.activatedRoute.snapshot.paramMap.get('visitID');
    this.siteService.getPatientByID(this.patID).subscribe((data: any) => {
      this.patient = data;
    });
    this.form = this.fb.group({
      file: ['']
    });
  }

  getRefNumber(patID, prefix) {
    return `${prefix}-` + String('00' + patID).slice(-3);
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('file').setValue(file);
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.form.get('file').value);
    formData.append('patient_id', this.patID);
    formData.append('visit_id', this.visitID);
    this.siteService.uploadFile(formData).subscribe(
      (res) => this.uploadResponse = res,
      (err) => this.error = err
    );
  }



}
