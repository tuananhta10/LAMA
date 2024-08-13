import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { mainAnimations } from '@app-main-animation';
import { Subject, Subscription } from 'rxjs';
import { format } from 'date-fns';
import { 
  select, 
  Store 
} from '@ngrx/store';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { ReferralActionTypes } from '@main/views/admin-panel/store/actions/admin-referral.action';

@Component({
  selector: 'app-additional-reports',
  animations: [mainAnimations],
  templateUrl: './additional-reports.component.html',
  styleUrls: ['./additional-reports.component.scss']
})
export class AdditionalReportsComponent implements OnInit {
  @Input() stepper: number = 1;
  @Input() additionalReportsForm!: FormGroup;
  @Input() isUpdate: boolean = false;
  @Input() referralData: any;
  @Output() updateStepper = new EventEmitter<number>();
  @Output() submitData: EventEmitter<any> = new EventEmitter<any>();
  @Output() formStep: EventEmitter<string> = new EventEmitter<string>();
  @Output() isValid: EventEmitter<any> = new EventEmitter<any>();

  private unsubscribe$ = new Subject<void>();
  private req: Subscription;
  public loading:boolean = false;
  public radioOptions:any[] = [{id: true, name: "Yes", value: true}, {id: false, name:"No", value: false}];
  public healthSummaryFile: any;  
  public specialistFile: any;  
  public ndisPlan: any;
  public comments: any[] = [];
  public referralCommentUpdate: any = {
    add: [],
    update: [],
    delete: []
  }

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
  public loggedUser: any = JSON.parse(localStorage.getItem('loggedUserData'));

  constructor(private formBuilder: FormBuilder,
    private adminReferral: Store<AdminProfileState>,) {
  }



  ngOnInit(): void {
    if(this.additionalReportsForm.value['health_summary_file'])
      this.healthSummaryFile = this.additionalReportsForm.value['health_summary_file'][0];

    if(this.additionalReportsForm.value['specialist_reports_file'])
      this.specialistFile  = this.additionalReportsForm.value['specialist_reports_file'][0];
    
    if(this.additionalReportsForm.value['ndis_plan_file'])
      this.ndisPlan  = this.additionalReportsForm.value['ndis_plan_file'][0];

    this.commentForm = this.formBuilder.group({
      comments: ['Type your comment here.', [Validators.required]],
    });

    // map comments
    if(this.isUpdate && this.referralData['referral_comment']){
      let comments = this.referralData['referral_comment'].sort((a,b) => {
        let date_a: any = new Date(a?.date_added * 1000);
        let date_b: any = new Date(b?.date_added * 1000);

        return date_b - date_a;
      });

      comments?.forEach((el: any) => {
        el['date'] = format(new Date(el?.date_added * 1000), 'MMM dd, hh:mm aaa');
      });
      this.comments = this.referralData['referral_comment'];
    }
  }

  ngOnDestroy(): void {
    //if(this.toBeUpdated) this.submit()
    this.isValid.emit({formStep: 4, isValid: this.additionalReportsForm.valid})
    if(!this.isUpdate){
      this.submitData.emit(this.additionalReportsForm.value);
    }
    if(this.req) this.req.unsubscribe();
  }

  onUpload(file: any, control: string) {
    let controlVal = [file]

    this.additionalReportsForm.get(control).setValue(file);
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

  // generate comment
  generateStyling(comment){
    const styleRegex = /"([^"]+)"/g;
    const match = styleRegex.exec(comment);

    return match ? this.formatToObject(match[1]) : null;
  }

  addComment(){
    this.comments.unshift({
      name: `${this.loggedUser?.first_name} ${this.loggedUser?.last_name}`,
      profile_image: "/assets/images/faces/face-3.jpg",
      date: format(new Date(), 'MMM dd, hh:mm aaa'), 
      'comment': this.commentForm.controls['comments'].value,
      employee_id: this.loggedUser.id
    });

    this.referralCommentUpdate.add.push({
      name: `${this.loggedUser?.first_name} ${this.loggedUser?.last_name}`,
      profile_image: "/assets/images/faces/face-3.jpg",
      'comment': this.commentForm.controls['comments'].value,
      //employee_id: this.loggedUser.id
    });

    console.log(this.referralCommentUpdate)

    // generate referral comment
    this.additionalReportsForm.controls['referral-comment'].setValue(this.referralCommentUpdate)
    this.submitData.emit(this.additionalReportsForm.value);
  }

  deleteComment(item){
    if(!this.isUpdate){
      let index = this.comments.findIndex(el => el === item);  

      if(index >= 0){
        this.comments.splice(index, 1);  
        this.additionalReportsForm.controls['referral-comment'].setValue({add: [...this.comments]});
      }
    }

    else {
      let index = this.comments.findIndex(el => el === item);  
      let indexItem = this.comments[index];
      if(index >= 0){
        this.adminReferral.dispatch({
          type: ReferralActionTypes.DELETE_REFERRAL_COMMENT,
          payload: { id: indexItem?.id }
        }); 

        this.comments.splice(index, 1);  
        this.referralCommentUpdate.delete.push({id: item?.id, referral_id: this.referralData?.id});
      }
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
