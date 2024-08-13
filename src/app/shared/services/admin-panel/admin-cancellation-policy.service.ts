import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, filter, switchMap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CancellationPolicyService {
  private server = environment.host;
  constructor(private http: HttpClient) { }

  getCancellationPolicyListData(): Observable<any> {
    return this.http.get<any>(`${this.server}/cancellation-policy`).pipe(
      map((res) => <any[]>res.data),
      catchError(this.handleError)
    );
  }

  saveCancellationPolicy(data: any): Observable<any> {
    return this.http.post<any>(`${this.server}/cancellation-policy`, data).pipe(
      map((res: any) => <any[]>res),
      catchError(this.handleError)
    );
  }

  editCancellationPolicy(data: any): Observable<any> {
    return this.http.put(`${this.server}/cancellation-policy`, data)
      .pipe(
        map((res) => <any>res)
      );
  }

  deleteCancellationPolicy(data: any): Observable<any> {
    return this.http.delete<any>(`${this.server}/cancellation-policy`,
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
