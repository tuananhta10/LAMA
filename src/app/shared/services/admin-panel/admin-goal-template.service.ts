import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, filter, switchMap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GoalTemplateService {
  private server = environment.host;
  constructor(private http: HttpClient) { }

  getGoalTemplateListData(): Observable<any> {
    return this.http.get<any>(`${this.server}/goal-template`).pipe(
      map((res) => <any[]>res.data),
      catchError(this.handleError)
    );
  }

  saveGoalTemplate(data: any): Observable<any> {
    return this.http.post<any>(`${this.server}/goal-template`, data).pipe(
      map((res: any) => <any>res),
      catchError(this.handleError)
    );
  }

  editGoalTemplate(data: any): Observable<any> {
    return this.http.put(`${this.server}/goal-template`, data)
      .pipe(
        map((res) => <any>res)
      );
  }

  deleteGoalTemplate(data: any): Observable<any> {
    return this.http.delete<any>(`${this.server}/goal-template`,
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
