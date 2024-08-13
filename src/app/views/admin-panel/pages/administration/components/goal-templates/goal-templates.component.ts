import { Component, OnDestroy, OnInit, Input } from '@angular/core';
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
  GoalTemplate,
  selectedColumns,
  templateList 
} from '../../utils/goal-template-model-interface';
import { AddGoalTemplateComponent } from '../../dialogs/add-goal-template/add-goal-template.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { GoalTemplateActionTypes } from '@main/views/admin-panel/store/actions/admin-goal-template.action';
import { DeleteRecordComponent } from '../../dialogs/delete-record/delete-record.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-goal-templates',
  animations: [mainAnimations],
  templateUrl: './goal-templates.component.html',
  styleUrls: ['./goal-templates.component.scss']
})
export class GoalTemplatesComponent implements OnInit {

  private goalTemplate$: any;
  private req: Subscription;
  private unsubscribe$ = new Subject<void>();

  public clientData: any = {};
  public routerUrl: any[] = [];
  public loading: boolean = true;
  public id;
  public displayedColumns: TableHeader[] = displayedColumns;
  public templateList: GoalTemplate[] = [];
  public selectedColumns: string[] = selectedColumns;
  public listView: boolean = true;
  public searchSource: any = (el) => {
    return {
      id: el.id, 
      code: el.code,   
      name: el.name,  
      profile_image: el.profile_image,
    }
  } 

  constructor(
    private adminGoalTemplate: Store<AdminProfileState>,
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar) {
    this.id = route.parent.snapshot.params['id'];
  }

  ngOnInit(): void {
    
    this.getGoalTemplates();
    this.goalTemplate$ = this.adminGoalTemplate.pipe(select(state => state.goalTemplate));

    this.req =  this.goalTemplate$.subscribe((goalTemplate: any) => {
      this.loading = goalTemplate.pending;
      
      if(goalTemplate.goalTemplateList.length > 0){
        this.templateList = goalTemplate.goalTemplateList;
      }

      if(goalTemplate.success){
        this.snackBar.open(goalTemplate.success, "", {
          duration: 4000,
          panelClass:'success-snackbar'
        });

        this.adminGoalTemplate.dispatch({
          type: GoalTemplateActionTypes.SAVE_GOAL_TEMPLATE_SUCCESS,
          payload: {message: null}
        }); 

        this.adminGoalTemplate.dispatch({
          type: GoalTemplateActionTypes.EDIT_GOAL_TEMPLATE_SUCCESS,
          payload: {message: null}
        }); 

        this.getGoalTemplates();
      }

      if(goalTemplate.error){
        this.snackBar.open("Something went wrong please try again later or contact your administrator", "", {
          duration: 4000,
          panelClass:'danger-snackbar'
        });

        this.adminGoalTemplate.dispatch({
          type: GoalTemplateActionTypes.SAVE_GOAL_TEMPLATE_FAIL,
          payload: null
        }); 

        this.adminGoalTemplate.dispatch({
          type: GoalTemplateActionTypes.EDIT_GOAL_TEMPLATE_FAIL,
          payload: null
        }); 
      }
    })
  }

  getGoalTemplates(){
    this.adminGoalTemplate.dispatch({
      type: GoalTemplateActionTypes.GET_GOAL_TEMPLATE_LIST
    }); 
  }

  ngOnDestroy(): void {
    if(this.req) this.req.unsubscribe();
  }

  // edit event emitter
  editDataDialog(event){
    if(event){
      this.openAddTemplate(event?.data);
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
          this.adminGoalTemplate.dispatch({
            type: GoalTemplateActionTypes.DELETE_GOAL_TEMPLATE,
            payload: [result?.data || event?.data]
          }); 
          // after delete refresh store
          console.log("DATA WILL BE DELETED", (result?.data || event?.data))
        }
      });
    }
  }


  openAddTemplate(data?: any){
    let addTemplateDialog = this.dialog.open(
      AddGoalTemplateComponent,
      { 
        minWidth: '50vw',
        data: data,
      }
    );

    addTemplateDialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {

    });
  }

}
