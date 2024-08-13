import { Component, OnInit } from '@angular/core';
import { MessagingService } from './shared/services/firebase/messaging.service';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { AdminService } from './shared/services/admin-panel/admin.service';
import { Router } from '@angular/router';
import { LogoutService } from './shared/services/admin-panel/logout-service.service';
import { takeWhile } from 'rxjs/operators'
const broadcast = new BroadcastChannel('myAppChannel');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MessagingService]
})
export class AppComponent implements OnInit {

  constructor(private messagingService: MessagingService, private afMessaging: AngularFireMessaging, 
    private adminService: AdminService,
    private router: Router,
    private logoutService: LogoutService) { }
    private alive: boolean = true;
  ngOnInit(): void {
    this.messagingService.requestPermission()
    
    this.afMessaging.messages
    .subscribe((message) => { 
      console.log("test")
      console.log(message); 
    });

    broadcast.onmessage = (event) => {
     console.log(event)
    }

    if(localStorage.getItem("token")){
      this.logoutService.startWatch(15000,18000, 5);
    }
    this.logoutService.activity$.pipe(takeWhile(() => this.alive)).subscribe(val => {
      // console.log(val);

      if(val?.isTimeout){
        this.logoutService.removeActivityChecker();
        this.adminService.logoutAdmin();
        localStorage.clear();
        localStorage.removeItem('selected_client_columns'); 
        this.router.navigate(['/signin'])
      }
    });
  }
}
