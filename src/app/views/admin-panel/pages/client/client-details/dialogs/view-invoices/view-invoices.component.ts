import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Convert24hrPipe } from '@main/shared/pipes/convert24hr.pipe';
import { NameFormatPipe } from '@main/shared/pipes/name-format.pipe';
import { ClientInvoiceActionTypes } from '@main/views/admin-panel/store/actions/admin-client-invoice.action';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { AdminHelper } from '@main/views/admin-panel/utils/helper';
import {
  Store,
  select
} from '@ngrx/store';
import { format } from 'date-fns';
import moment from 'moment';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PrintInvoiceComponent } from '../print-invoice/print-invoice.component';

@Component({
  selector: 'app-view-invoices',
  templateUrl: './view-invoices.component.html',
  styleUrls: ['./view-invoices.component.scss'],
  providers:[Convert24hrPipe,NameFormatPipe]
})
export class ViewInvoicesComponent implements OnInit {
  private clientInvoice$: any;
  private req: Subscription;
  private unsubscribe$ = new Subject<void>();
  private invoiceSubtotal: number = 0;
  private invoiceTotal: number = 0;

  public invoiceForm!: FormGroup;
  public required:boolean = true;
  public invoiceBatchEnum: any[] = [];
  public radioOptions: any[] = [{id: true, name: "Yes", value: true}, {id: false, name:"No", value: false}];
  public stepper: number = 1;  
  public invoiceReferrenceItems: any = [];
  public loading: boolean = true
  public linkInvoice: boolean = false;  
  public linkServiceTypes: boolean = false;
  public invoiceColumns:any[] =  [
    { name: 'Invoice Batch', field: 'invoice_name' }, 
    { name: 'Client', field: 'client_name' },  
    { name: 'Service Type', field: 'service_type_support_item_name' },  
    { name: 'Weekday', field: 'calendar_schedule_date', type:'date' },  
    { name: 'Time From', field: 'time_from' },  
    { name: 'Time To', field: 'time_to' },  
    
    //{ name: 'Brokerage Number', field: 'brokerage_number' },  
    //{ name: 'Comments', field: 'comments' },  
    //{ name: 'Funding Source', field: 'funding_source_id' },  
    { name: 'Total Units', field: 'total_units', type: 'number', number_class: 'ps-4' }, 
    { name: 'Total Amount', field: 'client_service_schedule_approved_client_total_cost' },  
    //{ name: 'Status', field: 'status' },   
  ];  
  public invoiceData: any[] = [];
  public employeeQualifications: any ={
    add: [],
    delete: []
  }
  public status: string[] = ["Awaiting Payment", "Paid", "Rejected", "Cancelled", "Invalidated"];
  public _data:any
  constructor(
    public dialogRef: MatDialogRef<ViewInvoicesComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data,
    private clientStore: Store<AdminProfileState>,
    private formBuilder: FormBuilder,
    private convert24hrPipe: Convert24hrPipe,
    private nameFormatPipe:NameFormatPipe
  ) {
    this._data= AdminHelper.deepCopy(this.data) ;
    console.log("INVOICE",data)
  }

  /*
    id: string;  
    invoice_name: string;  
    date_created: any; 
    invoice_batch?: any;
    client_name: string;
    client_id?: any; 
    account?: any;
    brokerage_number: any;  
    comments: string;
    sub_total?: number;
    tax?: number;
    total_amount: number;
    status: any;
    emailed?: boolean;  
    amount_paid?: number;  
    payment_reference_number?: number;
    claim_code: any;  
    funding_source_id: string;
    funding_source_full_name: string;
    total_hours: number;
  */

  ngOnInit(): void {
    if(this._data){
      this.getInvoicesReferrence();  
      this.subscribeToInvoiceReferrence();

      if(this._data?.invoice_type === 'Funding Claim'){
        this.invoiceColumns[0].name = "Claim Batch";
      }

      this.invoiceForm = this.formBuilder.group({
        invoice_name: [this._data ? this._data?.invoice_batch_claim_reference : ''],  
        date_created: [this._data ? new Date(!isNaN(this._data?.invoice_batch_date_added) ? this._data?.invoice_batch_date_added * 1000 : this._data?.invoice_date_added_time_stamp * 1000) : ''],  
        invoice_batch: [this._data ? this._data?.invoice_name : ''],
        client_name: [this._data ? this._data?.client_name : ''],
        account: [this._data ? this._data?.invoice_batch_account : ''],
        brokerage_number: [this._data ? this._data?.invoice_batch_brokerage_number : ''],
        funding_source_id: [this._data ? this._data?.invoice_batch_funding_source_code : ''],
        comments: [this._data ? this._data?.invoice_batch_comments : ''],
        sub_total: [this._data ? this._data?.invoice_batch_sub_total || this._data?.invoice_batch_total_cost : ''],
        tax: [this._data ? this._data?.invoice_batch_tax || 0 : 0],
        total_amount: [this._data ? Math.round(this._data?.invoice_batch_total_cost * 100) / 100  : ''],
        status: [this._data ? this._data?.invoice_batch_status : ''],
        emailed: [this._data ? this._data?.invoice_batch_emailed || false : false],
        amount_paid: [this._data ? this._data?.invoice_batch_amount_paid || 0 : 0],
        payment_reference_number: [this._data ? this._data?.payment_reference_number : '']
      });
    }
  }

