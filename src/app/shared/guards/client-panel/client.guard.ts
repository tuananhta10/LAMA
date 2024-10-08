import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { Observable} from 'rxjs';
import { Router } from '@angular/router';
import { AdminService } from '@app-services/admin-panel/admin.service';

@Injectable({
  providedIn: 'root'
})
export class ClientGuard implements CanActivate {
  constructor(private adminService: AdminService,
    private router: Router){}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let token = localStorage.getItem('token');
    let loggedUser = JSON.parse(localStorage.getItem('loggedUserData'))
    
    if(token && (loggedUser?.system_role == 'client' 
      || loggedUser?.system_role == 'admin')){
      return true;
    } 

    else {
      this.adminService.logoutAdmin();
      localStorage.setItem('loginError', "You are not allowed to access this URL. Please login to continue.");
      localStorage.setItem('returnURL', this.router.url);
      this.router.navigate(['/signin']);
      return false;
    }
  }
  
}
