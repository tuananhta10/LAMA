import { Routes } from '@angular/router';
import { ReferralsMainComponent } from './referrals-main/referrals-main.component';
import { ReferralsCreateComponent } from './referrals-create/referrals-create.component';

export const AdminReferralsRoutes: Routes = [
  { path: '', component: ReferralsMainComponent },
  { path: 'create', component: ReferralsCreateComponent },
  { path: 'details/:id', component: ReferralsCreateComponent },
  //{ path: 'referrals-received', component: ReferralsMainComponent },
];
