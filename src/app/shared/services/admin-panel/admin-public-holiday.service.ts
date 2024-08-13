import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, filter, switchMap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PublicHolidayService {
  private server = environment.host;
  constructor(private http: HttpClient) {}

  getGooglePublicHolidayData(): Observable<any>{
    return this.http.get<any>(`https://www.googleapis.com/calendar/v3/calendars/en.australian%23holiday%40group.v.calendar.google.com/events?key=${environment.googleAPIKey.apiKey}`).pipe(
      map((res) => <any[]>res.data),
      catchError(this.handleError)
    );


  }

  getPublicHolidayListData(): Observable<any> {
    return this.http.get<any>(`${this.server}/holiday`).pipe(
      map((res) => <any[]>res.data),
      catchError(this.handleError)
    );
  }

  savePublicHoliday(data:any): Observable<any> {
    return this.http.post<any>(`${this.server}/holiday`, data).pipe(
      map((res: any) => <any[]>res),
      catchError(this.handleError)
    );
  }

  editPublicHoliday(data: any): Observable<any> {
    return this.http.put(`${this.server}/holiday`, data)
    .pipe(
      map((res) => <any>res)
    );
  }

  deletePublicHoliday(data: any): Observable<any> {
    let payload = [...data].map(res => res.id)
    return this.http.delete<any>(`${this.server}/holiday`, {body: { id: [...payload]}
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
