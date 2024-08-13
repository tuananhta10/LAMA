import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, filter, switchMap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminEmployeeBulkEmailNotificationService {
  private server = environment.host;
  constructor(private http: HttpClient) { }

  getEmployeeBulkEmailListData(data: any): Observable<any> {
    console.log(data)
    return this.http.get<any>(`${this.server}/employee-bulk-email?employee_id=${data}`).pipe(
      map((res) => <any[]>res.data),
      catchError(this.handleError)
    );
  }

  saveEmployeeBulkEmail(data: any): Observable<any> {
    return this.http.post<any>(`${this.server}/employee-bulk-email`, data).pipe(
      map((res: any) => <any>res),
      catchError(this.handleError)
    );
  }

  saveEmployeeEmailTemplate(data: any): Observable<any> {
    return this.http.post<any>(`${this.server}/communication-template`, data).pipe(
      map((res: any) => <any>res),
      catchError(this.handleError)
    );
  }

  editEmployeeBulkEmail(data: any): Observable<any> {
    return this.http.put(`${this.server}/employee-bulk-email?employee_id=${data.employee_id}`, data)
      .pipe(
        map((res) => <any>res)
      );
  }

  deleteEmployeeBulkEmail(data: any): Observable<any> {
    return this.http.delete<any>(`${this.server}/employee-bulk-email`,
      {
        body: { id: [...data] }
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
