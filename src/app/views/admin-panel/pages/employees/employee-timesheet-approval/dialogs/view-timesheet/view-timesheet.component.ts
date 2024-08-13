import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { StepModel } from '@main/shared/components/stepper/model';
import { AdminProfileState } from '@main/views/admin-panel/store';
import { EmployeeTimesheetActionTypes } from '@main/views/admin-panel/store/actions/admin-employee-timesheet.action';
import { Store } from '@ngrx/store';
import { convertTimestampUtc } from '@main/shared/utils/date-convert.util';
import { mainAnimations } from '@app-main-animation';

@Component({
  selector: 'app-view-timesheet',
  animations: [mainAnimations],
  templateUrl: './view-timesheet.component.html',
  styleUrls: ['./view-timesheet.component.scss'],
})
export class ViewTimesheetComponent implements OnInit {
  public navigation: any = {};
  @ViewChild('stepper') branchStepper: MatStepper;
  public formStep: number = 1;
  public timesheetDetailsForm!: FormGroup;
  public timeLoggedForm!: FormGroup;
  public approvalForm!: FormGroup;
  public isReadOnly: boolean = false;
  public stepper: number = 1;

  public showDifferentTimeDialog: boolean = false;

  constructor(
    private adminEmployeeTimesheet: Store<AdminProfileState>,
    public dialogRef: MatDialogRef<ViewTimesheetComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.data = this.data?.data;
    console.log(this.data);

    let client_total = !this.data?.employee_timesheet_update_shift_time
      ? this.data?.client_service_schedule_client_total
      : this.data?.client_service_schedule_approved_client_total_cost ||
        this.data?.client_service_schedule_client_total *
          this.data?.employee_timesheet_approved_total_hrs;

    let approved_total = this.generateEmployeePayrate();
    // approved timesheet
    let approved_employee_hour = this.data?.employee_timesheet_total_hours;
    let approved_employee_time_in = this.data?.employee_timesheet_start_time;
    let approved_employee_time_out = this.data?.employee_timesheet_end_time;
    let approved_employee_end_date = this.data?.employee_timesheet_end_date;

    // generate form data
    this.timesheetDetailsForm = this.formBuilder.group({
      employee_name: [
        this.data ? this.data?.employee_name : '',
        [Validators.required],
      ],
      client: [this.data ? this.data?.client_name : ''],
      service_type: [this.data ? this.data?.client_service_schedule_type : ''],
      service_type_id: [this.data ? this.data?.service_type_id : ''],
      approved: [this.data ? this.data?.employee_timesheet_approved : true],
      paid: [this.data ? this.data?.employee_timesheet_paid : true],
      batch_number: [
        this.data ? this.data?.employee_timesheet_batch_number : '',
      ],
      client_total: [
        this.data
          ? Math.round(
              (client_total ||
                this.data?.client_service_schedule_editable_rate_value *
                  this.data?.client_service_schedule_total_hours) * 100
            ) / 100
          : 0,
      ],
      approved_total: [this.data ? approved_total : 0],
    });

    // approved timesheet
    if (
      !!this.data?.employee_timesheet_approved &&
      !this.data?.employee_timesheet_update_shift_time
    ) {
      approved_employee_hour =
        this.data?.client_service_schedule_approved_total_hours;
      approved_employee_time_in =
        this.data.client_service_schedule_approved_start_time;
      approved_employee_time_out =
        this.data.client_service_schedule_approved_end_time;
      approved_employee_end_date = convertTimestampUtc(
        this.data.client_service_schedule_approved_end_date
      );
    }

    this.timeLoggedForm = this.formBuilder.group({
      start_date: [
        this.data?.employee_timesheet_start_date
          ? this.convertToDateFormat(this.data.employee_timesheet_start_date)
          : '',
        [Validators.required],
      ],
      start_time: [this.data ? approved_employee_time_in : ''],
      end_date: [
        this.data?.employee_timesheet_end_date
          ? this.convertToDateFormat(approved_employee_end_date)
          : '',
        [Validators.required],
      ],
      end_time: [this.data ? approved_employee_time_out : ''],
      total_hours: [this.data ? approved_employee_hour || 0 : 0],
      break_hours: [
        this.data ? this.data?.employee_timesheet_break_hours || 0 : 0,
      ],
      travel_time: [
        this.data ? this.data?.client_service_schedule_travel_hours || 0 : 0,
      ],
      travel_mileage: [
        this.data ? this.data?.employee_timesheet_travel_mileage || 0 : 0,
      ],
      transport_mileage: [
        this.data ? this.data?.employee_timesheet_transport_mileage || 0 : 0,
      ],
      comment: [this.data ? this.data?.employee_timesheet_comment : ''],
    });

    this.approvalForm = this.formBuilder.group({
      employee_timesheet_update_shift_time: [
        this.data
          ? this.dataCheck(this.data?.employee_timesheet_update_shift_time)
          : false,
      ],
      employee_timesheet_update_transport_km: [
        this.data
          ? this.dataCheck(this.data?.employee_timesheet_update_transport_km)
          : false,
      ],
      employee_timesheet_update_travel_km: [
        this.data
          ? this.dataCheck(this.data?.employee_timesheet_update_travel_km)
          : false,
      ],
      employee_timesheet_update_travel_time: [
        this.data
          ? this.dataCheck(this.data?.employee_timesheet_update_travel_time)
          : false,
      ],
      employee_timesheet_used_company_car: [
        this.data
          ? this.dataCheck(this.data?.employee_timesheet_used_company_car)
          : false,
      ],
    });
    //this.isReadOnly = this.data?.isReadOnly ? this.data?.isReadOnly : false;
    this.isReadOnly = false;
    this.checkDifferentTime()
  }

