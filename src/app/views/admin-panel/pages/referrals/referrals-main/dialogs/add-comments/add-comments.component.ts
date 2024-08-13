import { Component, OnInit, Inject } from '@angular/core';
import { 
  MatDialog, 
  MatDialogRef, 
  MAT_DIALOG_DATA 
} from '@angular/material/dialog';
import { mainAnimations } from '@app-main-animation';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { format } from 'date-fns';
import { ReferralActionTypes } from '@main/views/admin-panel/store/actions/admin-referral.action';
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
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-comments',
  animations: [mainAnimations],
  templateUrl: './add-comments.component.html',
  styleUrls: ['./add-comments.component.scss']
})
export class AddCommentsComponent implements OnInit {
  public comments: any[] = [];
  private referralData$: any;
  private req: Subscription;
  public commentForm: FormGroup;
  public editorConfig: any = {
    //uiColor: '#e4e4e4',
    width: '100%',
    height: '100px',
    addCss: './employee-bulk-email-notification.scss',
    format_tags: 'p;h1;h2;h3;h4;h5;h6',
    colorButton_colors: 'CF5D4E,454545,FFF,DDD,CCEAEE,66AB16',
    toolbarGroups: [
      { name: 'basicstyles', groups: [/* 'mode',*/'basicstyles'/*, 'cleanup'*/ ] },
      { name: 'styles' }
    ],
  }
  public loading: boolean = false;
  public referralData: any = {};
  public loggedUser: any = JSON.parse(localStorage.getItem('loggedUserData'));

  constructor(public dialogRef: MatDialogRef<AddCommentsComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private snackBar: MatSnackBar,
    private adminReferral: Store<AdminProfileState>,
    private formBuilder: FormBuilder,) { 
    console.log(data)
  }

  ngOnInit(): void {
    this.commentForm = this.formBuilder.group({
      comment: [this.data ? this.data.comment : 'Type your comment here.', [Validators.required]],
    });

    this.subscribeReferral();
    this.getReferralData();
  }

  ngOnDestroy(){
    if(this.req) this.req.unsubscribe();  
    /*this.adminReferral.dispatch({
      type: ReferralActionTypes.GET_REFERRAL,
      payload: {id: 0}
    });*/
  }

  subscribeReferral(){
    this.referralData$ = this.adminReferral.pipe(select(state => state.referral));

    this.req = this.referralData$.subscribe((results: any) => {
      this.loading = results?.pending;
      this.referralData = null;
      this.comments = [];

      if(!results?.pending && results?.referral){
        this.referralData = results?.referral;

        if(this.referralData?.referral_comment?.length > 0){
          this.comments = this.referralData['referral_comment'].sort((a,b) => {
            let date_a: any = new Date(a?.date_added);
            let date_b: any = new Date(b?.date_added);

            return date_b - date_a;
          });
          
          this.comments?.forEach((el: any) => {
            el['date'] = el?.date_added ? format(new Date(el?.date_added * 1000 || ''), 'MMM dd, hh:mm aaa') : '';
          });
        }
      }

      if(results?.success){
        this.snackBar.open(results?.success, "", {
          duration: 4000,
          panelClass:'success-snackbar'
        });
      
        this.adminReferral.dispatch({
          type: ReferralActionTypes.SAVE_REFERRAL_SUCCESS,
          payload: {message: null}
        }); 
      }

      if(results?.successEdit){
        this.snackBar.open(results?.successEdit, "", {
          duration: 4000,
          panelClass:'success-snackbar'
        });
        this.adminReferral.dispatch({
          type: ReferralActionTypes.EDIT_REFERRAL_SUCCESS,
          payload: {message: null}
        }); 

        this.getReferralData();
      }

      if(results?.error){
        this.snackBar.open("Error, please try again later", "", {
          duration: 4000,
          panelClass:'danger-snackbar'
        });
        
        this.adminReferral.dispatch({
          type: ReferralActionTypes.EDIT_REFERRAL_FAIL,
          payload: null
        }); 
      }
    })

  }

  getReferralData(){
    console.log(this.data, this.data?.id)

    this.adminReferral.dispatch({
      type: ReferralActionTypes.GET_REFERRAL,
      payload: {id: this.data?.id}
    });
  }

  formatToObject(format) {
    const obj = {};
    const properties = format.split(';');
    
    properties.forEach(property => {
      const [key, value] = property.split(':');
      if (key && value) {
        obj[key.trim()] = value.trim();
      }
    });
    
    return obj;
  }

  generateStyling(comment){
    const styleRegex = /"([^"]+)"/g;
    const match = styleRegex.exec(comment);

    return match ? this.formatToObject(match[1]) : null;
  }

  public referralCommentUpdate: any = {
    add: [],
    update: [],
    delete: []
  }

  generateTempDate(): string{
    return format(new Date(), 'MMM dd, hh:mm aaa');
  }

  addComment(){
    /*this.comments.unshift({
      name: `${this.loggedUser?.first_name} ${this.loggedUser?.last_name}`,
      profile_image: "/assets/images/faces/face-3.jpg",
      date: format(new Date(), 'MMM dd, hh:mm aaa'), 
      'comment': this.commentForm.controls['comment'].value,
      employee_id: this.loggedUser.id
    });*/

    this.referralCommentUpdate.add.push({
      //name: `${this.loggedUser?.first_name} ${this.loggedUser?.last_name}`,
      //profile_image: "/assets/images/faces/face-3.jpg",
      'comment': this.commentForm.controls['comment'].value,
      //employee_id: this.loggedUser.id
    });

    this.commentForm.reset();


    let data = {
      id: this.data?.id,
      'referral-comment': this.referralCommentUpdate
    }

    delete data['referral_comment'];

    this.adminReferral.dispatch({
      type: ReferralActionTypes.EDIT_REFERRAL_DETAILS,
      payload: data
    });
  }

  deleteComment(item){
    /*let index = this.comments.findIndex(el => el === item);  

    if(index >= 0){
      this.comments.splice(index, 1);  
      this.referralCommentUpdate.delete.push({id: item?.id, referral_id: item?.referral_id});
    }

    setTimeout(() => {
      let data = {
        id: this.data?.id, 
        'referral-comment': this.referralCommentUpdate
      }

      delete data['referral_comment'];

      this.adminReferral.dispatch({
        type: ReferralActionTypes.EDIT_REFERRAL,
        payload: data
      });
    }, 500);*/

    let index = this.comments.findIndex(el => el === item);  
    let indexItem = this.comments[index];
    if(index >= 0){
      this.comments.splice(index, 1);  
      this.adminReferral.dispatch({
        type: ReferralActionTypes.DELETE_REFERRAL_COMMENT,
        payload: { id: indexItem?.id }
      }); 

      
      //this.referralCommentUpdate.delete.push({id: item?.id, referral_id: this.referralData?.id});
    }
  }
  

  onEditorChange(event){
    //console.log(event)
    //this.ckeditorContent = event;
  }
  onChange(event){
    console.log()
  }

  onReady(event){}
  onFocus(event){}
  onBlur(event){}
  onContentDom(event){}
  onPaste(event){}
  onDrop(event){}
  onFileUploadRequest(event){}
  onFileUploadResponse(event){}

}
