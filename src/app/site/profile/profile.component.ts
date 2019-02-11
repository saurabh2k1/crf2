import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from './../../alert.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { SiteService } from '../site.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  selectedFile: File;
  frmProfile: FormGroup;
  imageURL: any = './assets/img/default-avatar.png';
  email: string;
  user: any;
  constructor(private alertService: AlertService,
    private fb: FormBuilder,
    private authService: AuthService,
    private siteService: SiteService) { }

  ngOnInit() {
    this.user = this.authService.currentUserValue;
    this.email = this.user.email;

    this.frmProfile = this.fb.group({
      firstName: [this.user.first_name, Validators.required],
      lastName: [this.user.last_name, Validators.required],
      email: [this.email, [Validators.required, Validators.email]],
      profile: [null]
    });
  }

  isFieldValid(form: FormGroup, field: string) {
    return !form.get(field).valid && form.get(field).touched;
  }

  displayFieldCss(form: FormGroup, field: string) {
    return {
      'has-error': this.isFieldValid(form, field),
      'has-feedback': this.isFieldValid(form, field)
    };
  }

  onFileChange(event) {
    this.selectedFile = event.target.files[0];
    const mimeType = this.selectedFile.type;
    if (mimeType.match(/image\/*/) == null) {
      this.alertService.warn('Only images are supported.');
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = (_event) => {
      this.imageURL = reader.result;
    };
  }

  onSave() {
    console.log(this.frmProfile);
    this.siteService.saveProfile(this.frmProfile.value, this.user._id).subscribe( data => {
      this.alertService.success('Profile Updated');
    }, err => {
      this.alertService.error(err);
    });
  }

}
