import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeActionTypes } from '@main/views/admin-panel/store/actions/admin-employee.action';
import { EmployeeState } from '@main/views/admin-panel/store/reducers/admin-employee.reducer';
import { MatStepper } from '@angular/material/stepper';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { steps } from './stepper-tabs';
import { StepModel } from '../../../../../shared/components/stepper/model';
import { mainAnimations } from '@app-main-animation';
import { ActivatedRoute, Router } from '@angular/router';
import { convertTimestampUtc } from '@main/shared/utils/date-convert.util';
import { UpdateProfilePasswordComponent } from '../employee-details/dialogs/update-profile-password/update-profile-password.component';
import { 
  finalize, 
  takeUntil 
} from "rxjs/operators";
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-employee-update',
  animations: [mainAnimations],
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.scss']
})
export class EmployeeUpdateComponent implements OnInit {
  @ViewChild('stepper') stepper: MatStepper;

  public steps: any = steps;
  public navigation: object = {};
  isUpdate:boolean = true;
  employeeId:any;
  employeeName: string = '';
  employeeForm:any = {
    employeeDetail: {},
    profileDetail: {},
    careWorkersDetail: {},
    serviceDetail: {},
    workDays: {},
    contactDetail: {},
    employeeDocs: {}
  }

  canLeave:boolean = false;
  loading: boolean = false;
  formStep: number = parseInt(sessionStorage.getItem('employeeFormStep')) || 1;
  employee$: any;
  employeeTypeList =['employee-detail', 'employee-profile', 'employee-careworker', 'employee-service', 'employee-work-schedule', 'employee-contact', 'employee-docs'];
  
  public currentStatus: string;
  private req: Subscription;
  
  constructor(private route: ActivatedRoute, 
    private router: Router,
    private dialog: MatDialog,
    private employeeStore: Store<EmployeeState>, 
    private snackBar: MatSnackBar) { 
    this.employee$ = this.employeeStore.pipe(select(state => state.employee));
  }

  ngOnInit(): void {
    this.snackBar.dismiss();
    this.employeeId = this.route.snapshot.paramMap.get('id');
    this.subscribeEmployee();
    this.getEmployee();

    // check for roles update
    if(sessionStorage.getItem('passwordChange')){
      this.snackBar.open("Successfully updated the access of this employee!", "", {
        duration: 4000,
        panelClass:'success-snackbar'
      });
      sessionStorage.removeItem('passwordChange');
    }
  }

  ngOnDestroy(): void {
    sessionStorage.removeItem('employeeFormStep');
    this.employeeName = undefined;
    //if(this.req) this.req.unsubscribe();
  }

  getEmployee(){
    let key = Object.keys(this.employeeForm)[this.formStep - 1];
    let employeeType = {
      type: this.employeeTypeList[this.formStep - 1],
      id: this.employeeId,
      key: key
    }

    console.log(employeeType)
    this.employeeStore.dispatch({
      type: EmployeeActionTypes.GET_EMPLOYEE,
      payload: employeeType
    });
  }

  public updateStepper(step: number): void {
    // this.formStep < step ? this.stepper.next() : this.stepper.previous();
    this.formStep = step;

    if(step < 8){
      this.getEmployee();
    }

    if (step === 8) {
      this.canLeave = true;
    }
  }

  public updateStepperClick(step: number): void{
    this.formStep = step;
    this.stepperNavigation();
  }

  stepperNavigation(){
    this.getNavigation(steps[this.formStep - 1].stepName)
    this.getEmployee();
  }

  public getNavigation(e: string): void {
    const stepIndex = this.steps.filter((step: StepModel) => step.stepName === e)[0].stepIndex;
    this.navigation = {
      next: stepIndex + 1,
      previous: stepIndex - 1
    };
  }

  updateEmployeeDetailData(e){
    this.updateEmployeeForm(e);
  }

  updateProfileDetailData(e){
    this.updateEmployeeForm(e);
  }

  updateCareWorkersDetailData(e){
    this.employeeForm.careWorkersDetail = e;
    this.updateEmployeeForm(e);
  }

  updateServiceDetailData(e){
    this.updateEmployeeForm(e);
  }

  updateWorkDaysData(e){
    this.updateEmployeeForm(e);
  }

