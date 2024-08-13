import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, filter, switchMap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminChangePasswordsService {
  constructor(private http: HttpClient) {}

  private server = environment.host;

  updateClientPassword(body: any): Observable<any> {
    return this.http.put(`${this.server}/client`, body)
    .pipe(
      map((res) => <any>res)
    );
  }

  updateEmployeePassword(body: any): Observable<any> {
    return this.http.put(`${this.server}/employee`, body)
    .pipe(
      map((res) => <any>res)
    );
  }

  updateAdminPassword(body: any): Observable<any> {
    return this.http.put(`${this.server}/admin`, body)
    .pipe(
      map((res) => <any>res)
    );
  }
}
