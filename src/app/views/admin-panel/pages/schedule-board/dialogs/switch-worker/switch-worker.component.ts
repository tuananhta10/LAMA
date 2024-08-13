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
import { convertTimestampUtc } from '@main/shared/utils/date-convert.util';
import { QualificationActionTypes } from '@main/views/admin-panel/store/actions/admin-qualification.action';

@Component({
  selector: 'app-switch-worker',
  templateUrl: './switch-worker.component.html',
  styleUrls: ['./switch-worker.component.scss']
})
export class SwitchWorkerComponent implements OnInit {

  private req: Subscription;
  private reqEmployee: Subscription;
  private employeeEnums$: any;
  public employeeEnums: any;
  public employeeEnumFiltered: any;
  public loading: boolean = true;
  private qualificationData$: any;

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
  public available: any[] = ['All Employee', 'Available Employee Today', 'Available work schedule on the selected shift'];
  public availableAll: any[] = [];
  public qualificationList: any = [];  

  @ViewChild("upload", { static: false }) upload: UploadFileComponent;

  constructor(
    public dialogRef: MatDialogRef<SwitchWorkerComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private adminEnumStore: Store<AdminProfileState>,
    private adminClientServiceSchedule: Store<AdminProfileState>,
    private adminServiceSchedule: Store<AdminProfileState>,
    private adminQualification: Store<AdminProfileState>,
  ) { 
    console.log("Data", this.data)
    this.day = Number(new Date(this.data.calendar_start_date * 1000).getDay());
  }

  ngOnInit(): void {
    this.subscribeEnums();

    this.assignEmployeeForm = this.formBuilder.group({
      employee: [this.data ? this.data?.employee_id : '', [Validators.required]],
      start_time: [''],
      end_time: [''],
      availability: ['All Employee']
    });

    this.employeeLookupFilter = this.formBuilder.group({
      employment_type: [''],
      gender: [''],
      job_type: [''],
      smoker: [''],
      language: [''],
      qualifications: ['']
    });

    this.subscribeToControl();
    this.getQualifications();

    this.assignEmployeeForm.get('employee').valueChanges.subscribe({
      next: (res:any) => {
        console.log(res)
      }
    })
  }

  getQualifications(){
    this.qualificationData$ = this.adminQualification.pipe(select(state => state.qualification));

    this.req =  this.qualificationData$.subscribe((qualification: any) => {
      this.loading = qualification.pending;

      if(qualification.qualificationList.length > 0){
        this.qualificationList = qualification.qualificationList.sort((a,b) => a?.qualification.localeCompare(b?.qualification));
        this.qualificationList = this.qualificationList.map(el => el?.qualification);
      }
    });

    this.adminQualification.dispatch({
      type: QualificationActionTypes.GET_QUALIFICATION_LIST
    });
  }

  subscribeToControl(){
    this.req = this.assignEmployeeForm.controls['availability'].valueChanges
    .subscribe((value) => {
      if(value){
        console.log(value)

        // ['', 'Available Today', 'Available Work Schedule on the Selected Date'];
        if(value === 'Available work schedule on the selected shift'){
          let objectBody = {
            page: 'vacant',  
            view: 'creation',
            filter: 'today',
            date:  convertTimestampUtc(new Date()), 
            start_time:'00:00',// this.convertTimeFull(this.data?.start_time),  
            end_time:'23:59',// this.convertTimeFull(this.data?.end_time),   
            price_list_id: this.data?.map(el => el?.price_list_id)
          }

          this.checkVacantEmployee(objectBody);
        }

        else if(value === 'All Employee'){
          let objectBody = {
            page: 'vacant',  
            view: 'creation',
            filter: 'all',
            date:  convertTimestampUtc(new Date()), 
            start_time:'00:00',// this.convertTimeFull(this.data?.start_time),  
            end_time:'23:59',// this.convertTimeFull(this.data?.end_time),  
            price_list_id: this.data?.map(el => el?.price_list_id).join('_')
          }

          this.checkVacantEmployee(objectBody);
        }

        else if(value === 'Available Today'){
          let objectBody = {
            page: 'vacant',  
            view: 'creation',
            filter: 'range',
            date:  convertTimestampUtc(new Date()), 
            start_time:'00:00',// this.convertTimeFull(this.data?.start_time),  
            end_time:'23:59',// this.convertTimeFull(this.data?.end_time),  
            price_list_id: this.data?.map(el => el?.price_list_id).join('_')

          }

          this.checkVacantEmployee(objectBody);
        }
      }
    });
  }

  /* FOR CHECKIGN VACANT EMPLOYEE */
  checkVacantEmployee(objectBody?: any){
    if(this.data){
      this.snackBar.open("Checking Employee Availability", "", {
        duration: 4000,
        panelClass:'success-snackbar'
      });

      //this.snackBar.open('', 'Checking Vacant Employee', )

      setTimeout(() => {
        this.adminEnumStore.dispatch({
          type: ScheduleBoardActionTypes.GET_VACANT_EMPLOYEE,
          payload: {
            data: { ...objectBody }
          }
        });
      }, 1000);
    }
  }

  convertTimeFull(amPmString) { 
    let d = new Date("1/1/2013 " + amPmString); 

    let hour = (d.getHours() + '').length === 2 ? d.getHours() : '0' + d.getHours();
    let minute =  (d.getMinutes() + '').length === 2 ? d.getMinutes() : '0' + d.getMinutes();

    return `${hour}${minute}`; 
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
    this.dialogRef.close(null);
  }

  closeSaveDialog(): void {
    this.dialogRef.close({
      employee_id: this.assignEmployeeForm.value.employee,
      arrayData: this.data,
      cancel: false
    });
  }

  save(){
    let data = [
      {
        id: parseInt(this.data.id),
        employee_service_schedule_id: parseInt(this.data.employee_service_schedule?.id),
        employee_id: parseInt(this.assignEmployeeForm.value.employee)
      }
    ];

    console.log(data, this.data)

    this.dialogRef.close();

    this.adminServiceSchedule.dispatch({
      type: ClientServiceScheduleActionTypes.UPDATE_BULK_SERVICE_SCHEDULE,
      payload: data
    });

    this.snackBar.open("Update of schedule is currently in progress", "", {
      duration: 5000,
      panelClass:'success-snackbar'
    });
    
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
