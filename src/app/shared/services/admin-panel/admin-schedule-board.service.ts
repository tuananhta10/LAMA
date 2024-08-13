import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, filter, switchMap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ScheduleBoardService {
  private server = environment.host;
  constructor(private http: HttpClient) {}

  getScheduleBoardListData(data: any): Observable<any> {
    if(data.content !== 'group'){
      if(data?.content === 'employee'){
        return this.http.get<any>(`${this.server}/schedule-board?range_start=${data.start_date}&range_end=${data.end_date}&content=${data.content}`).pipe(
          map((res) => <any[]>res.data),
          catchError(this.handleError)
        );
      }

      else if(data?.content === 'client'){
        if(data?.filter === 'No Shift'){
          return this.http.get<any>(`${this.server}/v2/client/no-shift?page=schedule-board&start_date=${data.start_date}&end_date=${data.end_date}`).pipe(
            map((res) => <any[]>res.data),
            catchError(this.handleError)
          );
        }else {
          let url = `${this.server}/client?page=schedule-board&range_start=${data.start_date}&range_end=${data.end_date}&content=${data.content}`
          if(data.hasOwnProperty("client_id")){
            url = url + `&client_id=${data.client_id}`
          }
          if(data.hasOwnProperty("sort")){
            url = url + `&sort=${data.sort}`
          }
          if(data.hasOwnProperty("billable")){
            url = url + `&sf=true`
          }
          return this.http.get<any>(url).pipe(
            map((res) => <any[]>res.data),
            catchError(this.handleError)
          );
        }
      }
    }

    else if (data.content === 'group'){
      return this.http.get<any>(`${this.server}/group-service-schedule?page=schedule-board&range_start=${data.start_date}&range_end=${data.end_date}`).pipe(
        map((res) => <any[]>res.data),
        catchError(this.handleError)
      );
    }
  }

  getSingleSchedulePerClient(data:any):Observable<any>{
    return this.http.get<any>(`${this.server}/v2/client/${data}/schedules`).pipe(
      map((res) => <any[]>res.data),
      catchError(this.handleError)
    );
  }

  saveScheduleBoard(data:any): Observable<any> {
    return this.http.post<any>(`${this.server}/schedule-board`, data).pipe(
      map((res: any) => <any>res),
      catchError(this.handleError)
    );
  }

  editScheduleBoard(data: any): Observable<any> {
    return this.http.put(`${this.server}/schedule-board`, data)
    .pipe(
      map((res) => <any>res)
    );
  }

  assignEmployee(data: any): Observable<any> {
    return this.http.post(`${this.server}/employee-service-schedule`, data)
    .pipe(
      map((res) => <any>res)
    );
  }

  // Recheck employee conflict on create
  recheckAssignedEmployee(data: any): Observable<any> {
    let date = data?.recurring_date.map(el => el.start_date).join('_');  
    let start_time_obj = data?.start_time?.split(':');
    let start_time = start_time_obj[0] + start_time_obj[1];

    let end_time_obj = data?.end_time.split(':');
    let end_time = end_time_obj[0] + end_time_obj[1];
    let employee_id = data?.recurring_date[0]?.employee_id;

    return this.http.get(`${this.server}/employee?page=check-schedule&date=${date}&start_time=${start_time}&end_time=${end_time}&employee_id=${employee_id}`, data)
    .pipe(
      map((res: any) => <any>res)
    );
  }

  deleteScheduleBoard(data: any): Observable<any> {
    console.log("DELETE SCHEDULE  BOARD", data)

    return this.http.delete<any>(`${this.server}/schedule-board`, {body: {id: [...data]}
  })
    .pipe(
      map((res) => <any>res),
      catchError(this.handleError)
    );
  }

  // Get all Vacant Employee
  getVacantEmployees(data: any): Observable<any> {
    let queryString;

    if(data?.data?.view !== 'creation'){
      let start_time_obj = data?.data?.start_time?.split(':');
      let start_time = start_time_obj[0] + start_time_obj[1];

      let end_time_obj = data?.data?.end_time.split(':');
      let end_time = end_time_obj[0] + end_time_obj[1];
      let pricelist_id = data?.data?.price_list_id ;
      let client_id = data?.data?.client_id;
      let filter = data?.data?.filter || 'all';
      
      // &price_list_id=${pricelist_id}
      queryString = `page=vacant&date=${data.data?.start_date}&start_time=${start_time}&end_time=${end_time}&filter=${filter}&client_id=${client_id}`;  
    }

    else {
      let date = data.data?.date;
      let start_time = data?.data?.start_time;
      let end_time = data?.data?.end_time;
      let pricelist_id = data?.data?.price_list_id ;
      let client_id = data?.data?.client_id;
      let filter = data?.data?.filter || 'all';

      console.log("VACANT DATA", data)
      
      //&price_list_id=${pricelist_id}
      queryString = `page=vacant&date=${date}&start_time=${start_time}&end_time=${end_time}&filter=${filter}&client_id=${client_id}`;    
    }

    return this.http.get<any>(`${this.server}/employee?${queryString}`).pipe(
      map((res) => <any[]>res.data),
      catchError(this.handleError)
    );
  }

  // Recheck employee conflict for day change
  recheckEmployeeChangeDay(data: any): Observable<any> {
    let queryString;
    let css = data?.css;
    let days = data?.days;

    queryString = `page=check-schedule&css=${css}&days=${days}&function=change_day`;      
    
    return this.http.get<any>(`${this.server}/employee?${queryString}`).pipe(
      map((res) => <any[]>res.data),
      catchError(this.handleError)
    );
  }

  // Recheck employee conflict for schedule change (Day and Time)
  recheckEmployeeReschedule(data: any): Observable<any> {
    let queryString;

    let css = data?.css;
    let start_time = data?.start_time.replace(':', '');
    let end_time = data?.end_time.replace(':', '');
    let start_date = data?.start_date;

    if(data?.reschedule_type === 'Time Only')
      queryString = `page=check-schedule&css=${css}&start_time=${start_time}&end_time=${end_time}&function=reschedule`;      
    
    else if(data?.reschedule_type === 'Date Only')
      queryString = `page=check-schedule&css=${css}&start_date=${start_date}&function=reschedule`;      
    
    else if(data?.reschedule_type === 'Both Date and Time')
      queryString = `page=check-schedule&css=${css}&start_date=${start_date}&start_time=${start_time}&end_time=${end_time}&function=reschedule`;      
    

    return this.http.get<any>(`${this.server}/employee?${queryString}`).pipe(
      map((res) => <any[]>res.data),
      catchError(this.handleError)
    );
  }


  recheckEmployeeSwitchWorker(data: any): Observable<any>{
    let queryString;
    let css = data?.css;
    let employee_id = data?.employee_id;

    queryString = `page=check-schedule&css=${css}&employee_id=${employee_id}&function=switch_worker`;      

    return this.http.get<any>(`${this.server}/employee?${queryString}`).pipe(
      map((res) => <any[]>res.data),
      catchError(this.handleError)
    );
  }

  // error handler
  private handleError(error: any, caught: any): any {
    throw error;
  }
}
