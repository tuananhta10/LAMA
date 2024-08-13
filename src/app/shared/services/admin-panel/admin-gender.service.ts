import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, filter, switchMap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminGenderService {
  private server = environment.host;
  constructor(private http: HttpClient) { }

  getGenderListData(): Observable<any> {
    return this.http.get<any>(`${this.server}/gender`).pipe(
      map((res) => <any[]>res.data),
      catchError(this.handleError)
    );
  }

  saveGender(data: any): Observable<any> {
    return this.http.post<any>(`${this.server}/gender`, data).pipe(
      map((res: any) => <any[]>res),
      catchError(this.handleError)
    );
  }

  editGender(data: any): Observable<any> {
    return this.http.put(`${this.server}/gender`, data)
      .pipe(
        map((res) => <any>res)
      );
  }

  deleteGender(data: any): Observable<any> {
    return this.http.delete<any>(`${this.server}/gender`,
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
