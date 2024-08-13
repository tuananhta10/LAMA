import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminHelper } from '@main/views/admin-panel/utils/helper';

@Component({
  selector: 'app-reschedule',
  templateUrl: './reschedule.component.html',
  styleUrls: ['./reschedule.component.scss']
})
export class RescheduleComponent implements OnInit {
  public selection: string = '';
  public rescheduleForm!: FormGroup;
  public radioOptions: any[] = [
    {
      id: 1,
      value: 'Date and Time',  
      name: 'Both Date and Time'
    }, 

    {
      id: 2,
      value: 'Time Only',  
      name: 'Time Only'
    }, 

    {
      id: 3,
      value: 'Date Only',  
      name: 'Date Only'
    }, 
  ].map(el => el.name)

  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<RescheduleComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data,
  ) {
    console.log("DATA WILL BE RESCHEDULED", data)
  }

  ngOnInit(): void {
    if(this.data.length > 1){
      this.createRescheduleForm(null);
    }else{
      this.createRescheduleForm(this.data[0]);
    }
  }
  
  createRescheduleForm(data: any): void {
    
    this.rescheduleForm = this.formBuilder.group({
      start_time: [data ? this.removeLastDoubleZero(data?.start_time) : ''],
      end_time: [data ? this.removeLastDoubleZero(data?.end_time) : ''],  
      start_date: [data ? AdminHelper.dateGmt(data?.start_date) :''],
      end_date: [''],
      time_or_date: ["Time Only"]
    });
    this.rescheduleForm.controls['time_or_date'].valueChanges.subscribe((result) => console.log(result));
  }

  removeLastDoubleZero(inputString:string) {
    return inputString.replace(/:00$/, '');
  }

  closeSaveDialog(): void {
    this.dialogRef.close({
      data: this.rescheduleForm.value,
      arrayData: this.data,
      cancel: false
    });
  }

  checkValid(): boolean{
    if(this.rescheduleForm.controls['time_or_date'].value === 'Both Date and Time' 
      && this.rescheduleForm.valid){
      return true;
    }
        
    else if(this.rescheduleForm.controls['time_or_date'].value === 'Time Only' 
      && this.rescheduleForm.controls['start_time'].value
      && this.rescheduleForm.controls['end_time'].value){
      return true;
    }

    else if(this.rescheduleForm.controls['time_or_date'].value === 'Date Only' 
      && this.rescheduleForm.controls['start_date'].value){
      return true;
    }
      
    return false;
  }
}
