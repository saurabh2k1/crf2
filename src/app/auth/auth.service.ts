import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map} from 'rxjs/operators';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import * as moment from 'moment';

const httpOptions = {
  headers: new HttpHeaders({
    'App': '1267aa3f-11fd-4771-af3e-060bbee11681'
  }),
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
   }

   public get currentUserValue(): User {
     return this.currentUserSubject.value;
   }

  // login(email: string, password: string) {
  //   return this.http.post<any>(`${this.apiUrl}/login`, {email, password})
  //   .pipe(map(user => {
  //     if (user && user.token) {
  //       localStorage.setItem('currentUser', JSON.stringify(user));
  //       this.currentUserSubject.next(user);
  //     }

  //     return user;
  //   }));
  // }

  login(email: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/login`, {email, password})
    .pipe(map(data => {
      if (data.user && data.token) {
        data.user.role = data.role;
        localStorage.setItem('currentUser', JSON.stringify(data.user));
        this.currentUserSubject.next(data.user);
        this.setSession(data);

      }

      return data;
    }));
  }

  private setSession(authResult) {
    const expiresAt = moment().add(authResult.expires, 'second');
    localStorage.setItem('token', authResult.token);
    localStorage.setItem('expires', JSON.stringify(expiresAt.valueOf()));
  }

  sendResetLink(frm): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset`, frm);
  }

  resetPassword(frm, token): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset/${token}`, frm);
  }

  changePassword(frm): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/users/change-password`, frm);
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    localStorage.removeItem('expires');
    localStorage.clear();
    this.currentUserSubject.next(null);
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expires = JSON.parse(localStorage.getItem("expires"));
    return moment(expires);
  }
}
