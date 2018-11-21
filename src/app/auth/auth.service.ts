import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { delay, map} from 'rxjs/operators';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'App': '1267aa3f-11fd-4771-af3e-060bbee11681'
  }),
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false;
  redirectUrl: string;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;



  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
   }

   public get currentUserValue(): User {
     return this.currentUserSubject.value;
   }

  login(email: string, password: string) {
    return this.http.post<any>(`http://lumen-api.test/login`, {email, password}, httpOptions)
    .pipe(map(data => {
      if (data && data.jwt) {
        localStorage.setItem('currentUser', JSON.stringify(data.user));
        localStorage.setItem('token', data.jwt);
        this.currentUserSubject.next(data.user);
      }

      return data;
    }));
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
    this.isLoggedIn = false;
  }
}
