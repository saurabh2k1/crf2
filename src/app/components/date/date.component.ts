import { Component, OnInit } from '@angular/core';
import { FieldConfig } from '../../field.interface';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-date',
  template: `
  <mat-form-field class="demo-full-width margin-top" [formGroup]="group">
  <input matInput [matDatepicker]="picker" [formControlName]="field.name" [placeholder]="field.label" style="color:black;">
  <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
  <mat-datepicker #picker></mat-datepicker>
  <mat-hint></mat-hint>
  <ng-container *ngFor="let validation of field.validations;" ngProjectAs="mat-error">
  <mat-error *ngIf="group.get(field.name).hasError(validation.name)">{{validation.message}}</mat-error>
  </ng-container>
  </mat-form-field>
  `,
  styles: ['.hidden { display: none !important;}']
})
export class DateComponent implements OnInit {
  field: FieldConfig;

  group: FormGroup;

  constructor() { }

  ngOnInit() {
  }
  isShown(): Boolean {
    if (this.field.ngShow_field && this.field.ngShow_value) {
      if (this.group.controls[this.field.ngShow_field].value === this.field.ngShow_value) {
        return false;
      } else {
        return true;
      }
    }
    return false;
  }

}
