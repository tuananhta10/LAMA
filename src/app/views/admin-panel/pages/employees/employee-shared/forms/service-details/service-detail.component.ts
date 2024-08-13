import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { mainAnimations } from '@app-main-animation';
import { MainBranchModalComponent } from '@main/views/admin-panel/pages/client/client-shared';
import { AdminEnumsActionTypes } from '@main/views/admin-panel/store/actions/admin-enums.actions';
import { AdminProfileState } from '@main/views/admin-panel/store/index';;
import { select, Store } from '@ngrx/store';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EmploymentTypeModalComponent } from '../../modals/employment-type/employment-type-modal.component';
import { PositionModalComponent } from '../../modals/position-modal/position-modal.component';
import { PositionChangeModalComponent } from '../../modals/position-change-modal/position-change-modal.component';
import { PricelistModalComponent } from '../../modals/pricelist-modal/pricelist-modal.component'
import { PriceListActionTypes  } from '@main/views/admin-panel/store/actions/admin-price-list.action';
import { EmployeeConstants } from '../../../constants';
import { EmployeePositionActionTypes } from '@main/views/admin-panel/store/actions/admin-employee-position.action';
import { EmployeePayRateActionTypes } from '@main/views/admin-panel/store/actions/admin-employee-pay-rate.action';
import { EmployeeListState  } from '@app-admin-store/reducers/admin-employees.reducer';
import { EmployeeListActionTypes } from '@main/views/admin-panel/store/actions/admin-employees.actions';
import { EmployeePayRateLoadingActionTypes } from '@main/views/admin-panel/store/actions/admin-employee-pay-rate-loading.action';
import { DeleteRecordComponent } from '@main/views/admin-panel/pages/administration/dialogs/delete-record/delete-record.component';
import { Location } from '@angular/common';
import { ComplianceCheckComponent } from '../../../employee-details/dialogs/compliance-check/compliance-check.component';
import { parseArrayObject } from '@main/shared/utils/parse.util';
import { convertTimestampUtc } from '@main/shared/utils/date-convert.util';
import { EmployeeActionTypes } from '@main/views/admin-panel/store/actions/admin-employee.action';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-employee-service-detail',
  animations: [mainAnimations],
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.scss']
})
export class ServiceDetailComponent implements OnInit, OnDestroy {
  isLinear = false;
  serviceDetailForm!: FormGroup;

  @Input() navigation: any = {};
  @Input() serviceDetailData: any;
  @Output() updateStepper: EventEmitter<any> = new EventEmitter<any>();
  @Output() submitData: EventEmitter<any> = new EventEmitter<any>();
  @Output() formStep: EventEmitter<string> = new EventEmitter<string>();
  @Input() isUpdate: boolean = false;
  @Output() isValid: EventEmitter<any> = new EventEmitter<any>();

  public mainBranchEnum:any;
  public positionEnum:any;
  public managerEnum:any;
  public employmentTypeEnum:any;
  public employeePayRateEnum:any;
  public suppportItemsEnum:any;
  public payrateLoadingEnum: any;
  public employementTypeOption: string[] = ["Casual", "Part-Time", "Contractor", "Full-Time"];
  public radioOptions:any[] = [{id: true, name: "Yes", value: true}, {id: false, name:"No", value: false}];
  public jobTypeEnum:any = ["Support Service", "Support Coordination", "Domestic", "Maintenance", "Operations"];
  private unsubscribe$ = new Subject<void>();
  private employeePayRateLoading$: any;
  private req: Subscription;
  private employeeReq: Subscription;
  private positionReq: Subscription;
  private employeePayRateReq: Subscription;
  private pricelistReq: Subscription;
  private payrateLoadingReq: Subscription;
  private qualifcationReq: Subscription;

