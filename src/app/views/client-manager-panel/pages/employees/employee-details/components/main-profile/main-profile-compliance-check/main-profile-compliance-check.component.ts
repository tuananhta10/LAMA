import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ComplianceCheckComponent } from '../../../dialogs/compliance-check/compliance-check.component';
import { ViewAllComplianceComponent } from '../../../dialogs/view-all-compliance/view-all-compliance.component';
import { parseArrayObject } from '@main/shared/utils/parse.util';
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

import { EmployeeState } from '@main/views/admin-panel/store/reducers/admin-employee.reducer';
import { EmployeeActionTypes } from '@main/views/admin-panel/store/actions/admin-employee.action';
import { MatSnackBar } from '@angular/material/snack-bar';
import { convertTimestampUtc } from '@main/shared/utils/date-convert.util';
import moment from 'moment';

interface ComplianceFile{
  icon?: string,
  qualification_name: string,
  type: string,
  expiry_date?: any,
  status: string,
  description: string
}

interface ComplianceCheck{
  employeeName: string,
  status: string,
  type: string,  
  qualification: string,  
  expiryDate?: any,
  description: string,  
  remarks: string,  
  file: string
}

@Component({
  selector: 'employee-main-profile-compliance-check',
  templateUrl: './main-profile-compliance-check.component.html',
  styleUrls: ['./main-profile-compliance-check.component.scss']
})
export class MainProfileComplianceCheckComponent implements OnInit {
  @Input() employeeData: any;
  private req: Subscription;
  private employee$: any;
  public complianceFile: ComplianceFile[] = [];

  constructor(private employeeListStore: Store<EmployeeListState>,
    private employeeStore: Store<EmployeeState>,
    private dialog: MatDialog,) { }

  ngOnInit(): void {
    this.employee$ = this.employeeStore.pipe(select(state => state.employee));
    
    this.req = this.employee$.subscribe((result: any) => {
      console.log("COMPLIANCE", result)

      this.complianceFile = result.employee?.profileEmployeeDetail.employee_qualification;
      
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
