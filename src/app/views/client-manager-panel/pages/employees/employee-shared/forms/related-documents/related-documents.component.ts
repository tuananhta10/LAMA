import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { mainAnimations } from '@app-main-animation';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PreDefinedProviderModalComponent } from '../../modals/pre-defined-provider-modal/pre-defined-provider-modal.component';
import { CustomDocumentModalComponent } from '../../modals/custom-document-modal/custom-document-modal.component';
import { EmployeeSuccessModalComponent } from '../../modals/client-success-modal/employee-success-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeConstants } from '../../../constants';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-employee-related-documents',
  animations: [mainAnimations],
  templateUrl: './related-documents.component.html',
  styleUrls: ['./related-documents.component.scss']
})
export class RelatedDocumentsComponent implements OnInit, OnDestroy {
  isLinear = false;
  private unsubscribe$ = new Subject<void>();

  @Input() navigation: any = {};
  @Input() employeeForm: any;

  @Output() updateStepper: EventEmitter<number> = new EventEmitter<number>();
  @Output() submitData: EventEmitter<any> = new EventEmitter<any>();
  @Input() isUpdate: boolean = false;
  @Input() documents: any[] = [];
  @Output() formStep: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild(MatMenuTrigger) menuTrigger: MatMenuTrigger;
  @Output() isValid: EventEmitter<any> = new EventEmitter<any>();

  editDocuments: any = {
    add: [],
    delete: []
  }
  
  constructor(public snackBar: MatSnackBar,
    public dialog: MatDialog,  private datePipe : DatePipe) { }

  ngOnInit(): void {
    if(this.isUpdate){
      this.documents = this.documents.hasOwnProperty('employee_docs') ? this.documents['employee_docs'] : [];
    }
    this.formStep.emit(EmployeeConstants.relatedDocuments);

    console.log(this.employeeForm)
  }


  openCustomDocumentModal(){
    let customDocumentDialog = this.dialog.open(
      CustomDocumentModalComponent,
      {
        width: '400px',
        data: {
        },
      }
    );

    customDocumentDialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {
      let doc = {
        title: "",
        type: "",
        description: "",
        attachment: ""
      }
      if(result){
        doc.title = result.title;
        doc.type = result.type;
        doc.description = result.description;
        doc.attachment = result.file;

        this.documents.push(doc);
        this.editDocuments.add.push(doc);
      }
    });
  }

  convertToDateTime(dateVal: Date){
    /*let date = this.datePipe.transform(dateVal, 'yyyy-MM-dd');
    date = date + "T00:00:00";
    return date;*/

    return Math.trunc(new Date(dateVal).getTime() / 1000);
  }

  back(){
    this.updateStepper.emit(this.navigation?.previous);
  }

  next(){
    /* EMPLOYEE DETAILS */
    let first_name = this.employeeForm?.employeeDetail?.first_name;
    let last_name = this.employeeForm?.employeeDetail?.last_name;
    let gender = this.employeeForm?.employeeDetail?.gender;
    let title = this.employeeForm?.employeeDetail?.title;
    let type = this.employeeForm?.employeeDetail?.type;
    let email_address = this.employeeForm?.employeeDetail?.email_address;
    let private_email = this.employeeForm?.employeeDetail?.private_email;

    /* SERVICE DETAILS */
    let position_id = this.employeeForm?.serviceDetail?.position_id;
    let main_branch_id = this.employeeForm?.serviceDetail?.main_branch_id;
    let employment_type = this.employeeForm?.serviceDetail?.employment_type;

    /* CONTACT DETAILS */
    let address_a = this.employeeForm?.contactDetail?.address_a;
    let suburb = this.employeeForm?.contactDetail?.suburb;
    let state = this.employeeForm?.contactDetail?.state;
    let post_code = this.employeeForm?.contactDetail?.post_code;
    
    if(!first_name || !last_name 
      || !gender || !title
      || !email_address || !private_email){
      this.snackBar.open("Client Details form is invalid. Please complete the details before saving.", "", {
        duration: 4000,
        panelClass:'danger-snackbar'
      });

      this.updateStepper.emit(1);
    }

    else if(!position_id || !main_branch_id 
      || !employment_type){
      this.snackBar.open("Service Details form is invalid. Please complete the details before saving.", "", {
        duration: 4000,
        panelClass:'danger-snackbar'
      });

      this.updateStepper.emit(3);
    }

    else if(!address_a || !suburb 
      || !state || !post_code){
      this.snackBar.open("Contact Details form is invalid. Please complete the details before saving.", "", {
        duration: 4000,
        panelClass:'danger-snackbar'
      });

      this.updateStepper.emit(5);
    }

    else {
      this.submitData.emit(this.documents)
      this.updateStepper.emit(this.navigation?.next);
    }


  }

  submit(){
    let data = {
      "employee-docs": {
        ...this.editDocuments
      }
    }
    this.submitData.emit(data);
  }

  delete(index) {
    this.editDocuments.delete.push(this.documents[index]);
    this.documents.splice(index, 1);
  }

  openMenu() {
    this.menuTrigger.openMenu();
  }

  ngOnDestroy(): void {
    this.isValid.emit({formStep: this.isUpdate ? 7 : 5, isValid: true})
    if(!this.isUpdate){
      this.submitData.emit(this.documents);
    }
  }
}