  public toBeUpdated: boolean = false;
  public employeePayRateSelected: any[] = [];
  public employeePayrateColumn:any[] =  [
    { field: 'classification', name: 'Classification', sub_title: 'Payrate Classification' },
    { field: 'category', name: 'Category', sub_title: 'Payrate Category' },
    //{ field: 'employment_type', name: 'Employment Type', sub_title: 'Employment Type'},
    { field: 'hourly_pay_rate', name: 'Hourly Rate', type: 'currency', editable: false, sub_title: 'Hourly Pay Rate' },
    { field: 'afternoon_rate', name: 'Weekday Afternoon', type: 'currency', editable: false, sub_title: 'Afternoon Shift Rate' },
    { field: 'evening_rate', name: 'Weekday Evening', type: 'currency', editable: false, sub_title: 'Evening Shift Rate' },
    { field: 'night_rate', name: 'Weekday Night', type: 'currency', editable: false, sub_title: 'Night Shift Rate' },
    { field: 'saturday_rate', name: 'Saturday Rate', type: 'currency', editable: false, sub_title: 'Saturday Pay Rate' },
    { field: 'sunday_rate', name: 'Sunday Rate', type: 'currency', editable: false, sub_title: 'Sunday Pay Rate' },
    { field: 'public_holiday_rate', name: 'Public holiday Rate', type: 'currency', editable: false, sub_title: 'Public holiday Pay Rate' },
  ]; 
  public employeeComplianceData: any[] = [];  
  public employeeComplianceColumn: any[] = [
    { field: 'qualification_name', name: 'Qualification' },
    { field: 'expiry_date', name: 'Expiration Date' },
    { field: 'type', name: 'Type' },
    { field: 'mandatory', name: 'Mandatory' },
    { field: 'status', name: 'Status' },
  ];
  public employeeTrainingComplianceData: any[] = [];  
  public employeeTrainingComplianceColumn: any[] = [
    { field: 'qualification_name', name: 'Qualification' },
    { field: 'expiry_date', name: 'Expiration Date' },
    { field: 'type', name: 'Type' },
    { field: 'mandatory', name: 'Mandatory' },
    { field: 'status', name: 'Status' },
  ];
  public paymentClassification: any[] = [];
  public employeePayrateDataFromAPI: any[] = [];
  public employeePayrateData: any[] = [];
  public payrateItems: any ={
    add: [],
    update: [],
    delete: []
  }
  public linkSupport: boolean = false;
  public client_funding_price_list;
  private enum$: any;
  public branchLoading:boolean = true;
  public employeePayRateLoading:boolean = true;
  public employeeLoading:boolean = true;
  public positionLoading:boolean = true;
  public isSuperAdmin:boolean = false

  constructor(private formBuilder: FormBuilder, 
    private adminEnumStore: Store<AdminProfileState>, 
    private location: Location,
    private employeeStore: Store<AdminProfileState>,
    public snackBar: MatSnackBar,
    public dialog: MatDialog) {
    this.enum$ = this.adminEnumStore.pipe(select(state => state));
  }

