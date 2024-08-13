import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, filter, switchMap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FundingClaimService {
  private server = environment.host;
  constructor(private http: HttpClient) {}

  getFundingClaimListData(): Observable<any> {
    return this.http.get<any>(`${this.server}/invoice?page=list&type=funding_claim`).pipe(
      map((res) => <any[]>res.data),
      catchError(this.handleError)
    );
  }

  saveFundingClaim(data:any): Observable<any> {
    return this.http.post<any>(`${this.server}/funding-claim`, data).pipe(
      map((res: any) => <any[]>res),
      catchError(this.handleError)
    );
  }

  editFundingClaim(data: any): Observable<any> {
    return this.http.put(`${this.server}/funding-claim`, data)
    .pipe(
      map((res) => <any>res)
    );
  }

  deleteFundingClaim(data: any): Observable<any> {
    return this.http.delete<any>(`${this.server}/v2/invoice`, {body: { id: [...data]}
  })
    .pipe(
      map((res) => <any>res),
      catchError(this.handleError)
    );
  }

  postClaimInvoiceToXero(code){
    return this.http.put(`${this.server}/xero`, {
      code: code
    })
    .pipe(
      map((res) => <any>res)
    );
  }

  // error handler
  private handleError(error: any, caught: any): any {
    throw error;
  }
}
