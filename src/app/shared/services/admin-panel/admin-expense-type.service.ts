import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, filter, switchMap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ExpenseTypeService {
  private server = environment.host;
  constructor(private http: HttpClient) {}

  getExpenseTypeListData(): Observable<any> {
    return this.http.get<any>(`${this.server}/expense-type`).pipe(
      map((res) => <any[]>res.data),
      catchError(this.handleError)
    );
  }

  saveExpenseType(data:any): Observable<any> {
    return this.http.post<any>(`${this.server}/expense-type`, data).pipe(
      map((res: any) => <any[]>res.data),
      catchError(this.handleError)
    );
  }

  editExpenseType(data: any): Observable<any> {
    return this.http.put(`${this.server}/expense-type`, data)
    .pipe(
      map((res) => <any>res)
    );
  }

  // error handler
  private handleError(error: any, caught: any): any {
    throw error;
  }
}
