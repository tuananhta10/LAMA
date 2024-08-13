import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, BehaviorSubject } from "rxjs";
import { map, filter, switchMap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminEnumsService {

  private server = environment.host;
  
  constructor(private http: HttpClient) {}

  //branches
  getBranchesData(): Observable<any> {
    return this.http.get<any>(`${this.server}/branch`)
    .pipe(
      map((res) => <any[]>res.data)
    );
  }

  getCountriesData(): Observable<any> {
    return this.http.get<any>(`${this.server}/country?order-by=name--asc`)
    .pipe(
      map((res) => <any[]>res.data)
    );
  }

  geReligionsData(): Observable<any> {
    return this.http.get<any>(`${this.server}/religion?order-by=name--asc`)
    .pipe(
      map((res) => <any[]>res.data)
    );
  }

  getLanguagesData(): Observable<any> {
    return this.http.get<any>(`${this.server}/language?order-by=name--asc`)
    .pipe(
      map((res) => <any[]>res.data)
    );
  }

  getProgramsData(): Observable<any> {
    return this.http.get<any>(`${this.server}/program?order-by=name--asc`)
    .pipe(
      map((res) => <any[]>res.data)
    );
  }

  getClassificationsData(): Observable<any> {
    return this.http.get<any>(`${this.server}/min-class?order-by=name--asc`)
    .pipe(
      map((res) => <any[]>res.data)
    );
  }

  getManagersData(): Observable<any> {
    return this.http.get<any>("assets/fake-db/managers.json")
    .pipe(
      map((res) => <any[]>res.data)
    );
  }

  getPositionsData(): Observable<any> {
    return this.http.get<any>(`${this.server}/employee-position?order-by=name--asc`).pipe(
      map((res) => <any[]>res.data),
      catchError(this.handleError)
    );
  }

  getEmploymentTypesData(): Observable<any> {
    return this.http.get<any>("assets/fake-db/employment-types.json")
    .pipe(
      map((res) => <any[]>res.data)
    );
  }

  getPriceListsData(): Observable<any> {
    return this.http.get<any>("assets/fake-db/price-list.json")
    .pipe(
      map((res) => <any[]>res.data)
    );
  }




  // error handler
  private handleError(error: any, caught: any): any {
    throw error;
  }
}
