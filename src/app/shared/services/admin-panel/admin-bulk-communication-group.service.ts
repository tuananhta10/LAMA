import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, filter, switchMap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminBulkCommunicationGroupService {

  private server = environment.host;
  constructor(private http: HttpClient) { }

  getCommunicationGroupData(data: any): Observable<any> {
    return this.http.get<any>(`${this.server}/communication-group?page=detail&id=${data}`).pipe(
      map((res) => <any[]>res.data),
      catchError(this.handleError)
    );
  }

  getCommunicationGroupListData(): Observable<any> {
    return this.http.get<any>(`${this.server}/communication-group`).pipe(
      map((res) => <any[]>res.data),
      catchError(this.handleError)
    );
  }

  saveCommunicationGroup(data: any): Observable<any> {
    return this.http.post<any>(`${this.server}/communication-group`, data).pipe(
      map((res: any) => <any[]>res),
      catchError(this.handleError)
    );
  }

  editCommunicationGroup(data: any): Observable<any> {
    return this.http.put(`${this.server}/communication-group`, data)
      .pipe(
        map((res) => <any>res)
      );
  }

  deleteCommunicationGroup(data: any): Observable<any> {
    return this.http.delete<any>(`${this.server}/communication-group`,
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
