import { ActivatedRoute } from '@angular/router';
import { DynamicFormComponent } from './../../components/dynamic-form/dynamic-form.component';
import { AdminService } from 'src/app/admin.service';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-crf-display',
  templateUrl: './crf-display.component.html',
  styleUrls: ['./crf-display.component.scss']
})
export class CrfDisplayComponent implements OnInit {
  formID: string;
  theForm: any;
  fields: any[];
  @ViewChild(DynamicFormComponent) form: any;
  constructor(
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.adminService.getForm(id).subscribe((data: any) => {
      this.fields = data.fields;
      this.form = DynamicFormComponent;
    });


  }

  saveCrForm(event): void {

  }
}
