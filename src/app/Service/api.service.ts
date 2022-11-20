import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { Observable, Subject, tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  baseUrl: string = 'https://route-egypt-api.herokuapp.com/';
  crudStatus = new Subject();


  getNotes(): Observable<any> {
    let headers = new HttpHeaders({
      'token': `${localStorage.getItem('token')}`,
      'userID': `${localStorage.getItem('id')}`
    });
    return this.http.get(this.baseUrl + 'getUserNotes', { headers: headers })
  }

  addNote(data: object) {
    return this.http.post(this.baseUrl + 'addNote', data).pipe
      (
        tap(() => this.crudStatus.next(null))
      )
  }
  updateNote(data: any): Observable<any> {
    return this.http.put(this.baseUrl + 'updateNote', data).pipe
      (
        tap(() => this.crudStatus.next(null))
      )
  }

  deleteNote(data: any): Observable<any> {
    let option = {
      body: {
        NoteID: data.NoteID,
        token: data.token
      }
    }
    return this.http.delete(this.baseUrl + 'deleteNote', option).pipe
      (
        tap(() => this.crudStatus.next(null))
      )
  }

}
