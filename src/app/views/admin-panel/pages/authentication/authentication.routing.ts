import { Routes } from '@angular/router';

import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { AdminSigninComponent } from './admin-signin/admin-signin.component';
import { AdminGuard } from '@app-admin-guard/admin-panel/admin.guard';
import { OnboardingGuardGuard } from '@app-admin-guard/admin-panel/onboarding-guard.guard';

import { GeneralComponent } from './admin-profile/components/general/general.component';
import { JobComponent } from './admin-profile/components/job/job.component';
import { PayrollComponent } from './admin-profile/components/payroll/payroll.component';
import { DocumentsComponent } from './admin-profile/components/documents/documents.component';
import { DependentsComponent } from './admin-profile/components/dependents/dependents.component'; 
import { AdminSignupComponent } from './admin-signup/admin-signup.component';
import { ClientSignupComponent } from './client-signup/client-signup.component';
import { CareworkerSignupComponent } from './careworker-signup/careworker-signup.component'; 
import { SignupInitComponent } from './signup-init/signup-init.component'; 
import { AdminSignupOnboardingComponent } from './admin-signup-onboarding/admin-signup-onboarding.component'; 
import { AdminSignupFromLinkComponent } from './admin-signup-from-link/admin-signup-from-link.component'; 
import { ClientSignupOnboardingComponent } from './client-signup-onboarding/client-signup-onboarding.component';
import { TermsAndConditionComponent } from './terms-and-condition/terms-and-condition.component';
import { AdminUpdatePasswordComponent } from './admin-update-password/admin-update-password.component';
import { AdminForgotPasswordComponent } from './admin-forgot-password/admin-forgot-password.component';

export const AdminAuthenticationRoutes: Routes = [
  { path: 'terms-and-condition', component: TermsAndConditionComponent },
  { path: 'signin', component: AdminSigninComponent },
  { path: 'update-password', component: AdminUpdatePasswordComponent },
  {path: 'forgot-password', component:AdminForgotPasswordComponent},
  { 
    path: 'signup', 
    children: [
      { path: '', component: SignupInitComponent },
      { path: 'from-link', component: AdminSignupFromLinkComponent },
      { path: 'admin', component: AdminSignupComponent },
      { 
        path: 'admin/onboarding', 
        component: AdminSignupOnboardingComponent, 
        canActivate: [OnboardingGuardGuard] 
      },
      { path: 'careworker', component: CareworkerSignupComponent },
      { 
        path: 'careworker/onboarding', 
        component: AdminSignupOnboardingComponent, 
        canActivate: [OnboardingGuardGuard] 
      },
      { path: 'client', component: ClientSignupComponent },
      { 
        path: 'client/onboarding', 
        component: ClientSignupOnboardingComponent, 
        canActivate: [OnboardingGuardGuard] 
      },
    ]
  },
  { 
    path: 'admin', 
    component: AdminProfileComponent, 
    canActivate: [AdminGuard],
    data: {
      role: ['admin'],
    },
    children: [
      { path: 'profile', component: GeneralComponent },
      { path: 'jobs', component: JobComponent },
      { path: 'payroll', component: PayrollComponent },
      { path: 'documents', component: DocumentsComponent },
      { path: 'dependents', component: DependentsComponent }
    ]
  },
  {
    path: '**',
    redirectTo: 'error/404'
  }
];
