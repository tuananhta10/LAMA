import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, filter, switchMap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmployeeShiftService {
  private server = environment.host;
  constructor(private http: HttpClient) { }

  getEmployeeShiftListData(): Observable<any> {
    return this.http.get<any>(`${this.server}/employee-service-schedule?page=employee-shift`).pipe(
      map((res) => <any[]>res.data),
      catchError(this.handleError)
    );
  }

  saveEmployeeShift(data: any): Observable<any> {
    return this.http.post<any>(`${this.server}/employee-shift`, data).pipe(
      map((res: any) => <any>res),
      catchError(this.handleError)
    );
  }

  editEmployeeShift(data: any): Observable<any> {
    return this.http.put(`${this.server}/employee-shift`, data)
      .pipe(
        map((res) => <any>res)
      );
  }

  deleteEmployeeShift(data: any): Observable<any> {
    return this.http.delete<any>(`${this.server}/employee-shift`,
      {
        body: {
          id: [...data]
        }
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
