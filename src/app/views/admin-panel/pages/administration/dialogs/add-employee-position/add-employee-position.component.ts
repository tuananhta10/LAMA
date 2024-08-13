import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeePositionActionTypes } from '@main/views/admin-panel/store/actions/admin-employee-position.action';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { select, Store } from '@ngrx/store';
import { mainAnimations } from '@app-main-animation';
import { QualificationActionTypes } from '@main/views/admin-panel/store/actions/admin-qualification.action';
import { AddEmployeePositionSyncComponent } from '.././add-employee-position-sync/add-employee-position-sync.component';
import { MatDialog } from '@angular/material/dialog';
import { 
  Subscription, 
  Observable, 
  forkJoin, 
  combineLatest 
} from 'rxjs';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-add-employee-position',
  animations: [mainAnimations],
  templateUrl: './add-employee-position.component.html',
  styleUrls: ['./add-employee-position.component.scss']
})
export class AddEmployeePositionComponent implements OnInit {
  private employeePosition$: any;
  private req: Subscription;
  enum$: any;  
  private unsubscribe$ = new Subject<void>();

  public newEmployeePositionForm!: FormGroup;
  public radioOptions:any[] = [{id: true, name: "Yes", value: true}, {id: false, name:"No", value: false}];
  public loading: boolean = false;
  public linkComplianceDocs: boolean = false;  
  public linkTrainingDocs: boolean = false;

  public complianceDocs:any[] =  [
    {name: 'Qualification', field: 'qualification'}, 
    {name: 'Description', field: 'description'}, 
    {name: 'Type', field: 'type'}, 
    {name: 'Mandatory', field: 'mandatory'}
  ];  
  public complianceDocsData: any[] = [];
  public employeeQualifications: any ={
    add: [],
    delete: []
  }

  public trainingDocsData: any[] = [];
  public trainingDocs: any ={
    add: [],
    delete: []
  }

  public complianceDocsOptions: any[] = [];
  public complianceDocsOptionsSelected: any[] = [];

  public accessLevels: string[] = ["Admin", "Self-Service Portal - Coordinator", "Self-Service Portal - Facilitator", "Support Worker App"];
  public stepper: number = 1;

  constructor(
    public dialogRef: MatDialogRef<AddEmployeePositionComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder,
    private adminEmployeePosition: Store<AdminProfileState>,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private adminEnumStore: Store<AdminProfileState>
  ) { 
    console.log(data)
  }

  ngOnInit(): void {
    // Employee Position Form
    this.newEmployeePositionForm = this.formBuilder.group({
      code: [this.data ? this.data?.code : '', [Validators.required]],
      display_name: [this.data ? this.data?.display_name : '', [Validators.required]],
      name: [this.data ? this.data?.name : ''],
      restrict_service_type: [this.data ? this.data.restrict_service_type : undefined],
      compliance_docs: [''],  
      service_types: [''],  
      position_summary: [this.data ? this.data.position_summary : undefined], 
      key_responsibilities: [this.data ? this.data.key_responsibilities : undefined],  
      required_qualities: [this.data ? this.data.required_qualities : undefined],  
      desired_competencies: [this.data ? this.data.desired_competencies : undefined],   
      risk_assessed_roles: [this.data ? this.data.risk_assessed_roles || this.data?.employee_position_training?.length > 0 : false],   
      training_docs: ['']
    });

    this.subscribeEnums();

    this.adminEnumStore.dispatch({
      type: QualificationActionTypes.GET_QUALIFICATION_LIST
    });
  }

