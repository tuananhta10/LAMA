import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, filter, switchMap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PayRateService {
  private server = environment.host;
  constructor(private http: HttpClient) {}

  getPayRateListData(): Observable<any> {
    return this.http.get<any>(`${this.server}/pay-rate`).pipe(
      map((res) => <any[]>res.data),
      catchError(this.handleError)
    );
  }

  savePayRate(data:any): Observable<any> {
    return this.http.post<any>(`${this.server}/pay-rate`, data).pipe(
      map((res: any) => <any>res),
      catchError(this.handleError)
    );
  }

  editPayRate(data: any): Observable<any> {
    return this.http.put(`${this.server}/pay-rate`, data)
    .pipe(
      map((res) => <any>res)
    );
  }

  deletePayRate(data: any): Observable<any> {
    return this.http.delete<any>(`${this.server}/pay-rate`, {body: {id: [...data]}
  })
    .pipe(
      map((res) => <any>res),
      catchError(this.handleError)
    );
  }

  /*PAYRATE LOADING*/
  getPayrateLoadingListData(): Observable<any>{
    return this.http.get<any>(`${this.server}/pay-rate-loading`).pipe(
      map((res) => <any[]>res.data),
      catchError(this.handleError)
    );
  }

  // error handler
  private handleError(error: any, caught: any): any {
    throw error;
  }
}
