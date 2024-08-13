import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, filter, switchMap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClientInvoiceService {
  private server = environment.host;
  constructor(private http: HttpClient) {}

  getInvoiceItems(data): Observable<any> {
    return this.http.get<any>(`${this.server}/invoice?page=details&id=${data?.id}`).pipe(
      map((res) => <any[]>res.data),
      catchError(this.handleError)
    );
  }
  

  getInvoiceReferrence(data): Observable<any> {
    return this.http.get<any>(`${this.server}/invoice?page=invoice-batch-details&invoice_batch_id=${data?.id}`).pipe(
      map((res) => <any[]>res.data),
      catchError(this.handleError)
    );
  }

  getClientInvoiceListData(): Observable<any> {
    return this.http.get<any>(`${this.server}/invoice?page=invoice-batch-list`).pipe(
      map((res) => <any[]>res.data),
      catchError(this.handleError)
    );
  }

  saveClientInvoice(data:any): Observable<any> {
    return this.http.post<any>(`${this.server}/client-invoice`, data).pipe(
      map((res: any) => <any[]>res),
      catchError(this.handleError)
    );
  }

  editClientInvoice(data: any): Observable<any> {
    return this.http.put(`${this.server}/invoice-batch-payment`, data)
    .pipe(
      map((res) => <any>res)
    );
  }

  deleteClientInvoice(data: any): Observable<any> {
    // return this.http.delete<any>(`${this.server}/client-invoice`, {body: { id: [...data]}
    return this.http.delete<any>(`${this.server}/v2/invoice-batch `, {body: data

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
