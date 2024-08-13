import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { mainAnimations } from '@app-main-animation';
import { Router, ActivatedRoute } from '@angular/router';
import { 
  Subscription, 
} from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { 
  select, 
  Store 
} from '@ngrx/store';
import { 
  displayedColumns,
  TableHeader,
  Invoice,
  selectedColumns,
  invoiceList 
} from '../../utils/invoice-model-interface';
//import { AddInvoiceComponent } from '../../dialogs/add-invoice/add-invoice.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
//import { InvoiceActionTypes } from '@main/views/admin-panel/store/actions/admin-invoice.action';
import { DeleteRecordComponent } from '../../dialogs/delete-record/delete-record.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddXeroSettingComponent } from '../../dialogs/add-xero-settings/add-xero-settings.component';
import { AddInvoiceComponent } from '../../dialogs/add-invoice/add-invoice.component';

@Component({
  selector: 'admin-invoices',
  animations: [mainAnimations],
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit, OnDestroy {
  private invoiceData$: any;
  private req: Subscription;
  private unsubscribe$ = new Subject<void>();

  public clientData: any = {};
  public routerUrl: any[] = [];
  public loading: boolean = false;
  public id;
  public displayedColumns: TableHeader[] = displayedColumns;
  public invoiceList: Invoice[] = invoiceList;
  public selectedColumns: string[] = selectedColumns;
  public listView: boolean = true;
  public searchSource: any = (el) => {
    return {
      id: el.id, 
      code: el.code,   
      name: el.name,  
      profile_image: el.profile_image,
    }
  } 

  constructor(private adminInvoice: Store<AdminProfileState>,
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar) {
    this.id = route.parent.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getInvoices();
    // this.invoiceData$ = this.adminInvoice.pipe(select(state => state.invoice));

    // this.req =  this.invoiceData$.subscribe((invoice: any) => {
    //   this.loading = invoice.pending;
      
    //   if(invoice.invoiceList.length > 0){
    //     this.invoiceList = invoice.invoiceList;
    //   }

    //   if(invoice.success){
    //     this.snackBar.open(invoice.success, "", {
    //       duration: 4000,
    //       panelClass:'success-snackbar'
    //     });

    //     this.adminInvoice.dispatch({
    //       type: InvoiceActionTypes.SAVE_INVOICE_SUCCESS,
    //       payload: {message: null}
    //     }); 

    //     this.adminInvoice.dispatch({
    //       type: InvoiceActionTypes.EDIT_INVOICE_SUCCESS,
    //       payload: {message: null}
    //     }); 

    //     this.getInvoices();
    //   }

    //   if(invoice.error){
    //     this.snackBar.open("Something went wrong please try again later or contact your administrator", "", {
    //       duration: 4000,
    //       panelClass:'danger-snackbar'
    //     });

    //     this.adminInvoice.dispatch({
    //       type: InvoiceActionTypes.SAVE_INVOICE_FAIL,
    //       payload: null
    //     }); 

    //     this.adminInvoice.dispatch({
    //       type: InvoiceActionTypes.EDIT_INVOICE_FAIL,
    //       payload: null
    //     }); 
    //   }
    // })
  }

  ngOnDestroy(): void {
    if(this.req) this.req.unsubscribe();
  }

  // edit event emitter
  editDataDialog(event){
    if(event){
      this.openAddInvoice(event?.data);
    }
  }

  // delete event emitter
  deleteDataDialog(event){
    if(event){
      let deleteDialog = this.dialog.open(
        DeleteRecordComponent,
        { 
          minWidth: '30vw',
          data: event?.data,
        }
      );

      deleteDialog
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {
        if(result?.data || (result && !result.cancel && event?.data)){
          // this.adminInvoice.dispatch({
          //   type: InvoiceActionTypes.DELETE_INVOICE,
          //   payload: [result?.data || event?.data]
          // }); 
          // after delete refresh store
          console.log("DATA WILL BE DELETED", (result?.data || event?.data))
        }
      });
    }
  }

  openXeroSettings(){
    let createInvoiceDialog = this.dialog.open(
      AddXeroSettingComponent,
      { 
        minWidth: '30vw',
        data: {},
      }
    );

    createInvoiceDialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {

    });
  }

  openAddInvoice(data?: any){
    let createInvoiceDialog = this.dialog.open(
      AddInvoiceComponent,
      { 
        minWidth: '30vw',
        maxWidth: '55vw',
        data: data,
      }
    );

    createInvoiceDialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {

    });
  }

  getInvoices(){
    // this.adminInvoice.dispatch({
    //   type: InvoiceActionTypes.GET_INVOICE_LIST
    // }); 
  }

}
