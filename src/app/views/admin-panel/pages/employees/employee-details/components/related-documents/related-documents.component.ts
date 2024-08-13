import { Component, OnInit, Input } from '@angular/core';
import { mainAnimations } from '@app-main-animation';
import { Router, ActivatedRoute } from '@angular/router';
import { 
  Subscription, 
  Observable, 
  forkJoin, 
  combineLatest 
} from 'rxjs';
import { 
  select, 
  Store 
} from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeListActionTypes } from '@app-admin-store/actions/admin-employees.actions';
import { EmployeeListState  } from '@app-admin-store/reducers/admin-employees.reducer';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CustomDocumentModalComponent } from '../../../employee-shared/modals/custom-document-modal/custom-document-modal.component';
import { EmployeeState } from '@main/views/admin-panel/store/reducers/admin-employee.reducer';
import { EmployeeActionTypes } from '@main/views/admin-panel/store/actions/admin-employee.action';
import { DocumentsModalComponent } from '../../dialogs/documents/documents-modal.component';
import { EmployeeCertificateActionTypes } from '@main/views/admin-panel/store/actions/admin-employee-certificate.action';
import { DeleteRecordComponent } from '@main/views/admin-panel/pages/administration/dialogs/delete-record/delete-record.component';
import { EmployeeDocActionTypes } from '@main/views/admin-panel/store/actions/admin-employee-doc.action';
import { AdminProfileState } from '@main/views/admin-panel/store/index';

@Component({
  selector: 'employee-related-documents',
  animations: [mainAnimations],
  templateUrl: './related-documents.component.html',
  styleUrls: ['./related-documents.component.scss']
})
export class RelatedDocumentsComponent implements OnInit {
  isLinear = false;
  private unsubscribe$ = new Subject<void>();
  private employeesData$: any;
  private req: Subscription;
  
  public documents: any[] = [];
  public employeeData: any = {};
  public routerUrl: any[] = [];
  public loading: boolean = true;
  public id;
  public employee$: any;
  public editDocuments: any = {
    add: [],
    delete: []
  }

  private reqDoc: Subscription;
  public doc$:any;

  constructor(private employeeListStore: Store<EmployeeListState>,
    private employeeStore: Store<EmployeeState>,
    private router: Router,
    private route: ActivatedRoute,
    private adminEmployee: Store<AdminProfileState>,
    public dialog: MatDialog,) {
    this.employeesData$ = this.employeeListStore.pipe(select(state => state));
    this.routerUrl = this.router.url.split('/');
    this.id = route.parent.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getEmployeeDetails();
    this.subscribeEmployee();
  }

  ngOnDestroy(): void {
    if(this.req) this.req.unsubscribe();
  }

  // employee details
  getEmployeeDetails(): void{
    let data = {
      type: 'profile-employee-detail',
      id: this.id,
      key: 'profileEmployeeDetail'
    }
    this.employeeStore.dispatch({
      type: EmployeeActionTypes.GET_EMPLOYEE,
      payload: data
    });
  }

  subscribeEmployee(){
    this.employee$ = this.employeeStore.pipe(select(state => state.employee));
    this.doc$ = this.adminEmployee.pipe(select(state => state.employeeDoc));
    this.req = this.employee$.subscribe((results: any) => {
      if(results?.employee?.profileEmployeeDetail){
        this.documents = results?.employee?.profileEmployeeDetail?.employee_docs?.slice();
        
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

  openCustomDocumentModal(document?: any){
    let customDocumentDialog = this.dialog.open(
      DocumentsModalComponent,
      {
        width: '400px',
        data: {
          employee_id: this.id,
          document: document
        },
      }
    );

    customDocumentDialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {
      
    });
  }

  delete(index) {
    let data = this.documents[index];
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
          this.employeeStore.dispatch({
            type: EmployeeDocActionTypes.DELETE_EMPLOYEE_DOC,
            payload: [result?.data || data],
            employee_id: data.employee_id 
          }); 

          //this.certificateData.splice(data, 1);


          // after delete refresh store
          console.log("DATA WILL BE DELETED", (result?.data || data))
        }
      });
    }
  }

  displayFile(data: any) {
    let ret = '';
    if(data?.attachment.length > 0){
      ret = data.attachment[0].filename;
    }

    return ret;
  }


}
