import { Injectable } from "@angular/core";
import { HttpParams, HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = localStorage.getItem("token");
        let headers: any = {
          "content-language": "en",
          "Content-Type": "application/json"
        };

        // Add Stripe API key header if necessary
        if (request.url.includes('https://api.stripe.com')) {
            headers = {
                "content-language": "en",
                'Authorization': `Bearer ${environment.stripeKey}`,
                'Content-Type': 'application/x-www-form-urlencoded' // Set content type to x-www-form-urlencoded
            }

            request = request.clone({ setHeaders: headers, body: this.convertToFormData(request.body) });
        } else {
            // Add authorization token header if available
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            request = request.clone({ setHeaders: headers });
        }

        

        return next.handle(request);
    }

    convertToFormData(data: any): string {
      let body = new HttpParams();
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          if (Array.isArray(data[key])) {
            // Handle array values by looping through each item
            for (let i = 0; i < data[key].length; i++) {
              if (typeof data[key][i] === 'object') {
                for (const subKey in data[key][i]) {
                  if (data[key][i].hasOwnProperty(subKey)) {
                    body = body.append(`${key}[${i}][${subKey}]`, data[key][i][subKey]);
                  }
                }
              } else {
                body = body.append(`${key}[]`, data[key][i]);
              }
            }
          } else if (typeof data[key] === 'object') {
            // Handle nested object values by recursively calling the same function
            for (const subKey in data[key]) {
              if (data[key].hasOwnProperty(subKey)) {
                body = body.append(`${key}[${subKey}]`, data[key][subKey]);
              }
            }
          } else {
            // Handle non-array values
            body = body.set(key, data[key]);
          }
        }
      }
      return body.toString();
    }
}