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
  @Input() id: any;  
  
  radioOptions:any[] = [{id: true, name: "Yes", value: true}, {id: false, name:"No", value: false}];
  public pmRequireApproval: boolean = true;
  public indigenous: boolean = false;

  constructor(public dialog: MatDialog,) { }

  ngOnInit(): void {
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

}
