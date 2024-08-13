import { Component, Inject, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { OrganizationActionTypes } from '@main/views/admin-panel/store/actions/admin-organization.action';
import { select, Store } from '@ngrx/store';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { Subject, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ImageConverterService } from '@main/shared/services/admin-panel/image-converter.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { takeUntil } from 'rxjs/operators';
import { DownloadInvoiceBatchComponent } from '../download-invoice-batch/download-invoice-batch.component';

@Component({
  selector: 'app-print-invoice-batch',
  templateUrl: './print-invoice-batch.component.html',
  styleUrls: ['./print-invoice-batch.component.scss']
})
export class PrintInvoiceBatchComponent implements OnInit {
  private req: Subscription;
  private organizationData$: any;
  private organization$: any;
  public displayedColumns = [
    { field: 'support_service_claim_code', name: 'Service Type' },
    { field: 'client_service_schedule_approved_start_date', name: 'Service Date', type: 'Date' },
    { field: 'start_time', name: 'Time From' },
    { field: 'end_time', name: 'Time To' },
    { field: 'client_service_schedule_approved_support_item_price', name: 'Rate' },
    { field: 'client_service_schedule_approved_total_hours', name: 'Units' },
    { field: 'client_service_schedule_approved_client_total_cost', name: 'Amount' },
  ];
  public invoiceData: any[] = [];
  public invoiceTotalColumn: any[] = [
    { field: 'invoice_summary', name: 'Invoice Summary' },
    { field: 'rate', name: 'Rate' },
    { field: 'units', name: 'Total Units' },
    { field: 'total_amount', name: 'Total Amount' },
  ];
  public invoiceTotalData: any[] = [];
  public subTotal: number = 0;  
  public tax: number = 0;  
  public mainTotal: number = 0;
  public loggedUser: any = JSON.parse(localStorage.getItem('loggedUserData'));
  public loading: boolean = false;
  public organizationData: any = {};
  private unsubscribe$ = new Subject<void>();
  public converted_image_src: any;

  constructor(public dialogRef: MatDialogRef<PrintInvoiceBatchComponent>,
    private adminOrganization: Store<AdminProfileState>,
    private imageConverterService: ImageConverterService,
    public dialog: MatDialog,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data,) { 

  }

  convertTo12Hrs(time) {
    if(!time) return;

    // Check correct time format and split into components
    time = time?.substr(0,5).toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) { // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(''); // return adjusted time or original string
  }

  ngOnInit(): void {

    this.data.invoice_batch_item.forEach(_el => {
      _el['invoice_batch_detail'].forEach(el => {
        const activity = el?.invoice_batch_support_item,
        total_hours =  el?.client_service_schedule_approved_total_hours,
        unit_price =  el?.client_service_schedule_approved_support_item_price,
        isTransport = el?.client_service_schedule_is_transport || el?.client_service_schedule_activity === 'Activity Based Transport',
        isTravelTime = el?.client_service_schedule_is_travel_time || el?.client_service_schedule_activity === 'Travel Time'

        if(isTransport || el.client_service_schedule_is_travel){
          el['client_service_schedule_approved_total_hours'] = unit_price
          el['client_service_schedule_approved_support_item_price'] = total_hours
        }
        if(el?.client_service_schedule_status.toLowerCase() === 'cancelled'){
          el['support_service_claim_code'] = `${el?.client_service_schedule_approved_support_item_number} - ${el?.service_type_support_item_name} ${this.returnBoldTag('(CANCELLATION)')} `
        }else{
          if(isTravelTime){
            el['support_service_claim_code'] = `${el?.client_service_schedule_approved_support_item_number} - ${el?.client_service_schedule_activity}`
          }else{
            el['support_service_claim_code'] = `${el?.client_service_schedule_approved_support_item_number} - ${el?.service_type_support_item_name}`
          }
        }
        el['start_time'] = `${this.convertTo12Hrs(el?.client_service_schedule_start_time)}`;
        el['end_time'] = `${this.convertTo12Hrs(el?.client_service_schedule_end_time)}`;
      })
    });

    this.invoiceData = this.data?.invoice_batch_item;

    let unique = this.invoiceData.reduce((acc, curr) => {
      const key = curr.support_service_claim_code;
      if (acc[key]) {
        acc[key].push(curr);
      } else {
        acc[key] = [curr];
      }
      return acc;
    }, {});

    for (var key in unique) {
      let inv = {
        invoice_summary: key,
        rate: 0,
        units: 0,
        total_amount: 0
      }

      unique[key].forEach(element => {
        inv.rate = element.client_service_schedule_activity === 'Activity Based Transport' || element?.client_service_schedule_is_travel ?  element.client_service_schedule_approved_support_item_price :element.invoice_batch_unit_price
        inv.units = inv.units + element.client_service_schedule_approved_total_hours;
        inv.total_amount = inv.total_amount + element.client_service_schedule_approved_client_total_cost
      });

      inv.units = Math.round(inv.units * 100) / 100
      inv.total_amount = Math.round(inv.total_amount * 100) / 100

      this.invoiceTotalData.push(inv);
    }

    this.subTotal = [...this.invoiceTotalData].map(el => el?.total_amount).reduce((a,b) => a + b, 0);
    this.mainTotal = [...this.invoiceTotalData].map(el => el?.total_amount).reduce((a,b) => a + b, 0);

    this.getOrganization();
    this.subscribeToOrganization();
  }

  returnBoldTag(label:string){
    return `<strong class="text-success">${label}</strong> `
  }
  
  getOrganization(){
    this.adminOrganization.dispatch({
      type: OrganizationActionTypes.GET_ORGANIZATION,
      payload: this.loggedUser?.organization_id
    }); 
  }

  subscribeToOrganization(){
    this.organizationData$ = this.adminOrganization.pipe(select(state => state.organization));

    this.req =  this.organizationData$.subscribe((organization: any) => {
      this.loading = organization.pending;

      if(organization?.organization?.id){
        this.organizationData = organization?.organization;
        this.converted_image_src = this.organizationData?.logo[0]?.download_url;

        if(this.converted_image_src){
          this.convertImageFromUrl();
          
        }
      }
    });
  }

  convertImageFromUrl(){
    this.req = this.imageConverterService
    .convertImageToBase64(this.organizationData?.logo[0]?.download_url)
    .subscribe((result) => {
      console.log(result)
      /*data:image/png;base64,*/
      this.base64Image = `${result?.base64_image}`;
    });
  }

  public base64Image: string;

  cleanBase64(base64data: string): string {
    return base64data.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');
  }

  downloadZipFileInvoices(){
    let viewInvoice = this.dialog.open(
      DownloadInvoiceBatchComponent,
      {
        minWidth: '50vw',
        maxHeight: '50vh',
        disableClose: true,
        data: { 
          invoice_batch: this.data?.invoice_batch,  
          invoice_batch_item: this.data?.invoice_batch_item,
          organizationData: this.organizationData
        }
      }
    );

    viewInvoice
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {

      });
  }

  public downloading: boolean = false;

  downloadAsPDF(id: string): any {
    this.downloading = true;

    if(this.downloading){
      setTimeout(() => {
        this.getCanvasElement(id);
      }, 30);
    }
  }

  replaceNextLine(text){
    return text.replace(/(?:\r\n|\r|\n)/g, '<br>');
  }
  

  getCanvasElement(id: string){
    console.log(this.converted_image_src)

    html2canvas(
      document.querySelector(`#${id}`), {
        logging: true, 
        allowTaint: false,
        useCORS: true,
        scale: 5,
        width: 1000,
      }
    ).then(canvas => {
        canvas.style.padding = '20px';
        let imgWidth = 212;
        let imgHeight = canvas.height * imgWidth / (canvas.width);
        let pdf = new jsPDF('p', 'mm', 'a4');
        let imgData  = canvas.toDataURL("image/jpeg", 0.8);
        pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
        pdf.save(`Invoice #:${this.data?.invoice_batch?.invoice_batch_claim_reference}.pdf`);

        this.downloading = false;
     });
  }

  timeStampGetter(data: any): number {
    if(!isNaN(data?.invoice_batch?.invoice_batch_date_added)){
      return data?.invoice_batch?.invoice_batch_date_added;
    }

    return data?.invoice_batch?.invoice_date_added_time_stamp;
  }

}
