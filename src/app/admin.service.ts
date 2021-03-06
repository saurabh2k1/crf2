import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Site } from './models/site';
import { User } from './models/user';
import { Study } from './models/study';
import { environment } from '../environments/environment';
import { catchError, tap, map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class AdminService {

  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {

   }

  getSites(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/sites`);
  }

  getSite(id: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/sites/get/${id}`);
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

  getUserById(userId: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/users/${userId}`);
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

  updateUser(user: any, userId: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/update/${userId}`, user);
  }

  resetPassword(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/resetpassword`, data);
  }

  saveVisit(newVisit: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/visit/new`, newVisit);
  }

  updateVisit(id: any, newVisit: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/visit/update/${id}`, newVisit);
  }

  addForm(newform: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/form/new`, newform).pipe(
      tap((data: any) => console.log(`added form w/ id=${data.id}`)),
      catchError(this.handleError<any>('Add Form')));
  }

  updateForm(form: any, formId: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/form/${formId}`, form);
  }

  addFields(fields: any, form_id: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/form/field/${form_id}`, fields);
  }

  getForm(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/form/${id}`).pipe(
      tap((data: any) => console.log(`get the form details`) ),
      catchError(this.handleError<any>('Get Form'))
    );
  }

  getAllForms(studyid: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/forms/${studyid}`);
  }

  getVisit(studyID?: string): Observable<any> {
    if (studyID) {
      return this.http.get(`${this.apiUrl}/visits/${studyID}`);
    } else {
      return this.http.get(`${this.apiUrl}/visits`);
    }

  }

  getSingleVisit(visitID: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/visit/${visitID}`);
  }

  getStudy(studyId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/studies/get/${studyId}`);
  }

  updateStudy(study: any, studyId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/studies/update/${studyId}`, study);
  }
  saveStudy(newStudy: Study): Observable<any> {
    return this.http.post(`${this.apiUrl}/studies/new`, newStudy);
  }

  updateSite(site: any, siteID: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/sites/update/${siteID}`, site);
  }


  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
