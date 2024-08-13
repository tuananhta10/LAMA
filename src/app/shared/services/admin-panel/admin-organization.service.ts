import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, filter, switchMap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrganizationService {
  private server = environment.host;
  constructor(private http: HttpClient) { }

  getOrganizationListData(): Observable<any> {
    return this.http.get<any>(`${this.server}/organization`).pipe(
      map((res) => <any[]>res.data),
      catchError(this.handleError)
    );
  }

  getOrganizationData(id: any): Observable<any> {
    return this.http.get<any>(`${this.server}/organization?id=${id}`).pipe(
      map((res) => <any[]>res.data),
      catchError(this.handleError)
    );
  }

  saveOrganization(data: any): Observable<any> {
    return this.http.post<any>(`${this.server}/organization`, data).pipe(
      map((res: any) => <any[]>res),
      catchError(this.handleError)
    );
  }

  editOrganization(data: any): Observable<any> {
    return this.http.put(`${this.server}/organization`, data)
      .pipe(
        map((res) => <any>res)
      );
  }

  deleteOrganization(data: any): Observable<any> {
    return this.http.delete<any>(`${this.server}/organization`,
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
