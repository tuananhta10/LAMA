import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, filter, switchMap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminSkillsService {
  private server = environment.host;
  constructor(private http: HttpClient) { }

  getSkillsListData(): Observable<any> {
    return this.http.get<any>(`${this.server}/skill`).pipe(
      map((res) => <any[]>res.data),
      catchError(this.handleError)
    );
  }

  saveSkills(data: any): Observable<any> {
    return this.http.post<any>(`${this.server}/skill`, data).pipe(
      map((res: any) => <any[]>res),
      catchError(this.handleError)
    );
  }

  editSkills(data: any): Observable<any> {
    return this.http.put(`${this.server}/skill`, data)
      .pipe(
        map((res) => <any>res)
      );
  }

  deleteSkills(data: any): Observable<any> {
    return this.http.delete<any>(`${this.server}/skill`,
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
