import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MonitorService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getSites(studyId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/monitor/study/${studyId}/sites`);
  }

  getSiteSummery(siteID: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/monitor/site/${siteID}/summery`);
  }
}
