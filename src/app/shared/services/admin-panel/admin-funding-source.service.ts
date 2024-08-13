import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, filter, switchMap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FundingSourceService {
  private server = environment.host;
  constructor(private http: HttpClient) {}

  getFundingSourceListData(): Observable<any> {
    return this.http.get<any>(`${this.server}/funding-source`).pipe(
      map((res) => <any[]>res.data),
      catchError(this.handleError)
    );
  }

  saveFundingSource(data:any): Observable<any> {
    return this.http.post<any>(`${this.server}/funding-source`, data).pipe(
      map((res: any) => <any>res),
      catchError(this.handleError)
    );
  }

  editFundingSource(data: any): Observable<any> {
    return this.http.put(`${this.server}/funding-source`, data)
    .pipe(
      map((res) => <any>res)
    );
  }

  deleteFundingSource(data: any): Observable<any> {
    return this.http.delete<any>(`${this.server}/funding-source`, { body: { id: [...data] }
  })
    .pipe(
      map((res) => <any>res),
      catchError(this.handleError)
    );
  }

  uploadClientFunding(data:any): Observable<any> {
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
