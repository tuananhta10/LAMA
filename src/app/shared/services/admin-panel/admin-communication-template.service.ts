import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, filter, switchMap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminCommunicationTemplateService {
  private server = environment.host;
  constructor(private http: HttpClient) { }

  getCommunicationTemplateListData(): Observable<any> {
    return this.http.get<any>(`${this.server}/communication-template`).pipe(
      map((res) => <any[]>res.data),
      catchError(this.handleError)
    );
  }

  saveCommunicationTemplate(data: any): Observable<any> {
    return this.http.post<any>(`${this.server}/communication-template`, data).pipe(
      map((res: any) => <any[]>res),
      catchError(this.handleError)
    );
  }

  editCommunicationTemplate(data: any): Observable<any> {
    return this.http.put(`${this.server}/communication-template`, data)
      .pipe(
        map((res) => <any>res)
      );
  }

  deleteCommunicationTemplate(data: any): Observable<any> {
    return this.http.delete<any>(`${this.server}/communication-template`,
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
