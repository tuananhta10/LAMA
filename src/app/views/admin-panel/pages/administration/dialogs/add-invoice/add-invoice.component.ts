import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UploadFileComponent } from '@main/shared/components/inputs/file-upload/field-upload.component';
import { Subject, Subscription } from 'rxjs';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { select, Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InvoiceActionTypes } from '@main/views/admin-panel/store/actions/admin-invoice.action';
import { AddLineItemComponent } from '../add-invoice-line-item/add-invoice-line-item.component';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-add-invoice',
  templateUrl: './add-invoice.component.html',
  styleUrls: ['./add-invoice.component.scss']
})
export class AddInvoiceComponent implements OnInit {
  private unsubscribe$ = new Subject<void>();
  private invoice$: any;
  private req: Subscription;
  loading: boolean = false;
  invoiceTypeOptions: any [] = [{name: "ACCREC", id:"ACCREC"}];
  contactList: any[] = [{name:"test", contactId:"361d2ef0-7b1e-4855-ac93-66a1e56e74e3"}];
  statusOptions: any[]=["AUTHORISED"]
  lineItemColumn:any[] =  [
    {name: 'Description', field: 'Description'}, {name: 'Quantity', field: 'Quantity'}, {name: 'Unit Amount', field: 'UnitAmount'}, {name: 'Account Code', field: 'AccountCode'}, 
    {name: 'Tax Type', field: 'TaxType'}, {name: 'Line Amount', field: 'LineAmount'}, 
  ]
  lineItemData:any[] = [];

  public addInvoiceForm!: FormGroup;
  public file: File;
    
  @ViewChild("upload", { static: false }) upload: UploadFileComponent;

  constructor(
    public dialogRef: MatDialogRef<AddInvoiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private dialogClient: MatDialog,
    private formBuilder: FormBuilder,
    private adminInvoice: Store<AdminProfileState>,
  ) { 
    console.log(this.data)
  }

  ngOnInit(): void {
    this.addInvoiceForm = this.formBuilder.group({
      Type: [this.data ? this.data?.Type : '', [Validators.required]],
      Contact: [this.data ? this.data?.Contact : '', [Validators.required]],
      Reference: [this.data ? this.data?.Reference : '', [Validators.required]],
      Date: [this.data ? this.data?.Date : '', [Validators.required]],
      DueDate: [this.data ? this.data?.DueDate : '', [Validators.required]],
      Status: [this.data ? this.data?.Status : '', [Validators.required]],
    });
  }

  close() {
    this.dialogRef.close(null);
  }

  save(){
    let loggedUser = JSON.parse(localStorage.getItem('loggedUserData'));

    if(this.addInvoiceForm.valid && !this.data){
      let invoice = {
        ...this.addInvoiceForm.value,
        organization_id: loggedUser?.organization_id
      }

      this.adminInvoice.dispatch({
        type: InvoiceActionTypes.SAVE_INVOICE,
        payload: invoice
      });

      this.close();
    }
    else if(this.addInvoiceForm.valid && this.data) {
      let editData = {
        id: this.data.id,
        name: this.addInvoiceForm.value.name,
        code: this.addInvoiceForm.value.code,
        icon: this.addInvoiceForm.value.icon,
        organization_id: loggedUser?.organization_id
      }
      this.adminInvoice.dispatch({
        type: InvoiceActionTypes.EDIT_INVOICE,
        payload: editData
      });

      this.close();
    }
  }


  openAddLineItem(e){
    let careWorkerDialog = this.dialogClient.open(
      AddLineItemComponent,
      {
        //height: '920px',
        width: '25vw',
        data: {
          
        },
      }
    );

    careWorkerDialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {
      if(result){
        this.lineItemData.push(result)
      }
    })
  }

  deleteLineItem(index){
    this.lineItemData.splice(index, 1);
  }
}
