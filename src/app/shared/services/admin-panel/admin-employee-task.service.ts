import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, filter, switchMap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmployeeTaskService {
  private server = environment.host;
  constructor(private http: HttpClient) { }

  getEmployeeTaskListData(): Observable<any> {
    return this.http.get<any>(`${this.server}/employee-task?page=list`).pipe(
      map((res) => <any[]>res.data),
      catchError(this.handleError)
    );
  }

  saveEmployeeTask(data: any): Observable<any> {
    return this.http.post<any>(`${this.server}/employee-task`, data).pipe(
      map((res: any) => <any>res),
      catchError(this.handleError)
    );
  }

  editEmployeeTask(data: any): Observable<any> {
    return this.http.put(`${this.server}/employee-task`, data)
      .pipe(
        map((res) => <any>res)
      );
  }

  deleteEmployeeTask(data: any): Observable<any> {
    return this.http.delete<any>(`${this.server}/employee-task`,
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
