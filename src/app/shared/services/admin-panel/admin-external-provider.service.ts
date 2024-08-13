import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, filter, switchMap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminExternalProviderService {

  private server = environment.host;
  constructor(private http: HttpClient) {}

  getExternalProviderListData(): Observable<any> {
    return this.http.get<any>(`${this.server}/external-provider`).pipe(
      map((res) => <any[]>res.data),
      catchError(this.handleError)
    );
  }

  saveExternalProvider(data:any): Observable<any> {
    return this.http.post<any>(`${this.server}/external-provider`, data).pipe(
      map((res: any) => <any[]>res.data),
      catchError(this.handleError)
    );
  }

  editExternalProvider(data: any): Observable<any> {
    return this.http.put(`${this.server}/external-provider`, data)
    .pipe(
      map((res) => <any>res)
    );
  }

  deleteExternalProvider(data: any): Observable<any> {
    return this.http.delete(`${this.server}/external-provider`, {
      body: {
        id: [...data]
      }
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
