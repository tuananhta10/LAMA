import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { mainAnimations } from '@app-main-animation';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MainBranchModalComponent } from '../../modals/main-branch-modal/main-branch-modal.component';
import { AdminEnumsActionTypes } from '@app-admin-store/actions/admin-enums.actions';
import { AdminEnumsState } from '@main/views/admin-panel/store/reducers/admin-enums.reducer';
import { select, Store } from '@ngrx/store';
import { AdminProfileState } from '@main/views/admin-panel/store/index';

import { ClientConstants } from '../../../constants';

@Component({
  selector: 'app-client-detail',
  animations: [mainAnimations],
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.scss']
})
export class ClientDetailComponent implements OnInit, OnDestroy {
  isLinear = false;
  clientDetailForm!: FormGroup;
  required:boolean = true;
  titleOptions:any[] = ["Mr", "Mrs", "Miss", "Dr", "Engr", "Arch"];
  genderOptions:any[] =["Male", "Female", "Trans and gender diverse", "LGBTQ+", "Prefer not to say" ];
  preferredGenderOptions:any[] =["Male", "Female", "No Preference" ];
  fundTypeOptions:any[] = ["Self managed", "Plan managed", "NDIA managed"];
  radioOptions:any[] = [{id: true, name: "Yes", value: true}, {id: false, name:"No", value: false}];
  imgSrc: any;
  languagesEnums: any;

  @Input() navigation: any = {};
  @Input() isUpdate: boolean = false;
  @Input() clientDetailData: any;
  @Output() updateStepper = new EventEmitter<number>();
  @Output() submitData: EventEmitter<any> = new EventEmitter<any>();
  @Output() formStep: EventEmitter<string> = new EventEmitter<string>();
  @Output() isValid: EventEmitter<any> = new EventEmitter<any>();

  private unsubscribe$ = new Subject<void>();
  private req: Subscription;
  languageEnum$: any;
  branchesEnums$: any;
  branchesEnum: any;
  public loading:boolean = true;
  public status: any;  
  public statusOption: string[] = ["Active", "Pending", "Inactive"];

  private toBeUpdated: boolean = false;
  

  constructor(private formBuilder: FormBuilder, 
    public dialog: MatDialog,  
    private adminEnumStore: Store<AdminProfileState>,) {
    this.branchesEnums$ = this.adminEnumStore.pipe(select(state => state.adminEnums));
    this.languageEnum$ = this.adminEnumStore.pipe(select(state => state.adminEnums));
  }

