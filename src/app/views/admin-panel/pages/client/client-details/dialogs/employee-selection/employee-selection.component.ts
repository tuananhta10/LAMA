import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-employee-selection',
  templateUrl: './employee-selection.component.html',
  styleUrls: ['./employee-selection.component.scss']
})
export class EmployeeSelectionComponent implements OnInit {
  public bgColor: string[] = [
    '#FCF3EE', '#FEF1FC', '#EDF1FC'
  ];

  public selection: string = '';
  public search: string = '';
  public careworkerList: any;
  public defaultImage = '/assets/images/placeholder/default-avatar.png';

  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<EmployeeSelectionComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
  ) {
    this.careworkerList = this.data.careworkerList;
  }

  randomizeBackground(): number{
    return (Math.floor(Math.random() * 3))
  }

  ngOnInit(): void {
  }

  /*
    Client list table filter
  */
  searchDataSource(): void {
    const careworkerList = [...this.data.careworkerList]
    .filter(el => {
      let transformed = {
        "age": el.age,
        "id": el.id,
        "first_name": el.first_name, 
        "last_name": el.last_name, 
        "name": `${el.first_name} ${el.last_name}`,
        //"date_added": el.date_added,
        //"email": el.email,
        "mobile_phone": el.mobile_phone_no,
        "work_phone": el.work_phone_no,
        "home_phone_no": el.home_phone_no,
        /*"suburb": el.suburb,
        "branch_name": el.branch_name,
        "state": el.state,
        "post_code": el.post_code,
        "preferred_gender": el.preferred_gender,
        "preferred_name": el.preferred_name,
        "type_of_service": el.type_of_service,
        "occupation": el.occupation,
        "primary_diagnosis": el.primary_diagnosis,*/
        "address": el.address,
        //"status": el.status
      };
      
      return JSON.stringify(transformed).toLowerCase().includes(this.search.toLowerCase());
    });

    this.careworkerList = careworkerList
  }

  proceedSelection(): void {
    this.dialogRef.close();
  
  }


  assignCareworker(careworker){
    if(careworker){
      this.dialogRef.close({
        careworker: careworker
      });
    }
  }
}
