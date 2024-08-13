import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, BehaviorSubject } from "rxjs";
import { map, filter, switchMap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientListService {

  private server = environment.host;

  constructor(private http: HttpClient) {}

  // ClientListData
  getClientListData(id?: any): Observable<any> {
   //console.log(id)

    let params = {
      page: 'client-list',
      id: id
    };

    /*if(id === 'service-schedule'){
      params = {
        page: 'client-list',
        id: id
      };
    }*/

    /*else*/ if(!id || id === undefined) delete params['id'];

    return this.http.get<any>(`${this.server}/client`,{
      params: params
    })
    .pipe(
      map((res) => <any[]>res.data),
      catchError(this.handleError)
    );
  }

  getClientsWithFunding(): Observable<any> {
    let params = {
      page: 'client-list-modal',
    };

    return this.http.get<any>(`${this.server}/client`,{
      params: params
    })
    .pipe(
      map((res) => <any[]>res.data),
      catchError(this.handleError)
    );
  }

  uploadClient(client: any): Observable<any> {
    return this.http.post(`${this.server}/data-import`, client)
    .pipe(
      map((res) => <any>res)
    );
  }

  deleteClientData(clients): Observable<any> {
    return this.http.delete<any>(`${this.server}/client`, 
      { body: { id: [...clients] }
    })
    .pipe(
      map((res) => <any>res),
      catchError(this.handleError)
    )
  }

  // Client Details
  getClientDetails(id): Observable<any> {
    return this.http.get<any>("assets/fake-db/client-list-simple.json")
    .pipe(
      map((res) => <any>res.data.find(el => el?.client?.id === id)),
      catchError(this.handleError)
    );
  }

  // Client List Feeds
  getClientFeedData(): Observable<any> {
    return this.http.get<any>("assets/fake-db/client-list-feed.json")
    .pipe(
      map((res) => <any[]>res.data),
      catchError(this.handleError)
    );
  }



  /* FOR CHECKING API */
  private config = {
    //"content-language": "en",
    //"Content-Type": "application/json"
  };

  private urlTest:string = `${environment.host}/Stage/branch`;

  // Get Client list from main API
  getClientListFromAPI(): Observable<any> {
    console.log(this.urlTest)

    return this.http.get<any>(this.urlTest)
    .pipe(
      map((res) => <any[]>res),
      catchError(this.handleError)
    );
  }


  postNewProgramFromAPI(): Observable<any> {
    //console.log(this.urlTest)

    return this.http.post<any>(this.urlTest, {
      code:"1654354",
      name:"program 4354",
      provider:"provider 1312",
      self_funded:"1"
    }, { headers: this.config })
    .pipe(
      map((res) => <any[]>res),
      catchError(this.handleError)
    );
  }

  // error handler
  private handleError(error: any, caught: any): any {
    throw error;
  }
}
