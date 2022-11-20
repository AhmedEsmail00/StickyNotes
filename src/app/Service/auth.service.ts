import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private _Router: Router) {
    if (localStorage.getItem('token') != null) {
      this.saveData();
    }
  }

  baseUrl: string = 'https://route-egypt-api.herokuapp.com/';
  userData: any;
  token: any;
  hasLoggedIn = new BehaviorSubject(null);

  saveData() {
    this.token = localStorage.getItem('token');
    let token = JSON.stringify(localStorage.getItem('token'));
    this.userData = jwtDecode(token);
    localStorage.setItem('id', this.userData._id);
    this.hasLoggedIn.next(this.userData);
  }
  signIn(data: any): Observable<any> {
    return this.http.post(this.baseUrl + 'signin', data).pipe(
      tap(() => this.hasLoggedIn.next(null))
    )
  }
  signUp(data: any): Observable<any> {
    return this.http.post(this.baseUrl + 'signup', data);
  }

  signOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    this._Router.navigateByUrl('signin')

  }


}
