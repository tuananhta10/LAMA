import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-assign-client',
  templateUrl: './assign-client.component.html',
  styleUrls: ['./assign-client.component.scss']
})
export class AssignClientComponent implements OnInit {
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
  ]

  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<AssignClientComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
  ) {
  
  }

  ngOnInit(): void {
  }

  selectPreference(selection: string){
    this.selection = selection;
  }

  proceedSelection(): void {
    if(this.selection){
      this.dialogRef.close({
        selection: this.selection
      });
    }
    //this.router.navigate(['/admin/employees']);
  }

}
