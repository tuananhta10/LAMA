import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UploadFileComponent } from '@main/shared/components/inputs/file-upload/field-upload.component';
import { Subscription } from 'rxjs';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { select, Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LanguageActionTypes } from '@main/views/admin-panel/store/actions/admin-language.action';
import { EmployeeListState  } from '@app-admin-store/reducers/admin-employees.reducer';
import { EmployeeListActionTypes } from '@main/views/admin-panel/store/actions/admin-employees.actions';
import { ClientServiceScheduleActionTypes } from '@main/views/admin-panel/store/actions/admin-client-service-schedule.action';
import { ScheduleBoardActionTypes } from '@main/views/admin-panel/store/actions/admin-schedule-board.action';
import { convertTo12Hrs } from '@app-shared/utils/date-convert.util';

@Component({
  selector: 'app-employee-availability',
  templateUrl: './employee-availability.component.html',
  styleUrls: ['./employee-availability.component.scss']
})
export class EmployeeAvailabilityComponent implements OnInit {
  private req: Subscription;
  private reqEmployee: Subscription;
  private employeeEnums$: any;
  public employeeEnums: any;
  public employeeEnumFiltered: any;
  public loading: boolean = true;

  public assignEmployeeForm!: FormGroup;
  public employeeLookupFilter!: FormGroup;
  public file: File;
  public day: any = '';
  public days: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
   
  public employementTypeOption: string[] = ["Casual", "Part Time", "Contractor", "Full Time"];
  public radioOptions:any[] = [{id: true, name: "Yes", value: true}, {id: false, name:"No", value: false}];
  public jobTypeEnum: any[] = ["Support Service", "Support Coordination", "Domestic", "Maintenance", "Operations"];
  public genderOptions:any[] =["Male", "Female", "Trans and gender diverse", "LGBTQ+", "Prefer not to say" ];
  public languageEnum: any[] = [
    {
      id: 1,  
      name: "English"
    },  

    {
      id: 2,  
      name: "German"
    }
  ];
  public showFilter: boolean = false;
  public convertTo12Hrs = convertTo12Hrs;

  @ViewChild("upload", { static: false }) upload: UploadFileComponent;

  constructor(
    public dialogRef: MatDialogRef<EmployeeAvailabilityComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder,
    private adminClientServiceSchedule: Store<AdminProfileState>,
  ) { 
    //console.log("Data", this.data)
  }

  ngOnInit(): void {
   setTimeout(() => this.loading = false, 1500);
  }


  close() {
    this.dialogRef.close(null);
  }

  assignToAvailableDates(){
    this.dialogRef.close({
      conflict: this.data?.conflict,
      body: this.data?.details,
      type: 'assign-available',
      cancel: false
    });
  }

  assignAnyway(){
    this.dialogRef.close({
      conflict: this.data?.conflict,
      body: this.data?.details,
      type: 'assign-all',
      cancel: false
    });
  }
}
