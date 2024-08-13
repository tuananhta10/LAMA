import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, filter, switchMap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ServiceTypeService {
  private server = environment.host;
  constructor(private http: HttpClient) {}

  getServiceTypeListData(): Observable<any> {
    /*?registration_group_number=0136&order-by=name--asc*/
    return this.http.get<any>(`${this.server}/support-catalogue?registration_group_number=0107`).pipe(
      map((res) => <any[]>res.data),
      catchError(this.handleError)
    );
  }

  saveServiceType(data:any): Observable<any> {
    return this.http.post<any>(`${this.server}/service-types`, data).pipe(
      map((res: any) => <any>res),
      catchError(this.handleError)
    );
  }

  editServiceType(data: any): Observable<any> {
    return this.http.put(`${this.server}/service-types`, data)
    .pipe(
      map((res) => <any>res)
    );
  }

  // error handler
  private handleError(error: any, caught: any): any {
    throw error;
  }
}
