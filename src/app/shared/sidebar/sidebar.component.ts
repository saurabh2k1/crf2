import { Component, OnInit } from '@angular/core';
import PerfectScrollbar from 'perfect-scrollbar';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

declare const $: any;
// Metadata
export interface RouteInfo {
  path: string;
  title: string;
  type: string;
  icontype: string;
  collapse?: string;
  children?: ChildrenItems[];
}

export interface ChildrenItems {
  path: string;
  title: string;
  ab: string;
  type?: string;
}

export const ROUTES: RouteInfo[] = [
  {
    path: './dashboard',
    title: 'Dashboard',
    type: 'link',
    icontype: 'dashboard'
  },
  {path: './patients', title: 'Patients', type: 'link', icontype: 'assignment_ind'},
  {path: './visits', title: 'Visits', type: 'link', icontype: 'pets'},
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public menuItems: any[];

  userName = '';
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    const user = this.authService.currentUserValue;
    this.userName = user.first_name + ' ' + user.last_name;
    this.menuItems = ROUTES.filter(menuItem => menuItem);

  }

  updatePS(): void  {
    if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
        const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');
        const ps = new PerfectScrollbar(elemSidebar, { wheelSpeed: 2, suppressScrollX: true });
    }
  }
  isMac(): boolean {
    let bool = false;
    if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
        bool = true;
    }
    return bool;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
