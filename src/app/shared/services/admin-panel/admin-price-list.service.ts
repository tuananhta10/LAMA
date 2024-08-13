import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, filter, switchMap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PriceListService {
  private server = environment.host;
  constructor(private http: HttpClient) {}

  getPriceListListData(state?: string, page_size?: string, page_number?: string, version?: string, searchText?: string): Observable<any> {
    // Set params
    let selectedState = state ? state.toLowerCase().replace(/\s/gi, '_') : 'act';
    let pageSize = page_size ? String(page_size) : '25';
    const pageNumber = page_number ? String(page_number) : '1';

    let queryParams: string[] = [
      `page=list`,
      `order-by=name--asc`,
      `branch_state=${selectedState}`,
      `page_size=${pageSize}`,
      `page_number=${pageNumber}`
    ];

    // add `version` if not null
    if (version) {
      queryParams.push(`version=${version}`);
    }
    // add `searchText` if not null
    if (searchText) {
      queryParams.push(`search_text=${searchText}`);
    }
    // Add query with &
    let query = queryParams.join('&');

    return this.http.get<any>(`${this.server}/price-list?${query}`).pipe(
      map((res) => res.data), 
      catchError(this.handleError)
    );
  }

  getVersion(data:any): Observable<any> {
    return this.http.get<any>(`${this.server}/price-list-versions?branch_state=${data}`, data).pipe(
      map((res: any) => <any[]>res.data),
      catchError(this.handleError)
    );
  }

  savePriceList(data:any): Observable<any> {
    return this.http.post<any>(`${this.server}/price-list`, data).pipe(
      map((res: any) => <any[]>res.data),
      catchError(this.handleError)
    );
  }

  editPriceList(data: any): Observable<any> {
    return this.http.put(`${this.server}/price-list`, data)
      .pipe(
        map((res) => <any>res)
      );
  }

  uploadPriceList(data: any): Observable<any> {
    return this.http.post(`${this.server}/data-import`, data)
      .pipe(
        map((res) => <any>res)
      );
  }


  // error handler
  private handleError(error: any, caught: any): any {
    throw error;
  }
}
