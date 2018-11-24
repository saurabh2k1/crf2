import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SiteService {

  private siteChange = new BehaviorSubject({id: '', name: ''});
  public site = this.siteChange.asObservable();
  constructor(private http: HttpClient) { }

   setSite(id: string, name: string) {
    this.siteChange.next({id: id, name: name});
    localStorage.setItem('site', JSON.stringify({id: id, name: name}));
   }

   getSite(): Observable<any> {
    return this.http.get(`http://lumen-api.test/api/site`);
   }

}
