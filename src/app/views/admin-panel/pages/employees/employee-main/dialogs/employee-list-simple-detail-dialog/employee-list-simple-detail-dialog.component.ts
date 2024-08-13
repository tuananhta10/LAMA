import { Component, OnInit, Inject } from '@angular/core';
import { 
  MatDialog, 
  MatDialogRef, 
  MAT_DIALOG_DATA 
} from '@angular/material/dialog';
import { EmployeeList, EmployeeDetailSimple } from '../../utils/employee-list-model';
import { Router } from '@angular/router';
import { mainAnimations } from '@app-main-animation';

@Component({
  selector: 'app-employee-list-simple-detail-dialog',
  animations: [mainAnimations],
  templateUrl: './employee-list-simple-detail-dialog.component.html',
  styleUrls: ['./employee-list-simple-detail-dialog.component.scss']
})
export class EmployeeListSimpleDetailDialogComponent implements OnInit {

  public employeeDetail: EmployeeList;
  public bannerImg: boolean = false;
  public defaultImage: string = '/assets/images/placeholder/default-avatar.png';

  constructor(public dialogRef: MatDialogRef<EmployeeListSimpleDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EmployeeDetailSimple,
    private router: Router) {

    this.employeeDetail = this.data?.employeeDetail;
    setTimeout(() => this.bannerImg = true, 50);
    console.log(this.data)
  }

  setDate(date){
    return new Date(date)
  }

  ngOnInit(): void {

  }

  visitProfile(): void {
    this.dialogRef.close();
    this.router.navigate([`/admin/employees/details/${this.employeeDetail?.id}`])
  }

  editDetails(): void {
    this.dialogRef.close();
    this.router.navigate([`/admin/employees/edit/${this.employeeDetail?.id}`])
  }

  viewProfile(): void {
    //this.router.navigate([`/admin/employees/details/${row?.id}`])
    this.dialogRef.close();
  }

  parseArray(data): string[] {
    return data ? eval(data) : '-'
  }

}
