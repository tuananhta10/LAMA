import { Component, Inject, OnInit, Input, Output, ViewChild, EventEmitter, } from '@angular/core';
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
import { convertTimestampUtc } from '@main/shared/utils/date-convert.util';

@Component({
  selector: 'app-assigned-employee-details',
  templateUrl: './assigned-employee-details.component.html',
  styleUrls: ['./assigned-employee-details.component.scss']
})
export class AssignedEmployeeDetailsComponent implements OnInit {
  @Input() data: any;
  @Output() employeeSelected: EventEmitter<any> = new EventEmitter<any>(); 

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
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private adminClientServiceSchedule: Store<AdminProfileState>,
  ) { 
    
  }

  ngOnInit(): void {
    console.log("Data", this.data)
    
    this.subscribeEnums();


    /*if(this.data){
      let objectBody = {
        page: 'vacant',  
        view: 'creation',
        date: convertTimestampUtc(new Date(this.data?.start_date)),  
        start_time: this.convertTo24Hour(this.data?.start_time),  
        end_time: this.convertTo24Hour(this.data?.end_time),  
        price_list_id: this.data?.price_list_id
      }

      this.adminClientServiceSchedule.dispatch({
        type: ScheduleBoardActionTypes.GET_VACANT_EMPLOYEE,
        payload: {
          data: {...objectBody }
        }
      });
    }*/

    this.assignEmployeeForm = this.formBuilder.group({
      employee: [this.data ? this.data?.schedule?.employee?.name : '', [Validators.required]],
      employee_email: [this.data ? this.data?.schedule?.employee?.email_address : '', [Validators.required]],
      employee_phone_number: [this.data ? this.data?.schedule?.employee?.mobile_phone_no : '', [Validators.required]],
      employee_address: [this.data ? this.data?.schedule?.employee?.address : '', [Validators.required]],
      employee_suburb: [this.data ? this.data?.schedule?.employee?.suburb : '', [Validators.required]],
      employee_branch: [this.data ? this.data?.schedule?.employee?.mobile_phone_no : '', [Validators.required]],
      employee_state: [this.data ? this.data?.schedule?.employee?.state : '', [Validators.required]],
    });

    this.employeeLookupFilter = this.formBuilder.group({
      employment_type: [''],
      gender: [''],
      job_type: [''],
      smoker: [''],
      language: ['']
    });


    this.assignEmployeeForm.controls['employee'].valueChanges
    .subscribe((value) => {
      if(value){
        this.employeeSelected.emit(value)
      }
    })
  }

  convertTo24Hour(amPmString) { 
    let d = new Date("1/1/2013 " + amPmString); 

    let hour = (d.getHours() + '').length === 2 ? d.getHours() : '0' + d.getHours();
    let minute =  (d.getMinutes() + '').length === 2 ? d.getMinutes() : '0' + d.getMinutes();

    return `${hour}${minute}`; 
  }

  returnDay(){
    return Number(new Date(this.data?.start_date).getDay());
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
      
      if(this.loading){
        this.employeeEnums = [];
        this.employeeEnumFiltered = [];
      }

      if(results?.scheduleBoard.vacantEmployees.length > 0){
        this.employeeEnums = results?.scheduleBoard.vacantEmployees;
        this.employeeEnumFiltered = results?.scheduleBoard.vacantEmployees;
      }
    });

  }

  close() {
    //this.dialogRef.close(null);
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
