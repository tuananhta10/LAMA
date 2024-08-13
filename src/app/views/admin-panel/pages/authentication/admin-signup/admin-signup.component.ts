import { 
  Component, 
  OnInit, 
  OnDestroy 
} from '@angular/core';
import { 
  Router, 
  ActivatedRoute 
} from '@angular/router';
import { 
  FormBuilder, 
  FormGroup, 
  Validators,
  FormControl, 
  FormGroupDirective, 
  NgForm,
} from '@angular/forms';

import { AdminService } from '@app-services/admin-panel/admin.service';
import { LoginAuthenticationService } from '@app-services/admin-panel/login-authentication.service';
import { mainAnimations } from '@app-main-animation';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SuccessSignupDialogComponent } from '../dialogs/success-signup-dialog/success-signup-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PromotionDialogComponent } from '../dialogs/promotion-dialog/promotion-dialog.component';


@Component({
  selector: 'app-admin-signup',
  animations: [mainAnimations],
  templateUrl: './admin-signup.component.html',
  styleUrls: ['./admin-signup.component.scss']
})
export class AdminSignupComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  constructor(
    private router:Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private adminService: AdminService,
    private dialog: MatDialog,
    private signupService: LoginAuthenticationService) { 
  }

  ngOnInit(){
    setTimeout(() => this.promotionModal(), 1000)
  }

  ngOnDestroy(): void {
  }

  promotionModal(){
    let promotionDialog = this.dialog.open(
      PromotionDialogComponent,
      { 
        //width: '40vw',
        data: {
        },
      }
    );

    promotionDialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {
    });
  }

  openSuccessModal(event){
    if(event){
      console.log(event);
      let createClientDialog = this.dialog.open(SuccessSignupDialogComponent, { data: { } });

      createClientDialog
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {
        this.adminService.setAdminLogin(true);
        this.router.navigate(['/signup/admin/onboarding']);
      });
    }
  }
}