  subscribeToInvoiceReferrence(){
    this.req = this.clientInvoice$.pipe(takeUntil(this.unsubscribe$)).subscribe((results: any) => {
      //console.log(results?.clientInvoiceReferrence)
      this.loading = results?.pendingInvoice;
      
      if(results?.clientInvoiceReferrence?.length > 0){
        const deepCopy = AdminHelper.deepCopy(results?.clientInvoiceReferrence)
        deepCopy.forEach((el) => {
          // , ${convertTo12Hrs(el['client_service_schedule_approved_start_time'])} - ${convertTo12Hrs(el['client_service_schedule_approved_end_time'])}
          
          const isTravel = el.client_service_schedule_is_travel || el?.client_service_schedule_activity.match('travel'),
            isTravelTime = el.client_service_schedule_is_travel_time || el?.client_service_schedule_activity === 'Travel Time',
            isTransport = el.client_service_schedule_is_transport || el?.client_service_schedule_activity === 'Activity Based Transport'

          el['client_name'] =  `${this.nameFormatPipe.transform(el?.client_name)}`;
          el['invoice_name'] = this.formatInvoiceName(el['invoice_name']);
          el['time_from'] = `${this.convert24hrPipe.transform(el['client_service_schedule_approved_start_time'])}`;
          el['time_to'] = `${this.convert24hrPipe.transform(el['client_service_schedule_approved_end_time'])}`; 
          el['calendar_schedule_date'] =  el['client_service_schedule_approved_start_date']; 
          el['service_type_support_item_name'] =  isTravel || isTravelTime || isTransport  ? el.client_service_schedule_activity : el.invoice_batch_support_item
          if(el.client_service_schedule_activity === 'Activity Based Transport' || el.client_service_schedule_is_travel){
            el['total_units'] = el['client_service_schedule_approved_support_item_price']
          }else{
            el['total_units'] = el['client_service_schedule_approved_total_hours']
          }
          this.invoiceSubtotal = this.invoiceSubtotal + el['client_service_schedule_approved_client_total_cost'];
          this.invoiceTotal = (this.invoiceForm.controls['tax'].value/100 * this.invoiceSubtotal) + this.invoiceSubtotal;

        })
        this.invoiceReferrenceItems = deepCopy;
        
        this.invoiceForm.controls['sub_total'].patchValue( Math.round(this.invoiceSubtotal * 100) / 100 );
        this.invoiceForm.controls['total_amount'].patchValue(Math.round(this.invoiceTotal * 100) / 100);
      }else{
        results.clientInvoiceReferrence = []
      }
    });
  }

  formatInvoiceName(invoice_name: string){
    let invoice = invoice_name.split("-");
    let invoice_date: any[] = invoice[1].split("to");
    const formattedDatefrom = moment(invoice_date[0]).format('DD/MM/YYYY');
    const formattedDateto = moment(invoice_date[1]).format('DD/MM/YYYY');

    const isDateValid = formattedDatefrom !== "Invalid date" && formattedDateto !== "Invalid date"

    const formattedDate = `${formattedDatefrom} to ${formattedDateto} - ${invoice[0]}`
    return isDateValid ? formattedDate : invoice_name;
  }


  getInvoicesReferrence(): void {
    this.clientInvoice$ = this.clientStore.pipe(select(state => state.clientInvoice));

    this.clientStore.dispatch({
      type: ClientInvoiceActionTypes.GET_CLIENT_INVOICE_REFERRENCE,
      payload: {
        id: this._data?.invoice_batch_id
      }
    });
  }

  
  close(): void  {
    this.dialogRef.close(null);
  }

  save(): void {
    if(this.invoiceForm.valid){
      
    }
  }

  printInvoice(){
    let viewInvoice = this.dialog.open(
      PrintInvoiceComponent,
      {
        minWidth: '60vw',
        minHeight: '70vh',
        maxHeight: '96vh',
        data: {
          invoice_batch: this._data,  
          invoice_batch_item: this.invoiceReferrenceItems
        }
      }
    );

    viewInvoice
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {

      });

    // exit current dialog
    this.dialogRef.close();
  }

  updatePayment(){
    this.dialogRef.close({
      data: {
        account: this.invoiceForm.controls['status'].value,  
        amount_paid: this.invoiceForm.controls['amount_paid'].value,
        comment: this.invoiceForm.controls['comments'].value,
        invoice_batch_id: this._data?.invoice_batch_id,
        payment_reference_number: this.invoiceForm.controls['payment_reference_number'].value
      }
    });
  }

  addQualification(){
    
  }

  deleteInvoice(event){
    
  }

  openLinkInvoice(event){
    if(!this.linkInvoice) this.linkInvoice = true;
  }

}
