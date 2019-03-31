import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudyService {
  private studyChange = new BehaviorSubject({id: '', name: ''});
  public study = this.studyChange.asObservable();
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  setStudy(id: string, name: string) {
    this.studyChange.next({id: id, name: name});
    localStorage.setItem('study', JSON.stringify({id: id, name: name}));
  }

  getStudies(): Observable<any> {
    return this.http.get(`${this.apiUrl}/allstudies`);
  }
}
