import { Component, OnInit, Input } from '@angular/core';
import { mainAnimations } from '@app-main-animation';
import { MatDialog } from '@angular/material/dialog';
import { CertificatesComponent } from '../../../dialogs/certificates/certificates.component';
import { ViewAllCertificateComponent } from '../../../dialogs/view-all-certificate/view-all-certificate.component';
import { CustomDocumentModalComponent } from '../../../../employee-shared/modals/custom-document-modal/custom-document-modal.component';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { select, Store } from '@ngrx/store';
import { EmployeeCertificateActionTypes } from '@main/views/admin-panel/store/actions/admin-employee-certificate.action';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteRecordComponent } from '@main/views/admin-panel/pages/administration/dialogs/delete-record/delete-record.component';
import { EmployeeState } from '@main/views/admin-panel/store/reducers/admin-employee.reducer';
import { EmployeeActionTypes } from '@main/views/admin-panel/store/actions/admin-employee.action';
import { DocumentsModalComponent } from '../../../dialogs/documents/documents-modal.component';
import { EmployeeDocActionTypes } from '@main/views/admin-panel/store/actions/admin-employee-doc.action';
import { parseArrayObject } from '@main/shared/utils/parse.util';

interface Certificate{
  type: string,
  qualification_code: string,
  description: string,
  date_added: any,
  file: string
}

@Component({
  selector: 'employee-main-profile-documents',
  templateUrl: './main-profile-documents.component.html',
  styleUrls: ['./main-profile-documents.component.scss']
})
export class MainProfileDocumentsComponent implements OnInit {
  @Input() employeeData: any = {};
  @Input() id: any = {};

  private req: Subscription;
  private unsubscribe$ = new Subject<void>();
  public radioOptions:any[] = [{id: true, name: "Yes", value: true}, {id: false, name:"No", value: false}];
  public smoker: boolean = false;
  public allergies: boolean = false;
  public documents: any[] = [];
  public employeeId: any;
  public employeeCertificate$: any;

  public employeeDocs: any[] = [];
  public loading: boolean = true;
  public certificateData: Certificate[] = []

  private reqDoc: Subscription;
  public doc$:any;

  constructor(private dialog: MatDialog,
    private employeeStore: Store<EmployeeState>,
    private route: ActivatedRoute,
    private adminEmployee: Store<AdminProfileState>,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.employeeId = this.route.snapshot.paramMap.get('id');

    this.subscribeEmployee();
    console.log("FROM CERTIFICATE", this.certificateData)
  }

  ngOnDestroy(){
    if(this.req) this.req.unsubscribe();
  }

  subscribeEmployee(){
    this.employeeCertificate$ = this.employeeStore.pipe(select(state => state.employee));
    this.doc$ = this.adminEmployee.pipe(select(state => state.employeeDoc));
    this.req = this.employeeCertificate$.subscribe((results: any) => {
      if(results?.employee?.profileEmployeeDetail){
        this.certificateData = results?.employee?.profileEmployeeDetail?.employee_certificate?.slice(0, 3);
        this.employeeDocs = results?.employee?.profileEmployeeDetail?.employee_docs?.slice(0, 3);

        this.certificateData?.forEach(el => {
          el["qualification_code"] = parseArrayObject(el['qualification'], 'qualification');
        })


        if(!this.employeeData){
          this.loading = results?.employees.pending;
        }

        else {
          this.loading = false;
        }
      }
      this.loading = results?.pending;
    });

    this.reqDoc = this.doc$.subscribe((results: any) => {
      this.loading = results.pending;
    });
  }

  convertToDate(dateTime){
    return new Date(dateTime * 1000)
  }

  // add - edit certificate
  openAddCertificateDialog(certificate?: any){
    const dialogRef = this.dialog.open(CertificatesComponent, {
      panelClass: "dialog-responsive",
      width: '490px',
      data: {
        employee_id: this.employeeId,  
        certificate: certificate
      },
      autoFocus: false 
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed',  /*this.dbClickActive*/ );
    });
  }

  // view all certificate
  openViewAllCertificate(){
    const dialogRef = this.dialog.open(ViewAllCertificateComponent, {
      panelClass: "dialog-responsive",
      //width: '550px',
      data: {
        employee_id: this.employeeId,  
        certificates: this.certificateData
      },
      autoFocus: false 
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed',  /*this.dbClickActive*/ );
    });

  }

  openCustomDocumentModal(document?: any){
    let customDocumentDialog = this.dialog.open(
      DocumentsModalComponent,
      {
        width: '400px',
        data: {
          employee_id: this.employeeId,
          document: document
        },
      }
    );

    customDocumentDialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {
      let doc = {
        title: "",
        type: "",
        description: "",
        is_private: true,
        attachment: ""
      }
      if(result){
        doc.title = result.title;
        doc.type = result.type;
        doc.description = result.description;
        doc.is_private = result?.is_private;
        doc.attachment = result.file;

        this.documents.push(doc);
        //this.editDocuments.add.push(doc);
      }
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
          this.adminEmployee.dispatch({
            type: EmployeeDocActionTypes.DELETE_EMPLOYEE_DOC,
            payload: [result?.data || data],
            employee_id: this.employeeId 
          }); 

          //this.certificateData.splice(data, 1);


          // after delete refresh store
          console.log("DATA WILL BE DELETED", (result?.data || data))
        }
      });
    }
  }

  deleteCertificateDialog(data){
    if(data){
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
          this.adminEmployee.dispatch({
            type: EmployeeCertificateActionTypes.DELETE_EMPLOYEE_CERTIFICATE,
            payload: [result?.data || data],
            employee_id: this.employeeId 
          }); 

          //this.certificateData.splice(data, 1);


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