  ngOnInit(): void {
    this.subscribeBranchesEnum();

    let avatar = this.clientDetailData?.profile_pic_url;

    this.clientDetailForm = this.formBuilder.group({
      profile_pic_url: [avatar?.length > 0 ? avatar[avatar?.length - 1]?.download_url : []],
      title: [this.clientDetailData?.title ? this.clientDetailData.title : ''],
      last_name: [this.clientDetailData?.last_name ? this.clientDetailData.last_name : ''],
      first_name: [this.clientDetailData?.first_name ? this.clientDetailData.first_name : '', [Validators.required]],
      preferred_name: [this.clientDetailData?.preferred_name ? this.clientDetailData.preferred_name : ''],
      gender: [this.clientDetailData?.gender ? this.clientDetailData.gender : ''],
      preferred_language_id:[this.clientDetailData?.preferred_language_id ? this.clientDetailData?.preferred_language_id : ''],
      fund_type:[this.clientDetailData?.fund_type ? this.clientDetailData.fund_type : ''],
      registration_no: [this.clientDetailData?.registration_no ? this.clientDetailData.registration_no : ''],
      main_branch_id: [this.clientDetailData?.main_branch_id ? this.clientDetailData.main_branch_id : null],
      pm_require_approval: [this.clientDetailData?.pm_require_approval ? this.clientDetailData.pm_require_approval : ''],
      status: [this.clientDetailData?.status ? this.clientDetailData.status : "Pending"],
      
      plan_manager_full_name: [this.clientDetailData?.plan_manager_full_name ? this.clientDetailData?.plan_manager_full_name : ''],
      plan_manager_key_contact: [this.clientDetailData?.plan_manager_key_contact ? this.clientDetailData?.plan_manager_key_contact : ''],
      plan_manager_work_phone: [this.clientDetailData?.plan_manager_work_phone ? this.clientDetailData?.plan_manager_work_phone : ''],
      plan_manager_email: [this.clientDetailData?.plan_manager_email ? this.clientDetailData?.plan_manager_email : ''],
    });

    this.adminEnumStore.dispatch({
      type: AdminEnumsActionTypes.GET_BRANCHES
    });

    this.adminEnumStore.dispatch({
      type: AdminEnumsActionTypes.GET_LANGUAGES
    });

    this.formStep.emit(ClientConstants.clientDetails);

    if(this.clientDetailData?.profile_pic_url?.length > 0){
      this.imgSrc = avatar[avatar?.length - 1]?.download_url;
    }

    /* VALUE CHANGE */
    this.clientDetailForm.valueChanges.subscribe((change: any) => {
      let currentFormValues = change//JSON.stringify();
      let previousValue = {
        profile_pic_url: this.clientDetailData?.profile_pic_url,
        title: this.clientDetailData?.title,
        last_name: this.clientDetailData?.last_name,
        first_name: this.clientDetailData?.first_name,
        preferred_name: this.clientDetailData?.preferred_name,
        gender: this.clientDetailData?.gender,
        preferred_gender: this.clientDetailData?.preferred_gender,
        fund_type: this.clientDetailData?.fund_type,
        registration_no: this.clientDetailData?.registration_no,
        main_branch_id: this.clientDetailData?.main_branch_id,
        pm_require_approval: this.clientDetailData?.pm_require_approval,
      }

      if(JSON.stringify(currentFormValues) !== JSON.stringify(previousValue)){
        this.toBeUpdated = true;
        //console.log(currentFormValues, previousValue, `THERE'S A CHANGE WITH THE FORMS`)
      }
    });
  }

  onUpload(file: any) {
    this.imgSrc = file.file;
    this.clientDetailForm.get('profile_pic_url').setValue(file);
  }

  subscribeBranchesEnum(){
    let branchesEnum = this.branchesEnums$;
    this.req = branchesEnum.subscribe((results: any) => {
      this.branchesEnum = results.branches;
      //this.loading = results.pending;
    });

    let optionsEnum = this.languageEnum$;
    this.req.add(optionsEnum.subscribe((results: any) => {
      this.languagesEnums = results?.languages;
      this.loading = results.pending;
    }));
  }

  openAddMainBranch(e){
    let main_branch_idDialog = this.dialog.open(
      MainBranchModalComponent,
      {
        panelClass: "dialog-responsive",
        width: '450px',
        height: '320px',
        data: {
        },
      }
    );

    main_branch_idDialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(res => {
      if(res){
        let newBranch ={
          id: Math.random(),
          name: res.main_branch_id
        }

        this.adminEnumStore.dispatch({
          type: AdminEnumsActionTypes.ADD_BRANCH,
          payload: newBranch
        });
      }
  
    });
  }

  submit(){
    if(this.clientDetailForm.valid){
      this.submitData.emit(this.clientDetailForm.value);
    }
  }

  next(){
    if(this.clientDetailForm.valid){
      this.submitData.emit(this.clientDetailForm.value);
      this.updateStepper.emit(this.navigation?.next);
    }
  }

  skip(){
    this.updateStepper.emit(this.navigation?.next);
  }

  back(){
    this.updateStepper.emit(this.navigation?.previous);
  }

  ngOnDestroy(): void {
    //if(this.toBeUpdated) this.submit()
    this.isValid.emit({formStep: 1, isValid: this.clientDetailForm.valid})
    if(!this.isUpdate){
      this.submitData.emit(this.clientDetailForm.value);
    }
    if(this.req) this.req.unsubscribe();
  }
}
