import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject, forkJoin, from } from 'rxjs';
import { map, filter, switchMap, catchError, mergeMap, concatMap  } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  private server = environment.host;
  private loggedUser: any = JSON.parse(localStorage.getItem('loggedUserData'));

  constructor(private http: HttpClient) {}

  // create customer of stripe
  createCustomerTest(): Observable<any>{
    let url = 'https://api.stripe.com/v1/customers';  
    let data = {
      email: this.loggedUser?.email_address,  
      description: `${this.loggedUser?.role_title}:${this.loggedUser?.organization_input}`,
      name: `${this.loggedUser?.first_name} ${this.loggedUser?.last_name}`
    };

    return this.http.post<any>(url, data).pipe(
      map((res: any) => <any>res),
      catchError(this.handleError)
    );
  }

  // get customer id of the organization
  getCustomerId(): Observable<any>{
    const params = new HttpParams().set('query', `email:"${this.loggedUser?.email_address}"`);

    let url = `https://api.stripe.com/v1/customers/search`;  
    
    return this.http.get<any>(url, { params }).pipe(
      map((res: any) => <any>res),
      catchError(this.handleError)
    );
  }

  // generate test charge to assigned card
  generateChargeTest(): Observable<any>{
    let url = 'https://api.stripe.com/v1/payment_intents ';  
    let customerData = JSON.parse(sessionStorage.getItem('stripeCustomer'));
    let data = {
      amount: 45 * (100), // convert to cents, 
      currency: 'aud', 
      customer: customerData?.id,
      description: "Test LAMA Stripe Charge",
      payment_method: customerData?.invoice_settings?.default_payment_method,
      receipt_email: 'Sherwin@moveup.app',
      confirm: true
    };

    return this.http.post<any>(url, data).pipe(
      map((res: any) => <any>res),
      catchError(this.handleError)
    );
  }

  // create item price
  createPrice(): Observable<any>{
    let url = 'https://api.stripe.com/v1/prices';  
    let data = {
      unit_amount: (3.89 * 40) * (100),  
      currency: 'aud',  
      product: `prod_NhJWQeijIIVKLC`
    };

    return this.http.post<any>(url, data).pipe(
      map((res: any) => <any>res),
      catchError(this.handleError)
    );
  }

  // get item price
  getPrice(): Observable<any>{
    let url = `https://api.stripe.com/v1/prices/${environment?.productKeyForClientPrice}`;  

    return this.http.get<any>(url).pipe(
      map((res: any) => <any>res),
      catchError(this.handleError)
    );
  }

  // create test invoice
  createInvoiceTest(trialDay): Observable<any>{
    const invoiceItemUrl = 'https://api.stripe.com/v1/invoiceitems';
    const invoiceUrl = 'https://api.stripe.com/v1/invoices';

    let invoiceData = {
      customer: JSON.parse(sessionStorage.getItem('stripeCustomer'))?.id,
      auto_advance: false,
      collection_method: 'send_invoice',
      days_until_due: trialDay,
      currency: 'aud',
      description: 'LAMA Subscription Setup Fee',
    };

    let invoiceResponse: any;

    // create invoice
    return this.http.post<any>(invoiceUrl, invoiceData).pipe(
      // include item to invoice
      switchMap((invoice: any) => {
        let invoiceItemData = {
          customer: JSON.parse(sessionStorage.getItem('stripeCustomer'))?.id,
          description: `LAMA Subscription Setup Fee`,
          currency: 'aud',
          price: environment?.productKeyForSetupFee, // LAMA SETUP FEE PRICE ID
          invoice: invoice?.id
        };

        invoiceResponse = invoice; 

        return this.http.post<any>(invoiceItemUrl, invoiceItemData);
      }),
      // send invoice to customer
      switchMap((invoice: any) => {
        return this.http.post<any>(`${invoiceUrl}/${invoiceResponse?.id}/send`, {});
      }),
      map((invoice: any) => <any>invoice),
      catchError(this.handleError)
    );
  }

  // create test invoice
  createSMSInvoice(quantity: number): Observable<any>{
    const invoiceItemUrl = 'https://api.stripe.com/v1/invoiceitems';
    const invoiceUrl = 'https://api.stripe.com/v1/invoices';

    let invoiceData = {
      customer: JSON.parse(sessionStorage.getItem('stripeCustomer'))?.id,
      auto_advance: false,
      collection_method: 'send_invoice',
      days_until_due: 2,
      currency: 'aud',
      description: 'LAMA SMS Credit (1000 Credit)',
    };

    let invoiceResponse: any;

    // create invoice
    return this.http.post<any>(invoiceUrl, invoiceData).pipe(
      // include item to invoice
      switchMap((invoice: any) => {
        let invoiceItemData = {
          customer: JSON.parse(sessionStorage.getItem('stripeCustomer'))?.id,
          description: `LAMA SMS Credit (1000 Credit)`,
          currency: 'aud',
          price: environment?.productKeyForSMSCredit, // LAMA SETUP FEE PRICE ID
          quantity: quantity,
          invoice: invoice?.id
        };

        invoiceResponse = invoice; 

        return this.http.post<any>(invoiceItemUrl, invoiceItemData);
      }),
      // send invoice to customer
      switchMap((invoice: any) => {
        return this.http.post<any>(`${invoiceUrl}/${invoiceResponse?.id}/send`, {});
      }),
      map((invoice: any) => <any>invoice),
      catchError(this.handleError)
    );
  }

  getSMSInvoice(){
    const priceId = environment?.productKeyForSMSCredit;
    const customerId = JSON.parse(sessionStorage.getItem('stripeCustomer')).id;
    const url = `https://api.stripe.com/v1/invoices?customer=${customerId}`;

    return this.http.get<any>(url).pipe(
      map((res: any) => {
        return res?.data?.filter(el => JSON.stringify(el).match(priceId))
      }),
      catchError(this.handleError)
    );  
  }

  // get all customer invoice
  getCustomerInvoice(){
    const customerId = JSON.parse(sessionStorage.getItem('stripeCustomer')).id;
    const url = `https://api.stripe.com/v1/invoices?customer=${customerId}`;
    const priceId = environment?.productKeyForSMSCredit;
    
    return this.http.get<any>(url).pipe(
      map((res: any) => {
        return res?.data?.filter(el => !JSON.stringify(el).match(priceId))
      }),
      catchError(this.handleError)
    );
  }


  // Create Subscription
  createSubscriptionTest(trialDay): Observable<any>{
    // Product ID for Participant (Early Adopter Price) - $3.89 AUD
    const priceId = environment?.productKeyForClientPrice; 
    const customerId = JSON.parse(sessionStorage.getItem('stripeCustomer')).id;
    const url = 'https://api.stripe.com/v1/subscriptions';
    const data = {
      customer: customerId,
      items: [{ 
        "price": priceId,
        "quantity": 40 // number of clients active
      }],
      collection_method: 'send_invoice',
      days_until_due: 2,
      trial_end: Math.floor(Date.now() / 1000) + (trialDay * 24 * 60 * 60) // 30 days from now
    };

    return this.http.post<any>(url, data).pipe(
      map((res: any) => <any>res),
      catchError(this.handleError)
    );
  }

  // get customer subscription
  getSubscription(){
    const customerId = JSON.parse(sessionStorage.getItem('stripeCustomer')).id;
    const url = `https://api.stripe.com/v1/subscriptions?customer=${customerId}`;

    return this.http.get<any>(url).pipe(
      map((res: any) => <any>res),
      catchError(this.handleError)
    );
  }

  // update subscription trial to 30 days
  updateSubscriptionTest(subscription: any, addMoreDay: number): Observable<any>{
    const customerId = JSON.parse(sessionStorage.getItem('stripeCustomer')).id;
    const url = `https://api.stripe.com/v1/subscriptions/${subscription?.id}`;
    const data = {
      items: [{ 
        "id": subscription?.items?.data[0]?.id,
        "quantity": 60 // number of clients active
      }],
      trial_end: Math.floor(Date.now() / 1000) + (addMoreDay * 24 * 60 * 60) // 30 days from now
    };

    console.log("SUBSCRIPTION DATA", data)

    return this.http.post<any>(url, data).pipe(
      map((res: any) => <any>res),
      catchError(this.handleError)
    );
  }

  cancelSubscription(subscription: any){
    //console.log(subscription)
    const customerId = JSON.parse(sessionStorage.getItem('stripeCustomer')).id;
    const url = `https://api.stripe.com/v1/subscriptions/${subscription?.id}`;
    //const params = new HttpParams().set('query', `cancellation_reason:"${subscription.cancellation_reason}"`);
    const requestBody = {
      //cancellation_reason: subscription.cancellation_reason,
      cancellation_details: {
        comment: subscription.cancellation_reason
      }
    };

    return this.http.delete<any>(url, { body: requestBody }).pipe(
      map((res: any) => <any>res),
      catchError(this.handleError)
    );
  }

  generatePaymentLink(invoice: any): Observable<any> {
    // Next, create the payment link
    const paymentLinkUrl = `https://api.stripe.com/v1/payment_links`;
    const paymentLinkData = {
      line_items: [{
        price: invoice?.lines?.data[0]?.price?.id,  
        quantity: invoice?.lines?.data[0]?.quantity
      }]
    };

    return this.http.post<any>(paymentLinkUrl, paymentLinkData).pipe(
      map((res: any) => <any>res),
      catchError(this.handleError)
    );
  }

  generateCheckoutPage(invoice: any): Observable<any> {
    // Next, create the payment link
    const paymentLinkUrl = `https://api.stripe.com/v1/checkout/sessions`;
    const paymentLinkData = {
      cancel_url: 'https://example.com/cancel',
      success_url: 'https://example.com/success',
      mode: 'payment',
      customer: JSON.parse(sessionStorage.getItem('stripeCustomer'))?.id,
      line_items: [{
        price: invoice?.lines?.data[0]?.price?.id,  
        quantity: invoice?.lines?.data[0]?.quantity
      }]
    };

    return this.http.post<any>(paymentLinkUrl, paymentLinkData).pipe(
      map((res: any) => <any>res),
      catchError(this.handleError)
    );
  }


  createSetupIntent(): Observable<any> {
    const url = 'https://api.stripe.com/v1/setup_intents';
    const data = { customer: JSON.parse(sessionStorage.getItem('stripeCustomer'))?.id };
    return this.http.post<any>(url, data).pipe(
      map((res: any) => <any>res),
      catchError(this.handleError)
    );
  }

  generateSetupLink(setupIntentId: string): Observable<any> {
    const url = `https://api.stripe.com/v1/setup_intents/${setupIntentId}/confirm`;
    const data = { return_url: 'http://localhost:8843/admin/setup/organization-settings' };
    return this.http.post<any>(url, data).pipe(
      map((res: any) => <any>res),
      catchError(this.handleError)
    );
  }

  // create customer payment method
  createPaymentMethod(body: any): Observable<any> {
    const url = `https://api.stripe.com/v1/payment_methods`;
    let paymentMethodID;  
    let customerID = JSON.parse(sessionStorage.getItem('stripeCustomer'))?.id;


    return this.http.post<any>(url, body).pipe(
      // include item to invoice
      switchMap((paymentMethod: any) => {
        paymentMethodID = paymentMethod?.id;  
        
        let attachPaymentUrl = `https://api.stripe.com/v1/payment_methods/${paymentMethodID}/attach`

        return this.http.post<any>(attachPaymentUrl, { customer: customerID });
      }),
      switchMap((paymentMethod: any) => {
        let updateDefaultPayment = `https://api.stripe.com/v1/customers/${customerID}`
        return this.http.post<any>(updateDefaultPayment, {
          invoice_settings: {
            default_payment_method: paymentMethodID
          } 
        });
      }),
      map((res: any) => <any>res),
      catchError(this.handleError)
    );
  }

  // create customer payment method other
  createMorePaymentMethod(body: any): Observable<any> {
    const url = `https://api.stripe.com/v1/payment_methods`;
    let paymentMethodID;  
    let customerID = JSON.parse(sessionStorage.getItem('stripeCustomer'))?.id;


    return this.http.post<any>(url, body).pipe(
      // include item to invoice
      switchMap((paymentMethod: any) => {
        paymentMethodID = paymentMethod?.id;  
        
        let attachPaymentUrl = `https://api.stripe.com/v1/payment_methods/${paymentMethodID}/attach`

        return this.http.post<any>(attachPaymentUrl, { customer: customerID });
      }),
      map((res: any) => <any>res),
      catchError(this.handleError)
    );
  }

  getPaymentMethod(): Observable<any> {
    const params = new HttpParams().set('query', `email:"${this.loggedUser?.email_address}"`);
    const url = `https://api.stripe.com/v1/customers/search`;  
    const customerID = JSON.parse(sessionStorage.getItem('stripeCustomer'))?.id;

    return this.http.get<any>(url, { params }).pipe(
      // include item to invoice
      switchMap((customer: any) => {
        let customerData = customer
        let paymentMethodID = customer?.data[0]?.invoice_settings?.default_payment_method;  
        let paymentMethodURL = `https://api.stripe.com/v1/payment_methods/${paymentMethodID}`;

        console.log(customerData, paymentMethodID)

        if(paymentMethodID){
          return this.http.get<any>(paymentMethodURL).pipe(
            map((paymentMethod: any) => {
              return {
                customer: customerData,
                paymentMethod: paymentMethod
              }
            }),
            catchError(this.handleError)
          );
        }

        else return new Promise((res, rej) => { return { customer: customerData }})
      }),
      map((paymentMethod: any) => <any>paymentMethod),
      catchError(this.handleError)
    );
  }

  // error handler
  private handleError(error: any, caught: any): any {
    throw error;
  }

}
