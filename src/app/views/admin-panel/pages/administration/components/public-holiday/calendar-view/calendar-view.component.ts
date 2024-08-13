import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  OnInit, 
  Input,
  OnDestroy
} from '@angular/core';

import { mainAnimations } from '@app-main-animation';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
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
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { formatDate } from '@angular/common';
import { differenceInDays  } from 'date-fns';
import { AddPublicHolidayComponent } from '../../../dialogs/add-public-holiday/add-public-holiday.component';

@Component({
  selector: 'public-holiday-calendar-view',
  //changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [mainAnimations],
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.scss']
})
export class CalendarViewComponent implements OnInit {
  public view: CalendarView = CalendarView.Month;
  public viewDate: Date = new Date();

  @Input() events: any[] = [];
  @Input() colors: any[] = [];
  @Input() upcommingHoliday: any[] = [];
  @Input() loading: boolean = true;
  
  public calendarView: any[];
  public selected: Date | null;
  private req: Subscription;
  private unsubscribe$ = new Subject<void>();

  constructor(private dialog: MatDialog,) {
  }

  computeRemainingDay(upcomming): number{
    return differenceInDays(new Date(upcomming * 1000), new Date())
  }

  ngOnInit(): void {
    this.calendarView = [...this.events].map(el => {
      return {
        id: el.id,
        date: startOfDay(new Date(el.date * 1000)),  
        branches: 1,
        start: startOfDay(new Date(el.date * 1000)),
        end: endOfDay(new Date(el.date * 1000)),
        //allDay: true,
        title: `${el?.name} - ${el?.description}`,
        title_only: `${el?.name}`,
        draggable: el?.draggable,
        resizable: {
          beforeStart:  el?.resizable?.beforeStart,
          afterEnd:  el?.resizable?.afterEnd,
        },
        color: this.colors[el.bg_color_code],
      }
    });

  }

  public activeDayIsOpen: boolean = false;

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  refresh = new Subject<void>();

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.refresh.next();
  }

  handleEvent(action: string, event: CalendarEvent): void {
    console.log(action, event, this.events)
    let holiday = this.events.find(el => el?.id === event?.id)

    let createPublicHolidayDialog = this.dialog.open(
      AddPublicHolidayComponent,
      {
        minWidth: '30vw',
        maxWidth: '70vw',
        data: holiday,
      }
    );

    createPublicHolidayDialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {

    });
  }
}
