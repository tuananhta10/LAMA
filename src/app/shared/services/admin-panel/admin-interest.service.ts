import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, filter, switchMap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InterestService {
  private server = environment.host;
  constructor(private http: HttpClient) { }

  getInterestListData(): Observable<any> {
    return this.http.get<any>(`${this.server}/interest`).pipe(
      map((res) => <any[]>res.data),
      catchError(this.handleError)
    );
  }

  saveInterest(data: any): Observable<any> {
    return this.http.post<any>(`${this.server}/interest`, data).pipe(
      map((res: any) => <any[]>res),
      catchError(this.handleError)
    );
  }

  editInterest(data: any): Observable<any> {
    return this.http.put(`${this.server}/interest`, data)
      .pipe(
        map((res) => <any>res)
      );
  }

  deleteInterest(data: any): Observable<any> {
    return this.http.delete<any>(`${this.server}/interest`,
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
