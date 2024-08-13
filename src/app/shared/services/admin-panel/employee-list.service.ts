import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, BehaviorSubject } from "rxjs";
import { map, filter, switchMap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeListService {

  private server = environment.host;

  constructor(private http: HttpClient) {}

  // EmployeeListData
  getEmployeeListCompliance(): Observable<any> {
    return this.http.get<any>(`${this.server}/employee?page=profile-employee-detail`)
    .pipe(
      map((res) => <any[]>res.data),
      catchError(this.handleError)
    );
  }

  // EmployeeListData
  getEmployeeListData(id?: any): Observable<any> {
    let params = {
      //page: 'employee-list',
      page: 'list',
      id: id
    };

    if(!id || id === undefined) delete params['id'];

    return this.http.get<any>(`${this.server}/employee`,{
      params: params
    })
    .pipe(
      map((res) => <any[]>res.data),
      catchError(this.handleError)
    );
  }

  deleteEmployeeData(employee): Observable<any> {
    return this.http.delete<any>(`${this.server}/employee`, 
      { body: { id: [...employee] }
    })
    .pipe(
      map((res) => <any>res),
      catchError(this.handleError)
    )
  }

  uploadEmployee(employee: any): Observable<any> {
    return this.http.post<any>(`${this.server}/data-import`, 
      employee
    )
    .pipe(
      map((res) => <any>res),
      catchError(this.handleError)
    )
  }

  // Employee Details
  getEmployeeDetails(id): Observable<any> {
    return this.http.get<any>("assets/fake-db/employee-list-simple.json")
    .pipe(
      map((res) => <any>res.data.find(el => el?.client?.id === id)),
      catchError(this.handleError)
    );
  }

  // Employee List Feeds
  getEmployeeFeedData(): Observable<any> {
    return this.http.get<any>("assets/fake-db/client-list-feed.json")
    .pipe(
      map((res) => <any[]>res.data),
      catchError(this.handleError)
    );
  }

  // Employee Client Lists
  getEmployeeClients(id:any = 2250251): Observable<any> {
    return this.http.get<any>("assets/fake-db/employee-clients.json")
    .pipe(
      map((res) => <any>res.employees.find(el => el.employee_id == id)),
      catchError(this.handleError)
    );
  }

  // error handler
  private handleError(error: any, caught: any): any {
    throw error;
  }
}