  ngOnInit(): void {
    // initialize database enum
    this.initializeDispatch();
    this.subscribeEnum();
    this.getUserRole()
    let date_started = this.isUpdate ? this.serviceDetailData?.date_started * 1000 : this.serviceDetailData.date_started;
    let date_left = this.isUpdate ? this.serviceDetailData?.date_left * 1000 : this.serviceDetailData.date_left;
    let last_roster_date = this.isUpdate ? this.serviceDetailData?.last_roster_date * 1000 : this.serviceDetailData.last_roster_date;

    console.log("Service Details", this.serviceDetailData)


    // initialize form
    this.serviceDetailForm = this.formBuilder.group({
      main_branch_id: [this.serviceDetailData ? this.serviceDetailData?.main_branch_id : '', [Validators.required]],
      date_started: [this.serviceDetailData?.date_started ? new Date(date_started) : null],
      date_left: [this.serviceDetailData?.date_left ? new Date(date_left) : null],
      last_roster_date: [this.serviceDetailData?.last_roster_date ? new Date(last_roster_date) : null],
      job_type: [this.serviceDetailData ? this.serviceDetailData?.job_type : ''],
      position_id: [this.serviceDetailData ? this.serviceDetailData?.position_id : ''],
      //'employee-qualification': [''],
      manager:[this.serviceDetailData ? this.serviceDetailData?.manager : ''],
      on_hold:[this.serviceDetailData ? this.serviceDetailData?.on_hold : ''],
      volunteer: [this.serviceDetailData ? this.serviceDetailData?.volunteer : ''],
      member: [this.serviceDetailData ? this.serviceDetailData?.member : ''],
      risk_assessed_roles: [this.serviceDetailData ? (this.serviceDetailData?.employee_position_risk_assessed_roles == '1' ? true : false) : false],
      employment: [this.serviceDetailData ? this.serviceDetailData?.employment : ''],
      employment_type: [this.serviceDetailData ? this.serviceDetailData?.employment_type : '', [Validators.required]],
      hourly_rate: [this.serviceDetailData ? this.serviceDetailData?.hourly_rate : ''],
      employee_payrate: [""],
      classification: [""],
      pay_travel_time: [false],
      pay_travel_mileage: [false],

      paid_annually: [this.serviceDetailData?.paid_annually ? this.serviceDetailData?.paid_annually : false],
      annual_rate: [this.serviceDetailData?.annual_rate ? this.serviceDetailData?.annual_rate : 0],
    });

    // auto save event trigger
    this.formStep.emit(EmployeeConstants.serviceDetails);
    this.setSelectedPayrate();
    
    setTimeout(() => {
      this.subscribeAutoSave();
    }, 3500);
  }

  subscribeAutoSave(){
    /* VALUE CHANGE */
    this.serviceDetailForm.valueChanges.subscribe((change: any) => {
      if(!this.branchLoading && !this.employeePayRateLoading 
      && !this.employeeLoading && !this.positionLoading){
        let currentFormValues = change//JSON.stringify();

        if(!sessionStorage.getItem('employee_payrate')){
          sessionStorage.setItem('employee_payrate', currentFormValues?.employee_payrate );
          sessionStorage.setItem('classification', currentFormValues?.employee_payrate );
        } 

        else {
          this.linkSupport = true;
        }

        let date_started = this.isUpdate ? this.serviceDetailData?.date_started * 1000 : this.serviceDetailData.date_started;
        let date_left = this.isUpdate ? this.serviceDetailData?.date_left * 1000 : this.serviceDetailData.date_left;
        let last_roster_date = this.isUpdate ? this.serviceDetailData?.last_roster_date * 1000 : this.serviceDetailData.last_roster_date;

        let previousValue = {
          main_branch_id: this.serviceDetailData ? this.serviceDetailData?.main_branch_id : '', 
          date_started: this.serviceDetailData?.date_started ? date_started : null,
          date_left: this.serviceDetailData?.date_left ? date_left : null,
          last_roster_date: this.serviceDetailData?.last_roster_date ? last_roster_date : null,
          job_type: this.serviceDetailData ? this.serviceDetailData?.job_type : '',
          position_id: this.serviceDetailData ? this.serviceDetailData?.position_id : '',
          //'employee-qualification': '',
          manager:this.serviceDetailData ? this.serviceDetailData?.manager : '',
          on_hold:this.serviceDetailData ? this.serviceDetailData?.on_hold : '',
          volunteer: this.serviceDetailData ? this.serviceDetailData?.volunteer : '',
          member: this.serviceDetailData ? this.serviceDetailData?.member : '',
          risk_assessed_roles: this.serviceDetailData ? (this.serviceDetailData?.employee_position_risk_assessed_roles == '1' ? true : false) : '',
          employment: this.serviceDetailData ? (this.serviceDetailData?.employment || null) : '',
          employment_type: this.serviceDetailData ? this.serviceDetailData?.employment_type : '', 
          hourly_rate: this.serviceDetailData ? this.serviceDetailData?.hourly_rate : '',
          employee_payrate: !sessionStorage.getItem('employee_payrate') ? currentFormValues?.employee_payrate : "",
          classification: !sessionStorage.getItem('employee_payrate') ? currentFormValues?.classification : "",
          pay_travel_time: false,
          pay_travel_mileage: false,

          paid_annually: this.serviceDetailData ? this.serviceDetailData?.paid_annually: false,
          annual_rate: this.serviceDetailData ? this.serviceDetailData?.annual_rate: 0,
        }

        if(JSON.stringify(currentFormValues) !== JSON.stringify(previousValue)){
          this.toBeUpdated = true;
          console.log(currentFormValues, `CURRENT, THERE'S A CHANGE WITH THE FORMS`)
          console.log(previousValue, `PREVIOUS, THERE'S A CHANGE WITH THE FORMS`)
        }
      }
    });


    // check risk assessed roles
    this.serviceDetailForm.controls['position_id'].valueChanges
    .subscribe((value: any) => {
      if(value){
        let risk_assess_role = this.positionEnum.find(el => el?.id === value);
        let role_value = risk_assess_role?.risk_assessed_roles == '1' ? true : false

        this.serviceDetailForm.controls['risk_assessed_roles'].setValue(role_value);

        if(this.serviceDetailData?.id && this.serviceDetailForm.controls['position_id'].value 
          && this.serviceDetailForm.controls['position_id'].value !== this.serviceDetailData?.position_id){
          this.confirmPositionChange(risk_assess_role);
        }
      }
    });
  }

