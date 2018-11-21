import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class AdminService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbHVtZW4tYXBpLnRlc3QvbG9naW4iLCJpYXQiOjE1NDI4MTA3NzgsImV4cCI6MTU0MzQxNTU3OCwibmJmIjoxNTQyODEwNzc4LCJqdGkiOiJoRGpuZENWaklzaTM4eXp4Iiwic3ViIjozLCJwcnYiOiI4N2UwYWYxZWY5ZmQxNTgxMmZkZWM5NzE1M2ExNGUwYjA0NzU0NmFhIn0.JMlRXh5UM224L3XoViY8hRqGrbOrE68WSGvOGEp2e24',
    })
  };

  token = '';

  constructor(private http: HttpClient) {

   }

  getSites(): Observable<any> {
    return this.http.get<any>(`http://lumen-api.test/sites`, this.httpOptions);
  }

  getUsers(): Observable<any> {
    return this.http.get<any>(`http://lumen-api.test/users`, this.httpOptions);
  }

  getStudies(): Observable<any> {
    return this.http.get<any>(`http://lumen-api.test/studies`);
  }
}
