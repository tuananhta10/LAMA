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
import { QualificationActionTypes } from '@main/views/admin-panel/store/actions/admin-qualification.action';

@Component({
  selector: 'app-assign-employee-form',
  templateUrl: './assign-employee-form.component.html',
  styleUrls: ['./assign-employee-form.component.scss']
})
export class AssignEmployeeFormComponent implements OnInit {
  @Input() data: any;
  @Input() recurring_every: any;
  @Input() serviceScheduleForm: any;
  @Output() employeeSelected: EventEmitter<any> = new EventEmitter<any>(); 
  @Output() setShiftInstruction: EventEmitter<any> = new EventEmitter<any>(); 

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
  public radioOptions:any[] = [{id: true, name: "Yes", value: 'smoker'}, {id: false, name:"No", value: 'No'}];
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
  public available: any[] = ['All Employee', 'Available on selected start date only', 'Available on all selected dates'];
  public showFilter: boolean = false;
  public daysEquivalent: any = {  
    'M': 'Monday',
    'T': 'Tuesday',
    'W': 'Wednesday',
    'Th': 'Thursday',
    'F': 'Friday',
    'Sa': 'Saturday',
    'Su': 'Sunday'
  }
  public daySelected: any;
  public qualificationList: any = [];  

  @ViewChild("upload", { static: false }) upload: UploadFileComponent;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private adminEnumStore: Store<AdminProfileState>,
    private adminClientServiceSchedule: Store<AdminProfileState>,
    private adminQualification: Store<AdminProfileState>,
  ) { 
    
  }

  ngOnInit(): void {
    //console.log("EMPLOYEE Data", this.data)

    this.daySelected = this.recurring_every.map(el => this.daysEquivalent[el]);
    this.subscribeEnums();

    this.assignEmployeeForm = this.formBuilder.group({
      employee: [this.data ? this.data?.employee_id : ''],
      shift_instruction: [this.data ? this.data?.shift_instruction: ''],
      employee_group: [this.data ? this.data?.employee_id : ''],
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

    this.employeeLookupFilter.valueChanges.subscribe((result) => {
      console.log(result)
      if(result) 
        this.applyFilter();
    });

    this.assignEmployeeForm.controls['employee'].valueChanges
    .subscribe((value) => {
      if(value){
        this.employeeSelected.emit(value)
      }
    });

    this.assignEmployeeForm.controls['shift_instruction'].valueChanges
    .subscribe((value) => {
      if(value){
        this.serviceScheduleForm.controls['shift_instruction'].setValue(value)
        //this.setShiftInstruction.emit(value)
      }
    });

    this.assignEmployeeForm.controls['employee_group'].valueChanges
    .subscribe((value) => {
      if(value){
        let selectedEmployees = this.employeeEnumFiltered.filter(el => value?.findIndex(_el => _el?.toLowerCase() == el?.name?.toLowerCase()) > -1);
        
        console.log(selectedEmployees)
        this.employeeSelected.emit([...selectedEmployees?.map(el => el?.id)])
      }
    });

    this.assignEmployeeForm.controls['availability'].valueChanges
    .subscribe((value) => {
      if(value){

        // ['', 'Available Today', 'Available Work Schedule on the Selected Date'];
        if(value === 'Available Based on Selected Start Date'){
          this.snackBar.open("Checking Employee Availability", "", {
            duration: 4000,
            panelClass:'success-snackbar'
          });

          let objectBody = {
            page: 'vacant',  
            view: 'creation',
            filter: 'today',
            date:  convertTimestampUtc(new Date()), 
            start_time: this.data?.start_time ? this.convertTimeFull(this.data?.start_time) : '00000',  
            end_time: this.data?.end_time ? this.convertTimeFull(this.data?.end_time) : '2359',  
            price_list_id: this.data?.price_list_id
          }

          this.checkVacantEmployee(objectBody);
        }

        else if(value === 'All Employee'){
          let objectBody = {
            page: 'vacant',  
            view: 'creation',
            filter: 'all',
            date:  convertTimestampUtc(new Date(this.data?.start_date)), 
            start_time: this.data?.start_time ? this.convertTimeFull(this.data?.start_time) : '00000',  
            end_time: this.data?.end_time ? this.convertTimeFull(this.data?.end_time) : '2359',  
            price_list_id: this.data?.price_list_id
          }

          this.checkVacantEmployee(objectBody);
        }

        else if(value === 'Available Work Schedule on the Selected Dates'){
          this.snackBar.open("Checking Employee Availability", "", {
            duration: 4000,
            panelClass:'success-snackbar'
          });
          
          let objectBody = {
            page: 'vacant',  
            view: 'creation',
            filter: 'range',
            date:  convertTimestampUtc(new Date(this.data?.start_date)), 
            start_time: this.data?.start_time ? this.convertTimeFull(this.data?.start_time) : '00000',  
            end_time: this.data?.end_time ? this.convertTimeFull(this.data?.end_time) : '2359',  
            price_list_id: this.data?.price_list_id
          }

          this.checkVacantEmployee(objectBody);
        }
      }
    });
  
    this.getQualifications();
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

  convertRecurringEvery(data){
    return data.map(el => this.daysEquivalent[el]).join(', ');
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
      let data = {
        ...this.employeeLookupFilter.value
      }

      console.log("FILTERING EMPLOYEES")
      const listDataSource = [...this.employeeEnums].filter(el => {

        console.log(data, el, el?.smoker)

        for(let item in data){

          if(data[item] && data[item] !== 'smoker'){
            if(JSON.stringify(el)?.match(data[item])) return true;
          }

          else if(data[item] && data[item] === 'smoker') {
            return el?.smoker === true;
          }
        }

        return false; 
      });

      this.loading = true;

      setTimeout(() => {
        this.loading = false;
        this.employeeEnumFiltered = [...listDataSource];
      }, 300);
    }

    else {
      this.showFilter = !this.showFilter;
    }
  }

  /* FOR CHECKIGN VACANT EMPLOYEE */
  checkVacantEmployee(objectBody?: any){
    if(this.data){
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

  private groupReq: Subscription;
  public maxEmployee: number = 1;

  subscribeEnums(){
    this.employeeEnums$ = this.adminClientServiceSchedule.pipe(select(state => state));
    this.reqEmployee = this.employeeEnums$.subscribe((results: any) => {
      this.loading = results.scheduleBoard.pendingVacantEmployees;
      
      if(this.loading){
        this.employeeEnums = [];
        this.employeeEnumFiltered = [];
      }

      if(results?.scheduleBoard.vacantEmployees.length > 0){
        // preferred careworkers
        let preferredEmployee = results?.scheduleBoard.vacantEmployees
          .filter(el => typeof el?.preferred_careworker === 'boolean')
          .sort((a,b) => a.name.localeCompare(b.name));
        
        // non preferred
        let employeeList = results?.scheduleBoard.vacantEmployees
          .filter(el => typeof el?.preferred_careworker !== 'boolean')
          .sort((a,b) => a.name.localeCompare(b.name));

        //console.log("List", employeeList)

        this.employeeEnums = [...preferredEmployee, ...employeeList];
        this.employeeEnumFiltered = [...preferredEmployee, ...employeeList];
      }
    });

    /* GROUP REQ */
    this.groupReq =  this.adminClientServiceSchedule.subscribe((results: any) => {
      let clientGroup = results?.clientGroup
      //console.log(clientGroup, this.data)

      if(clientGroup?.clientGroupList?.length > 0){
        let selectedGroup = clientGroup?.clientGroupList.find(el => el?.id === this.data?.group_id);
        this.maxEmployee = selectedGroup?.no_max_employee || 1;
      }
      
    });

  }

  generateDropdownOption(){
    //console.log(this.employeeEnumFiltered)
    return this.employeeEnumFiltered?.map(el => el?.name);
  }

  close() {
    //this.dialogRef.close(null);
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

  @ViewChild('languageFilter', {static: false}) languageFilter: any;

  clearFilter(){
    this.employeeLookupFilter.reset();
    this.languageFilter?.clearTextBox();
  }
}
