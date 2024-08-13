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
  FormTemplate,
  selectedColumns,
  templateList 
} from '../../utils/form-template-model-interface';
import { AddFormTemplateComponent } from '../../dialogs/add-form-template/add-form-template.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { FormTemplateActionTypes } from '@main/views/admin-panel/store/actions/admin-form-template.action';
import { DeleteRecordComponent } from '../../dialogs/delete-record/delete-record.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form-templates',
  animations: [mainAnimations],
  templateUrl: './form-templates.component.html',
  styleUrls: ['./form-templates.component.scss']
})
export class FormTemplatesComponent implements OnInit {
  private req: Subscription;
  private unsubscribe$ = new Subject<void>();
  private formTemplate$: any;

  public routerUrl: any[] = [];
  public loading: boolean = true;
  public id;
  public displayedColumns: TableHeader[] = displayedColumns;
  public templateList: FormTemplate[] = [];
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

  constructor(private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private adminFormTemplate: Store<AdminProfileState>,
    private snackBar: MatSnackBar) {
    this.id = route.parent.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getFormTemplate();
    this.formTemplate$ = this.adminFormTemplate.pipe(select(state => state.formTemplate));

    this.req =  this.formTemplate$.subscribe((formTemplate: any) => {
      this.loading = formTemplate.pending;
       
      if(formTemplate.formTemplateList.length > 0){
        this.templateList = formTemplate.formTemplateList;
      }

      if(formTemplate.success){
        this.snackBar.open(formTemplate.success, "", {
          duration: 4000,
          panelClass:'success-snackbar'
        });

        this.adminFormTemplate.dispatch({
          type: FormTemplateActionTypes.SAVE_FORM_TEMPLATE_SUCCESS,
          payload: {message: null}
        }); 

        this.adminFormTemplate.dispatch({
          type: FormTemplateActionTypes.EDIT_FORM_TEMPLATE_SUCCESS,
          payload: {message: null}
        }); 

        this.getFormTemplate();
      }

      if(formTemplate.error){
        this.snackBar.open("Something went wrong please try again later or contact your administrator", "", {
          duration: 4000,
          panelClass:'danger-snackbar'
        });

        this.adminFormTemplate.dispatch({
          type: FormTemplateActionTypes.SAVE_FORM_TEMPLATE_FAIL,
          payload: null
        }); 

        this.adminFormTemplate.dispatch({
          type: FormTemplateActionTypes.EDIT_FORM_TEMPLATE_FAIL,
          payload: null
        }); 
      }
    })
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

  getFormTemplate(){
    this.adminFormTemplate.dispatch({
      type: FormTemplateActionTypes.GET_FORM_TEMPLATE_LIST
    }); 
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
          this.adminFormTemplate.dispatch({
            type: FormTemplateActionTypes.DELETE_FORM_TEMPLATE,
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
      AddFormTemplateComponent,
      { 
        minWidth: '30vw',
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
