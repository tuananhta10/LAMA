import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { mainAnimations } from '@app-main-animation';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PreDefinedProviderModalComponent } from '../../modals/pre-defined-provider-modal/pre-defined-provider-modal.component';
import { CustomDocumentModalComponent } from '../../modals/custom-document-modal/custom-document-modal.component';
import { ClientSuccessModalComponent } from '../../modals/client-success-modal/client-success-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClientConstants } from '../../../constants';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-related-documents',
  animations: [mainAnimations],
  templateUrl: './related-documents.component.html',
  styleUrls: ['./related-documents.component.scss']
})
export class RelatedDocumentsComponent implements OnInit, OnDestroy {
  isLinear = false;
  private unsubscribe$ = new Subject<void>();

  @Input() clientForm: any;  
  @Input() navigation: any = {};
  @Input() isUpdate: boolean = false;
  @Input() documents: any[] = [];

  @Output() formStep: EventEmitter<string> = new EventEmitter<string>();
  @Output() updateStepper: EventEmitter<number> = new EventEmitter<number>();
  @Output() submitData: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild(MatMenuTrigger) menuTrigger: MatMenuTrigger;
  @Output() isValid: EventEmitter<any> = new EventEmitter<any>();

  editDocuments: any = {
    add: [],
    delete: []
  }
  
  constructor(public snackBar: MatSnackBar,
    public dialog: MatDialog,  private datePipe : DatePipe) { }

  ngOnInit(): void {
    console.log(this.clientForm)

    if(this.isUpdate){
      this.documents = this.documents.hasOwnProperty('client_docs') ? this.documents['client_docs'] : [];
    }
    this.formStep.emit(ClientConstants.relatedDocuments);
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

  convertToDateTime(dateVal: any){
    let date = this.datePipe.transform(dateVal * 1000, 'yyyy-MM-dd');
    date = date + "T00:00:00";
    return date;
  }

  back(){
    this.updateStepper.emit(this.navigation?.previous);
  }

  next(){
    let first_name = this.clientForm?.clientDetail?.first_name;
    let last_name = this.clientForm?.clientDetail?.last_name;
    let gender = this.clientForm?.clientDetail?.gender;
    let title = this.clientForm?.clientDetail?.title;
    let disability_type = this.clientForm?.demographics?.disability_type;

    let address_a = this.clientForm?.contactDetails?.address_a;
    let suburb = this.clientForm?.contactDetails?.suburb;
    let state = this.clientForm?.contactDetails?.state;
    let post_code = this.clientForm?.contactDetails?.post_code;
    let email_address = this.clientForm?.contactDetails?.email_address;

    if(!first_name || !last_name ||
      !gender || !title){
      this.snackBar.open("Client Details form is invalid. Please complete the details before saving.", "", {
        duration: 4000,
        panelClass:'danger-snackbar'
      });

      this.updateStepper.emit(1);
    }

    else if(!disability_type){
      this.snackBar.open("Demographics form is invalid. Please complete the details before saving.", "", {
        duration: 4000,
        panelClass:'danger-snackbar'
      });

      this.updateStepper.emit(2);
    }

    else if(!address_a ||
      !suburb || !state ||
      !post_code || !email_address){
      this.snackBar.open("Contact Details form is invalid. Please complete the details before saving.", "", {
        duration: 4000,
        panelClass:'danger-snackbar'
      });

      this.updateStepper.emit(6);
    }

    else {
      this.submitData.emit(this.documents)
      this.updateStepper.emit(this.navigation?.next);

    }

  }

  submit(){
    let data = {
      "client-docs": {
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
    this.isValid.emit({formStep: 7, isValid: true})
    if(!this.isUpdate){
      this.submitData.emit(this.documents);
    }
  }
}
