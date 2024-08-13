import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, filter, switchMap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClientFundingService {
  private server = environment.host;
  constructor(private http: HttpClient) {}

  getClientFundingDetails(data){
    let url = data?.id ? `/client-funding?page=detail&id=${data.id}` : '/client-funding?page=list'
    
    return this.http.get<any>(`${this.server}${url}`).pipe(
      map((res) => <any[]>res.data),
      catchError(this.handleError)
    );
  }

  getClientFundingListData(data?: any): Observable<any> {
    let url;

    url = data?.client_id ? `/client-funding?page=list&client_id=${data.client_id}` : '/client-funding?page=list'
    
    if(data?.details){
      url = `/client-funding?page=detail&client_id=${data.client_id}`;
    }

    return this.http.get<any>(`${this.server}${url}`).pipe(
      map((res) => <any[]>res.data),
      catchError(this.handleError)
    );
  }


  //{{domain}}/client?page=funding-source&price_list_id=213791
  getClientByFundingItem(data): Observable<any> {
    let url = `/client?page=funding-source&price_list_id=${data?.price_list_id}`;

    return this.http.get<any>(`${this.server}${url}`).pipe(
      map((res) => <any[]>res.data),
      catchError(this.handleError)
    );
  }

  saveClientFunding(data:any): Observable<any> {
    return this.http.post<any>(`${this.server}/client-funding`, data).pipe(
      map((res: any) => <any>res),
      catchError(this.handleError)
    );
  }

  editClientFunding(data: any): Observable<any> {
    return this.http.put(`${this.server}/client-funding`, data)
    .pipe(
      map((res) => <any>res)
    );
  }

  deleteClientFunding(data: any): Observable<any> {
    return this.http.delete<any>(`${this.server}/client-funding`, {body: {id: [...data]}
  })
    .pipe(
      map((res) => <any>res),
      catchError(this.handleError)
    );
  }

  uploadClientFunding(data:any): Observable<any> {
    return this.http.post<any>(`${this.server}/data-import`, data).pipe(
      map((res: any) => <any>res),
      catchError(this.handleError)
    );
  }

  // error handler
  private handleError(error: any, caught: any): any {
    throw error;
  }
}
