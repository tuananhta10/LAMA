import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, filter, switchMap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private http: HttpClient) {}

  private server = environment.host;

  getClientData(client: any): Observable<any> {
    let url;

    if(client?.type === 'contact-details'){
      url = `${this.server}/v2/client?id=${client.id}&page=${client.type}`;
    }

    else {
      url = `${this.server}/client?id=${client.id}&page=${client.type}`;
    }

    return this.http.get<any>(url).pipe(
      map((res) => <any[]>res.data),
      catchError(this.handleError)
    );
  }

  saveClient(client: any): Observable<any> {
    return this.http.post(`${this.server}/client`, client)
    .pipe(
      map((res) => <any>res)
    );
  }

  editClient(client: any): Observable<any> {
    return this.http.put(`${this.server}/client`, client)
    .pipe(
      map((res) => <any>res)
    );
  }

  getClientStats(client: any): Observable<any> {
    return this.http.get<any>(`${this.server}/summary-report?client_id=${client.id}&content=client`).pipe(
      map((res) => <any[]>res.data),
      catchError(this.handleError)
    );
  }

  createClientEmergencyContact(data: any): Observable<any> {
    return this.http.post<any>(`${this.server}/v2/emergency-contacts`, data).pipe(
      map((res) => <any[]>res.data),
      catchError(this.handleError)
    );
  }

  updateClientEmergencyContact(data: any): Observable<any> {
    return this.http.put<any>(`${this.server}/v2/emergency-contacts/${data?.id}`, data).pipe(
      map((res) => <any[]>res.data),
      catchError(this.handleError)
    );
  }

  deleteClientEmergencyContact(data: any): Observable<any> {
    return this.http.delete<any>(`${this.server}/v2/emergency-contacts/${data?.id}`, {}).pipe(
      map((res) => <any[]>res.data),
      catchError(this.handleError)
    );
  }

  // error handler
  private handleError(error: any, caught: any): any {
    throw error;
  }
}
