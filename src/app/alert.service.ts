// import { filter } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Alert, AlertType } from './models/alert';
import { Router, NavigationStart } from '@angular/router';
import 'rxjs/add/operator/filter';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private subject = new Subject<Alert>();
  private keepAfterRouteChange = false;

  constructor(private router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterRouteChange) {
          this.keepAfterRouteChange = false;
        } else {
          this.clear();
        }
      }
    });
   }

   // subscribe to alerts
   getAlert(alertId?: string): Observable<any> {
     return this.subject.asObservable().filter((x: Alert) => x && x.alertId === alertId);
   }

   // convenience methods
   success(message: string, keepAfterRouteChange = false) {
    this.alert(new Alert({message, type: AlertType.Success, keepAfterRouteChange}));
   }

   error(message: string, keepAfterRouteChange = false) {
     this.alert(new Alert({message, type: AlertType.Error, keepAfterRouteChange}));
   }

   info(message: string, keepAfterRouteChange = false) {
     this.alert(new Alert({message, type: AlertType.Info, keepAfterRouteChange}));
   }

   warn(message: string, keepAfterRouteChange = false) {
     this.alert(new Alert({message, type: AlertType.Warning, keepAfterRouteChange}));
   }

   // main alert method
   alert(alert: Alert) {
     this.keepAfterRouteChange = alert.keepAfterRouteChange;
     this.subject.next(alert);
   }
   // clear alert
   clear(alertId?: string) {
     this.subject.next(new Alert({alertId}));
   }
}
