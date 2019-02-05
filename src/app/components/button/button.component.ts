import { Component, OnInit } from '@angular/core';
import { FieldConfig } from '../../field.interface';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-button',
  template: `
  <div class="demo-full-width margin-top" [formGroup]="group">
  <button type="submit" mat-raised-button color="primary">{{field.label}}</button>
  </div>
  `,
  styles: []
})
export class ButtonComponent implements OnInit {
  field: FieldConfig;
  
  group: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
