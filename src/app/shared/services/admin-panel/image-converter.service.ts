import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable, of, BehaviorSubject } from "rxjs";
import { map, filter, switchMap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageConverterService {
  private server = environment.host;
  constructor(private http: HttpClient) {}

  convertImageToBase64(image_url: any): Observable<any> {
    return this.http.post<any>(`${this.server}/v2/proxy-image`, {
        image_url: image_url
    }).pipe(
      map((res) => <any[]>res.data),
      catchError(this.handleError)
    );
  }

  // error handler
  private handleError(error: any, caught: any): any {
    throw error;
  }
}
