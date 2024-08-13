import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, filter, switchMap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class QualificationService {
  private server = environment.host;
  constructor(private http: HttpClient) {}

  getQualificationListData(): Observable<any> {
    return this.http.get<any>(`${this.server}/qualification`).pipe(
      map((res) => <any[]>res.data),
      catchError(this.handleError)
    );
  }

  saveQualification(data:any): Observable<any> {
    return this.http.post<any>(`${this.server}/qualification`, data).pipe(
      map((res: any) => <any[]>res.data),
      catchError(this.handleError)
    );
  }

  editQualification(data: any): Observable<any> {
    return this.http.put(`${this.server}/qualification`, data)
    .pipe(
      map((res) => <any>res)
    );
  }

  deleteQualification(data: any): Observable<any> {
    return this.http.delete<any>(`${this.server}/qualification`, 
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
