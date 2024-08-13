import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, filter, switchMap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private server = environment.host;
  constructor(private http: HttpClient) {}

  getLanguageListData(): Observable<any> {
    return this.http.get<any>(`${this.server}/language`).pipe(
      map((res) => <any[]>res.data),
      catchError(this.handleError)
    );
  }

  saveLanguage(data:any): Observable<any> {
    return this.http.post<any>(`${this.server}/language`, data).pipe(
      map((res: any) => <any>res),
      catchError(this.handleError)
    );
  }

  editLanguage(data: any): Observable<any> {
    return this.http.put(`${this.server}/language`, data)
    .pipe(
      map((res) => <any>res)
    );
  }

  deleteLanguage(data: any): Observable<any> {
    return this.http.delete<any>(`${this.server}/language`, 
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
