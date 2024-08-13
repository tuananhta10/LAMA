import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, filter, switchMap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmployeeCertificateService {
  private server = environment.host;
  constructor(private http: HttpClient) { }

  getEmployeeCertificateListData(data: any): Observable<any> {
    return this.http.get<any>(`${this.server}/employee-certificate?employee_id=${data.employee_id}`).pipe(
      map((res) => <any[]>res.data),
      catchError(this.handleError)
    );
  }

  saveEmployeeCertificate(data: any): Observable<any> {
    return this.http.post<any>(`${this.server}/employee-certificate`, data).pipe(
      map((res: any) => <any>res),
      catchError(this.handleError)
    );
  }

  editEmployeeCertificate(data: any): Observable<any> {
    return this.http.put(`${this.server}/employee-certificate?employee_id=${data.employee_id}`, data)
      .pipe(
        map((res) => <any>res)
      );
  }

  deleteEmployeeCertificate(data: any): Observable<any> {
    return this.http.delete<any>(`${this.server}/employee-certificate`,
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
