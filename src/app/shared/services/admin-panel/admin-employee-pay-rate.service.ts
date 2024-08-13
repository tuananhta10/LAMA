import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, filter, switchMap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmployeePayRateService {
  private server = environment.host;
  constructor(private http: HttpClient) {}

  getEmployeePayRateListData(): Observable<any> {
    return this.http.get<any>(`${this.server}/pay-rate`).pipe(
      map((res) => <any[]>res.data),
      catchError(this.handleError)
    );
  }

  saveEmployeePayRate(data:any): Observable<any> {
    return this.http.post<any>(`${this.server}/pay-rate`, data).pipe(
      map((res: any) => <any>res),
      catchError(this.handleError)
    );
  }

  editEmployeePayRate(data: any): Observable<any> {
    return this.http.put(`${this.server}/pay-rate`, data)
    .pipe(
      map((res) => <any>res)
    );
  }

  deleteEmployeePayRate(data: any): Observable<any> {
    return this.http.delete<any>(`${this.server}/pay-rate`, {body: {id: [...data]}
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
