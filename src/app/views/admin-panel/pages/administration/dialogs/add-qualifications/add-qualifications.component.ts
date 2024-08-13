import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { mainAnimations } from '@app-main-animation';
import { QualificationActionTypes } from '@main/views/admin-panel/store/actions/admin-qualification.action';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-add-qualifications',
  animations: [mainAnimations],
  templateUrl: './add-qualifications.component.html',
  styleUrls: ['./add-qualifications.component.scss']
})
export class AddQualificationsComponent implements OnInit {

  public newQualificationForm!: FormGroup;
  public typeOptions: any[] = [
    "License", "Training", "Certification", "Experience", "Education", "Legal Document", "Form Document", "Other"
  ];
  public qualificationOptions: any[] = ["Cert in dementia"];  
  public radioOptions:any[] = [{id: true, name: "Yes", value: true}, {id: false, name:"No", value: false}];
  
  public employee:any[] =  [
    {name: 'Name', field: 'name'}, 
    {name: 'Type', field: 'type'}, 
    {name: 'Job Type', field: 'job_type'},
    {name: 'Email', field: 'email_address'},
    {name: 'Home Phone', field: 'home_phone_no'},
    {name: 'Mobile Phone', field: 'mobile_phone_no'},
    {name: 'Suburb', field: 'suburb'},
    {name: 'Date Started', field: 'date_added'},
    {name: 'Pricelist', field: 'price_list'},
    {name: 'Employment Type', field: 'employment_type'},
    {name: 'Main Branch', field: 'branch_name'},
  ];  
  public employeeData: any[] = [];
  public linkEmployee: boolean = false;
  public employeeOptions: any[] = [
    {id: 1, name: 'George Watson'},  
    {id: 2, name: 'Miles Morales'},  
    {id: 3, name: 'James Stonehammer'}
  ];
  public showOther: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<AddQualificationsComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder,
    private adminQualification: Store<AdminProfileState>,
  ) { 
    console.log(data)
  }

  ngOnInit(): void {
    const loggedUser = JSON.parse(localStorage.getItem('loggedUserData'));

    this.newQualificationForm = this.formBuilder.group({
      type: [this.data ? this.data?.type : '', [Validators.required]],
      type_other: [this.data ? this.data?.type_other : ''],
      qualification: [this.data ? this.data.qualification : '', [Validators.required]],
      description: [this.data ? this.data.description : '', [Validators.required]],
      mandatory: [this.data? this.data.mandatory : false, [Validators.required]],  
      employees: ['']
      //created_by: [`${loggedUser?.first_name} ${loggedUser?.last_name}`, [Validators.required]],
      //created_by_id: [loggedUser?.id, [Validators.required]],
      //file: ['']
    });
  }

  showOthers(event){
    if(event == 'Other'){
      this.showOther = true;
    }

    else if(event != 'Other' && event !== '') this.showOther = false; 
  }

  close() {
    this.dialogRef.close(null);
  }

  save(){
    if(this.newQualificationForm.valid && !this.data){
      this.adminQualification.dispatch({
        type: QualificationActionTypes.SAVE_QUALIFICATION,
        payload: this.newQualificationForm.value 
      });

      this.close();
    }
    else if(this.newQualificationForm.valid && this.data) {

      let editData = {
        id: this.data.id,
        ...this.newQualificationForm.value
      }
      this.adminQualification.dispatch({
        type: QualificationActionTypes.EDIT_QUALIFICATION,
        payload: editData
      });

      this.close();
    }
  }

  onUpload(file: any): void {
    this.newQualificationForm.get('file').setValue(file);
  }

  openLinkEmployee(event){
    if(!this.linkEmployee) this.linkEmployee = true;
  }

}
