import { FieldConfig } from './../../field.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent implements OnInit {

  field: FieldConfig;
  constructor() { }

  ngOnInit() {
  }

}
