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

  private req: Subscription;
  employee$: any;

  employeeTypeList =['employee-detail', 'employee-profile', 'employee-careworker', 'employee-service', 'employee-work-schedule', 'employee-contact', 'employee-docs'];
  constructor(private route: ActivatedRoute, 
    private router: Router,
    private employeeStore: Store<EmployeeState>, 
    private snackBar: MatSnackBar) { 
    this.employee$ = this.employeeStore.pipe(select(state => state.employee));
  }

  ngOnInit(): void {
    this.employeeId = this.route.snapshot.paramMap.get('id');
    this.subscribeEmployee();
    this.getEmployee();
  }

  ngOnDestroy(): void {
    sessionStorage.removeItem('employeeFormStep');
  }

  getEmployee(){
    let key = Object.keys(this.employeeForm)[this.formStep - 1]
    let clientType = {
      type: this.employeeTypeList[this.formStep - 1],
      id: this.employeeId,
      key: key
    }
    this.employeeStore.dispatch({
      type: EmployeeActionTypes.GET_EMPLOYEE,
      payload: clientType
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

        if(this.formStep === 7) this.router.navigate(['/staff/employees'])
        else this.getEmployee();
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

    })
  }


  openSnackBar(message: string, type: string) {
    this.snackBar.open(message, "", {
      duration: 4000,
      panelClass: type === 'success' ? 'success-snackbar' : 'snackbar-bg-error'
    });
  }

  convertToDateTime(dateVal: Date){
    /*let date = this.datePipe.transform(dateVal, 'yyyy-MM-dd');
    date = date + "T00:00:00";
    return date;*/

    return Math.trunc(new Date(dateVal).getTime() / 1000);
  }

  updateEmployeeForm(data){
    data.id = Number(this.employeeId);

    data.birthdate = data.birthdate ? convertTimestampUtc(data?.birthdate) : data.birthdate;
    data.date_started = data.date_started ? convertTimestampUtc(data?.date_started) : data.date_started;
    data.date_left = data.date_left ? convertTimestampUtc(data?.date_left) : data.date_left;
    data.last_roster_date = data.last_roster_date ? convertTimestampUtc(data?.last_roster_date) : data.last_roster_date;

    this.employeeStore.dispatch({
      type: EmployeeActionTypes.EDIT_EMPLOYEE,
      payload: data
    });
  }
}
