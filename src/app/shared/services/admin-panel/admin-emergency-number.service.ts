import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, filter, switchMap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmergencyNumberService {
  private server = environment.host;
  constructor(private http: HttpClient) { }

  getEmergencyNumberListData(): Observable<any> {
    return this.http.get<any>(`${this.server}/organization-sos`).pipe(
      map((res) => <any[]>res.data),
      catchError(this.handleError)
    );
  }

  saveEmergencyNumber(data: any): Observable<any> {
    return this.http.post<any>(`${this.server}/organization-sos`, data).pipe(
      map((res: any) => <any>res),
      catchError(this.handleError)
    );
  }

  editEmergencyNumber(data: any): Observable<any> {
    return this.http.put(`${this.server}/organization-sos`, data)
      .pipe(
        map((res) => <any>res)
      );
  }

  deleteEmergencyNumber(data: any): Observable<any> {
    return this.http.delete<any>(`${this.server}/organization-sos`,
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