  updateContactDetailData(e){
    this.updateEmployeeForm(e);
  }

  updateEmployeeDocs(e){
    this.updateEmployeeForm(e);
  }

  checkFormValidity(e){
    this.steps[e.formStep -1].isStepValid = e.isValid;
  }
  
  subscribeEmployee(){
    this.req = this.employee$.subscribe((results: any) => {
      this.employeeForm = results?.employee;
      this.loading = results?.pending;

      if(!this.currentStatus){
        this.currentStatus = this.employeeForm?.employeeDetail?.status?.toLowerCase();
      }

      if(results?.name?.first_name){
        this.employeeName = results?.name?.first_name + ' ' +  results?.name?.last_name
      }

      else if(results?.name?.name){
        this.employeeName = results?.name?.name
      }

      if(results?.successUpdate){
        //this.openSnackBar("Successfully updated employee", "success");
        this.snackBar.open("Successfully Updated Employee", "", {
          duration: 4000,
          panelClass:'success-snackbar'
        });

        this.employeeStore.dispatch({
          type: EmployeeActionTypes.EDIT_EMPLOYEE_SUCCESS,
          payload: null
        }); 

        this.getEmployee(); 
      }

      if(results?.error){
        //this.openSnackBar("Error, please try again later", "error");
        this.snackBar.open("Error, please try again later", "", {
          duration: 4000,
          panelClass:'danger-snackbar'
        });
        
        this.employeeStore.dispatch({
          type: EmployeeActionTypes.EDIT_EMPLOYEE_FAIL,
          payload: null
        }); 
      }
    });
  }


  openSnackBar(message: string, type: string) {
    this.snackBar.open(message, "", {
      duration: 4000,
      panelClass: type === 'success' ? 'success-snackbar' : 'snackbar-bg-error'
    });
  }

  convertToDateTime(dateVal: Date){
    return Math.trunc(new Date(dateVal).getTime() / 1000);
  }

  updateEmployeeForm(data){
    data.id = Number(this.employeeId);

    data.date_started = data.date_started ? convertTimestampUtc(data?.date_started) : data.date_started;
    data.date_left = data.date_left ? convertTimestampUtc(data?.date_left) : data.date_left;
    data.last_roster_date = data.last_roster_date ? convertTimestampUtc(data?.last_roster_date) : data.last_roster_date;
    data.last_date = data.last_date ? convertTimestampUtc(data.last_date) : data.last_date;
    data["is_updated"] = true;


    // set bday
    if(data?.birthdate){
      let bday = new Date(data?.birthdate);

      bday.setHours(0); // Set hours to 23 (11 PM)
      bday.setMinutes(0); // Set minutes to 59
      bday.setSeconds(0); // Set seconds to 0

      data.birthdate = convertTimestampUtc(bday);
    }
    
    //this.openSnackBar("Successfully updated employee", "success");
    if(this.router.url.match('edit')){
      this.snackBar.open("Update is currently in progress. Please do not close your window or you will lose your changes.", "", {
        panelClass:'success-snackbar'
      });
    }
    
    console.log(data)

    this.employeeStore.dispatch({
      type: EmployeeActionTypes.EDIT_EMPLOYEE,
      payload: data
    });
  }

  /* EMPLOYEE PASSWORD */
  openUpdatePassword(): void {
    let index = 0;
    let employeeData;

    for(let item in this.employeeForm){
      if(index !== (this.formStep - 1)) index++;
      else {
        console.log(this.employeeForm[item], item, this.formStep, index)
        employeeData = this.employeeForm[item];

        break;
      }
    }

    // open edit column dialog
    const dialogRef = this.dialog.open(UpdateProfilePasswordComponent, {
      panelClass: "dialog-responsive",
      width: '500px',
      data: { 
        id: Number(this.employeeId),
        employeeData: employeeData
      },
      autoFocus: false 
    });

    dialogRef.afterClosed()
    .pipe(finalize(() => console.log("completed")))
    .subscribe(result => {
      console.log(result)

      if(result){
        setTimeout(() => {
          window.location.reload();
          sessionStorage.setItem('passwordChange', "true");
        }, 1000);
        this.dialog.closeAll();
        console.log('The dialog was closed',  result);
      }
    });
  }

  deactivateAccount(){
    
  }
}
