import { FormGroup, FormBuilder } from '@angular/forms';
import { CPDialogData } from './../../models/cp-dialogData';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-change-password-modal',
  templateUrl: './change-password-modal.component.html',
  styleUrls: ['./change-password-modal.component.scss']
})
export class ChangePasswordModalComponent implements OnInit {

  userId: string;
  userName: string;
  password: string;
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ChangePasswordModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CPDialogData) {
    this.userId  = data.userId;
    this.userName = data.name;
    this.password = data.password;
   }

  ngOnInit() {
    this.form = this.fb.group({
      userId: [this.userId, []],
      password: [this.password, []],
    });
  }

  save(): void {
    this.dialogRef.close(this.form.value);

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
