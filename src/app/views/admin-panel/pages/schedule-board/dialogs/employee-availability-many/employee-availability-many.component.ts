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
  selector: 'app-employee-availability-many',
  templateUrl: './employee-availability-many.component.html',
  styleUrls: ['./employee-availability-many.component.scss']
})
export class EmployeeAvailabilityManyComponent implements OnInit {
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
  public noDuplicate: any[] = [];

  @ViewChild("upload", { static: false }) upload: UploadFileComponent;

  constructor(
    public dialogRef: MatDialogRef<EmployeeAvailabilityManyComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder,
    private adminClientServiceSchedule: Store<AdminProfileState>,
  ) { 
    console.log(data)
  }

  ngOnInit(): void {
    this.data?.employees.forEach((el, i) => {
      let index = this.noDuplicate.findIndex((_el, _i) => _el.id === el.id );

      if(index === -1) this.noDuplicate.push(el);  
      
      else {
        this.noDuplicate[index].schedule = [...this.noDuplicate[index]?.schedule, ...el?.schedule].sort((a,b) => a.date - b.date);
      }
    });

    setTimeout(() => this.loading = false, 1500);
  }

  removeDuplicates(originalArray, key) {
    let newArray = [];
    let obj  = {};

    for(let i in originalArray) {
      obj[originalArray[i][key]] = originalArray[i];
    }

    for(let i in obj) {
      newArray.push(obj[i]);
    }

    return newArray
  }

  close() {
    this.dialogRef.close(null);
  }

  assignToAvailableDates(){
    this.dialogRef.close({
      conflict: this.noDuplicate,
      type: 'assign-available',
      cancel: false
    });
  }

  assignAnyway(){
    this.dialogRef.close({
      conflict: this.noDuplicate,
      type: 'assign-all',
      cancel: false
    });
  }


}
