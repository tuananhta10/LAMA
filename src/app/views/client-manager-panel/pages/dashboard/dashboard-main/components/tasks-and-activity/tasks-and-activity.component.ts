import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { taskLists, 
  Task,  
  displayedColumns, 
} from '../../utils/task-model-interface'; 
import { 
  addDays, 
  addHours,
  addWeeks, 
  startOfDay, 
  endOfDay,
  toDate 
} from 'date-fns';
import moment from 'moment';
import { Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { DashboardActionTypes } from '@main/views/admin-panel/store/actions/admin-dashboard.action';

@Component({
  selector: 'admin-dashboard-tasks-and-activity',
  templateUrl: './tasks-and-activity.component.html',
  styleUrls: ['./tasks-and-activity.component.scss']
})
export class TasksAndActivityComponent implements OnInit {
  public defaultImage: string = '/assets/images/icons/user-placeholder.png';
  public taskLists: Task[] = taskLists;
  public columns = displayedColumns;
  private currentDate = moment();
  public currentDay: number = new Date().getDay();
  public dateRange: any = {
    start_date: new Date(this.currentDate.startOf('week').isoWeekday('Monday').toString()),  
    end_date: new Date(this.currentDate.endOf('week').isoWeekday('Sunday').toString())
  }
  public days: number[] = [0, 1, 2, 3, 4, 5, 6];
  public loading: boolean = true;
  
  public searchBy: string = '';
  public defaultImg: string = '/assets/images/icons/user-placeholder.png';
  public addDays: any = addDays;
  public thisWeekActive: boolean = true;
  public groupBy: string = 'Employee';
  public filterBy: string = '';
  @Input() taskGraphData: any;
  @Input() incidentGraphData: any;
  @Output() updateTaskData: EventEmitter<any> = new EventEmitter<any>();
  private taskData$: any;
  public taskData: any;
  private req: Subscription;

  constructor(private adminTaskDashboard: Store<AdminProfileState>) { }

  ngOnInit(): void {
    this.dateRange = {
      start_date: addWeeks(this.dateRange.start_date, 1),  
      end_date: addWeeks(this.dateRange.end_date, 1)
    }

    this.taskData$ = this.adminTaskDashboard.pipe(select(state => state.dashboard));

    this.req =  this.taskData$.subscribe((dashboard: any) => {
      this.loading = dashboard.taskPending;

      this.taskData = dashboard.task;

      if(this.taskData.length > 0){
        this.taskData.sort(function(a: any,b: any){
          let aDate: any = new Date(b.due_date);
          let bDate: any = new Date(a.due_date);
          return bDate - aDate;
        });

        //this.taskData = this.taskData;
      }
    })

    this.getDashboard();
  }

  getDashboard(){
    let data = {
      start_date: '',
      end_date: ''
    }

    let start: Date = new Date(this.dateRange.start_date)
    let end = new Date(this.dateRange.end_date)

    data.start_date = moment(start).format("X");
    data.end_date = moment(end).format("X");

    this.adminTaskDashboard.dispatch({
      type: DashboardActionTypes.GET_DASHBOARD_TASK,
      payload: data
    }); 
  }

  convertToDateTime(dateVal: Date){
    return Math.trunc(new Date(dateVal).getTime() / 1000);
  }

  // add week from current date
  addWeek(): void {
    this.dateRange = {
      start_date: addWeeks(this.dateRange.start_date, 1),  
      end_date: addWeeks(this.dateRange.end_date, 1)
    }

    this.loading = true;  
    this.thisWeekActive = false;
    this.getDashboard();
  }

  // subtract date from current date
  subtractWeek(): void {
    this.dateRange = {
      start_date: addWeeks(this.dateRange.start_date, -1),  
      end_date: addWeeks(this.dateRange.end_date, -1)
    }

    this.loading = true;  
    this.thisWeekActive = false;
    this.getDashboard();
  }

  // return to current date
  setToThisWeek(): void {
    this.dateRange = {
      start_date: new Date("January 31, 2022"),  
      end_date: new Date("February 6, 2022")
    }

    this.thisWeekActive = true;
    this.loading = true;  
    setTimeout(() => this.loading = false, 1500);
  }

  plotTask(date: Date, ind: number): Object {
    let retData = {
      start_time: ind == 0 ? "08:00:00" : ind == 1 ? "18:00:00" : "23:00:00"
    };
    this.taskData.forEach((element, index) => {
      let taskDate = new Date(element.due_date * 1000);
      if(this.stringDate(date) === this.stringDate(taskDate) && index === ind){
        retData = element;
      }
    });

    return retData;
  }

  stringDate(date: Date){
    let sD = date.getMonth() + "/" + date.getDay() + "/" + date.getFullYear();
    return sD.toString();
  }

  checkProp(obj: any): boolean{
    let ret = false;
    if(obj.hasOwnProperty("task_name")){
      ret = true
    }
    return ret;
  }

  formatTime(data){
    return moment(data, 'HHmmss').format("HH:mm");
  }

  convertTo12Hrs(time) {
    if(typeof time === 'object' && time !== null){
      time = time.start_time;
    }
    if(!time) return;

    // Check correct time format and split into components
    time = time?.substr(0,5).toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) { // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(''); // return adjusted time or original string
  }

}
