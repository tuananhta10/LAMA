import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, filter, switchMap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import { TimesheetPayload } from '@main/shared/utils/timesheet-payload.util';

@Injectable({
  providedIn: 'root',
})
export class TimesheetApprovalService {
  private server = environment.host;

  public timesheetPayload:any = TimesheetPayload
  private organization_id:number

  constructor(private http: HttpClient) {
    const org_id = JSON.parse(localStorage.getItem('loggedUserData'))?.organization_id
    if(org_id) this.organization_id = org_id
  }

  getTimesheetApprovalListData(data?:any): Observable<any> {
    /*?registration_group_number=0136&order-by=name--asc*/

    let payload = data ? data  : this.timesheetPayload
    payload['organization_id'] = this.organization_id
    return this.http.post<any>(`${this.server}/v2/employee-timesheet/timesheets`, payload).pipe(
      map((res) => <any[]>res),
      catchError(this.handleError)
    );
  }

  saveTimesheetApproval(data:any): Observable<any> {
    return this.http.put<any>(`${this.server}/employee-timesheet?page=bulk`, data).pipe(
      map((res: any) => <any>res),
      catchError(this.handleError)
    );
  }

  editTimesheetApproval(data: any): Observable<any> {
    return this.http.put(`${this.server}/timesheet-approvals`, data)
    .pipe(
      map((res) => <any>res)
    );
  }

  approveDeclineTimesheet(data:any): Observable<any> {
    return this.http.post<any>(`${this.server}/timesheet-approvals`, data).pipe(
      map((res: any) => <any>res),
      catchError(this.handleError)
    );
  }

  getApprovedTimesheets(data): Observable<any> {
    /*?registration_group_number=0136&order-by=name--asc*/
    // &approved=1
    return this.http.get<any>(`${this.server}/invoice?page=generate&funding_source_code=${data.funding_source_code}&range_start=${data.range_start}&range_end=${data.range_end}&type=${data?.type}`).pipe(
      map((res) => <any[]>res.data),
      catchError(this.handleError)
    );
  }

  generateClaim(data:any): Observable<any> {
    return this.http.post<any>(`${this.server}/invoice`, data).pipe(
      map((res: any) => <any>res),
      catchError(this.handleError)
    );
  }

  // error handler
  private handleError(error: any, caught: any): any {
    throw error;
  }
}
