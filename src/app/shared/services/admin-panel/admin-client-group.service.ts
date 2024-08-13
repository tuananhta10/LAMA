import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, filter, switchMap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClientGroupService {
  private server = environment.host;
  constructor(private http: HttpClient) {}

  getClientGroupData(data): Observable<any> {
    console.log(data)

    return this.http.get<any>(`${this.server}/group?page=detail`).pipe(
      map((res) => <any[]>res.data),
      catchError(this.handleError)
    );
  }

  getClientGroupListData(data?: any): Observable<any> {
    let query = data ? `${this.server}/group-service-schedule?page=detail&id=${data}` : `${this.server}/group?page=detail`;

    return this.http.get<any>(`${query}`).pipe(
      map((res) => <any[]>res.data),
      catchError(this.handleError)
    );
  }

  saveClientGroup(data:any): Observable<any> {
    return this.http.post<any>(`${this.server}/group`, data).pipe(
      map((res: any) => <any>res),
      catchError(this.handleError)
    );
  }

  editClientGroup(data: any): Observable<any> {
    return this.http.put(`${this.server}/group`, data)
    .pipe(
      map((res) => <any>res)
    );
  }

  deleteClientGroup(data: any): Observable<any> {
    return this.http.delete<any>(`${this.server}/group`, {body: {id: [...data]}
  })
    .pipe(
      map((res) => <any>res),
      catchError(this.handleError)
    );
  }

  // error handler
  private handleError(error: any, caught: any): any {
    throw error;
  }
}
