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
  Language,
  selectedColumns,
  languageList 
} from '../../utils/language-model-interface';
import { AddLanguageComponent } from '../../dialogs/add-language/add-language.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { LanguageActionTypes } from '@main/views/admin-panel/store/actions/admin-language.action';
import { DeleteRecordComponent } from '../../dialogs/delete-record/delete-record.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'admin-languages',
  animations: [mainAnimations],
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss']
})
export class LanguagesComponent implements OnInit, OnDestroy {
  private languageData$: any;
  private req: Subscription;
  private unsubscribe$ = new Subject<void>();

  public clientData: any = {};
  public routerUrl: any[] = [];
  public loading: boolean = true;
  public id;
  public displayedColumns: TableHeader[] = displayedColumns;
  public languageList: Language[] = [];
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

  constructor(private adminLanguage: Store<AdminProfileState>,
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar) {
    this.id = route.parent.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getLanguages();
    this.languageData$ = this.adminLanguage.pipe(select(state => state.language));

    this.req =  this.languageData$.subscribe((language: any) => {
      this.loading = language.pending;
      
      if(language.languageList.length > 0){
        this.languageList = language.languageList;
      }

      if(language.success){
        this.snackBar.open(language.success, "", {
          duration: 4000,
          panelClass:'success-snackbar'
        });

        this.adminLanguage.dispatch({
          type: LanguageActionTypes.SAVE_LANGUAGE_SUCCESS,
          payload: {message: null}
        }); 

        this.adminLanguage.dispatch({
          type: LanguageActionTypes.EDIT_LANGUAGE_SUCCESS,
          payload: {message: null}
        }); 

        this.getLanguages();
      }

      if(language.error){
        this.snackBar.open("Something went wrong please try again later or contact your administrator", "", {
          duration: 4000,
          panelClass:'danger-snackbar'
        });

        this.adminLanguage.dispatch({
          type: LanguageActionTypes.SAVE_LANGUAGE_FAIL,
          payload: null
        }); 

        this.adminLanguage.dispatch({
          type: LanguageActionTypes.EDIT_LANGUAGE_FAIL,
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
      this.openAddLanguage(event?.data);
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
          this.adminLanguage.dispatch({
            type: LanguageActionTypes.DELETE_LANGUAGE,
            payload: [result?.data.id || event?.data.id]
          }); 
          // after delete refresh store
          console.log("DATA WILL BE DELETED", (result?.data || event?.data))
        }
      });
    }
  }

  openAddLanguage(data?: any){
    let createLanguageDialog = this.dialog.open(
      AddLanguageComponent,
      { 
        minWidth: '30vw',
        data: data,
      }
    );

    createLanguageDialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {

    });
  }

  getLanguages(){
    this.adminLanguage.dispatch({
      type: LanguageActionTypes.GET_LANGUAGE_LIST
    }); 
  }

}
