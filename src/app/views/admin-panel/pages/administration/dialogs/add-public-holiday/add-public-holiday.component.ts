import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UploadFileComponent } from '@main/shared/components/inputs/file-upload/field-upload.component';
import { PublicHolidayActionTypes } from '@main/views/admin-panel/store/actions/admin-public-holiday.action';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { BranchActionTypes } from '@main/views/admin-panel/store/actions/admin-branch.action';
import { convertTimestampUtc } from '@main/shared/utils/date-convert.util';
import { set } from 'date-fns';

@Component({
  selector: 'app-add-public-holiday',
  templateUrl: './add-public-holiday.component.html',
  styleUrls: ['./add-public-holiday.component.scss']
})
export class AddPublicHolidayComponent implements OnInit {

  public addPublicHolidayForm!: FormGroup;
  public file: File;
  public colors: string[] = ["red", "blue", "yellow", "pink", "light_blue"];
  public branch: object[] = [{id: 1, name: "Branch 1"}, {id:2, name: "Branch 2"}]
  public radioOptions:any[] = [{id: true, name: "Yes", value: true}, {id: false, name:"No", value: false}];
  public stateOptions: string[] = ["All State", "ACT", "NSW", "NT", "QLD", "SA", "TAS", "VIC", "WA", "remote", "very remote"];
  
  private req: Subscription;
  branchesEnums$: any;
  branchesEnums: any;
  loading: boolean = false;

  @ViewChild("upload", { static: false }) upload: UploadFileComponent;

  constructor(
    public dialogRef: MatDialogRef<AddPublicHolidayComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder,
    private adminPublicHoliday: Store<AdminProfileState>,
  ) { }

  ngOnInit(): void {
    this.subscribeBranchesEnum();

    this.adminPublicHoliday.dispatch({
      type: BranchActionTypes.GET_BRANCH_LIST
    });

    let stateData = this.data?.state//[0]?.split(/\,/gi).map(el => el?.trim());

    this.addPublicHolidayForm = this.formBuilder.group({
      name: [this.data ? this.data?.name : '', [Validators.required]],
      description: [this.data ? this.data?.description : ''],
      date: [this.data ? this.convertToDate(this.data?.date) : '', [Validators.required]],
      bg_color_code: [this.data ? this.data?.bg_color_code : '', [Validators.required]], 
      state: [stateData ? [...stateData] || [] : '', [Validators.required]], 
      //all_branch: [this.data ? this.data?.all_branch : false],
      //branch_id: [this.data ? this.data?.branch_id : ''],
    });
  }

  close() {
    this.dialogRef.close(null);
  }

  save(){
    if(this.addPublicHolidayForm.valid && !this.data){
      console.log(this.addPublicHolidayForm.value )

      // Dynamic start and end dates
      const startDate = new Date(this.addPublicHolidayForm.controls['date'].value);
      const endDate = new Date(this.addPublicHolidayForm.controls['date'].value);

      // Set the start time to 12:01 am
      const startTime = set(startDate, { hours: 0, minutes: 1 });

      // Set the end time to 11:59 pm
      const endTime = set(endDate, { hours: 23, minutes: 59, seconds: 59 });


      let body = {
        name: this.addPublicHolidayForm.controls['name'].value,
        description: this.addPublicHolidayForm.controls['description'].value,
        bg_color_code:this.addPublicHolidayForm.controls['bg_color_code'].value,
        date: convertTimestampUtc(this.addPublicHolidayForm.controls['date'].value),
        start_date: convertTimestampUtc(startTime),
        end_date: convertTimestampUtc(endTime),
        state:this.addPublicHolidayForm.controls['state'].value
      }

      /*this.addPublicHolidayForm.patchValue({
        date: convertTimestampUtc(this.addPublicHolidayForm.controls['date'].value), 
        // formControlName2: myValue2 (can be omitted)
      })*/
      this.adminPublicHoliday.dispatch({
        type: PublicHolidayActionTypes.SAVE_PUBLIC_HOLIDAY,
        payload: body
      });

      this.close()
    } 

    else if(this.addPublicHolidayForm.valid && this.data) {
      this.addPublicHolidayForm.patchValue({
        date: convertTimestampUtc(this.addPublicHolidayForm.controls['date'].value), 
        // formControlName2: myValue2 (can be omitted)
      })

      let editData= {
        id: this.data.id,
        ...this.addPublicHolidayForm.value
      }
      this.adminPublicHoliday.dispatch({
        type: PublicHolidayActionTypes.EDIT_PUBLIC_HOLIDAY,
        payload: editData 
      });

      this.close()
    }
  }

  subscribeBranchesEnum(){
    this.branchesEnums$ = this.adminPublicHoliday.pipe(select(state => state.branch));
    this.req = this.branchesEnums$.subscribe((results: any) => {
      this.branch = results.branchList;
      this.loading = results.pending;
    })
  }

  convertToDateTime(dateVal: Date){
    return Math.ceil(new Date(dateVal).getTime() / 1000);
  }

  convertToDate(dateTime){
    return new Date(dateTime * 1000)
  }

  onUpload(file: any): void {
    this.addPublicHolidayForm.get('image').setValue(file);
  }

}
