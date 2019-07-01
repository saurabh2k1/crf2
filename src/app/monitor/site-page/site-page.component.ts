import { Component, OnInit, ViewChild } from '@angular/core';
import { Site } from 'src/app/models/site';
import { ToastrService } from 'ngx-toastr';
import { MonitorService } from '../monitor.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material';



@Component({
  selector: 'app-site-page',
  templateUrl: './site-page.component.html',
  styleUrls: ['./site-page.component.scss']
})
export class SitePageComponent implements OnInit {

  site: Site;
  visits: any[];
  displayedColumns: string[];

  dataSource: any;

  @ViewChild(MatPaginator) paginator: MatPaginator

  constructor(
    private toastr: ToastrService,
    private monitorService: MonitorService,
  ) { }

  ngOnInit() {
    if (localStorage.getItem('selectedSite')) {
      this.site = JSON.parse(localStorage.getItem('selectedSite'));
    } else {
      this.toastr.error('You have not selected any site');
    }
    this.monitorService.getSiteSummery(this.site._id).subscribe((data: any) => {
      this.visits = data.visits;
      this.displayedColumns = ['patient_id', 'status'];
      console.log(this.visits);
      this.visits.forEach(v => this.displayedColumns.push(v.description));

      this.dataSource = new MatTableDataSource(data.patients);
      this.dataSource.paginator = this.paginator;

    }, err => {
      this.toastr.error(err);
    })



  }

  isObject(val): boolean {
    return (typeof val === 'object');
  }

  isDate(val): boolean {
    if (val) {
      if (val.dov) {
        return true;
      }
      return false;
    }
    return false;
  }

  showValue(ele, col) {
    if (ele[col]) {
      if (typeof ele[col] === 'object') {
        return `${ele[col].dov}  Status: ${ele[col].status}`;
      }
      return ele[col];
    }
    return '-';

  }

}
