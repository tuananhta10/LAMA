import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { mainAnimations } from '@app-main-animation';
import { Router, ActivatedRoute } from '@angular/router';
import { 
  Subscription, 
  Observable, 
  forkJoin, 
  combineLatest 
} from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { 
  select, 
  Store 
} from '@ngrx/store';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { 
  displayedColumns,
  TableHeader,
  Interests,
  selectedColumns,
  interestList 
} from '../../utils/interest-list-model-interface';
import { AddSkillsComponent } from '../../dialogs/add-skills/add-skills.component';
import { ViewEmployeePositionComponent } from '../../dialogs/view-employee-position/view-employee-position.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { InterestActionTypes } from '@main/views/admin-panel/store/actions/admin-interest.action';
import { DeleteRecordComponent } from '../../dialogs/delete-record/delete-record.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StripeService } from '@main/shared/services/stripe-api/stripe.service';

@Component({
  selector: 'app-sms-credits',
  animations: [mainAnimations],
  templateUrl: './sms-credits.component.html',
  styleUrls: ['./sms-credits.component.scss']
})
export class SmsCreditsComponent implements OnInit {

  private interestData$: any;
  private req: Subscription;
  private unsubscribe$ = new Subject<void>();

  public clientData: any = {};
  public routerUrl: any[] = [];
  public loading: boolean = true;
  public id;
  public displayedColumns: TableHeader[] = displayedColumns;
  public interestList: Interests[] = []//interestList;
  public selectedColumns: string[] = selectedColumns;
  public listView: boolean = true;
  public invoiceList: any[] = [];
  public filteredInvoice: any[] = [];
  public searchBy;
  public error: any;
  public creditValue: any = 1000;
  public ticks = [1000, 2000, 3000, 4000, 5000, 6000, 7000];
  public creditVal = [
    {
      amount: 60,  
      credit: 1000
    },

    {
      amount: 120,  
      credit: 2000
    },

    {
      amount: 180,  
      credit: 3000
    },

    {
      amount: 240,  
      credit: 4000
    },

    {
      amount: 300,  
      credit: 5000
    },

    {
      amount: 360,  
      credit: 6000
    },

    {
      amount: 420,  
      credit: 7000
    },
  ]

  constructor(private adminInterest: Store<AdminProfileState>,
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private stripeService: StripeService,
    private snackBar: MatSnackBar) {
    this.id = route.parent.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getAllInvoice();
    
  }

  ngOnDestroy(): void {
    if(this.req) this.req.unsubscribe();
  }

  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    console.log(value)

    return `${value}`;
  }

  onInputChange(event){

  }

  searchDataSource(){
    const listDataSource = [...this.invoiceList]
    .filter(el => {
      /*
        <td>{{item?.customer_name}}</td>
        <td>{{item?.lines?.data[0]?.description}}</td>
        <td class="text-capitalize">{{item?.status}}</td>
        <td class="text-uppercase">{{item?.currency}}</td>
        <td>{{item?.paid ? "Yes" : "No"}}</td>
        
        <td>{{(item?.lines?.data[0]?.price?.unit_amount !== 0 ? updateNegativeInvoice(item?.lines?.data[0]?.price?.unit_amount/100) : 0)}}</td>

        <td>{{item?.lines?.data[0]?.quantity}}</td>

        <td>{{(item?.total !== 0 ? updateNegativeInvoice(item?.total/100) : 0)}}</td>
        <td>{{ (item?.due_date * 1000) | date: 'dd MMM, yyyy'}}</td>

      */

      let source = {
        customer_name: el?.customer_name,
        line_description: el?.lines?.data[0]?.description,
        /*customer_name: el?.id,
        customer_name: el?.id,
        customer_name: el?.id,
        customer_name: el?.id,
        customer_name: el?.id,*/
      }

      return JSON.stringify(el).toLowerCase().includes(this.searchBy.toLowerCase());
    });

    this.filteredInvoice = listDataSource;
  }

  getAllInvoice(){
    this.req = this.stripeService.getSMSInvoice().subscribe((result: any) => {
      this.invoiceList = result;
      this.filteredInvoice = [...this.invoiceList];
      this.loading = false;
    }, err => {
      this.error = err;
      console.log(err)
    });
  }

  purchaseSMSCredit(quantity: number){
    this.req = this.stripeService.createSMSInvoice(quantity).subscribe((result: any) => {
      console.log(result)
      this.loading = true;
      this.getAllInvoice();
      
    }, err => {
      this.error = err;
      console.log(err)
    });
  }

  updateNegativeInvoice(amount){
    return amount < 0 ? `($${Math.abs(amount)})` : `$${amount}`
  }

  generatePaymentLink(invoice: any){
    console.log(invoice)

    window.open(invoice?.hosted_invoice_url, '_blank');
  }
}
