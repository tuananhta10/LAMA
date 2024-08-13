import { Component, OnInit, ViewChild } from '@angular/core';
import { ComponentCanDeactivate } from '@main/shared/guards/can-deactivate/pending-changes.guard';
import { MatStepper } from '@angular/material/stepper';
import { StepModel } from '../../../../../shared/components/stepper/model';
import { Observable, Subscription } from 'rxjs';
import { mainAnimations } from '@app-main-animation';
import { steps } from './stepper-tabs';
import { select, Store } from '@ngrx/store';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { EmployeeSuccessModalComponent } from '../employee-shared';
import { EmployeeActionTypes } from '@main/views/admin-panel/store/actions/admin-employee.action';
import { convertTimestampUtc } from '@main/shared/utils/date-convert.util';

@Component({
  selector: 'app-employee-create',
  animations: [mainAnimations],
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.scss']
})
export class EmployeeCreateComponent implements OnInit, ComponentCanDeactivate {

  @ViewChild('stepper') stepper: MatStepper;

  public steps: any = steps;
  public navigation: object = {};

  employeeForm:any = {
    employeeDetail: {},
    profileDetail: {},
    serviceDetail: {},
    workDays: {},
    contactDetail: {},
    employeeDocs: {
      add:[]
    }
  }
  canLeave:boolean = false;

  loading: boolean = false;
  formStep: number = 1;

  employee$: any;
  private req: Subscription;

  constructor(private adminEmployee: Store<AdminProfileState>, public dialog: MatDialog, private snackBar: MatSnackBar, private datePipe : DatePipe) { 
    
  }

  ngOnInit(): void {
    this.employee$ = this.adminEmployee.pipe(select(state => state.employee));
    this.req =  this.employee$.subscribe((employee: any) => {
      this.loading = employee.pending;

      if(employee.successCreate){
        this.snackBar.dismiss();
        this.dialog.open(
          EmployeeSuccessModalComponent,
          {
            panelClass: "dialog-responsive",
            disableClose: true,
            width: '800px',
            height: '720px',
            data: employee,
          }
        );
      }

      if(employee.error){
        this.snackBar.open("Something went wrong please try again later or contact your administrator", "", {
          duration: 4000,
          panelClass:'danger-snackbar'
        });
        
        this.adminEmployee.dispatch({
          type: EmployeeActionTypes.SAVE_EMPLOYEE_FAIL,
          payload: null
        }); 

        this.updateStepper(6);
      }

      if(employee.errorDraft){
        let message = employee?.errorDraft?.error?.message?.replace('[Request Error] ', '') ||"Something went wrong please try again later or contact your administrator"

        this.snackBar.open(message, "", {
          duration: 4000,
          panelClass:'danger-snackbar'
        });
      }

      if(employee.successDraft){
        this.snackBar.open("Successfully saved employee record as Draft", "", {
          duration: 4000,
          panelClass:'success-snackbar'
        });
      }
    })
  }

  ngOnDestroy(): void {
    if(this.req) this.req.unsubscribe();

    // CLEAR STORE
    this.adminEmployee.dispatch({
      type: EmployeeActionTypes.GET_EMPLOYEE,
      payload: { id: 0 }
    });
  }

  public updateStepper(step: number): void {
    this.formStep < step ? this.stepper.next() : this.stepper.previous();
    this.formStep = step;
    if (step === 7) {
      this.canLeave = true;
      this.saveEmployee();
    }
  }

  checkFormValidity(e){
    this.steps[e.formStep -1].isStepValid = e.isValid;
  }

  public updateStepperClick(step: number): void{
    this.formStep = step;
    this.stepperNavigation();
  }


  stepperNavigation(){
    this.getNavigation(steps[this.formStep - 1].stepName)
  }

  public getNavigation(e: string): void {
    const stepIndex = this.steps.filter((step: StepModel) => step.stepName === e)[0].stepIndex;
    this.navigation = {
      next: stepIndex + 1,
      previous: stepIndex - 1
    };
  }

  updateEmployeeDetailData(e){
    this.employeeForm.employeeDetail = e;
  }

  updateProfileDetailData(e){
    this.employeeForm.profileDetail = e;
  }

  updateServiceDetailData(e){
    this.employeeForm.serviceDetail = e;
  }

  updateWorkDaysData(e){
    this.employeeForm.workDays = e;
  }

  updateContactDetailData(e){
    this.employeeForm.contactDetail = e;
  }
  
  updateRelatedDocuments(e){
    this.employeeForm.employeeDocs.add = e;
  }
  
  canDeactivate(): boolean | Observable<boolean> {
    return this.canLeave;
  }

  convertToDateTime(dateVal: Date){
    return Math.trunc(new Date(dateVal).getTime() / 1000);
  }

  saveAsDraft(event){
    let organization_id: any = JSON.parse(localStorage.getItem('loggedUserData'))['organization_id'];
    let employee = {
      ...this.employeeForm.employeeDetail,
      ...this.employeeForm.profileDetail,
      ...this.employeeForm.serviceDetail,
      ...this.employeeForm.workDays,
      ...this.employeeForm.contactDetail,
      "employee-docs": {
        ...this.employeeForm.employeeDocs
      },
      registration_stage: "draft",  
      organization_id: organization_id
    }

    employee.birthdate = employee.birthdate ? convertTimestampUtc(employee?.birthdate) : employee.birthdate;
    employee.date_started = employee.date_started ? convertTimestampUtc(employee?.date_started) : employee.date_started;
    employee.date_left = employee.date_left ? convertTimestampUtc(employee?.date_left) : employee.date_left;
    employee.last_roster_date = employee.last_roster_date ? convertTimestampUtc(employee?.last_roster_date) : employee.last_roster_date;
    employee.status = "draft";

    if(employee?.first_name && employee?.last_name){
      this.adminEmployee.dispatch({
        type: EmployeeActionTypes.SAVE_DRAFT_EMPLOYEE,
        payload: employee
      });
    }

    else {
      this.snackBar.open("You need to atleast input the first name and last name to continue saving as Draft", "", {
        duration: 4000,
        panelClass:'danger-snackbar'
      });
    }
  }

  saveEmployee(){
    this.snackBar.open("Creation of employee is now in progress. Please do not change your screen or close your browser.", "", {
      //duration: 4000,
      panelClass:'success-snackbar'
    });

    let organization_id: any = JSON.parse(localStorage.getItem('loggedUserData'))['organization_id'];
    let employee = {
      ...this.employeeForm.employeeDetail,
      ...this.employeeForm.profileDetail,
      ...this.employeeForm.serviceDetail,
      ...this.employeeForm.workDays,
      ...this.employeeForm.contactDetail,
      "employee-docs": {
        ...this.employeeForm.employeeDocs
      },
      registration_stage: "profile-created",  
      organization_id: organization_id
    }

    /// Force remove delete work days 
    //employee.workDays['employee-week-schedule'].delete = []

    employee.birthdate = employee.birthdate ? convertTimestampUtc(employee?.birthdate) : employee.birthdate;
    employee.date_started = employee.date_started ? convertTimestampUtc(employee?.date_started) : employee.date_started;
    employee.date_left = employee.date_left ? convertTimestampUtc(employee?.date_left) : employee.date_left;
    employee.last_roster_date = employee.last_roster_date ? convertTimestampUtc(employee?.last_roster_date) : employee.last_roster_date;
    employee.status = "Pending";

    this.adminEmployee.dispatch({
      type: EmployeeActionTypes.SAVE_EMPLOYEE,
      payload: employee
    });
  }
}
