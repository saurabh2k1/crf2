import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SiteService {

  apiUrl = 'http://lumen-api.test';
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

   getPatients(site_id, study_id): Observable<any> {
     return this.http.get(`${this.apiUrl}/patients/${site_id}/${study_id}`);
   }

   getStudies(siteID: string): Observable<any> {
     return this.http.get(`${this.apiUrl}/api/site/studies`);
   }

   createPatient(newPat): Observable<any> {
     return this.http.post(`${this.apiUrl}/patient/new`, newPat);
   }

   getPatientByID(id): Observable<any> {
     return this.http.get(`${this.apiUrl}/patient/${id}`);
   }

   updatePatient(id, newPat): Observable<any> {
     return this.http.post(`${this.apiUrl}/patient/update/${id}`, newPat);
   }

   getSiteStatics(siteId, studyId): Observable<any> {
     return this.http.get(`${this.apiUrl}/site/${siteId}/${studyId}/dashboard`);
   }

   getExclusion(patientId): Observable<any> {
     return this.http.get(`${this.apiUrl}/site/form/exclusion/${patientId}`);
   }

   saveExclusion(newExclusion): Observable<any> {
     return this.http.post(`${this.apiUrl}/site/form/exclusion`, newExclusion);
   }

   getVisitsOfPatient(id): Observable<any> {
     return this.http.get(`${this.apiUrl}/site/patient/${id}/visits`);
   }

}
