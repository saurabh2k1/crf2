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
      'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbHVtZW4tYXBpLnRlc3QvbG9naW4iLCJpYXQiOjE1NDIyNzA4MDUsImV4cCI6MTU0Mjg3NTYwNSwibmJmIjoxNTQyMjcwODA1LCJqdGkiOiJWV3RxOWNpdms4UEg4ZUxRIiwic3ViIjozLCJwcnYiOiI4N2UwYWYxZWY5ZmQxNTgxMmZkZWM5NzE1M2ExNGUwYjA0NzU0NmFhIn0.G5KHwxWO5AxKzVrysELJ5p5TOBq6PQi9A8vs3ApvaVo',
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
}
