import { Component, Inject, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrganizationActionTypes } from '@main/views/admin-panel/store/actions/admin-organization.action';
import { select, Store } from '@ngrx/store';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { Subject, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ImageConverterService } from '@main/shared/services/admin-panel/image-converter.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { MatSnackBar } from '@angular/material/snack-bar';
import { saveAs } from 'file-saver';
import * as JSZip from 'jszip';

@Component({
  selector: 'app-download-invoice-batch',
  templateUrl: './download-invoice-batch.component.html',
  styleUrls: ['./download-invoice-batch.component.scss']
})
export class DownloadInvoiceBatchComponent implements OnInit {
  private req: Subscription;
  private organizationData$: any;
  private organization$: any;
  public displayedColumns = [
    { field: 'client_service_schedule_activity', name: 'Service Type' },
    { field: 'client_service_schedule_approved_start_date', name: 'Service Date', type: 'Date' },
    { field: 'invoice_item_approved_start_time', name: 'Time From' },
    { field: 'invoice_item_approved_end_time', name: 'Time To' },
    { field: 'client_service_schedule_approved_support_item_price', name: 'Rate' },
    { field: 'client_service_schedule_approved_total_hours', name: 'Units' },
    { field: 'client_service_schedule_approved_client_total_cost', name: 'Amount' },
  ];
  public invoiceTotalColumn: any[] = [
    { field: 'invoice_summary', name: 'Invoice Summary' },
    { field: 'rate', name: 'Rate' },
    { field: 'units', name: 'Total Units' },
    { field: 'total_amount', name: 'Total Amount' },
  ];
  public subTotal: number = 0;  
  public tax: number = 0;  
  public mainTotal: number = 0;
  public loggedUser: any = JSON.parse(localStorage.getItem('loggedUserData'));
  public loading: boolean = false;
  public organizationData: any = {};
  public timeCreated: any;
  public invoiceData: any[] = [];
  public converted_image_src: any;
  public downloading: boolean = false;

  constructor(public dialogRef: MatDialogRef<DownloadInvoiceBatchComponent>,
    private adminOrganization: Store<AdminProfileState>,
    private imageConverterService: ImageConverterService,
    private snackBar: MatSnackBar,
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
    this.timeCreated = new Date(this.data?.invoice_batch?.invoice_date_added_time_stamp * 1000);

    this.organizationData = this.data.organizationData;
    this.converted_image_src = this.data.organizationData?.logo[0]?.download_url;
    if(this.converted_image_src){
      this.convertImageFromUrl();
      
    }
    this.data.invoice_batch_item.forEach(element => {
      let inv:any = this.formatInvoices(element.invoice_batch_detail)

      this.invoiceData.push(inv);
    });

    console.log(this.data);
    this.downloadAsPDF();
  }

  formatInvoices(invoices: any[]): any{
    let retData: any = {};
    let invoiceTotalData: any [] = [];
    let invItems = [...invoices];
    invItems.forEach(el => {
      const activity = el?.invoice_batch_support_item,
            total_hours =  el?.client_service_schedule_approved_total_hours,
            unit_price =  el?.client_service_schedule_approved_support_item_price

      if(activity === 'Activity Based Transport'){
        el['client_service_schedule_approved_total_hours'] = unit_price
        el['client_service_schedule_approved_support_item_price'] = total_hours
      }
      el['support_service_claim_code'] = `${el?.client_service_schedule_approved_support_item_number} - ${el?.service_type_support_item_name}`
      el['start_time'] = `${this.convertTo12Hrs(el?.client_service_schedule_start_time)}`;
      el['end_time'] = `${this.convertTo12Hrs(el?.client_service_schedule_end_time)}`;
    });

    let unique = invItems.reduce((acc, curr) => {
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
        inv.rate = element.invoice_batch_unit_price
        inv.units = inv.units + element.client_service_schedule_approved_total_hours;
        inv.total_amount = inv.total_amount + element.client_service_schedule_approved_client_total_cost
      });

      inv.units = Math.round(inv.units * 100) / 100
      inv.total_amount = Math.round(inv.total_amount * 100) / 100

      invoiceTotalData.push(inv);
    }

    let subTotal = [...invoiceTotalData].map(el => el?.total_amount).reduce((a,b) => a + b, 0);
    let mainTotal = [...invoiceTotalData].map(el => el?.total_amount).reduce((a,b) => a + b, 0);

    retData = {
      invoices: invoices,
      invoiceTotalData: invoiceTotalData,
      subTotal: subTotal,
      mainTotal: mainTotal
    }
    
    return retData;
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
 
  downloadAsPDF() {
    this.downloading = true;
    let _this:any = this;
    let name = this.data?.invoice_batch?.invoice_name

    let invoiceNames: any[] = this.data.invoice_batch_item.map((e, ind) => {
      if(e.invoice_batch_claim_reference == this.data.invoice_batch_item[ind -1]?.invoice_batch_claim_reference){
        return `${e.invoice_batch_claim_reference}_${new Date().valueOf()}.pdf`
      }
      return `${e.invoice_batch_claim_reference}_.pdf`
    })

    console.log(invoiceNames)

    setTimeout(
      async function() {
        var zip = new JSZip();
        for(var i =0; i < invoiceNames.length; i++){
        
          let pdf:any = await _this.getCanvasElement(i);
          zip.file(`Invoice-${invoiceNames[i]}`, pdf); 
        }
        zip.generateAsync({ type: "blob" }).then(function (content) {
          saveAs(content, `Invoice batch:${name}.zip`);
        });
        _this.dialogRef.close();
      }, 3000);   
  }

  replaceNextLine(text){
    return text.replace(/(?:\r\n|\r|\n)/g, '<br>');
  }
  

  async getCanvasElement(index: number){ 
    try {
      let ret = null;
      await html2canvas(
        document.querySelector(`#${'invoice'+ index}`), {
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

          ret = pdf.output('blob');
        });

      return ret;
    } catch (e){
      this.snackBar.open(`There was an error in downloading your files. Please contact support.`, '', {
        panelClass: 'success-snackbar',
        duration:4000
      });

      this.close();
    }
  }

  close(){
    this.dialogRef.close();
  }

}
