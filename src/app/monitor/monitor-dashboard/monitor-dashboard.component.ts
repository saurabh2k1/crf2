import { Site } from 'src/app/models/site';
import { MonitorService } from './../monitor.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-monitor-dashboard',
  templateUrl: './monitor-dashboard.component.html',
  styleUrls: ['./monitor-dashboard.component.scss'],
})
export class MonitorDashboardComponent implements OnInit {

  studyID: string;
  sites: Site[];
  /** Based on the screen size, switch from standard to one column per row */
  // cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
  //   map(({ matches }) => {
  //     if (matches) {
  //       return [
  //         { title: 'Sites', cols: 1, rows: 1 },
  //         { title: 'Card 2', cols: 1, rows: 1 },
  //         { title: 'Card 3', cols: 1, rows: 1 },
  //         { title: 'Card 4', cols: 1, rows: 1 }
  //       ];
  //     }

  //     return [
  //       { title: 'Sites', cols: 2, rows: 1 },
  //       { title: 'Card 2', cols: 1, rows: 1 },
  //       { title: 'Card 3', cols: 1, rows: 2 },
  //       { title: 'Card 4', cols: 1, rows: 1 }
  //     ];
  //   })
  // );

  constructor(
    // private breakpointObserver: BreakpointObserver,
    private monitorService: MonitorService,
    private toastr: ToastrService) {}

  ngOnInit(): void {
    if (localStorage.getItem('study')) {
      this.studyID = JSON.parse(localStorage.getItem('study')).id;
    }
    this.monitorService.getSites(this.studyID).subscribe(data => {
      if (data.sites) {
        this.sites = data.sites;
      }
    },
    err=>{
      this.toastr.error(err);
    });
  }

  onSelectSite(site: Site) {
    this.toastr.info(`You have selected ${site.name}`);
    localStorage.setItem('selectedSite', JSON.stringify(site));
  }
}
