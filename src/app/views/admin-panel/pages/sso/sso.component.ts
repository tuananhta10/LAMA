import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { mainAnimations } from '@app-main-animation';
import { LoginAuthenticationService } from '@main/shared/services/admin-panel/login-authentication.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sso',
  animations: [mainAnimations],
  templateUrl: './sso.component.html',
  styleUrls: ['./sso.component.scss']
})
export class SSOComponent implements OnInit {

  public loading: boolean = false;
  public token: any = '';
  public email: any = '';
  private loginReq? : Subscription;

constructor(
    private route: ActivatedRoute,
    private loginService: LoginAuthenticationService,
    private router: Router,
  ) { 
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      this.email = params['email'];
  });
  }

  ngOnInit(): void {
    localStorage.setItem('token', this.token);

    this.loginReq = this.loginService
    .ssoLogin()
    .subscribe((result: any) => {

      if(!result) localStorage.setItem('loginError', 'The server is taking too long to respond. Please try again.');

      if(result.result === 'Success'){
        localStorage.setItem('loggedUserData', JSON.stringify({
          ...result?.data
        }));

        this.router.navigate(['/dashboard']);
      }
    },
    // If error in server/api temporary navigate to error page
    (err: any) => {
      const errorMessage = "Token expired, please login again";
      localStorage.setItem('loginError', errorMessage);
      this.router.navigate(['/signin']);
    });        
  }

}
