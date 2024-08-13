import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, filter, switchMap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReferralService {
  private server = environment.host;
  constructor(private http: HttpClient) {}

  getReferralListData(): Observable<any> {
    return this.http.get<any>(`${this.server}/referral?page=list`).pipe(
      map((res) => <any[]>res.data),
      catchError(this.handleError)
    );
  }

  getReferral(data): Observable<any> {
    // ${this.server}/v2/referral?id=${data.id}&page=detail
    return this.http.get<any>(`${this.server}/v2/referral?id=${data.id}&page=detail`).pipe(
      map((res) => <any[]>res.data),
      catchError(this.handleError)
    );
  }

  saveReferral(data:any): Observable<any> {
    return this.http.post<any>(`${this.server}/referral`, data).pipe(
      map((res: any) => <any[]>res.data),
      catchError(this.handleError)
    );
  }

  editReferral(data: any): Observable<any> {
    return this.http.put(`${this.server}/referral`, data)
    .pipe(
      map((res) => <any>res)
    );
  }

  deleteReferral(data: any): Observable<any> {
    return this.http.delete<any>(`${this.server}/referral`, 
    { body: { id: [...data] }
  })
    .pipe(
      map((res: any) => <any>res),
      catchError(this.handleError)
    );
  }

  deleteReferralComment(data: any): Observable<any> {
    return this.http.delete<any>(`${this.server}/v2/referral-comment/${data?.id}`, { })
    .pipe(
      map((res: any) => <any>res),
      catchError(this.handleError)
    );
  }

  // error handler
  private handleError(error: any, caught: any): any {
    throw error;
  }
}
