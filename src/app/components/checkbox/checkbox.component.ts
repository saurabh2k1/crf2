import { Component, OnInit } from '@angular/core';
import { FieldConfig } from '../../field.interface';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  template: `
  <div class="demo-full-width margin-top" [formGroup]="group" >
  <mat-checkbox [formControlName]="field.name">{{field.label}}</mat-checkbox>
  </div>
  `,
  styles: []
})
export class CheckboxComponent implements OnInit {
  field: FieldConfig;

  group: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
