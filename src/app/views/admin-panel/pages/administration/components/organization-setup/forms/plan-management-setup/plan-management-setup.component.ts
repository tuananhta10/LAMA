import { 
  Component, 
  OnDestroy, 
  OnInit, 
  Input,
  Output,
  Inject,
  ChangeDetectorRef,
  AfterViewInit,
  EventEmitter,
  ViewChild
} from '@angular/core';
import { mainAnimations } from '@app-main-animation';
import { Router, ActivatedRoute } from '@angular/router';
import { 
  Subscription, 
  Observable, 
  forkJoin, 
  combineLatest 
} from 'rxjs';
import { 
  select, 
  Store 
} from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { MatStepper } from '@angular/material/stepper';
import { StepModel } from '@main/shared/components/stepper/model';
import { StripeService } from '@main/shared/services/stripe-api/stripe.service';
import { AddStripePaymentMethodComponent } from '../../../../dialogs/add-stripe-payment-method/add-stripe-payment-method.component';
import { CancelSubscriptionComponent } from '../../../../dialogs/cancel-subscription/cancel-subscription.component';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'admin-organization-plan-management-setup',
  animations: [mainAnimations],
  templateUrl: './plan-management-setup.component.html',
  styleUrls: ['./plan-management-setup.component.scss']
})
export class PlanManagementSetupComponent implements OnInit {
  @Output() isValid: EventEmitter<any> = new EventEmitter<any>();

  public dateFormat:string[] = ["d-M-yyyy", "dd-MM-yyyy", "d-MMM-yyy", "yyyy-M-d"];
  public timeFormat: string[] = ["24 Hours", "12 Hours AM/PM"];
  public radioOptions:any[] = [{id: true, name: "Yes", value: true}, {id: false, name:"No", value: false}];
  
  public loading: boolean = true;

  private invoiceReq: Subscription;
  private req: Subscription;
  private unsubscribe$ = new Subject<void>();
  public stripeObject: any;
  public error: any;
  public subscriptionData: any;
  public customerData: any;
  public invoiceList: any[] = [];
  public filteredInvoice: any[] = [];
  public searchBy;
  

  constructor(private stripeService: StripeService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,) {
    
  }

  ngOnInit(): void {
    this.getSubscription();
    this.getAllInvoice();
    this.getCustomerData();

    setTimeout(() => {
      this.loading = false;
      }, 1000);
  }



