import { Component, OnInit, Input } from '@angular/core';
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
import { CustomDocumentModalComponent } from '../../../../client-shared/modals/custom-document-modal/custom-document-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { AdminProfileState } from '@main/views/admin-panel/store';
import { AdminEnumsActionTypes } from '@main/views/admin-panel/store/actions/admin-enums.actions';

@Component({
  selector: 'client-main-profile-details',
  animations: [mainAnimations],
  templateUrl: './main-profile-details.component.html',
  styleUrls: ['./main-profile-details.component.scss']
})
export class MainProfileDetailsComponent implements OnInit {
  private clientsData$: any;
  private req: Subscription;
  private client$: any;
  private unsubscribe$ = new Subject<void>();

  @Input() clientData: any = {};
  
  radioOptions:any[] = [{id: true, name: "Yes", value: true}, {id: false, name:"No", value: false}];
  public pmRequireApproval: boolean = true;
  public indigenous: boolean = false;

  public loadingEnums:boolean = false
  public countriesEnums: any [] = []

  public clientSelectedCountry:string = ''
  enum$: any;

  constructor(public dialog: MatDialog,
    private router: Router,  
    private route: ActivatedRoute,
    private adminEnumStore: Store<AdminProfileState>) { 

    this.enum$ = this.adminEnumStore.pipe(select(state => state.adminEnums));

  }

  ngOnInit(): void {
    this.pmRequireApproval = this.clientData?.pm_require_approval == 1 ? true : false;
    this.indigenous = this.clientData?.indigenous == 1 ? true : false;
    this.adminEnumStore.dispatch({
      type: AdminEnumsActionTypes.GET_COUNTRIES
    });
    this.subscribeEnum()
    console.log(this.clientData)
  }

  subscribeEnum(){
    let optionsEnum = this.enum$;
    this.req = optionsEnum.subscribe((results: any) => {
      this.countriesEnums = results.countries;

      this.clientSelectedCountry = this.countriesEnums.find(res => res.id === this.clientData?.birthplace_country_id)?.name
      // debugger

      // this.religionEnums = results.religions;
      this.loadingEnums = results.pending;
    })
  }

  openCustomDocumentModal(){
    let customDocumentDialog = this.dialog.open(
      CustomDocumentModalComponent,
      {
        width: '400px',
        data: {
        },
      }
    );

    customDocumentDialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {
      let doc = {
        provider: "",
        membership_no: "",
        expiry_date: undefined,
        attachment: ""
      }
      if(result){
        //doc.provider = result.customProvider
        //doc.membership_no = result.membershipNumber
        //doc.expiry_date = result.expiryDate ? this.convertToDateTime(result.expiryDate): null;
        //doc.attachment = result.file;

        //this.documents.push(doc);
        //this.editDocuments.add.push(doc);
      }
    });
  }

  navigateTo(step){
    sessionStorage.setItem('clientFormStep', `${step}`);
    this.router.navigate([`/admin/clients/edit/${this.clientData?.id}`]);

    /*routerLink="/admin/clients/details/{{clientData?.id}}/goals"*/
  }

}
