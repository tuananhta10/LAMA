import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, filter, switchMap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import moment from 'moment';
import { 
  addDays, 
  addHours,
  addWeeks, 
  startOfDay, 
  endOfDay,
  toDate 
} from 'date-fns';
import { convertTimestampUtc } from '@main/shared/utils/date-convert.util';

@Injectable({
  providedIn: 'root',
})
export class DashBoardService {
  private server = environment.host;
  private momentdate = moment()
  private currentDate = new Date();  
  private currentYear = this.currentDate?.getFullYear();  
  private currentMonth = this.currentDate?.getMonth();  
  public dateRange: any = {
    start_date: new Date(this.momentdate.startOf('isoWeek').isoWeekday('Monday').toString()),  
    end_date: new Date(this.momentdate.endOf('isoWeek').isoWeekday('Sunday').toString())
  }

  constructor(private http: HttpClient) {}

  getStatistic(data:any): Observable<any> {
    /*return this.http.get<any>(`${this.server}/summary-report?content=dashboard&year=${data.year}&month=${data.month}`).pipe(
      map((res) => <any[]>res.data),
      catchError(this.handleError)
    );*/

    let url = '/client-funding?page=list';
    
    return this.http.get<any>(`${this.server}${url}`).pipe(
      map((res) => <any[]>res.data.filter(el => el?.status === 'Published')),
      catchError(this.handleError)
    );
  }

  // {{domain}}/employee/dashboard/leave?year=2023&month=5
  GetLeavePeriod(): Observable<any> {
    return this.http.get<any>(`${this.server}/employee/dashboard/leave?year=${this.currentYear}&month=${this.currentMonth+1}`).pipe(
      map((res) => <any[]>res.data),
      catchError(this.handleError)
    );
  }

  GetIncident(): Observable<any> {
    return this.http.get<any>(`${this.server}/summary-report?content=dashboard-incident`).pipe(
      map((res) => <any[]>res.data),
      catchError(this.handleError)
    );
  }

  GetIntake(): Observable<any> {
    return this.http.get<any>(`${this.server}/branch`).pipe(
      map((res) => <any[]>res.data),
      catchError(this.handleError)
    );
  }

  GetTask(data): Observable<any> {
    return this.http.get<any>(`${this.server}/summary-report?range_start=${data.start_date}&range_end=${data.end_date}&content=dashboard-task`).pipe(
      map((res) => <any[]>res.data),
      catchError(this.handleError)
    );
  }

  GetEmployeeShift(): Observable<any> {
    return this.http.get<any>(`${this.server}/employee/dashboard/employee-shift?range_start=${convertTimestampUtc(this.dateRange?.start_date)}&range_end=${convertTimestampUtc(this.dateRange?.end_date)}`).pipe(
      map((res) => <any[]>res.data),
      catchError(this.handleError)
    );
  }

  GetReferrals(data): Observable<any> {
    return this.http.get<any>(`${this.server}/referral?page=list`).pipe(
      map((res) => <any[]>res.data),
      catchError(this.handleError)
    );
  }

  GetEmployeeLeaveStatus(): Observable<any> {
    return this.http.get<any>(`${this.server}/branch`).pipe(
      map((res) => <any[]>res.data),
      catchError(this.handleError)
    );
  }

  getClientSummary(): Observable<any> {
    console.log("CURRENT YEAR _ MONTH", this.currentYear, this.currentMonth)
    /*?year=${this.currentYear}&month=${this.currentMonth+1}*/

    return this.http.get<any>(`${this.server}/client/dashboard/summary`).pipe(
      map((res) => <any[]>res.data),
      catchError(this.handleError)
    );
  }

  getIncidentMetrics(): Observable<any> {
    /*return this.http.get<any>(`${this.server}/incident/dashboard?year=${this.currentYear}&month=${this.currentMonth+1}`).pipe(
      map((res) => <any[]>res.data),
      catchError(this.handleError)
    );*/

    return this.http.get<any>(`${this.server}/incident?page=list`).pipe(
      map((res) => <any[]>res.data),
      catchError(this.handleError)
    );
  }


  getSupportWorkerMetrics(): Observable<any> {
    return this.http.get<any>(`${this.server}/employee/dashboard/careworker?year=${this.currentYear}&month=${this.currentMonth+1}`).pipe(
      map((res) => <any[]>res.data),
      catchError(this.handleError)
    );
  }

  // error handler
  private handleError(error: any, caught: any): any {
    throw error;
  }
}