  ngOnDestroy(): void {
    this.isValid.emit({formStep: 3, isValid: true})

    if(this.req) this.req.unsubscribe();
    if(this.invoiceReq) this.invoiceReq.unsubscribe();
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

  getCustomerData(){
    this.req = this.stripeService.getPaymentMethod().subscribe((result: any) => {
      console.log(result)
      this.customerData = result;
    }, err => {
      this.error = err;
      console.log(err)
    })
  }

  generateChargeTest(){
    this.req = this.stripeService.generateChargeTest().subscribe((result: any) => {
      console.log(result)
      this.stripeObject = result
    }, err => {
      this.error = err;
      console.log(err)
    })
  }

  createPriceForInvoice(){
    this.req = this.stripeService.createPrice().subscribe((result: any) => {
      console.log(result)
      this.stripeObject = result
    }, err => {
      this.error = err;
      console.log(err)
    })
  }

  getItemPrice(){
    this.req = this.stripeService.getPrice().subscribe((result: any) => {
      console.log(result)
      this.stripeObject = result
    }, err => {
      this.error = err;
      console.log(err)
    })
  }

  createCustomer(){
    this.req = this.stripeService.createCustomerTest().subscribe((result: any) => {
      console.log(result)
      this.stripeObject = result
    }, err => {
      this.error = err;
      console.log(err)
    })
  }

  getCustomer(){
    this.req = this.stripeService.getCustomerId().subscribe((result: any) => {
      console.log(result)
      sessionStorage.setItem('stripeCustomer', JSON.stringify(result?.data[0]));
      this.stripeObject = result;
    }, err => {
      this.error = err;
      console.log(err)
    })
  }

  createInvoice(){
    this.req = this.stripeService.createInvoiceTest(30).subscribe((result: any) => {
      console.log(result)
      this.stripeObject = result
    }, err => {
      this.error = err;
      console.log(err)
    });
  }

  getAllInvoice(){
    this.req = this.stripeService.getCustomerInvoice().subscribe((result: any) => {
      console.log(result)
      this.invoiceList = result;
      this.filteredInvoice = [...this.invoiceList];
    }, err => {
      this.error = err;
      console.log(err)
    });
  }

  createSubscription(){
    this.req = this.stripeService.createSubscriptionTest(1).subscribe((result: any) => {
      console.log(result)
      this.stripeObject = result
    }, err => {
      this.error = err;
      console.log(err)
    });
  }

  getSubscription(){
    this.req = this.stripeService.getSubscription().subscribe((result: any) => {
      console.log("Subscription", result)
      //this.stripeObject = result;
      this.subscriptionData = result?.data[0];
    }, err => {
      this.error = err;
      console.log(err)
    });
  }

  updateSubscription(){
    this.req = this.stripeService.updateSubscriptionTest(this.subscriptionData, 1).subscribe((result: any) => {
      console.log(result)
      this.stripeObject = result;
    }, err => {
      this.error = err;
      console.log(err)
    });
  }

  cancelSubscription(){
    let cancelSubscriptionDialog = this.dialog.open(
      CancelSubscriptionComponent,
      { 
        minWidth: '30vw',
      }
    );

    cancelSubscriptionDialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {

      if(result?.cancel === true){
        
        console.log("CANCEL Subscription", result)
        
        this.req = this.stripeService.cancelSubscription({...this.subscriptionData, cancellation_reason: result?.cancellationReason}).subscribe((result: any) => {
          console.log(result)
          this.snackBar.open("You successfully cancelled the subscription for this organization. \n \n If you want to update your subscription please contact us at info@lamacare.com.au", "", {
            duration: 4000,
            panelClass:'success-snackbar'
          });

          //setTimeout(() => window.location.reload(), 2500);
        }, err => {
          this.error = err;
          console.log(err)
        });
        
      }
    });
  }

  generatePaymentLink(invoice: any){
    console.log(invoice)

    window.open(invoice?.hosted_invoice_url, '_blank');
  }


  // stripe payment method
  addPaymentMethodDialog(){
    let paymentMethodDialog = this.dialog.open(
      AddStripePaymentMethodComponent,
      { 
        width: '40vw',
      }
    );

    paymentMethodDialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {
      if(result && !this.customerData?.paymentMethod){
        this.snackBar.open("Please wait while we link your payment method.", "", {
          panelClass:'success-snackbar'
        });


        this.stripeService.createPaymentMethod(result)
        .subscribe((paymentMethod: any) => {
            // Payment method created successfully
            console.log(paymentMethod)

            this.snackBar.open("You successfully link your payment method.", "", {
              duration: 4000,
              panelClass:'success-snackbar'
            });

            setTimeout(() => window.location.reload(), 2500);
            
          },
          error => {
            this.snackBar.open("Error linking payment method. " + error?.error?.error?.message, "", {
              duration: 4000,
              panelClass:'danger-snackbar'
            });

            console.log(error?.error)
            // Handle error
          }
        );
        
      }

      else if(result && this.customerData?.paymentMethod){
        this.snackBar.open("Please wait while we link your payment method.", "", {
          panelClass:'success-snackbar'
        });


        this.stripeService.createMorePaymentMethod(result)
        .subscribe((paymentMethod: any) => {
            // Payment method created successfully
            console.log(paymentMethod)

            this.snackBar.open("You successfully link your payment method.", "", {
              duration: 4000,
              panelClass:'success-snackbar'
            });

            setTimeout(() => window.location.reload(), 2500);
            
          },
          error => {
            this.snackBar.open("Error linking payment method. " + error?.error?.error?.message, "", {
              duration: 4000,
              panelClass:'danger-snackbar'
            });

            console.log(error?.error)
            // Handle error
          }
        );
      }
    });
  }


  updateNegativeInvoice(amount){
    return amount < 0 ? `($${Math.abs(amount)})` : `$${amount}`
  }
}
