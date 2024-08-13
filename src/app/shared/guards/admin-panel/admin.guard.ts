import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable} from 'rxjs';
import { Router } from '@angular/router';
import { AdminService } from '@app-services/admin-panel/admin.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private adminService: AdminService,
    private router: Router){}

  canActivate(next: ActivatedRouteSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let token = localStorage.getItem('token');
    let loggedUser = JSON.parse(localStorage.getItem('loggedUserData'))
    
    if(token && loggedUser?.organization_id ){
      if(this.checkRole(next, loggedUser?.system_role?.toLowerCase())){
        return true;
      }
      else {
        this.router.navigate(['/dashboard']);
      }
    } 

    else {
      this.adminService.logoutAdmin();
      localStorage.setItem('loginError', "You are not allowed to access this URL. Please login to continue.");
      localStorage.setItem('returnURL', this.router.url);
      this.router.navigate(['/signin']);
      return false;
    }
  }

  checkRole(route: ActivatedRouteSnapshot, role){
    let ret = false;
    if(route.data.role.includes(role)){
      ret = true;
    }

    return ret;
  }
}
