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
import { Location } from '@angular/common';
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
  titleOptions:any[] = ["Mr", "Mrs", "Ms", "Miss", "Dr", "Mx", "N/A"];
  genderOptions:any[] =["Male", "Female", "Transgender and gender diverse", "Prefer not to say" ];
  preferredGenderOptions:any[] =["Male", "Female", "No Preference" ];
  fundTypeOptions:any[] = ["Self managed", "Plan managed", "NDIA managed"];
  radioOptions:any[] = [{id: true, name: "Yes", value: true}, {id: false, name:"No", value: false}];
  imgSrc: any;
  languagesEnums: any;

  @Input() navigation: any = {};
  @Input() isUpdate: boolean = false;
  @Input() clientDetailData: any;
  @Input() currentStatus: string = '';
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
  public statusOption: string[] = ["active", "draft", "inactive"];
  private toBeUpdated: boolean = false;
  
  constructor(private formBuilder: FormBuilder, 
    public dialog: MatDialog,  
    private location: Location,
    private adminEnumStore: Store<AdminProfileState>,) {
    this.branchesEnums$ = this.adminEnumStore.pipe(select(state => state.adminEnums));
    this.languageEnum$ = this.adminEnumStore.pipe(select(state => state.adminEnums));
  }

  ngOnInit(): void {
    this.subscribeBranchesEnum();

    // only show draft if status is draft
    if(this.currentStatus !== 'draft') 
      this.statusOption = this.statusOption.filter(el => el !== 'draft');

    
    console.log(this.clientDetailData)

    this.clientDetailForm = this.formBuilder.group({
      profile_pic: [this.clientDetailData?.profile_pic_url ? this.clientDetailData?.profile_pic_url : null],
      title: [this.clientDetailData?.title ? this.clientDetailData.title : undefined],
      last_name: [this.clientDetailData?.last_name ? this.clientDetailData.last_name : undefined],
      first_name: [this.clientDetailData?.first_name ? this.clientDetailData.first_name : undefined, [Validators.required]],
      preferred_name: [this.clientDetailData?.preferred_name ? this.clientDetailData.preferred_name : undefined],
      gender: [this.clientDetailData?.gender ? this.clientDetailData.gender : undefined],
      preferred_language_id:[this.clientDetailData?.preferred_language_id ? this.clientDetailData?.preferred_language_id : undefined],
      //fund_type:[this.clientDetailData?.fund_type ? this.clientDetailData.fund_type : undefined],
      registration_no: [this.clientDetailData?.registration_no ? this.clientDetailData.registration_no : undefined],
      main_branch_id: [this.clientDetailData?.main_branch_id ? this.clientDetailData.main_branch_id : null],
      pm_require_approval: [this.clientDetailData?.pm_require_approval ? this.clientDetailData.pm_require_approval : undefined],
      status: [this.clientDetailData?.status ? this.clientDetailData.status?.toLowerCase() : "Active"],

      last_date: [this.clientDetailData?.status === 'inactive' ? new Date(this.clientDetailData?.last_date * 1000) : ''],  
      reason_for_leaving: [this.clientDetailData?.status === 'inactive' ? this.clientDetailData?.reason_for_leaving : '']
    });

    // AUTO SAVE
    this.subscribeAutoSave();

    this.adminEnumStore.dispatch({
      type: AdminEnumsActionTypes.GET_BRANCHES
    });

    this.adminEnumStore.dispatch({
      type: AdminEnumsActionTypes.GET_LANGUAGES
    });

    this.formStep.emit(ClientConstants.clientDetails);

  }

  subscribeAutoSave(){
    this.imgSrc = this.clientDetailData?.profile_pic_download_url || this.clientDetailData?.profile_pic?.file;

    /* VALUE CHANGE */
    this.clientDetailForm.valueChanges.subscribe((change: any) => {
      let currentFormValues = change//JSON.stringify();
      let previousValue = {
        profile_pic: this.clientDetailData?.profile_pic_url || null,
        title: this.clientDetailData?.title || null,
        last_name: this.clientDetailData?.last_name || null,
        first_name: this.clientDetailData?.first_name || null,
        preferred_name: this.clientDetailData?.preferred_name || null,
        gender: this.clientDetailData?.gender || null,
        preferred_language_id: this.clientDetailData?.preferred_language_id || null,
        registration_no: this.clientDetailData?.registration_no || null,
        main_branch_id: this.clientDetailData?.main_branch_id || null,
        pm_require_approval: this.clientDetailData?.pm_require_approval || null,
        status: this.clientDetailData?.status?.toLowerCase() || null,

        last_date: this.clientDetailData?.status === 'inactive' ? new Date(this.clientDetailData?.last_date * 1000) : '',  
        reason_for_leaving: this.clientDetailData?.status === 'inactive' ? this.clientDetailData?.reason_for_leaving : ''
    }

      if(JSON.stringify(currentFormValues) !== JSON.stringify(previousValue)){
        this.toBeUpdated = true;
        console.log(currentFormValues, previousValue, `THERE'S A CHANGE WITH THE FORMS`)
      }
    });
  }

  onUpload(file: any) {
    this.imgSrc = file.file;
    this.clientDetailForm.get('profile_pic').setValue(file);
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
      setTimeout(() => this.loading = results.pending, 1500)
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

  public submitting: boolean = false;

  submit(){
    if(this.clientDetailForm.valid){
      this.submitting = true;
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

  public storageStep: any = sessionStorage.getItem('clientFormStep');
  back(){
    if(sessionStorage.getItem('clientFormStep')){
      this.location.back();
    }

    else this.updateStepper.emit(this.navigation?.previous);
  }

  @Output() saveClientAsDraft: EventEmitter<any> = new EventEmitter<any>();

  saveAsDraft(){
    this.submitData.emit(this.clientDetailForm.value);
    this.saveClientAsDraft.emit(true);
  }

  ngOnDestroy(): void {
    // AUTO SAVE
    if(this.toBeUpdated && !this.submitting) {
      this.submitData.emit(this.clientDetailForm.value);
    }
    
    this.isValid.emit({formStep: 1, isValid: this.clientDetailForm.valid})
    
    if(!this.isUpdate){
      this.submitData.emit(this.clientDetailForm.value);
    }
    if(this.req) this.req.unsubscribe();
  }
}