  confirmPositionChange(event){
    let openDialog = this.dialog.open(
      PositionChangeModalComponent,
      {
        minWidth: '30vw',
        data: event,
      }
    );

    openDialog
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {
        if (!result.cancel) {
          this.submit();
        }
      });
  }

  public firstLoad: boolean = true;

  setSelectedPayrate(){
    if(this.serviceDetailData?.employee_pay_rate){
      this.employeePayrateData = this.serviceDetailData?.employee_pay_rate;
    }

    this.serviceDetailForm.controls['employment_type'].valueChanges
    .subscribe((value) => {
      if(value){
        if(this.serviceDetailData?.employment_type !== value){
          this.serviceDetailForm.controls['paid_annually'].setValue(false);
          this.serviceDetailForm.controls['annual_rate'].setValue(0);
        }

        this.employeePayRateSelected = this.removeDuplicate([...this.employeePayRateEnum]).filter(el => !!el.award_code);

        // initial load only
        if(this.firstLoad && this.serviceDetailData?.employee_pay_rate?.length > 0){
          let category = this.serviceDetailData?.employee_pay_rate[0]?.category;
          let selectedCategory = this.employeePayRateSelected.find(el => el?.category === category);
          this.serviceDetailForm.controls['employee_payrate'].setValue(selectedCategory?.id);
          this.updateClassification(category);
        }
      }
    });

    this.serviceDetailForm.controls['employee_payrate'].valueChanges
    .subscribe((value) => {
      if(value){
        this.updateClassification(value);
      }
    });

    this.serviceDetailForm.controls['classification'].valueChanges
    .subscribe((value) => {
      if(value){
        this.toBeUpdated = false;
      }
    });
  }

  // update classifciation
  updateClassification(value: any){
    if(value){
      let category = this.serviceDetailData?.employee_pay_rate?.length > 0 ? this.serviceDetailData?.employee_pay_rate[0]?.category : null;
      let valueCategory = value?.category ? value?.category : category;
      let filteredPayrate = [...this.employeePayRateEnum].filter(el => el?.category === valueCategory);

      this.paymentClassification = [...filteredPayrate].map(el => {
        return {
          ...el,  
          name: el?.classification
        }
      }).sort((a,b) => {
        if(a.classification < b.classification) { return -1; }
          if(a.classification > b.classification) { return 1; }
          return 0;
      });

      if(this.firstLoad){
        let classification = this.serviceDetailData?.employee_pay_rate[0]?.classification;
        let selectedClassification = this.paymentClassification.find(el => el?.classification === classification);
        this.serviceDetailForm.controls['classification'].setValue(selectedClassification?.id);
        this.firstLoad = false;
      }

      this.toBeUpdated = false;
    }
  }

  initializeDispatch(): void {
    this.adminEnumStore.dispatch({
      type: AdminEnumsActionTypes.GET_BRANCHES
    });

    this.adminEnumStore.dispatch({
      type: EmployeePositionActionTypes.GET_EMPLOYEE_POSITION_LIST
    });

    if(this.isUpdate){
      this.adminEnumStore.dispatch({
        type: EmployeePayRateActionTypes.GET_EMPLOYEE_PAY_RATE_LIST
      });

      this.adminEnumStore.dispatch({
        type: EmployeePayRateLoadingActionTypes.GET_EMPLOYEE_PAY_RATE_LOADING_LIST
      });
    }

    this.adminEnumStore.dispatch({
      type: EmployeeListActionTypes.GET_EMPLOYEE_LIST
    });
  }

  setQualifications(sourceObj){
    let complianceData = sourceObj;

    if(complianceData?.length > 0){
      complianceData?.forEach((el: any) => {
        el['qualification_name'] = parseArrayObject(el['qualification'], 'qualification');
        el['expiry_date'] = el['expiry_date'] || '-';
        el['mandatory'] = parseArrayObject(el['qualification'], 'mandatory') ? 'Yes' : 'No';
        
        el['type'] = parseArrayObject(el['qualification'], 'type') ? parseArrayObject(el['qualification'], 'type') : 'Other';
        el['description'] = parseArrayObject(el['qualification'], 'description') ? parseArrayObject(el['qualification'], 'description') : 'Other';
        el['status'] = el.status ? el.status : 'Pending';
      });

      return complianceData = [...complianceData].sort((a,b) => a?.qualification_name?.localeCompare(b?.qualification_name));
    }
  }

  subscribeEnum(): void {
    // get compliance data
    this.employeeComplianceData = this.setQualifications(this.serviceDetailData?.employee_qualification)
    this.employeeTrainingComplianceData = this.setQualifications(this.serviceDetailData?.employee_training)

    // branch list
    this.req = this.enum$.subscribe((results: any) => {
      this.mainBranchEnum = results?.adminEnums.branches;
      this.branchLoading = results?.adminEnums.pending;
    });

    // employee list for manager
    this.employeeReq  = this.enum$.subscribe((results: any) => {
      this.managerEnum =  results?.employees.employeeList;
      this.employeeLoading = results?.employees.employeeListPending;
    });

    // employee position
    this.positionReq  = this.enum$.subscribe((results: any) => {
      results?.employeePosition.employeePositionList?.forEach(el => {
        el.name = el.display_name;
      })

      this.positionEnum = results?.employeePosition.employeePositionList;
      this.positionLoading = results.employeePosition.pending;
    });

    // payrate categories
    this.employeePayRateReq  = this.enum$.subscribe((results: any) => {
      this.employeePayRateLoading = results.employeePayRate.pending;

      if(results.employeePayRate.employeePayRateList){
        results.employeePayRate.employeePayRateList?.forEach(element => {
          element.name = `${element?.category}`;
        });

        this.employeePayRateEnum = [...results.employeePayRate.employeePayRateList];
      }
    });  

    // payrate loading
    this.payrateLoadingReq = this.enum$.subscribe((results: any) => {
      if(results?.employeePayRateLoading?.employeePayRateLoadingList?.length > 0){
        this.payrateLoadingEnum = [...results?.employeePayRateLoading?.employeePayRateLoadingList];
      }
    });
  }

  // remove duplicate array
  removeDuplicate(arr): any[] {
    return arr.reduce((a,b) => {
      const indexOfProperty = (a, b) => {
        for (var i=0;i<a.length;i++){
          if(a[i]?.name?.trim() == b?.name?.trim()){
            return i;
          }
        }
       return -1;
      }

      if (indexOfProperty(a,b) < 0 ) a.push(b);
        return a;
    },[]);
  }

  calculateLoadingRate(field, base_rate){
    // search for employment type
    let employment_type = this.serviceDetailForm.controls['employment_type'].value;  

    // search loading rate per category (i.e. Home care, Crisis, Social, etc)
    let loadingRates = this.payrateLoadingEnum.filter( el => el?.employment_type.match(employment_type))
    
    // If Casual loading - Automatic add 25% to all Full Time/Part Time Loading Rates
    if(employment_type === 'Casual' && loadingRates?.length === 0){
      loadingRates = [...this.payrateLoadingEnum].filter( el => el?.employment_type.match("Full-Time")).map(el => {
        return {
          ...el,
          loading_rate: (el['loading_rate'] * 1) + 25,
        }
      });
    }

    let rate = loadingRates.find(el => el.applicable_day.toLowerCase().match(field));
    let newRate = base_rate * (rate?.loading_rate / 100);

    return Math.round(newRate * 100) / 100;
  }

  getBaseRateCasual(base_rate){
    let newRate = base_rate * (125 / 100);

    return Math.round(newRate * 100) / 100; 
  }

  addEmployeePayrate(){
    let classification: any = this.serviceDetailForm.get('classification').value;  
    // search for employment type
    let employment_type = this.serviceDetailForm.controls['employment_type'].value;  
    let classification_id = classification?.id
    
    if(!classification?.id){
      classification = this.paymentClassification.find(el => el?.id === classification);
    }

    this.getBaseRateCasual(classification?.hourly_pay_rate);

    let data = {
      ...classification, 
      temp_id: classification?.id, 
      pay_rate_id: classification?.id,
      classification_id: classification?.id,
      hourly_pay_rate: employment_type === 'Casual' ? this.getBaseRateCasual(classification?.hourly_pay_rate) : classification?.hourly_pay_rate,
      afternoon_rate: this.calculateLoadingRate('afternoon', classification?.hourly_pay_rate),  
      evening_rate: this.calculateLoadingRate('evening', classification?.hourly_pay_rate),  
      night_rate: this.calculateLoadingRate('night', classification?.hourly_pay_rate),    
      saturday_rate: this.calculateLoadingRate('saturday', classification?.hourly_pay_rate),  
      sunday_rate: this.calculateLoadingRate('sunday', classification?.hourly_pay_rate),    
      public_holiday_rate: this.calculateLoadingRate('public holiday', classification?.hourly_pay_rate),  
    };

    // remove all data
    if(this.payrateItems?.delete?.length === 0 && this.employeePayrateData[0])
      this.payrateItems.delete = [{ id: this.employeePayrateData[0]?.id}];

    this.employeePayrateData = [];  
    this.payrateItems.add = []; 

    // initialize the data
    this.employeePayrateData = [data];
    this.payrateItems.add = [data];

    setTimeout(() => this.submit(), 500);
  }

  updateEmployeePayrate(event){
    this.payrateItems.update = [...event];
  }

  deleteEmployeePayrate(event){
    let deleteDialog = this.dialog.open(
      DeleteRecordComponent,
      {
        minWidth: '30vw',
        data: event,
      }
    );

    deleteDialog
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {
        if (!result.cancel) {
          let employee_payrate = {...this.employeePayrateData[event]};

          this.employeePayrateData.splice(event, 1);
          this.employeePayRateSelected = [...this.employeePayRateEnum].filter(el => !this.employeePayrateData.find(_el => _el.id === el.id));
          
          if(employee_payrate?.id){
            this.payrateItems.delete.push({ id: employee_payrate?.id, });
          }

          // temp id
          else {
            this.payrateItems.delete.push({ temp_id: employee_payrate?.temp_id, });
          }
        }
      });
  }


  public qualification_data: any ={
    add: [],
    update: [],
    delete: []
  }

  // edit qualification
  editQualification(event: any, type: any){
    const dialogRef = this.dialog.open(ComplianceCheckComponent, {
      panelClass: "dialog-responsive",
      width: '500px',
      data: {
        employeeData: this.serviceDetailData,
        item: event,
        fromEditDetail: true,
        type: type
      },
      autoFocus: false 
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.employeeStore.dispatch({
          type: EmployeeActionTypes.EDIT_EMPLOYEE_DETAILS_QUALIFICATION,
          payload: result,
          employee_id: this.serviceDetailData?.id 
        });

        this.snackBar.open("Update in Progress. Please Wait...", "", {
          duration: 4000,
          panelClass:'success-snackbar'
        });

        this.employeeLoading = true

        setTimeout(() => {
          /*sessionStorage.setItem('employeeFormStep', `4`);
          window.location.reload();
          this.snackBar.open("Successfully Updated Employee", "", {
            duration: 4000,
            panelClass:'success-snackbar'
          });*/

          let employeeType = {
            type: 'employee-service',
            id: this.serviceDetailData.id,
            key: "serviceDetail"
          }

          this.employeeStore.dispatch({
            type: EmployeeActionTypes.GET_EMPLOYEE,
            payload: employeeType
          });
        }, 2500);
      }
    });
  }

  back(){
    if(sessionStorage.getItem('employeeFormStep')){
      this.location.back();
    }

    else this.updateStepper.emit(this.navigation?.previous);
  }

  public submitting: boolean = false;

  submit(){
    // generate request body
    let data = {
      ...this.serviceDetailForm.value,
      "employee-pay-rate": {
        ...this.payrateItems
      },  

      "employee-qualification": {
        ...this.qualification_data
      }
    }

    delete data['employee_payrate'];

    // qualification
    if(this.qualification_data?.update?.length === 0) 
      delete data["employee-qualification"];

    if(this.serviceDetailForm.valid){
      this.submitting = true;
      this.submitData.emit(data);
    }
  }

  skip(){
    this.updateStepper.emit(this.navigation?.next);
  }

  next(){
    if(this.serviceDetailForm.valid){
      // generate request body
      let data = {
        ...this.serviceDetailForm.value,
        "employee-pay-rate": {
          ...this.payrateItems
        }
      }

      this.submitData.emit(data);
      this.updateStepper.emit(this.navigation?.next);
    }
  }

  @Output() saveEmployeeAsDraft: EventEmitter<any> = new EventEmitter<any>();
  @Input() currentStatus: string = '';

  saveAsDraft(){
    // generate request body
    let data = {
      ...this.serviceDetailForm.value,
      "employee-pay-rate": {
        ...this.payrateItems
      }
    }

    delete data['employee_payrate'];

    this.submitData.emit(data);
    this.saveEmployeeAsDraft.emit(true);
  }

  ngOnDestroy(): void {
    // AUTO SAVE
    if(this.toBeUpdated && !this.submitting) {
      this.submitData.emit(this.serviceDetailForm.value);

      console.log(this.serviceDetailData.form)
    }

    this.isValid.emit({formStep: this.isUpdate ? 4 : 3, isValid: this.serviceDetailForm.valid})
    if(!this.isUpdate){
      // generate request body
      let data = {
        ...this.serviceDetailForm.value,
        "employee-pay-rate": {
          ...this.payrateItems
        }
      }

      delete data['employee_payrate'];

      this.submitData.emit(data);
    }

    // unsubscribe
    if(this.req) this.req.unsubscribe();
    if(this.employeeReq) this.employeeReq.unsubscribe();
    if(this.positionReq) this.positionReq.unsubscribe();
    if(this.employeePayRateReq) this.employeePayRateReq.unsubscribe();
    if(this.pricelistReq) this.pricelistReq.unsubscribe();

    // force remove
    sessionStorage.removeItem('employeeFormStep')
  }

  openLinkEmployeePayrate(event){
    this.linkSupport = true;
  }

  getUserRole(){
    try {
      const userData = JSON.parse(localStorage.getItem('loggedUserData'))
      this.isSuperAdmin = userData.hasOwnProperty('role_title') && userData?.role_title === 'Lama Admin' ? true : false
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
  }
}
