import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SiteService {

  apiUrl = environment.apiUrl;
  private siteChange = new BehaviorSubject({id: '', name: ''});
  public site = this.siteChange.asObservable();
  constructor(private http: HttpClient) { }

   setSite(id: string, name: string) {
    this.siteChange.next({id: id, name: name});
    localStorage.setItem('site', JSON.stringify({id: id, name: name}));
   }

   getSite(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/site`);
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

   getCRForm(form_id, site_id, pat_id, visit_id): Observable<any> {
     const params = new HttpParams().set('site_id', site_id).set('subject_id', pat_id).set('visit_id', visit_id);
     return this.http.get(`${this.apiUrl}/form/crf/${form_id}`, {params});
   }

   saveProfile(newForm, userId): Observable<any> {
     return this.http.post(`${this.apiUrl}/api/users/${userId}`, newForm);
   }

   saveCRForm(newForm): Observable<any> {
     return this.http.post(`${this.apiUrl}/form/crf`, newForm);
   }

}