  subscribeEnums(){
    this.enum$ = this.adminEnumStore.pipe(select(state => state));

    this.req = this.enum$.subscribe((results: any) => {
      if(results.qualification.qualificationList.length > 0){
        results.qualification.qualificationList.forEach(element => {
          element.name = `${element?.qualification} (${element?.type})`;
        });

        this.complianceDocsOptions = results.qualification.qualificationList
        .sort((a,b) => a?.qualification?.localeCompare(b?.qualification));

        this.complianceDocsOptionsSelected = [...this.complianceDocsOptions].filter(el => 
          !this.complianceDocsData.find(_el => _el.qualification === el.qualification)
        );
      }
      this.loading = results.qualification.pending;
    });

    // COMPLIANCE DOCS TABLE
    if(this.data?.employee_position_qualification){
      this.complianceDocsData = [...this.data?.employee_position_qualification]
      .filter(el => el?.qualification?.length > 0)
      .map(el => {
        return {
          id: el?.id,
          qualification: el?.qualification[0]?.qualification,
          description: el?.qualification[0]?.description,
          type: el?.qualification[0].type,
          mandatory: !!el?.qualification[0]?.mandatory ? 'Yes' : 'No',
        }
      })
      .sort((a,b) => a?.qualification?.localeCompare(b?.qualification))
    }

    // TRAINING DOCS DATA
    if(this.data?.employee_position_training?.length > 0){
      this.trainingDocsData = [...this.data?.employee_position_training]
      .filter(el => el?.qualification?.length > 0)
      .map(el => {
        return {
          id: el?.id,
          qualification: el?.qualification[0]?.qualification,
          description: el?.qualification[0]?.description,
          type: el?.qualification[0].type,
          mandatory: !!el?.qualification[0]?.mandatory ? 'Yes' : 'No',
        }
      })
      .sort((a,b) => a?.qualification?.localeCompare(b?.qualification))
    }
  }

  addQualification(){
    let qualification: any = this.newEmployeePositionForm.get('compliance_docs').value
    this.complianceDocsData.push(qualification);

    qualification["mandatory"] = qualification["mandatory"] ? "Yes" : "No";
    
    this.employeeQualifications.add.push({
      "employee_position_id":this.data?.id,
      "qualification_id":qualification?.id
    });

    this.newEmployeePositionForm.get('compliance_docs').reset();
    this.complianceDocsOptionsSelected = [...this.complianceDocsOptions].filter(el => 
      !this.complianceDocsData.find(_el => _el.qualification === el.qualification)
    );
  }


  deleteQualification(event){
    let qualification = {...this.complianceDocsData[event]};

    this.employeeQualifications.delete.push({
      employee_position_id:this.data?.id, 
      id: qualification.id, 
    });

    this.complianceDocsData.splice(event, 1);

    this.complianceDocsOptionsSelected = [...this.complianceDocsOptions].filter(el => 
      !this.complianceDocsData.find(_el => _el.qualification === el.qualification)
    );
  }


  addTraining(){
    let qualification: any = this.newEmployeePositionForm.get('training_docs').value
    this.trainingDocsData.push(qualification);

    qualification["mandatory"] = qualification["mandatory"] ? "Yes" : "No";
    
    this.trainingDocs.add.push({
      "employee_position_id":this.data?.id,
      "qualification_id":qualification?.id
    });

    this.newEmployeePositionForm.get('training_docs').reset();
    this.complianceDocsOptionsSelected = [...this.complianceDocsOptions].filter(el => 
      !this.trainingDocsData.find(_el => _el.qualification === el.qualification)
    );
  }

  deleteTraining(event){
    let qualification = {...this.trainingDocsData[event]};

    this.trainingDocs.delete.push({
      employee_position_id:this.data?.id, 
      id: qualification.id, 
    });

    this.trainingDocsData.splice(event, 1);

    this.complianceDocsOptionsSelected = [...this.complianceDocsOptions].filter(el => 
      !this.trainingDocsData.find(_el => _el.qualification === el.qualification)
    );
  }

  close() {
    this.dialogRef.close(null);
  }

  save(){
    // CREATE NEW EMPLOYEE POSITION
    if(this.newEmployeePositionForm.valid && !this.data){
      this.adminEmployeePosition.dispatch({
        type: EmployeePositionActionTypes.SAVE_EMPLOYEE_POSITION,
        payload: this.newEmployeePositionForm.value
      }); 

      this.close();
    }

    // UPDATE DATA 
    else if(this.newEmployeePositionForm.valid && this.data) {
      let editData = {
        "id": this.data.id,
        ...this.newEmployeePositionForm.value,
        "employee-position-qualification": this.employeeQualifications,
        "employee-position-training": this.trainingDocs,
      }

      delete editData['compliance_docs'];
      delete editData['service_types'];
      delete editData['training_docs'];
      
      this.adminEmployeePosition.dispatch({
        type: EmployeePositionActionTypes.EDIT_EMPLOYEE_POSITION,
        payload: editData
      });

      this.dialogRef.close({
        cancel: false,
        data: this.data
      });
    }
  }

  openLinkComplianceDocs(event){
    if(!this.linkComplianceDocs) this.linkComplianceDocs = true;
  }

  openLinkTrainingDocs(event){
    if(!this.linkTrainingDocs) this.linkTrainingDocs = true;
  }
}
