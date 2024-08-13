import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, filter, switchMap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private server = environment.host;
  constructor(private http: HttpClient) {}

  getNotificationListData(): Observable<any> {
    return this.http.get<any>(`${this.server}/summary-report?content=notification`).pipe(
      map((res) => <any[]>res.data),
      catchError(this.handleError)
    );
  }

  saveNotification(data:any): Observable<any> {
    return this.http.post<any>(`${this.server}/notification`, data).pipe(
      map((res: any) => <any>res),
      catchError(this.handleError)
    );
  }

  editNotification(data: any): Observable<any> {
    return this.http.put(`${this.server}/notification`, data)
    .pipe(
      map((res) => <any>res)
    );
  }

  deleteNotification(data: any): Observable<any> {
    return this.http.delete<any>(`${this.server}/notification`, 
    { body: { id: [...data] }
  })
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
