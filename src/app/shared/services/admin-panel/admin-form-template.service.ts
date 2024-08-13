import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, filter, switchMap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FormTemplateService {
  private server = environment.host;
  constructor(private http: HttpClient) {}

  getFormTemplateListData(): Observable<any> {
    return this.http.get<any>(`${this.server}/form-template`).pipe(
      map((res) => <any[]>res.data),
      catchError(this.handleError)
    );
  }

  saveFormTemplate(data:any): Observable<any> {
    return this.http.post<any>(`${this.server}/form-template`, data).pipe(
      map((res: any) => <any>res),
      catchError(this.handleError)
    );
  }

  editFormTemplate(data: any): Observable<any> {
    return this.http.put(`${this.server}/form-template`, data)
    .pipe(
      map((res) => <any>res)
    );
  }

  deleteFormTemplate(data: any): Observable<any> {
    return this.http.delete<any>(`${this.server}/form-template`, 
    { body: { id: [...data]}})
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
