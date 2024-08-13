import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, filter, switchMap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InvoiceBatchService {
  private server = environment.host;
  constructor(private http: HttpClient) {}

  getInvoiceBatchListData(): Observable<any> {
    return this.http.get<any>(`${this.server}/invoice?page=list&type=invoice_batch`).pipe(
      map((res) => <any[]>res.data),
      catchError(this.handleError)
    );
  }

  saveInvoiceBatch(data:any): Observable<any> {
    return this.http.post<any>(`${this.server}/invoice-batch`, data).pipe(
      map((res: any) => <any[]>res),
      catchError(this.handleError)
    );
  }

  editInvoiceBatch(data: any): Observable<any> {
    return this.http.put(`${this.server}/invoice-batch`, data)
    .pipe(
      map((res) => <any>res)
    );
  }

  deleteInvoiceBatch(data: any): Observable<any> {
    return this.http.delete<any>(`${this.server}/v2/invoice`, {body: { id: [...data]}
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
