import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, filter, switchMap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmployeePositionService {
  private server = environment.host;
  constructor(private http: HttpClient) { }

  getEmployeePositionListData(): Observable<any> {
    return this.http.get<any>(`${this.server}/employee-position?page=position`).pipe(
      map((res) => <any[]>res.data),
      catchError(this.handleError)
    );
  }

  saveEmployeePosition(data: any): Observable<any> {
    return this.http.post<any>(`${this.server}/employee-position`, data).pipe(
      map((res: any) => <any>res),
      catchError(this.handleError)
    );
  }

  editEmployeePosition(data: any): Observable<any> {
    return this.http.put(`${this.server}/employee-position`, data)
      .pipe(
        map((res) => <any>res)
      );
  }

  deleteEmployeePosition(data: any): Observable<any> {
    return this.http.delete<any>(`${this.server}/employee-position`,
      {
        body: { id: [...data] }
      })
      .pipe(
        map((res) => <any>res),
        catchError(this.handleError)
      );
  }

  uploadEmployeePosition(data:any): Observable<any> {
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
