import { 
  Component, 
  OnDestroy, 
  OnInit 
} from '@angular/core';
import { mainAnimations } from '@app-main-animation';
import { ClientListService } from '@app-services/admin-panel/client-list.service';
import { LoginAuthenticationService } from '@app-services/admin-panel/login-authentication.service';
import { Subscription, Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'app-home-page',
  animations: [mainAnimations],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {
  public title: string = 'Lama Platform';
  public loading: boolean = true;
  private req: Subscription;

  constructor(private clientListService: ClientListService,
    private loginService: LoginAuthenticationService) { }

  ngOnInit(): void {
    setTimeout(() => this.loading = false, 1000);
  }

  ngOnDestroy(): void {
    if(this.req) this.req.unsubscribe();
  }


  // client details
  getClientDetails(): void{
    this.req = this.clientListService
    .getClientListFromAPI()
    .subscribe((results: any) => {
      console.log(results)

  
    });
  }


  postLogin(){
    //this.loginService.login();
    this.req = this.loginService.postLogin()
    .subscribe((result: any) => {
      console.log(result);
    });
  }

  postRegister(){
    //this.loginService.register();

    this.req = this.loginService.postRegister({})
    .subscribe((result: any) => {
      console.log(result);
    });
  }

  postSampleData(): void{
    this.req = this.clientListService
    .postNewProgramFromAPI()
    .subscribe((results: any) => {
      console.log(results)

  
    });
  }
}
