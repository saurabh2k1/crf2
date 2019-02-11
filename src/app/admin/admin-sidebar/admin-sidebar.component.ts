import { Component, OnInit } from '@angular/core';
import PerfectScrollbar from 'perfect-scrollbar';
import { AuthService } from 'src/app/auth/auth.service';

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
  { path: './studies', title: 'Studies', type: 'link', icontype: 'school'},
  { path: './sites', title: 'Sites', type: 'link', icontype: 'place'},
  { path: './users', title: 'Users', type: 'link', icontype: 'person'},
  { path: './visits', title: 'Visits', type: 'link', icontype: 'pets'},
  { path: './crfs', title: 'CRF Forms', type: 'link', icontype: 'assignment'},

];

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.scss']
})
export class AdminSidebarComponent implements OnInit {
  public menuItems: any[];
  user: any;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.user = this.authService.currentUserValue;
    this.menuItems = ROUTES.filter(menuItem => menuItem);

  }

  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
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

}
