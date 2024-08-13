import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, filter, switchMap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  private server = environment.host;
  constructor(private http: HttpClient) {}

  getInvoiceItems(data): Observable<any> {
    return this.http.get<any>(`${this.server}/invoice?page=details&id=${data?.id}`).pipe(
      map((res) => <any[]>res.data),
      catchError(this.handleError)
    );
  }

  getInvoiceListData(): Observable<any> {
    return this.http.get<any>(`${this.server}/invoice`).pipe(
      map((res) => <any[]>res.data),
      catchError(this.handleError)
    );
  }

  saveInvoice(data:any): Observable<any> {
    return this.http.post<any>(`${this.server}/invoice`, data).pipe(
      map((res: any) => <any>res),
      catchError(this.handleError)
    );
  }

  editInvoice(data: any): Observable<any> {
    return this.http.put(`${this.server}/invoice`, data)
    .pipe(
      map((res) => <any>res)
    );
  }

  deleteInvoice(data: any): Observable<any> {
    return this.http.delete<any>(`${this.server}/invoice`, 
    { body: { id: [...data] }
  })
    .pipe(
      map((res: any) => <any>res),
      catchError(this.handleError)
    );
  }

  // error handler
  private handleError(error: any, caught: any): any {
    throw error;
  }
}
