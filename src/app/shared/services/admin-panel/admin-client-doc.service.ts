import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, filter, switchMap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClientDocService {
  private server = environment.host;
  constructor(private http: HttpClient) {}

  getClientDocListData(): Observable<any> {
    return this.http.get<any>(`${this.server}/client-docs`).pipe(
      map((res) => <any[]>res.data),
      catchError(this.handleError)
    );
  }

  saveClientDoc(data:any): Observable<any> {
    return this.http.post<any>(`${this.server}/client-docs`, data).pipe(
      map((res: any) => <any>res),
      catchError(this.handleError)
    );
  }

  editClientDoc(data: any): Observable<any> {
    return this.http.put(`${this.server}/client-docs`, data)
    .pipe(
      map((res) => <any>res)
    );
  }

  deleteClientDoc(data: any): Observable<any> {
    return this.http.delete<any>(`${this.server}/client-docs`, {body: {id: [...data]}
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
