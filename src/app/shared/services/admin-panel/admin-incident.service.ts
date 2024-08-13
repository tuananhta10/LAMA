import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, filter, switchMap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class IncidentService {
  private server = environment.host;
  constructor(private http: HttpClient) { }

  getIncidentListData(data?: any): Observable<any> {
    let url = data?.client_id ? `/incident?page=list&client_id=${data.client_id}` : `/incident?page=list`
 

    return this.http.get<any>(`${this.server}${url}`).pipe(
      map((res) => <any[]>res.data),
      catchError(this.handleError)
    );
  }

  saveIncident(data: any): Observable<any> {
    return this.http.post<any>(`${this.server}/incident`, data).pipe(
      map((res: any) => <any>res),
      catchError(this.handleError)
    );
  }

  editIncident(data: any): Observable<any> {
    return this.http.put(`${this.server}/incident`, data)
      .pipe(
        map((res) => <any>res)
      );
  }

  uploadIncident(data: any): Observable<any> {
    return this.http.post<any>(`${this.server}/data-import`, data).pipe(
      map((res: any) => <any>res),
      catchError(this.handleError)
    );
  }

  deleteIncident(data: any): Observable<any> {

    let ids = data.map(res => res.id)

    return this.http.delete<any>(`${this.server}/incident`, {
      body: { id: [...ids] }
    })
      .pipe(
        map((res) => <any>res)
      );
  }

  // error handler
  private handleError(error: any, caught: any): any {
    throw error;
  }
}
