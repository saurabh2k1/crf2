import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../field.interface';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

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
