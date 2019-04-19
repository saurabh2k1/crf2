import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from 'src/app/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-manage-visit',
  templateUrl: './manage-visit.component.html',
  styleUrls: ['./manage-visit.component.scss']
})
export class ManageVisitComponent implements OnInit {

  showNew = true;
  isEdit = false;
  studies: any;
  visits: any;
  id: any;
  frmVisit: FormGroup;
  displayedColumn: string[] = ['code', 'description', 'study', 'actions' ];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private adminService: AdminService,
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.adminService.getStudies().subscribe((data: any) => {
      this.studies = data;
    });

    this.frmVisit = this.fb.group({
      study: [],
      code: ['', Validators.required],
      name: ['', Validators.required],
      min_days: [, Validators.required],
      max_days: [, Validators.required],
      isRepeating: [false]
    });

    this.activatedRoute.data.subscribe(data => {
      switch (data.kind) {
        case 'list':
          this.showNew = false;
          this.isEdit = false;
          this.getVisits();

          break;
        case 'create':
          this.showNew = true;
          this.isEdit = false;
          break;
        case 'edit':
          this.id = this.activatedRoute.snapshot.paramMap.get('id');
          this.showEdit(this.id);
          this.showNew = true;
          this.isEdit = true;
          break;
        default:

          this.showNew = true;
          break;
      }
    });
  }

  getVisits() {
    this.adminService.getVisit().subscribe((visits: any) => {
      this.visits = visits;
      this.dataSource = new MatTableDataSource<any>(visits);
      this.dataSource.paginator = this.paginator;
      console.log(visits);
    }, err => {
      console.log(err);
    });
  }

  showEdit(id: any) {
    this.adminService.getSingleVisit(id).subscribe((visit: any) => {
      this.frmVisit.patchValue(visit[0]);
      this.frmVisit.get('name').patchValue(visit[0].description);
      this.frmVisit.get('study').patchValue(visit[0].study.name);
    });
  }

  save() {
    console.log(this.frmVisit.value);
    if (this.isEdit) {
      this.adminService.updateVisit(this.id, this.frmVisit.value).subscribe((data: any) => {
        console.log(data);
        this.route.navigate(['/admin/visits']);
      }, err => {
        console.log(err);
      });

    } else {
      this.adminService.saveVisit(this.frmVisit.value).subscribe((data: any) => {
        console.log(data);
        this.route.navigate(['/admin/visits']);
      }, err => {
        console.log(err);
      });
    }
  }

}
