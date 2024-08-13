import { Component, Inject, OnInit, Input } from '@angular/core';
import { mainAnimations } from '@app-main-animation';
import { MatDialog } from '@angular/material/dialog';
import { CertificatesComponent } from '../certificates/certificates.component';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { select, Store } from '@ngrx/store';
import { EmployeeCertificateActionTypes } from '@main/views/admin-panel/store/actions/admin-employee-certificate.action';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DeleteRecordComponent } from '@main/views/admin-panel/pages/administration/dialogs/delete-record/delete-record.component';
import { EmployeeState } from '@main/views/admin-panel/store/reducers/admin-employee.reducer';
import { EmployeeActionTypes } from '@main/views/admin-panel/store/actions/admin-employee.action';
import { parseArrayObject } from '@main/shared/utils/parse.util';

interface Certificate{
  type: string,
  qualification_code: string,
  description: string,
  date_added: any,
  file: string

}

@Component({
  selector: 'app-view-all-certificate',
  templateUrl: './view-all-certificate.component.html',
  styleUrls: ['./view-all-certificate.component.scss']
})
export class ViewAllCertificateComponent implements OnInit {
  private req: Subscription;
  private unsubscribe$ = new Subject<void>();
  public radioOptions:any[] = [{id: true, name: "Yes", value: true}, {id: false, name:"No", value: false}];
  public smoker: boolean = false;
  public allergies: boolean = false;
  public documents: any[] = [];
  public employeeId: any;
  public employeeCertificate$: any;

  public employeeDocs: any[] = [
    { id: 1, title: "Policies for Clients", dateAdded: "9-12-2021", type: "Others", description: "" },
    { id: 2, title: "Shift Document", dateAdded: "9-12-2021", type: "Others", description: "" },
    { id: 3, title: "Agreement Document", dateAdded: "9-12-2021", type: "Others", description: "" },
  ];
  public loading: boolean = true;
  public certificateData: Certificate[] = []

  constructor(private dialog: MatDialog,
    public dialogRef: MatDialogRef<ViewAllCertificateComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private employeeStore: Store<EmployeeState>,
    private route: ActivatedRoute,
    private adminEmployeeCertificate: Store<AdminProfileState>,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.employeeId = this.route.snapshot.paramMap.get('id');
    this.subscribeEmployee();
  }

  ngOnDestroy(){
    if(this.req) this.req.unsubscribe();
  }

  subscribeEmployee(){
    this.certificateData = this.data?.certificates;

    this.employeeCertificate$ = this.employeeStore.pipe(select(state => state.employee));
    this.req = this.employeeCertificate$.subscribe((results: any) => {
      console.log("Profile Details", results?.employee)
      if(results?.employee?.profileEmployeeDetail){
        this.certificateData = results?.employee?.profileEmployeeDetail?.employee_certificate;
        this.certificateData?.forEach(el => {
          el["qualification_code"] = parseArrayObject(el['qualification'], 'qualification');
        })
        setTimeout(() => {
          if(!this.data.employeeData){
            this.loading = results?.employee.pending;
          }

          else {
            this.loading = false;
          }
        }, 1000);
      }
      this.loading = results?.pending;
    });
  }

  convertToDate(dateTime){
    return new Date(dateTime * 1000)
  }


  // add - edit certificate
  openAddCertificateDialog(certificate?: any){
    const dialogRef = this.dialog.open(CertificatesComponent, {
      panelClass: "dialog-responsive",
      //width: '550px',
      data: {
        employee_id: this.data?.employee_id,  
        certificate: certificate
      },
      autoFocus: false 
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result, "UPDATING")
      //this.subscribeEmployee();
    });
  }

  deleteDataDialog(data){
    if(event){
      let deleteDialog = this.dialog.open(
        DeleteRecordComponent,
        { 
          minWidth: '30vw',
          data: data,
        }
      );

      deleteDialog
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {
        if(result?.data || (result && !result.cancel && data)){
          this.adminEmployeeCertificate.dispatch({
            type: EmployeeCertificateActionTypes.DELETE_EMPLOYEE_CERTIFICATE,
            payload: [result?.data || data],
            employee_id: this.data?.employee_id 
          }); 
          
          // after delete refresh store
          console.log("DATA WILL BE DELETED", (result?.data || data))
        }
      });
    }
  }


  parseArray(data): string[] {
    return data// ? eval(data) : '-'
  }

}
