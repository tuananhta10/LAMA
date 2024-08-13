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
import { EmployeeTaskActionTypes } from '@main/views/admin-panel/store/actions/admin-employee-task.action';
import { TaskDetailsComponent } from '../task-details/task-details.component';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'admin-dashboard-tasks-and-activity',
  templateUrl: './tasks-and-activity.component.html',
  styleUrls: ['./tasks-and-activity.component.scss']
})
export class TasksAndActivityComponent implements OnInit {
  @Input() referralsData;  
  @Input() taskGraphData: any;
  @Input() incidentGraphData: any;
  @Output() updateTaskData: EventEmitter<any> = new EventEmitter<any>();
  
  private taskData$: any; 
  private req: Subscription;
  private unsubscribe$ = new Subject<void>();
  private currentDate = moment();

  public defaultImage: string = '/assets/images/icons/user-placeholder.png';
  public taskLists: Task[] = taskLists;
  public columns = displayedColumns;
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
  public taskData: any;

  constructor(private adminTaskDashboard: Store<AdminProfileState>,
    private dialog: MatDialog,) { }

  ngOnInit(): void {
    this.dateRange = {
      start_date: addWeeks(this.dateRange.start_date, 1),  
      end_date: addWeeks(this.dateRange.end_date, 1)
    }

    this.subscribeToTask();
    this.getDashboard();
  }

  subscribeToTask(){
    this.taskData$ = this.adminTaskDashboard.pipe(select(state => state));

    this.req =  this.taskData$.subscribe((result: any) => {
      this.loading = result?.employeeTask?.pending;

      if (result?.employeeTask?.employeeTaskList?.length > 0) {
        this.taskData = result?.employeeTask?.employeeTaskList.sort((a,b) => {
          let aDate: any = new Date(b.due_date * 1000);
          let bDate: any = new Date(a.due_date * 1000);
          return bDate - aDate;
        });

        this.sortArr = {
          name: 'due_date',
          direction: 'asc'
        }
      }
    })
  }

  // REUSABLE SORT FUNCTION
  public sortArr: any;

  sortTask(sort_by: string){
    let direction = this.sortArr['name'] === sort_by && this.sortArr['direction'] === 'asc' ? 'dec' : 'asc';

    this.sortArr = {
      name: sort_by,
      direction: direction
    }

    const sortByObj = (field) => {
      this.taskData = [...this.taskData].sort((a,b) => {

        if(direction === 'asc')
          return a[field].localeCompare(b[field])

        else if(direction === 'dec')
          return b[field].localeCompare(a[field])
      });
    }

    switch(true){
      case sort_by === 'due_date':{
        this.taskData = [...this.taskData].sort((a,b) => {
          let aDate: any = new Date(b.due_date * 1000);
          let bDate: any = new Date(a.due_date * 1000);

          if(direction === 'asc')
            return bDate - aDate;

          else if(direction === 'dec')
            return aDate - bDate;
        });

        break;
      }
      case sort_by === 'status': { sortByObj('status'); break; }
      case sort_by === 'employee': { sortByObj('employee_name'); break; }
      case sort_by === 'task_name': { sortByObj('task_name'); break; }
    }
  }

  getDashboard(){
    this.adminTaskDashboard.dispatch({
      type: EmployeeTaskActionTypes.GET_EMPLOYEE_TASK_LIST
    });
  }

  openTaskDetails(data?: any) {
    let addTaskDialog = this.dialog.open(
      TaskDetailsComponent,
      {
        minWidth: '33vw',
        data: data,
      }
    );

    addTaskDialog
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {

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

  //checkProp(plotTask(addDays(dateRange?.start_date, i - 1), 0))

  stringDate(date: Date){
    let sD = date.getMonth() + "/" + (date.getDay()) + "/" + date.getFullYear(); 

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
    return time ? time.join('') : '8:00 AM'; // return adjusted time or original string
  }

}
