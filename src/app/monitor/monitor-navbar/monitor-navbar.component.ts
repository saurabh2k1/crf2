import { AuthService } from './../../auth/auth.service';
import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ROUTES } from 'src/app/shared/sidebar/sidebar.component';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Location } from '@angular/common';
import { StudyService } from 'src/app/study.service';

const misc: any = {
  navbar_menu_visible: 0,
  active_collapse: true,
  disabled_collapse_init: 0,
};

declare var $: any;

@Component({
  selector: 'app-monitor-navbar',
  templateUrl: './monitor-navbar.component.html',
  styleUrls: ['./monitor-navbar.component.scss']
})
export class MonitorNavbarComponent implements OnInit {

  private listTitles: any[];
  private toggleButton: any;
  location: Location;
  private _router: Subscription;
  private sidebarVisible: boolean;
  mobile_menu_visible: any = 0;
  private nativeElement: Node;
  studyName: string;
  constructor(
    private authService: AuthService,
    private router: Router,
    private element: ElementRef,
    private studyService: StudyService,
    location: Location) {
      this.location = location;
      this.nativeElement = element.nativeElement;
      this.sidebarVisible = false;
     }

  ngOnInit() {
    const study = JSON.parse(localStorage.getItem('study'));
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    if (study) {
      this.studyName = study.name;
    } else {
      this.studyService.study.subscribe((s: any) => {
        this.studyName = s.name;
      });
    }
    const navbar: HTMLElement = this.element.nativeElement;
    const body = document.getElementsByTagName('body')[0];
    this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
    if (body.classList.contains('sidebar-mini')) {
        misc.sidebar_mini_active = true;
    }
    if (body.classList.contains('hide-sidebar')) {
        misc.hide_sidebar_active = true;
    }
    this._router = this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      this.sidebarClose();
      const $layer = document.getElementsByClassName('close-layer')[0];
      if ($layer) {
        $layer.remove();
      }
    });
  }

  hideSidebar() {
    const body = document.getElementsByTagName('body')[0];
    const sidebar = document.getElementsByClassName('sidebar')[0];

    if (misc.hide_sidebar_active === true) {
        setTimeout(function() {
            body.classList.remove('hide-sidebar');
            misc.hide_sidebar_active = false;
        }, 300);
        setTimeout(function () {
            sidebar.classList.remove('animation');
        }, 600);
        sidebar.classList.add('animation');

    } else {
        setTimeout(function() {
          body.classList.add('hide-sidebar');
            // $('.sidebar').addClass('animation');
            misc.hide_sidebar_active = true;
        }, 300);
    }

    // we simulate the window Resize so the charts will get updated in realtime.
    const simulateWindowResize = setInterval(function() {
        window.dispatchEvent(new Event('resize'));
    }, 180);

    // we stop the simulation of Window Resize after the animations are completed
    setTimeout(function() {
        clearInterval(simulateWindowResize);
    }, 1000);
  }
  onResize(event) {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }

  minimizeSidebar() {

    const body = document.getElementsByTagName('body')[0];
    if (misc.sidebar_mini_active === true) {
      body.classList.remove('sidebar-mini');
      misc.sidebar_mini_active = false;

    } else {
        setTimeout(function() {
            body.classList.add('sidebar-mini');

            misc.sidebar_mini_active = true;
        }, 300);
    }
    // we simulate the window Resize so the charts will get updated in realtime.
    const simulateWindowResize = setInterval(function() {
      window.dispatchEvent(new Event('resize'));
    }, 180);

    // we stop the simulation of Window Resize after the animations are completed
    setTimeout(function() {
        clearInterval(simulateWindowResize);
    }, 1000);
  }

  sidebarOpen() {
    const $toggle = document.getElementsByClassName('navbar-toggler')[0];
    const toggleButton = this.toggleButton;
    const body = document.getElementsByTagName('body')[0];
    setTimeout(function() {
        toggleButton.classList.add('toggled');
    }, 500);
    body.classList.add('nav-open');
    setTimeout(function() {
        $toggle.classList.add('toggled');
    }, 430);

    const $layer = document.createElement('div');
    $layer.setAttribute('class', 'close-layer');


    if (body.querySelectorAll('.main-panel')) {
        document.getElementsByClassName('main-panel')[0].appendChild($layer);
    } else if (body.classList.contains('off-canvas-sidebar')) {
        document.getElementsByClassName('wrapper-full-page')[0].appendChild($layer);
    }

    setTimeout(function() {
        $layer.classList.add('visible');
    }, 100);
    $layer.onclick = function() { // asign a function
      body.classList.remove('nav-open');
      this.mobile_menu_visible = 0;
      this.sidebarVisible = false;

      $layer.classList.remove('visible');
      setTimeout(function() {
          $layer.remove();
          $toggle.classList.remove('toggled');
      }, 400);
    }.bind(this);
    body.classList.add('nav-open');
    this.mobile_menu_visible = 1;
    this.sidebarVisible = true;
  }

  sidebarClose() {
    const $toggle = document.getElementsByClassName('navbar-toggler')[0];
    const body = document.getElementsByTagName('body')[0];
    this.toggleButton.classList.remove('toggled');
    const $layer = document.createElement('div');
    $layer.setAttribute('class', 'close-layer');

    this.sidebarVisible = false;
    body.classList.remove('nav-open');
    // $('html').removeClass('nav-open');
    body.classList.remove('nav-open');
    if ($layer) {
        $layer.remove();
    }

    setTimeout(function() {
        $toggle.classList.remove('toggled');
    }, 400);

    this.mobile_menu_visible = 0;
  }

  sidebarToggle() {
    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
        this.sidebarClose();
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
