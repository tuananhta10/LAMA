import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, filter, switchMap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminHobbiesService {
  private server = environment.host;
  constructor(private http: HttpClient) { }

  getHobbiesListData(): Observable<any> {
    return this.http.get<any>(`${this.server}/hobby`).pipe(
      map((res) => <any[]>res.data),
      catchError(this.handleError)
    );
  }

  saveHobbies(data: any): Observable<any> {
    return this.http.post<any>(`${this.server}/hobby`, data).pipe(
      map((res: any) => <any[]>res),
      catchError(this.handleError)
    );
  }

  editHobbies(data: any): Observable<any> {
    return this.http.put(`${this.server}/hobby`, data)
      .pipe(
        map((res) => <any>res)
      );
  }

  deleteHobbies(data: any): Observable<any> {
    return this.http.delete<any>(`${this.server}/hobby`,
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
