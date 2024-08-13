import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { tap } from "rxjs/internal/operators";
import { AdminService } from "../services/admin-panel/admin.service";
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class UnAuthorizedInterceptor implements HttpInterceptor {
  private remainingTime: number = 60 * 60; // 15 minutes in seconds
  private interval: any;

  constructor(private router: Router, 
    private adminService: AdminService,
    private snackBar: MatSnackBar) { 
    this.startCountdown();
  }
  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(tap(() => { 
      // console.log("RESET LOGOUT TIMER")
      this.remainingTime = 60 * 60;
    },
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          console.log(err)
          localStorage.setItem('returnURL', this.router.url);

          if ((err.status === 401) || (err.status === 403) || (err.status === 422)) {
            this.adminService.logoutAdmin();
            localStorage.setItem('loginError', "Your login authorization is already expired. Please login again to continue.");
            this.router.navigate(['/signin']);

            let doc = document.getElementById('main-container');

            setTimeout(() => {
              if(doc) doc.click();
            }, 500)
            //window.location.reload();
          } 

          else if(err.status === 500){
           /* this.snackBar.open(
              'Your request cannot be processed right now. You can try refreshing your page or try contacting the server administrator.',
              '',
              {
                duration: 5000,
                panelClass: 'danger-snackbar',
              }
            );*/

            console.log(err)
          }
          // else if(err.status === 500){
          //   //this.adminService.logoutAdmin();
          //   //localStorage.setItem('loginError', "The server is taking a bit too long to respond. Please try again later.");
          //   //this.router.navigate(['/admin/signin']);

          //   this.snackBar.open(`Request cannot be executed right now. The server is not responding. Please try again later.`, '', {
          //     duration: 4000,
          //     panelClass: ['danger-snackbar']
          //   });
          // }
          else {
            return;
          }
        }
      }));
  }

  startCountdown(): void {
    this.interval = setInterval(() => {
      if (this.remainingTime > 0) {
        //console.log(this.remainingTime)

        this.remainingTime--;
      } else {
        this.adminService.logoutAdmin();
        localStorage.setItem('loginError', "Your login authorization is already expired. Please login again to continue.");
        this.router.navigate(['/signin']);
        this.stopCountdown();
      }
    }, 1000);
  }

  stopCountdown(): void {
    clearInterval(this.interval);
    console.log('Countdown has ended!');
  }
}