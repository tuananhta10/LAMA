import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, filter, switchMap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminXeroAuthService {
  private server = environment.host;
  constructor(private http: HttpClient) {}

  getXeroListData(): Observable<any> {
    return this.http.get<any>(`${this.server}/xero?page=list`).pipe(
      map((res) => <any[]>res.data),
      catchError(this.handleError)
    );
  }

  connectAccount(data): Observable<any> {
    if(data?.result?.length > 0 && data?.client_id && data?.client_secret){
      let body = {
        id: data?.result[0]?.id,
        client_id: data?.client_id,  
        client_secret: data?.client_secret
      }
      return this.http.put<any>(`${this.server}/xero`, body)
      .pipe(
        map((res) => <any[]>res.data),
        catchError(this.handleError)
      );
    }

    else {
      return this.http.post<any>(`${this.server}/xero`, {
        ...data
      }).pipe(
        map((res) => <any[]>res.data),
        catchError(this.handleError)
      );
    }
  }

  connectAccountToMyob(data): Observable<any> {
    const token = decodeURI(data)
    return this.http.post<any>(`${this.server}/v2/myob/credentials`,{ code: token }).pipe(
      map((res) => <any[]>res),
      catchError(this.handleError)
    );
    
  }

  getMYOBConfigurationLists(): Observable<any> {
    return this.http.get<any>(`${this.server}/v2/myob/lists`).pipe(
      map((res) => <any[]>res?.data),
      catchError(this.handleError)
    );
  }

  getMYOBCompanyFile(): Observable<any> {
    return this.http.get<any>(`${this.server}/v2/myob/company-files`).pipe(
      map((res) => <any[]>res?.data),
      catchError(this.handleError)
    );
  }

  updateMYOBSettings(data): Observable<any> {
    return this.http.put<any>(`${this.server}/v2/myob/settings`,data).pipe(
      map((res) => <any[]>res),
      catchError(this.handleError)
    );
  }

  syncToXero(data): Observable<any> {
    let endpoint = {
      xero:'/v2/xero/sync',
      myob:'/v2/myob/sync'
    }

    if(data?.result?.length > 0 && data?.client_id && data?.client_secret){
      let body = {
        id: data?.result[0]?.id,
        client_id: data?.client_id,  
        client_secret: data?.client_secret
      }
      return this.http.put<any>(`${this.server}${endpoint[data?.type]}`, body)
      .pipe(
        map((res) => <any[]>res.data),
        catchError(this.handleError)
      );
    }
    else {
      return this.http.post<any>(`${this.server}${endpoint[data?.type]}`, {
        model: data.model
      }).pipe(
        map((res) => <any[]>res),
        catchError(this.handleError)
      );
    }
  }

  getXeroCredential(): Observable<any> {
    return this.http.get<any>(`${this.server}/xero`).pipe(
      map((res) => <any[]>res.data),
      catchError(this.handleError)
    );
  }

  getXeroPayrollOptions():Observable<any>{
    return this.http.get<any>(`${this.server}/v2/xero/payroll-calendars`).pipe(
      map((res:any) => <any[]>res.data),
      catchError(this.handleError)
    )
  }

  xeroUpgradePlan(data:any): Observable<any>{

    
    return this.http.put<any>(`${environment.xeroHost}organization/upgradesubscription?orgId=${data}`, {})
      .pipe(
        map((res) => <any[]>res.data),
        catchError(this.handleError)
      );
  }

  // error handler
  private handleError(error: any, caught: any): any {
    throw error;
  }

}
