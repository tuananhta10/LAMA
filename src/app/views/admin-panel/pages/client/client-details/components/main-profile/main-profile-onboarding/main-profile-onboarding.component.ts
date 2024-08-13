import { Component, OnInit, Input } from '@angular/core';
import { mainAnimations } from '@app-main-animation';
import { ViewOnboardingNotesComponent } from '../../../dialogs/view-onboarding-notes/view-onboarding-notes.component';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'client-main-profile-onboarding',
  animations: [mainAnimations],
  templateUrl: './main-profile-onboarding.component.html',
  styleUrls: ['./main-profile-onboarding.component.scss']
})
export class MainProfileOnboardingComponent implements OnInit {
  @Input() clientData: any = {};
  @Input() onboardingNotes: any = {};
  private unsubscribe$ = new Subject<void>();
  public radioOptions:any[] = [{id: true, name: "Yes", value: true}, {id: false, name:"No", value: false}];
  public pmRequireApproval: boolean = true;
  public indigenous: boolean = false;

  constructor(public dialog: MatDialog,
    private router: Router,  
    private route: ActivatedRoute ) { }

  ngOnInit(): void {
  }

  openOnboardingModal(){
    let onboardingDialog = this.dialog.open(
      ViewOnboardingNotesComponent,
      {
        width: '700px',
        data: this.onboardingNotes
      }
    );

    onboardingDialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {
      
    });
  }


  navigateTo(step){
    sessionStorage.setItem('clientFormStep', `${step}`);
    this.router.navigate([`/admin/clients/edit/${this.clientData?.id}`]);

    /*routerLink="/admin/clients/details/{{clientData?.id}}/goals"*/
  }

}
