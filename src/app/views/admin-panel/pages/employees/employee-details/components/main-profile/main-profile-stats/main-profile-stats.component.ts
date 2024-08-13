import { Component, OnInit, Input } from '@angular/core';
import { mainAnimations } from '@app-main-animation';
import { Router, ActivatedRoute } from '@angular/router';
import { ViewAllComplianceComponent } from '../../../dialogs/view-all-compliance/view-all-compliance.component';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { EmployeeState } from '@main/views/admin-panel/store/reducers/admin-employee.reducer';
import { convertTimestampUtc } from '@main/shared/utils/date-convert.util';
import { EmployeeActionTypes } from '@main/views/admin-panel/store/actions/admin-employee.action';
import { EmployeeListActionTypes } from '@app-admin-store/actions/admin-employees.actions';
import { EmployeeListState  } from '@app-admin-store/reducers/admin-employees.reducer';
import { ComplianceCheckComponent } from '../../../dialogs/compliance-check/compliance-check.component';
import { parseArrayObject } from '@main/shared/utils/parse.util';
import moment from 'moment';
import { 
  Subscription, 
  Observable, 
  forkJoin, 
  combineLatest,
  Subject
} from 'rxjs';

interface ComplianceFile{
  icon?: string,
  name: string,
  type: string,
  expiry_date: string,
  status: string,
  description: string
}

interface ComplianceCheck{
  employeeName: string,
  status: string,
  type: string,  
  qualification: string,  
  expiryDate: string,  
  description: string,  
  remarks: string,  
  file: string
}

@Component({
  selector: 'employee-main-profile-stats',
  animations: [mainAnimations],
  templateUrl: './main-profile-stats.component.html',
  styleUrls: ['./main-profile-stats.component.scss']
})
export class MainProfileStatsComponent implements OnInit {
  @Input() id: string = '';
  @Input() employeeData: any = {};
  private req: Subscription;
  private employee$: any;
  public complianceFile: ComplianceFile[] = [];

  public statData: any[] = [
    {
      "title": "Weekly Shifts",
      "stat_val": 0,
      "img": "/assets/images/icons/support-hours.png",
      "class": "d-flex me-3 incident",
      "view_more": () => this.router.navigate([`/admin/employees/details/${this.id}/employee-shift`])
    },

    {
      "title": "Cancelled Shift",
      "stat_val": 0,
      "img": "/assets/images/icons/cancellation.png",
      "class": "d-flex me-3 funding",
      "view_more": () => this.router.navigate([`/admin/employees/details/${this.id}/employee-shift/cancelled`])
    },

    {
      "title": "Compliance Check",
      "stat_val": 0 + ' %',
      "img": "/assets/images/icons/end-plan.png",
      "class": "d-flex me-3 end-plan",
      "view_more": () => this.openViewAllCompliance()
    },

    {
      "title": "Completed Hours",
      "stat_val": 0 + ' H',
      "img": "/assets/images/icons/hours-scheduled.png",
      "class": "d-flex me-3 support-hours",
      "view_more": () => this.router.navigate([`/admin/employees/details/${this.id}/timesheet`])
    },

    /*{
      "title": "Performance",
      "stat_val": 140,
      "img": "/assets/images/icons/performance.png",
      "class": "d-flex me-3 me-md-0 cancellation",
      "view_more": () => console.log("HEY INCIDENT")
    },*/
  ];

  constructor(private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private employeeListStore: Store<EmployeeListState>,
    private employeeStore: Store<EmployeeState>,) { 

    if(!this.id){
      this.id = route.parent.snapshot.params['id'];
      this.employee$ = this.employeeStore.pipe(select(state => state.employee));
    }
  }

  ngOnInit(): void {
    if(this.id){
      //this.getClientStats();
      this.req = this.employee$.subscribe((result: any) => {
        let employeeStats = result?.employeeStats?.result;

        if(employeeStats?.length > 0){
          this.statData[0]['stat_val'] = (Math.round(employeeStats[0]?.employee_service_schedule_total * 100) / 100);
          this.statData[1]['stat_val'] = (Math.round(employeeStats[0]?.employee_service_schedule_cancel * 100) / 100);
          this.statData[2]['stat_val'] = (Math.round((employeeStats[0]?.employee_qualification_percentage || 0) * 100) / 100) + ' %';
          this.statData[3]['stat_val'] = (Math.round(employeeStats[0]?.employee_timesheet_total_hours * 100) / 100) + ' H';
        }
      });
    }

    this.subscribeCompliance();
  }

  subscribeCompliance(){
    this.employee$ = this.employeeStore.pipe(select(state => state.employee));
    
    this.req = this.employee$.subscribe((result: any) => {
      this.complianceFile = result.employee?.profileEmployeeDetail?.employee_qualification;
      
      if(this.complianceFile){
        [...this.complianceFile].forEach((el: any) => {
          el['qualification_name'] = parseArrayObject(el['qualification'], 'qualification');
          el['type'] = parseArrayObject(el['qualification'], 'type') ? parseArrayObject(el['qualification'], 'type') : 'Other';
          el['description'] = parseArrayObject(el['qualification'], 'description') ? parseArrayObject(el['qualification'], 'description') : 'Other';
          el['status'] = el.status ? el.status : 'Pending';
        });
      }
    });
  }
  

  submitUpdateComplianceDoc(row?: ComplianceFile){
    const dialogRef = this.dialog.open(ComplianceCheckComponent, {
      panelClass: "dialog-responsive",
      //width: '550px',
      data: {
        employeeData: this.employeeData,
        item: row
      },
      autoFocus: false 
    });

    dialogRef.afterClosed().subscribe(result => {
      //this.dbClickActive = false;
      //this.selectRows(selectedEmployee);
      console.log('The dialog was closed',  /*this.dbClickActive*/ );
    });

  }

  // view all compliance
  openViewAllCompliance(){
    const dialogRef = this.dialog.open(ViewAllComplianceComponent, {
      panelClass: "dialog-responsive",
      //width: '550px',
      maxHeight:'97vh',
      data: {
        employeeData: this.employeeData,  
        compliance: this.complianceFile
      },
      autoFocus: false 
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed',  /*this.dbClickActive*/ );
    });

  }
}
