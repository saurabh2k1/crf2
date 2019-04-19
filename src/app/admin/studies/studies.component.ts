import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Study } from 'src/app/models/study';
import { AdminService } from 'src/app/admin.service';
import { getSupportedInputTypes } from '@angular/cdk/platform';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Site } from 'src/app/models/site';

@Component({
  selector: 'app-studies',
  templateUrl: './studies.component.html',
  styleUrls: ['./studies.component.scss']
})
export class StudiesComponent implements OnInit {
  studies: Study[] = [];
  sites: Site[] = [];
  showList = false;
  showNew = false;
  isEdit = false;
  id: any;
  frmStudy: FormGroup;
  displayedColumn: string[] = [ 'name', 'description', 'site', 'actions' ];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private adminService: AdminService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.frmStudy = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      sites: [[]],
    });
    this.activatedRoute.data.subscribe(data => {
      switch (data.kind) {
        case 'list':
          this.showNew = false;
          this.getStudy();
          this.showList = true;
          break;

        case 'create':
          this.showList = false;
          this.getSites();
          this.showNew = true;
          break;
        case 'edit':
          this.id = this.activatedRoute.snapshot.paramMap.get('id');
          this.isEdit = true;

          this.showEdit(this.id);
          this.showList = false;
          break;
        default:
          break;
      }
    });

  }


  showEdit(id: any): void {
    this.adminService.getStudy(id).subscribe(data => {
      console.log(data);
      this.frmStudy.get('name').patchValue(data.study.name);
      this.frmStudy.get('description').patchValue(data.study.description);
      this.getSites();
      this.frmStudy.controls['sites'].setValue(data.study.sites);
      this.showNew = true;
    }, err => {
      alert(err.error);
      this.showNew = false;
    });
  }

  getStudy() {
    this.adminService.getStudies().subscribe((study: Study[]) => {
      this.studies = study;
      this.dataSource = new MatTableDataSource<any>(study);
      this.dataSource.paginator = this.paginator;
      console.log(study);
    });
  }

  getSites() {
    this.adminService.getSites().subscribe((data: any) => {
      this.sites = data;
    });
  }

  onSave() {
    if (this.isEdit) {
      this.adminService.updateStudy(this.frmStudy.value, this.id)
      .subscribe(data => {
        console.log(data);
        alert(data.msg);
        this.showNew = false;
        this.getStudy();
        this.showList = true;
      }, err => {
        alert(err.error);
      });

    } else {
      this.adminService.saveStudy(this.frmStudy.value).subscribe(data => {
        console.log(data);
        this.showNew = false;
        this.getStudy();
        this.showList = true;
      }, err => {
        console.log(err.error);
      });
    }

  }
}
