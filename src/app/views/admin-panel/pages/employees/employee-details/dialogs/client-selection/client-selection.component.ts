import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-client-selection',
  templateUrl: './client-selection.component.html',
  styleUrls: ['./client-selection.component.scss']
})
export class ClientSelectionComponent implements OnInit {
  public bgColor: string[] = [
    '#FCF3EE', '#FEF1FC', '#EDF1FC'
  ];
  public selection: string = '';
  public criteria: any[] = [
    {
      id: 'location',
      class: 'employee-location',
      title: 'Location',
      image: '/assets/images/icons/location-assign.png'
    },

    {
      id: 'interest',
      class: 'employee-interest',
      title: 'Interest',
      image: '/assets/images/icons/interest-assign.png'
    },

    {
      id: 'age',
      class: 'employee-age',
      title: 'Age',
      image: '/assets/images/icons/age-assign.png'
    },
  ];

  public search: string = '';
  public clientList: any = '';
  public defaultImage = '/assets/images/placeholder/default-avatar.png';

  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<ClientSelectionComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
  ) {
    this.clientList = this.data.clientList;
  }

  ngOnInit(): void {
  }

  /*
    Client list table filter
  */
  searchDataSource(): void {
    const clientList = [...this.data.clientList]
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

    this.clientList = clientList;
  }

  proceedSelection(): void {
    this.dialogRef.close();
 
  }

  assignClient(client){
    if(client){
      this.dialogRef.close({
        client: client
      });
    }
  }
}
