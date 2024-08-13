import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, filter, switchMap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClientServiceScheduleService {
  private server = environment.host;
  constructor(private http: HttpClient) { }

  getClientServiceScheduleDetails(data: any): Observable<any> {
    return this.http.get<any>(`${this.server}/client-service-schedule?page=detail&id=${data?.client_service_schedule_id || data?.id}`).pipe(
      map((res) => <any[]>res.data),
      catchError(this.handleError)
    );
  }

  getClientServiceScheduleListData(): Observable<any> {
    return this.http.get<any>(`${this.server}/client-service-schedule?page=list`).pipe(
      map((res) => <any[]>res.data),
      catchError(this.handleError)
    );
  }

  saveClientServiceSchedule(data: any): Observable<any> {
    return this.http.post<any>(`${this.server}/client-service-schedule`, data).pipe(
      map((res: any) => <any>res),
      catchError(this.handleError)
    );
  }

  saveClientServiceScheduleRecurring(data: any): Observable<any> {
    return this.http.post<any>(`${this.server}/client-service-schedule-bulk`, data).pipe(
      map((res: any) => <any>res),
      catchError(this.handleError)
    );
  }

  updateClientServiceScheduleRecurring(data: any): Observable<any> {
    const hasGroupBy = data[0]?.hasOwnProperty('group_by');
    const isGroup = hasGroupBy && data[0].group_by === 'Group';
    const hasStatus = data[0]?.hasOwnProperty('status');

    const endpoint = isGroup && hasStatus 
                    ? `/v2/group-service-schedule/mark-complete`
                    : `/client-service-schedule-bulk`
    return this.http.put<any>(`${this.server}${endpoint}`, data).pipe(
      map((res: any) => <any>res),
      catchError(this.handleError)
    );
  }

  reschedulingScheduleEmployee(data: any): Observable<any> {

    const endpoint = `/v2/client-service-schedule/reschedule`
    return this.http.put<any>(`${this.server}${endpoint}`, data).pipe(
      map((res: any) => <any>res),
      catchError(this.handleError)
    );
  }

  saveClientServiceScheduleGroup(data: any): Observable<any> {
    return this.http.post<any>(`${this.server}/group-service-schedule`, data).pipe(
      map((res: any) => <any>res),
      catchError(this.handleError)
    );
  }

  updateClientServiceScheduleGroup(data: any): Observable<any> {
    return this.http.put<any>(`${this.server}/group-service-schedule`, data).pipe(
      map((res: any) => <any>res),
      catchError(this.handleError)
    );
  }


  editClientServiceSchedule(data: any): Observable<any> {
    return this.http.put(`${this.server}/client-service-schedule`, data)
      .pipe(
        map((res) => <any>res)
      );
  }

  deleteClientServiceSchedule(data: any): Observable<any> {
    console.log(data)
    let schedule = data?.map(el => el?.id);
    let url = data[0]?.type !== 'Group' ? `${this.server}/client-service-schedule` : `${this.server}/group-service-schedule`;

    return this.http.delete<any>(url,
      {
        body: { id: [...schedule] }
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
