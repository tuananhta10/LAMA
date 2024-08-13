import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, BehaviorSubject } from "rxjs";
import { map, filter, switchMap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private isAdminLoggedIn: any;
  private server = environment.server;

  private adminStatus = new BehaviorSubject<any>(null || localStorage.getItem('adminLogin'));
  public adminStatus$ = this.adminStatus.asObservable();

  constructor(private http: HttpClient, 
    private router: Router) {
  }

  // error handler
  private handleError(error:any, caught:any): any {
    localStorage.setItem('notFound', 'true');
    throw error;
  }

  // error handler authorize
  private handleErrorAuthorize(error:any, caught:any): any {
    localStorage.setItem('notFound', 'true');
    throw error;
  }

  // get login status from session storage
  getAdminProfile() {
    return this.http
    .get(`${this.server}/api/teacher/profile`);
  }

  // get login status from session storage
  getAdminLoginStatus(): any  {
    let storedItem:any = localStorage.getItem('adminLogin');

    if(!!storedItem && storedItem != 'false') return true; 
    else return false;
  }

  // logout admin
  logoutAdmin(): any {
    localStorage.clear();
    this.isAdminLoggedIn = false;
    this.adminStatus.next(undefined);
    this.setAdminLogin(false);
  }

  // set login status to true in local storage
  setAdminLogin(status: any): void {
    this.adminStatus.next(status);
    localStorage.setItem('adminLogin', status);
    this.isAdminLoggedIn = status;
  }
}
