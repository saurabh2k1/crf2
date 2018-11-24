import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavbarComponent } from 'src/app/shared/navbar/navbar.component';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { Location, PopStateEvent } from '@angular/common';
import { filter } from 'rxjs/operators';
import PerfectScrollbar from 'perfect-scrollbar';
import { SiteService } from '../site.service';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.scss']
})
export class SiteComponent implements OnInit, AfterViewInit {

  private lastPoppedUrl: string;
  private _router: Subscription;
  private yScrollStack: number[] = [];
  location: Location;

  @ViewChild('sidebar') sidebar: any;
  @ViewChild(NavbarComponent) navbar: NavbarComponent;

  constructor(private router: Router, location: Location, private siteService: SiteService) {
    this.location = location;
   }

   ngOnInit() {
     const site = JSON.parse(localStorage.getItem('site'));
     if (site) {
       this.siteService.setSite(site.id, site.name);
     } else {
       this.siteService.getSite().subscribe((data: any) => {
         this.siteService.setSite(data[0].id, data[0].name);
       });
     }
    const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
    const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');
    this.location.subscribe((ev: PopStateEvent) => {
      this.lastPoppedUrl = ev.url;
    });
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        if (event.url !== this.lastPoppedUrl) {
          this.yScrollStack.push(window.scrollY);
        }
      } else if (event instanceof NavigationEnd) {
        if (event.url === this.lastPoppedUrl) {
          this.lastPoppedUrl = undefined;
          window.scrollTo(0, this.yScrollStack.pop());
        } else {
          window.scrollTo(0, 0);
        }
      }
    });
    this._router = this.router.events.pipe(filter(event => event instanceof NavigationEnd))
    .subscribe((event: NavigationEnd) => {
      elemMainPanel.scrollTop = 0;
      elemSidebar.scrollTop = 0;
    });

    const html = document.getElementsByTagName('html')[0];
    if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
      let ps = new PerfectScrollbar(elemMainPanel);
      ps = new PerfectScrollbar(elemSidebar);
      html.classList.add('perfect-scrollbar-on');
    } else {
      html.classList.add('perfect-scrollbar-off');
    }
    this._router = this.router.events.pipe(filter(event => event instanceof NavigationEnd))
    .subscribe((event: NavigationEnd) => {
      this.navbar.sidebarClose();
    });

  }

  ngAfterViewInit() {
    this.runOnRouteChange();
  }
  public isMap() {
      if (this.location.prepareExternalUrl(this.location.path()) === '/maps/fullscreen') {
          return true;
      } else {
          return false;
      }
  }
  runOnRouteChange(): void {
    if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
      const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');
      const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
      let ps = new PerfectScrollbar(elemMainPanel);
      ps = new PerfectScrollbar(elemSidebar);
      ps.update();
    }
  }

  isMac(): boolean {
    let bool = false;
    if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
        bool = true;
    }
    return bool;
  }

}
