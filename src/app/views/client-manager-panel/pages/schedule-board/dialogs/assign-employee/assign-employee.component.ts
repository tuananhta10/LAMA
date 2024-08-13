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

@Component({
  selector: 'app-assign-employee',
  templateUrl: './assign-employee.component.html',
  styleUrls: ['./assign-employee.component.scss']
})
export class AssignEmployeeComponent implements OnInit {

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

  @ViewChild("upload", { static: false }) upload: UploadFileComponent;

  constructor(
    public dialogRef: MatDialogRef<AssignEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder,
    private adminClientServiceSchedule: Store<AdminProfileState>,
  ) { 
    console.log("Data", this.data)
    this.day = Number(new Date(this.data.calendar_start_date * 1000).getDay());
  }

  ngOnInit(): void {
    this.subscribeEnums();

    this.adminClientServiceSchedule.dispatch({
      type: ScheduleBoardActionTypes.GET_VACANT_EMPLOYEE,
      payload: {
        client_service_schedule_id:this.data.id, 
        data: this.data
      }
    });

    this.assignEmployeeForm = this.formBuilder.group({
      employee: [this.data ? this.data?.employee_id : '', [Validators.required]],
      start_time: [''],
      end_time: [''],

    });

    this.employeeLookupFilter = this.formBuilder.group({
      employment_type: [''],
      gender: [''],
      job_type: [''],
      smoker: [''],
      language: ['']
    });
  }

  applyFilter(){
    if(this.showFilter){
      //this.showFilter = !this.showFilter;
      let data = {
        ...this.employeeLookupFilter.value
      }

      const listDataSource = [...this.employeeEnums].filter(el => {
        for(let item in data){
          if(data[item] === el[item]) return true;
        }

        return false; 
      });

      this.employeeEnumFiltered = [...listDataSource];
    }

    else {
      this.showFilter = !this.showFilter;
    }
  }

  subscribeEnums(){
    this.employeeEnums$ = this.adminClientServiceSchedule.pipe(select(state => state));
    this.reqEmployee = this.employeeEnums$.subscribe((results: any) => {
      this.loading = results.scheduleBoard.pendingVacantEmployees;
      if(results?.scheduleBoard.vacantEmployees.length > 0){
        this.employeeEnums = results?.scheduleBoard.vacantEmployees;
        this.employeeEnumFiltered = results?.scheduleBoard.vacantEmployees;
      }
    });

  }

  close() {
    this.dialogRef.close(null);
  }

  save(){
    let data = {
      client_service_schedule_id: parseInt(this.data.id),
      employee_id: parseInt(this.assignEmployeeForm.value.employee),
      start_date: this.data.calendar_start_date,
      end_date: this.data.calendar_start_date
    }

    this.adminClientServiceSchedule.dispatch({
      type: ScheduleBoardActionTypes.ASSIGN_EMPLOYEE,
      payload: data
    });

    this.close();
    
  }

  convertTo12Hrs(time) {
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
