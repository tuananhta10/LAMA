import { Component, OnInit, Input } from '@angular/core';
import { mainAnimations } from '@app-main-animation';
import { Router, ActivatedRoute } from '@angular/router';
import { 
  Subscription, 
} from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { 
  select, 
  Store 
} from '@ngrx/store';
import { 
  displayedColumns,
  TableHeader,
  Qualification,
  selectedColumns,
  qualificationList 
} from '../../utils/qualification-model-interface';

//import { AddQualificationComponent } from '../../dialogs/add-medical-history/add-medical-history.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AddQualificationsComponent } from '../../dialogs/add-qualifications/add-qualifications.component';
import { DeleteRecordComponent } from '../../dialogs/delete-record/delete-record.component';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { QualificationActionTypes } from '@main/views/admin-panel/store/actions/admin-qualification.action';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'admin-qualifications',
  animations: [mainAnimations],
  templateUrl: './qualifications.component.html',
  styleUrls: ['./qualifications.component.scss']
})
export class QualificationsComponent implements OnInit {
  private qualificationData$: any;
  private req: Subscription;
  private unsubscribe$ = new Subject<void>();

  public clientData: any = {};
  public routerUrl: any[] = [];
  public loading: boolean = true;
  public displayedColumns: TableHeader[] = displayedColumns;
  public qualificationList: Qualification[] = [];
  public selectedColumns: string[] = selectedColumns;
  public listView: boolean = true;
  public searchSource: any = (el) => {
    return {
      qualification: el.qualification,   
      created_by: el.created_by,  
      date: el.date,
    }
  } 

  constructor(private adminQualification: Store<AdminProfileState>,
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.getQualifications();
    
    this.qualificationData$ = this.adminQualification.pipe(select(state => state.qualification));

    this.req =  this.qualificationData$.subscribe((qualification: any) => {
      this.loading = qualification.pending;

      if(qualification.qualificationList.length > 0){
        this.qualificationList = qualification.qualificationList;
      }

      if(qualification.success){
        this.snackBar.open(qualification.success, "", {
          duration: 4000,
          panelClass:'success-snackbar'
        });

        this.adminQualification.dispatch({
          type: QualificationActionTypes.SAVE_QUALIFICATION_SUCCESS,
          payload: {message: null}
        }); 

        this.adminQualification.dispatch({
          type: QualificationActionTypes.EDIT_QUALIFICATION_SUCCESS,
          payload: {message: null}
        }); 

        this.getQualifications();
      }

      if(qualification.error){
        this.snackBar.open("Something went wrong please try again later or contact your administrator", "", {
          duration: 4000,
          panelClass:'danger-snackbar'
        });

        this.adminQualification.dispatch({
          type: QualificationActionTypes.SAVE_QUALIFICATION_FAIL,
          payload: null
        }); 

        this.adminQualification.dispatch({
          type: QualificationActionTypes.EDIT_QUALIFICATION_FAIL,
          payload: null
        }); 
      }
    })
  }

  getQualifications(){
    this.adminQualification.dispatch({
      type: QualificationActionTypes.GET_QUALIFICATION_LIST
    });
  }

  ngOnDestroy(): void {
    if(this.req) this.req.unsubscribe();
  }

  // edit event emitter
  editDataDialog(event){
    if(event){
      this.openAddQualification(event?.data);
    }
  }

  // delete event emitter
  deleteDataDialog(event){
    if(event){
      let deleteDialog = this.dialog.open(
        DeleteRecordComponent,
        { 
          minWidth: '30vw',
          data: event?.data,
        }
      );

      deleteDialog
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {
        if(result?.data || (result && !result.cancel && event?.data)){
          this.adminQualification.dispatch({
            type: QualificationActionTypes.DELETE_QUALIFICATION,
            payload: [result?.data.id || event?.data.id]
          }); 
          // after delete refresh store
          console.log("DATA WILL BE DELETED", (result?.data || event?.data))
        }
      });
    }
  }


  openAddQualification(data?: any){
    let qualificationsDialog = this.dialog.open(
      AddQualificationsComponent,
      { 
        minWidth: '30vw',
        data: data,
      }
    );

    qualificationsDialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {

    });
  }

}
