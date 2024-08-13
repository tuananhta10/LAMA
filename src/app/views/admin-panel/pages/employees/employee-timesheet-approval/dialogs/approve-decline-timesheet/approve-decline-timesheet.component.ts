import { Component, Inject, OnInit,OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { StepModel } from '@main/shared/components/stepper/model';
import { AdminProfileState } from '@main/views/admin-panel/store';
import { EmployeeTimesheetActionTypes } from '@main/views/admin-panel/store/actions/admin-employee-timesheet.action';
import { Store } from '@ngrx/store';
import { convertTimestampUtc } from '@main/shared/utils/date-convert.util';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeConstants } from '../../../constants';
import { AdminHelper } from '@main/views/admin-panel/utils/helper';

@Component({
  selector: 'app-approve-decline-timesheet',
  templateUrl: './approve-decline-timesheet.component.html',
  styleUrls: ['./approve-decline-timesheet.component.scss']
})
export class ApproveDeclineTimesheetComponent implements OnInit,OnDestroy {
  public differentTime: boolean = false;  
  public differentTimeArray: any[] = [];
  public radioOptions:any[] = [{id: true, name: "Yes", value: true}, {id: false, name:"No", value: false}];
  public timeApproveForm: FormGroup;
  public _data:any

  private pastValue:any = []

  constructor(private adminEmployeeTimesheet: Store<AdminProfileState>,
    public dialogRef: MatDialogRef<ApproveDeclineTimesheetComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data,
    private snackBar:MatSnackBar
  ) { 
    this._data = AdminHelper.deepCopy(this.data)
    console.log(data)
  }

  ngOnInit(): void {
    this.timeApproveForm = this.formBuilder.group({
      updateTravelTransport: [null],    
    });

    this.timeApproveForm.controls['updateTravelTransport'].valueChanges.subscribe((result) => {
      console.log(result)

      if(result === true){
        this._data?.data?.forEach((el, i) => {
          // el['update_transport_km'] = !el?.employee_timesheet_transport_mileage ?  "Yes" : 'Yes';
          // el['update_travel_km'] = !el?.employee_timesheet_travel_mileage ?  "Yes" : 'Yes';
          // el['update_travel_time'] = !el?.employee_timesheet_travel_time ?  "Yes" : 'Yes';

          el['update_transport_km'] = "Yes"
          el['update_travel_km'] = "Yes"
          el['update_travel_time'] = "Yes"

          if(el['employee_position_display_name'] === EmployeeConstants.POSITION_COORDINATOR){
            el['used_company_car'] = "No";
          }else{
            el['used_company_car'] = "No";
          }
        });
      }

      else if(result === false){
        this._data?.data?.forEach((el, i) => {
          // el['update_transport_km'] = !el?.employee_timesheet_transport_mileage ?  "No" : 'No';
          // el['update_travel_km'] = !el?.employee_timesheet_travel_mileage ?  "No" : 'No';
          // el['update_travel_time'] = !el?.employee_timesheet_travel_time ?  "No" : 'No';
          el['update_transport_km'] = this.pastValue[i].update_transport_km;
          el['update_travel_km'] = this.pastValue[i].update_travel_km;
          el['update_travel_time'] = this.pastValue[i].update_travel_time;
          
          if(el['employee_position_display_name'] === EmployeeConstants.POSITION_COORDINATOR){
            el['used_company_car'] = "No";
          }else{
            el['used_company_car'] = "No";
          }
        });
      }
    })

    this._data?.data?.forEach((el, i) => {
        if((el['employee_timesheet_start_time'] !== el['client_service_schedule_start_time']) 
        || (el['employee_timesheet_end_time'] !== el['client_service_schedule_end_time'])){
        console.log("DIFFERENT TIME")
        this.differentTime = true;
        

        el['update_shift_time'] = "";
        if(el['employee_position_display_name'] === EmployeeConstants.POSITION_COORDINATOR){
          el['update_transport_km'] = "No";
          el['update_travel_km'] = "No";
          el['update_travel_time'] = "No";
          el['used_company_car'] = "No";
        }else{
          el['update_transport_km'] = !el?.employee_timesheet_transport_mileage ?  "No" : '';
          el['update_travel_km'] = !el?.employee_timesheet_travel_mileage ?  "No" : '';
          el['update_travel_time'] = !el?.client_service_schedule_travel_hours ?  "No" : '';
          el['used_company_car'] = "No";

        }
        this.pastValue.push({
          id:i,
          update_transport_km : el['update_transport_km'],
          update_travel_km : el['update_travel_km'],
          update_travel_time : el['update_travel_time'],
        })

        this.differentTimeArray.push(el);

      }else{
        el['update_shift_time'] = "No";
        if(el['employee_position_display_name'] === EmployeeConstants.POSITION_COORDINATOR){
          el['used_company_car'] = "No";
          el['update_transport_km'] = "No";
          el['update_travel_km'] = "No";
          el['update_travel_time'] = "No";
        }else{
          el['update_transport_km'] = !el?.employee_timesheet_transport_mileage ?  "No" : '';
          el['update_travel_km'] = !el?.employee_timesheet_travel_mileage ?  "No" : '';
          el['update_travel_time'] = !el?.employee_timesheet_travel_time ?  "No" : '';
          el['used_company_car'] = "No";
          
        }
        this.pastValue.push({
          id:i,
          update_transport_km : el['update_transport_km'],
          update_travel_km : el['update_travel_km'],
          update_travel_time : el['update_travel_time'],
        })

        this.differentTimeArray.push(el);
      }
    });
  }


  updateAllTravel(){
    console.log(this.differentTimeArray)
  }

  updateShiftTime(data, field){
    console.log(data, field)
  }

  closeSaveDialog(){
    console.log(this.data)

    // let proceed:boolean = true

    // this._data.data.map(res => {
    //   if(
    //     (!res?.update_shift_time &&
    //     !res?.used_company_car) ||
    //     !this.timeApproveForm.valid
    //     ){
    //       proceed = false;
    //       return
    //     }
    // })

    // if(!proceed && this._data?.approved_decline !== 'decline'){
    //   this.snackBar.open(
    //     'Please fill up all the fields',
    //     '',
    //     {
    //       duration: 4000,
    //       panelClass: 'danger-snackbar',
    //     }
    //   );
    //   return
    // }
    

    this.dialogRef.close(this._data)
  }

  ngOnDestroy(): void {
    this.data = null
    this._data = null
  }

  onChangeCheckbox(ret:any, index){
    this.timeApproveForm.controls['updateTravelTransport'].setValue(ret.checked)
  }
}
