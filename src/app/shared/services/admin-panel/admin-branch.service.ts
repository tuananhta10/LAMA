import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, filter, switchMap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BranchService {
  private server = environment.host;
  constructor(private http: HttpClient) {}

  getBranchListData(): Observable<any> {
    return this.http.get<any>(`${this.server}/branch`).pipe(
      map((res) => <any[]>res.data),
      catchError(this.handleError)
    );
  }

  getBranchData(id: any): Observable<any> {
    return this.http.get<any>(`${this.server}/branch?id=${id}`).pipe(
      map((res) => <any[]>res.data),
      catchError(this.handleError)
    );
  }

  saveBranch(data:any): Observable<any> {
    return this.http.post<any>(`${this.server}/branch`, data).pipe(
      map((res: any) => <any>res),
      catchError(this.handleError)
    );
  }

  editBranch(data: any): Observable<any> {
    return this.http.put(`${this.server}/branch`, data)
    .pipe(
      map((res) => <any>res)
    );
  }

  deleteBranch(data: any): Observable<any> {
    return this.http.delete<any>(`${this.server}/branch`,
    {
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
