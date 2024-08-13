import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, filter, switchMap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmployeeLeaveService {
  private server = environment.host;
  constructor(private http: HttpClient) { }

  getEmployeeLeaveListData(): Observable<any> {
    return this.http.get<any>(`${this.server}/employee-leave?page=list`).pipe(
      map((res) => <any[]>res.data),
      catchError(this.handleError)
    );
  }

  saveEmployeeLeave(data: any): Observable<any> {
    return this.http.post<any>(`${this.server}/employee-leave`, data).pipe(
      map((res: any) => <any>res),
      catchError(this.handleError)
    );
  }

  editEmployeeLeave(data: any): Observable<any> {
    return this.http.put(`${this.server}/employee-leave`, data)
      .pipe(
        map((res) => <any>res)
      );
  }

  deleteEmployeeLeave(data: any): Observable<any> {
    return this.http.delete<any>(`${this.server}/employee-leave`,
      {
        body: { id: [...data] }
      })
      .pipe(
        map((res) => <any>res),
        catchError(this.handleError)
      );
  }

  uploadEmployeeLeave(data: any): Observable<any> {
    return this.http.post<any>(`${this.server}/data-import`, data).pipe(
      map((res: any) => <any>res),
      catchError(this.handleError)
    );
  }


  // error handler
  private handleError(error: any, caught: any): any {
    throw error;
  }
}
