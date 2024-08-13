import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ComplianceCheckComponent } from '../compliance-check/compliance-check.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

interface ComplianceFile{
  icon?: string,
  name: string,
  type: string,
  expiry_date: string,
  status: string,
  description: string
}

interface ComplianceCheck{
  employeeName: string,
  status: string,
  type: string,  
  qualification: string,  
  expiryDate: string,  
  description: string,  
  remarks: string,  
  file: string
}

@Component({
  selector: 'app-view-all-compliance',
  templateUrl: './view-all-compliance.component.html',
  styleUrls: ['./view-all-compliance.component.scss']
})
export class ViewAllComplianceComponent implements OnInit {

  ngOnInit(): void {
  }

  constructor(public dialogRef: MatDialogRef<ComplianceCheckComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private dialog: MatDialog,) { }


  submitUpdateComplianceDoc(row?: ComplianceFile){
    const dialogRef = this.dialog.open(ComplianceCheckComponent, {
      panelClass: "dialog-responsive",
      //width: '550px',
      data: {
        employeeData: this.data?.employeeData,
        item: row
      },
      autoFocus: false 
    });

    dialogRef.afterClosed().subscribe(result => {
      //this.dbClickActive = false;
      //this.selectRows(selectedEmployee);
      console.log('The dialog was closed',  /*this.dbClickActive*/ );
    });

  }

}
