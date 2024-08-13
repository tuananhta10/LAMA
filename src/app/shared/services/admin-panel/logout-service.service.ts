import { Injectable } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { Observable, Subject, Subscription, interval } from "rxjs";
import moment from "moment";
import { takeUntil } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class LogoutService {

    private activityMaxDelayWarning: number = 0;
    private activityMaxDelay: number = 0;
    private activityCheckInterval: number = 0;
    private activityLast: any = moment();
    private unsubscribe$ = new Subject<void>();

    private activity = new Subject<any>();

    activity$ = this.activity.asObservable()

    private timeout$: any;

    constructor() { }

    private registerActivity() {
        let _this = this;
        document.addEventListener('mousemove',  function(){
            _this.activityLast = new Date();
        });

        this.timeout$ = interval(this.activityCheckInterval).pipe(takeUntil(this.unsubscribe$)).subscribe(val => {
            this.activityCheck();
        })
    }

    public startWatch(activityMaxDelayWarning: number, activityMaxDelay: number, activityCheckInterval: number){
        this.removeActivityChecker()
        this.unsubscribe$ = new Subject<void>();
        this.activityMaxDelayWarning = activityMaxDelayWarning * 1000;
        this.activityMaxDelay = activityMaxDelay * 1000;
        this.activityCheckInterval = activityCheckInterval * 1000;

        this.registerActivity();

    }

    private activityCheck(): Observable<any> {
        const currDate = moment();
        const delay = currDate.diff(this.activityLast);
        console.debug("Activity delay is", delay);

        let actvity: any = {
            isWarning: false,
            isTimeout: false
        }

        if (!this.isUserLoggedIn()) {
            return actvity;
        }

        if(delay > this.activityMaxDelay) {
            actvity.isTimeout = true;

        } else if( delay > this.activityMaxDelayWarning) {
            actvity.isWarning = true;

        }
        this.activity.next(actvity);
    }

    private isUserLoggedIn(): boolean{
        return localStorage.getItem("token") ? true : false
    }

    public removeActivityChecker(){
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}