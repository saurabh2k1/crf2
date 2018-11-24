import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Site } from './models/site';
import { User } from './models/user';
import { Study } from './models/study';



@Injectable({
  providedIn: 'root'
})
export class AdminService {

  apiUrl = 'http://lumen-api.test';

  constructor(private http: HttpClient) {

   }

  getSites(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/sites`);
  }

  getUsers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users`);
  }

  getStudies(siteId?: number): Observable<any> {
    if (siteId) {
      return this.http.get<any>(`${this.apiUrl}/sites/${siteId}/studies`);
    } else {
      return this.http.get<any>(`${this.apiUrl}/studies`);
    }

  }

  getRoles(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/roles`);
  }

  saveSite(newSite: Site): Observable<any> {
    return this.http.post(`${this.apiUrl}/sites/new`, newSite);
  }

  saveUser(newUser: User): Observable<any> {
    const headers = new HttpHeaders({
      'Registration-Access-Key' : 'e156a30c-6c57-4490-a8a2-c280da6ebff8',
    });
    const options = {headers: headers};
    return this.http.post(`${this.apiUrl}/register/email`, newUser, options);
  }

  saveStudy(newStudy: Study): Observable<any> {
    return this.http.post(`${this.apiUrl}/studies/new`, newStudy);
  }
}
