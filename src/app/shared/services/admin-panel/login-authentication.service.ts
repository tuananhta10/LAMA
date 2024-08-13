import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable, of, BehaviorSubject } from "rxjs";
import { map, filter, switchMap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginAuthenticationService {
  private isAdminLoggedIn: any;
  private server = environment.host;

  constructor(private http: HttpClient,
    private router: Router) {
  }

  // post login admin
  postLogin(body?: any): Observable<any> {
    const json_data = {
      // base 64
      'request_data': window.btoa(JSON.stringify(body))
    };

    // create login data
    return this.http.post<any>(`${this.server}/login`, json_data).pipe(
      // include item to login data
      // switchMap((loginData: any) => {
      //   const params = new HttpParams().set('query', `email:"${loginData?.data?.email_address}"`);
      //   const url = `https://api.stripe.com/v1/customers/search`;

      //   return this.http.get<any>(url, { params }).pipe(
      //     map((stripeData: any) => {
      //       return {
      //         stripeData: stripeData,
      //         loginData: loginData
      //       }
      //     }),
      //     catchError(this.handleError)
      //   );
      // }),
      // switchMap((loginData: any) => {
      //   const customerId = loginData?.stripeData?.data[0]?.id;
      //   const url = `https://api.stripe.com/v1/subscriptions?customer=${customerId}`;

      //   if(loginData?.loginData?.data?.role_title === 'Lama Admin'){
      //     return this.http.get<any>(url).pipe(
      //       map((subscriptionData: any) => {
      //         return {
      //           ...loginData,
      //           subscriptionData: subscriptionData
      //         }
      //       }),
      //       catchError(this.handleError)
      //     );
      //   } else {
      //     return new Promise((res, rej) => {
      //       return res({...loginData})
      //     });
      //   }
      // }),
      map((loginData: any) => <any>loginData),
      catchError(this.handleError)
    );
  }


  // error handler
  private handleError(error: any, caught: any): any {
    throw error;
  }

  // old registration route
  postRegister(body: any): Observable<any> {
    const json_data = {
      // base 64
      'request_data': window.btoa(JSON.stringify(body))
    };

    return this.http
    .post(`${this.server}/register`, json_data)
    .pipe(
      map(res => res)
    );
  }

  // register as admin, client, or employee
  postRegisterMain(body: any): Observable<any> {
    // create login data
    return this.http.post<any>(`${this.server}/register-user`, body).pipe(
      // include item to login data
      switchMap((result: any) => {
        let registrationData = result;
        // let url = 'https://api.stripe.com/v1/customers';
        let url = environment.xeroHost;
        // let data = {
        //   email: registrationData?.data?.email_address,
        //   description: `${registrationData?.data?.role_title}:${registrationData?.data?.organization_input}`,
        //   name: `${registrationData?.data?.first_name} ${registrationData?.data?.last_name}`
        // };

        let data = {
          orgId:registrationData?.data?.id || '',
          orgName:registrationData?.data?.organization_input || '',
          orgEmailAddress:registrationData?.data?.email_address || '',
          orgPhoneNumber:body?.mobile_phone_no || '',
          cityAdress:'',
          regionAdress:'',
          postalCode:'',
          country:'',
          firstName:registrationData?.data?.first_name || '',
          lastName:registrationData?.data?.last_name || ''
        }

        return this.http.post<any>(`${url}xero/addcontacts`, data).pipe(
          map((stripeData: any) => {
            return {
              stripeData: stripeData,
              registrationData: registrationData
            }
          }),
          catchError(this.handleError)
        );
      }),
      map((invoice: any) => <any>invoice),
      catchError(this.handleError)
    );
  }

  updateOrg(body:any) {
    
    return this.http.put(`${this.server}/v2/organization/stripe`, body).pipe(
      map((res: any) => <any>res),
      catchError(this.handleError)
    );
  }


  // create test invoice
  createInvoiceSetupFee(trialDay: number = 14): Observable<any>{
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

  // Create Subscription
  createSubscription(trialDay: number = 14): Observable<any>{
    // Product ID for Participant (Early Adopter Price) - $3.89 AUD
    const priceId = environment?.productKeyForClientPrice;
    const customerId = JSON.parse(sessionStorage.getItem('stripeCustomer')).id;
    const url = 'https://api.stripe.com/v1/subscriptions';
    const data = {
      customer: customerId,
      items: [{
        "price": priceId,
        "quantity": 1 // setup Fee
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

  saveClientOnboarding(body: any): Observable<any> {
    return this.http
    .put(`${this.server}/client`, body)
    .pipe(
      map(res => res)
    );
  }

  // Update admin onboarding details
  saveAdminOnboarding(body: any): Observable<any> {
    return this.http
    .post(`${this.server}/organization`, body)
    .pipe(
      map(res => res)
    );
  }

  /*updateAdminOrganization(body: any, trialPeriod: number): Observable<any> {
    // create login data
    return this.http.put<any>(`${this.server}/admin`, body).pipe(
      // include item to login data
      switchMap((onboardingData: any) => {

        // Product ID for Participant (Early Adopter Price) - $3.89 AUD
        const priceId = 'price_1MvutOGyeyaHHRTVRSVs3zHa';
        const customerId = JSON.parse(sessionStorage.getItem('stripeCustomer')).id;
        const url = 'https://api.stripe.com/v1/subscriptions';
        const data = {
          customer: customerId,
          items: [{
            "price": priceId,
            "quantity": 1 // number of clients active
          }],
          collection_method: 'send_invoice',
          days_until_due: 5,
          trial_end: Math.floor(Date.now() / 1000) + (trialPeriod * 24 * 60 * 60) // 30 days from now
        };

        return this.http.post<any>(url, data).pipe(
          map((stripeData: any) => {
            return {
              stripeData: stripeData,
              onboardingData: onboardingData
            }
          }),
          catchError(this.handleError)
        );
      }),
      map((invoice: any) => <any>invoice),
      catchError(this.handleError)
    );
  }*/

  updateAdminOrganization(body: any): Observable<any> {
    return this.http
    .put(`${this.server}/admin`, body)
    .pipe(
      map(res => res)
    );
  }

  updateAdminFCM(body: any): Observable<any> {
    return this.http
    .put(`${this.server}/admin`, body)
    .pipe(
      map(res => res)
    );
  }

  validateEmail(value: any): Observable<any> {
    return this.http
    .get(`${this.server}/check-email-address?email_address=${value}`)
    .pipe(
      map(res => res)
    );
  }

  syncDefaultValue(): Observable<any>{
    return this.http
    .post(`${this.server}/organization`, {
      function: "sync"
    })
    .pipe(
      map(res => res)
    );
  }

  ssoLogin(): Observable<any> {
    return this.http
    .get(`${this.server}/employee?page=login-info`)
    .pipe(
      map(res => res)
    );
  }

  public sendPasswordResetEmail(data:any):Observable<any>{
    const body = {
      ...data,
      from_admin_portal:true
    }
    return this.http.post(`${this.server}/v2/auth/forgot-password`, body)
    .pipe(map(res => res))
  }

  public updatePassword(data:any):Observable<any>{
    const body = {...data }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${body?.token}`,
    });
    return this.http.put(`${this.server}/v2/auth/change-password`, body?.body, { headers })
    .pipe(map(res => res))
  }
}
