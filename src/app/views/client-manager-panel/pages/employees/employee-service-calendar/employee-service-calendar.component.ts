import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  OnInit, 
  OnDestroy,
  Input
} from '@angular/core';
import { 
  CalendarEvent,
  CalendarView
} from 'angular-calendar';
import { Router } from '@angular/router';
import { mainAnimations } from '@app-main-animation';
import { 
  addDays, 
  addHours, 
  startOfDay, 
  toDate 
} from 'date-fns';
import { 
  Subscription, 
  Observable, 
  forkJoin, 
  combineLatest 
} from 'rxjs';
import { 
  select, 
  Store 
} from '@ngrx/store';
import { EmployeeListActionTypes } from '@app-admin-store/actions/admin-employees.actions';
import { EmployeeListState  } from '@app-admin-store/reducers/admin-employees.reducer';
export const colors: any = {
  red: {
    primary: 'rgba(253, 197, 166, 1)',
    secondary: 'rgba(252, 243, 238, 1)',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: 'rgba(251, 191, 36, 1)',
    secondary: 'rgba(251, 191, 36, 0.1)',
  },

  pink: {
    primary: 'rgba(253, 203, 245, 1)',
    secondary: 'rgba(254, 241, 252, 1)',
  },

  light_blue: {
    primary: 'rgba(158, 221, 231, 1)',
    secondary: 'rgba(215, 244, 248, 1)',
  },
};


@Component({
  selector: 'app-employee-service-calendar',
  animations: [mainAnimations],
  //changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './employee-service-calendar.component.html',
  styleUrls: ['./employee-service-calendar.component.scss']
})
export class EmployeeServiceCalendarComponent implements OnInit, OnDestroy {
  public smallCalendar: boolean = true;
  public view: CalendarView = CalendarView.Week;
  public viewDate: Date = new Date();
  public events: CalendarEvent[] = [
    {
      start: startOfDay(new Date()),
      end: addHours(startOfDay(new Date()), 1),
      title: 'Sample Employee Event',
      color: colors.yellow,
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: new Date(),
      title: 'Another Sample Schedule for Employee',
      color: colors.blue,
    },
    {
      start: addDays(addHours(startOfDay(new Date()), 2), 2),
      end: addDays(new Date(), 2),
      title: 'Buy Medicine',
      color: colors.red,
    },

    {
      start: addDays(addHours(startOfDay(new Date()), 15), 2),
      end: addDays(addHours(startOfDay(new Date()), 18), 2),
      title: 'Weekly Checkup',
      color: colors.light_blue,
    },

    {
      start: addDays(addHours(startOfDay(new Date()), 3), 4),
      end: addDays(new Date(), 4),
      title: 'Go to Theraphy',
      color: colors.pink,
    },
  ];
  public loading: boolean = true;
  public employeeList: any[] = [];
  public selected: Date | null;
  private req: Subscription;
  private employeesData$: any;

  constructor(private router: Router,
    private employeeListStore: Store<EmployeeListState>) {
    this.employeesData$ = this.employeeListStore.pipe(select(state => state));

    if(this.router.url.match('/details')) this.smallCalendar = false;
  }

  ngOnInit(): void {
    this.getEmployeeData();
  }

  ngOnDestroy(): void {
    if(this.req) this.req.unsubscribe();
  }

  // employee list data
  getEmployeeData(){
    this.employeeListStore.dispatch({ type:  EmployeeListActionTypes.GET_EMPLOYEE_LIVE_FEED })

    // Subscribe to storage
    this.req = this.employeesData$.subscribe((results: any) => {
      if(results){
        
        setTimeout(() => {
          this.loading = false;
        }, 2000);
      }
    });
  }
}