  checkDifferentTime() {
    if (
      this.data?.employee_timesheet_start_time !==
        this.data?.client_service_schedule_start_time ||
      this.data?.employee_timesheet_end_time !==
        this.data?.client_service_schedule_end_time
    ) {
      this.showDifferentTimeDialog = true;
    }
  }

  dataCheck(data) {
    return !data ? false : data;
  }

  generateEmployeePayrate() {
    let shift_rate = this.data?.client_service_schedule_shift_rate;
    let shift;
    let recheck_approval = this.data?.employee_timesheet_update_shift_time
      ? this.data?.employee_timesheet_total_hours
      : this.data?.client_service_schedule_total_hours;
    let employee_hour_rate = this.data?.employee_pay_rate_hourly_pay_rate || 0;

    if (shift_rate === 'Standard Rate') {
      shift = 'Weekday Morning';
    } else if (shift_rate === 'Public Holiday Rate') {
      shift = 'Public Holiday';
      employee_hour_rate =
        this.data?.employee_pay_rate_public_holiday_rate || 0;
    } else if (shift_rate?.toLowerCase().match('afternoon')) {
      shift = 'Weekday Afternoon';
      employee_hour_rate = this.data?.employee_pay_rate_afternoon_rate || 0;
    } else if (shift_rate?.toLowerCase().match('night')) {
      shift = 'Weekday Night';
      employee_hour_rate = this.data?.employee_pay_rate_night_rate || 0;
    } else if (shift_rate?.toLowerCase().match('evening')) {
      shift = 'Weekday Evening';
      employee_hour_rate = this.data?.employee_pay_rate_evening_rate || 0;
    } else if (shift_rate?.toLowerCase().match('saturday')) {
      shift = 'Saturday';
      employee_hour_rate = this.data?.employee_pay_rate_saturday_rate || 0;
    } else if (shift_rate?.toLowerCase().match('sunday')) {
      shift = 'Sunday';
      employee_hour_rate = this.data?.employee_pay_rate_sunday_rate || 0;
    }

    return Math.round(employee_hour_rate * recheck_approval * 100) / 100;
  }

  close() {
    this.dialogRef.close(null);
  }

  save(type?: string) {
    this.dialogRef.close({
      data: [
        {
          ...this.data,
          update_shift_time:
            this.approvalForm.controls['employee_timesheet_update_shift_time']
              .value === true
              ? 'Yes'
              : 'No',
          update_transport_km:
            this.approvalForm.controls['employee_timesheet_update_transport_km']
              .value === true
              ? 'Yes'
              : 'No',
          update_travel_km:
            this.approvalForm.controls['employee_timesheet_update_travel_km']
              .value === true
              ? 'Yes'
              : 'No',
          update_travel_time:
            this.approvalForm.controls['employee_timesheet_update_travel_time']
              .value === true
              ? 'Yes'
              : 'No',
          used_company_car:
            this.approvalForm.controls['employee_timesheet_used_company_car']
              .value === true
              ? 'Yes'
              : 'No',
        },
      ],
      approved_decline: type,
    });
  }

  convertToDateTime(dateVal: Date) {
    return Math.trunc(new Date(dateVal).getTime() / 1000);
  }
  convertToDateFormat(dateTime) {
    let start_date = new Date(dateTime * 1000);
    let gmtDate = new Date(
      start_date.getTime() + start_date.getTimezoneOffset() * 60000
    );
    return gmtDate;
  }

  convert(dateTime) {
    const dateObject = new Date(dateTime * 1000);
    return dateObject.toLocaleTimeString('en-US', { hour12: false });
  }
}
