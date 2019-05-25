import { Component, OnInit, Input, Output, EventEmitter, OnChanges  } from '@angular/core';
import { FieldConfig, Validator } from '../../field.interface';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { validateStyleParams } from '@angular/animations/browser/src/util';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dynamic-form',
  template: `
  <form class="dynamic-form" [formGroup]="form" (submit)="onSubmit($event)">
  <ng-container *ngFor="let field of fields;" dynamicField [field]="field" [group]="form">
  </ng-container>
  </form>
  `,
  styles: []
})
export class DynamicFormComponent implements OnInit {

  @Input() fields: FieldConfig[] = [];

  @Output() submit: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;

  get value() {
    return this.form.value;
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    console.log('DynamicForm');
    this.form = this.createControl();
  }

  createControl() {
    console.log('CreateControl');
    const group = this.fb.group({});
    this.fields.forEach(field => {
      if (field.type === 'button') { return; }
      const control = this.fb.control(
        field.value, this.bindValidations(field.validations || [])
      );

      group.addControl(field.name, control);

    });

    return group;
  }

  bindValidations(validations: any) {
    console.log('bindValidations');
    if (validations.length > 0) {
      const validList = [];
      validations.forEach(valid => {
        console.log(`Validation: ${valid.name}`);
        switch (valid.validator) {
          case 'Validators.min':
            validList.push(Validators.min(parseInt(valid.value, 10)));
            break;
          case 'Validators.max':
            validList.push(Validators.max(parseInt(valid.value, 10)));
            break;
          case 'Validators.pattern':
            validList.push(Validators.pattern(valid.value));
            break;
          case 'Validators.required':
            validList.push(Validators.required);
            break;
          default:
            break;
        }
      });
      console.log(validList);
      return Validators.compose(validList);
    }
    return null;
  }

  onSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.form.valid) {
      this.submit.emit(this.form.value);
    } else {
      this.validateAllFormFields(this.form);
    }
  }

  validateAllFormFields (formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      control.markAsTouched({onlySelf: true});
    });
  }

}
