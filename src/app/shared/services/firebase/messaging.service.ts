import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { BehaviorSubject } from 'rxjs';
import { LoginAuthenticationService } from '../admin-panel/login-authentication.service';
@Injectable()
export class MessagingService {
  currentMessage = new BehaviorSubject(null);
  constructor(
    private angularFireMessaging: AngularFireMessaging,
    private adminService: LoginAuthenticationService
  ) {
    this.angularFireMessaging.messages.subscribe((_messaging: any) => {
      _messaging.onMessage = _messaging.onMessage.bind(_messaging);
      _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
    });
  }
  requestPermission() {
    let _this = this;
    this.angularFireMessaging.requestToken.subscribe(
      (token) => {
        let userDetails = JSON.parse(
          localStorage.getItem('loggedUserData')
        );
        if (Array.isArray(userDetails?.fcm_token_web) && !userDetails?.fcm_token_web.includes(token)) {
          let data = {
            id: userDetails?.id,
            fcm_token_web: [...userDetails?.fcm_token_web, token]
          }
          this.adminService.updateAdminFCM(data).subscribe((result: any) => {
            // console.log(result);
          },
          (err: any) => {

          });  
        } else if(!Array.isArray(userDetails?.fcm_token_web)){
          let data = {
            id: userDetails?.id,
            fcm_token_web: [token]
          }
          this.adminService.updateAdminFCM(data).subscribe((result: any) => {
            // console.log(result);
          },
          (err: any) => {

          });  
        }
        // console.log(token);
      },
      (err) => {
        console.error('Unable to get permission to notify.', err);
      }
    );
  }
  receiveMessage() {
    this.angularFireMessaging.messages.subscribe((payload) => {
      console.log('new message received. ', payload);
      this.currentMessage.next(payload);
    });
  }
}
