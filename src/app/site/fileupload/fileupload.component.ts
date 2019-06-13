import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SiteService } from '../site.service';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/alert.service';

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
  fileName = '';
  approvedType: string[] = ['image/jpeg', 'image/png', 'image/tiff'];
  fileTypeMark = 'close';
  fileSizeMark = 'close';


    constructor(
    private siteService: SiteService,
    private fb: FormBuilder,
    private alert: AlertService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.patID = this.activatedRoute.snapshot.paramMap.get('patID');
    this.visitID = this.activatedRoute.snapshot.paramMap.get('visitID');
    this.siteService.getPatientByID(this.patID).subscribe((data: any) => {
      this.patient = data;
    });
    this.form = this.fb.group({
      file: ['', Validators.required]
    });
  }

  getRefNumber(patID, prefix) {
    return `${prefix}-` + String('00' + patID).slice(-3);
  }

  onFileChange(event) {
    this.fileTypeMark = 'close';
    this.fileSizeMark = 'close';
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log('FIle Type:', file.type);
      if (this.approvedType.includes(file.type)) {
        this.fileTypeMark = 'check';
      } else {
        this.alert.error('Please upload only images');
        this.fileTypeMark = 'close';
      }
      if (Math.round(file.size / (1024 * 1024)) < 5) {
        this.fileSizeMark = 'check';
      } else {
        this.alert.error('File size must be less than 5 MB');
        this.fileSizeMark = 'close';
      }
      if (this.fileSizeMark === 'check' && this.fileTypeMark === 'check') {
        this.form.get('file').setValue(file);
      } else {
        this.form.get('file').setValue('');
      }
    }
  }

  onSubmit() {
    if (this.form.valid) {
      const formData = new FormData();
      formData.append('file', this.form.get('file').value);
      formData.append('patient_id', this.patID);
      formData.append('visit_id', this.visitID);
      this.siteService.uploadFile(formData).subscribe(
        (res) => {
          this.uploadResponse = res;
          if (res.status === 'success') {
            this.alert.success(res.message);
            this.fileName = res.filePath;
          }
        },
        (err) => { this.error = err; this.alert.error(err); }
      );
    }
  }



}
