import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { 
  FormsModule, 
  ReactiveFormsModule 
} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminAuthenticationRoutes } from './authentication.routing';
import { SharedModule } from '@app-shared/shared.module';
import { NgChartsModule } from 'ng2-charts';
import { MaterialComponentsModule } from '@app-material-component';
import { LazyLoadImageModule } from 'ng-lazyload-image';

import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { AdminSigninComponent } from './admin-signin/admin-signin.component';
import { AdminClientModule } from '../client/client.module';
import { SideProfileComponent } from './admin-profile/components/side-profile/side-profile.component';
import { NavigationComponent } from './admin-profile/components/navigation/navigation.component';
import { GeneralComponent } from './admin-profile/components/general/general.component';
import { JobComponent } from './admin-profile/components/job/job.component';
import { PayrollComponent } from './admin-profile/components/payroll/payroll.component';
import { DocumentsComponent } from './admin-profile/components/documents/documents.component';
import { DependentsComponent } from './admin-profile/components/dependents/dependents.component';
import { AdminSignupComponent } from './admin-signup/admin-signup.component';
import { ClientSignupComponent } from './client-signup/client-signup.component';
import { CareworkerSignupComponent } from './careworker-signup/careworker-signup.component';
import { SignupInitComponent } from './signup-init/signup-init.component';
import { OrganizationDetailsComponent } from './admin-signup-onboarding/forms/organization-details/organization-details.component';
import { UnderstandingNeedsComponent } from './admin-signup-onboarding/forms/understanding-needs/understanding-needs.component';
import { SafetyInformationComponent } from './admin-signup-onboarding/forms/safety-information/safety-information.component';
import { FinanceAndLegalComponent } from './admin-signup-onboarding/forms/finance-and-legal/finance-and-legal.component';
import { AdminSignupOnboardingComponent } from './admin-signup-onboarding/admin-signup-onboarding.component';
import { AdminSignupFromLinkComponent } from './admin-signup-from-link/admin-signup-from-link.component';
import { ClientSignupOnboardingComponent } from './client-signup-onboarding/client-signup-onboarding.component';
import { SuccessSignupDialogComponent } from './dialogs/success-signup-dialog/success-signup-dialog.component';
import { WelcomeDialogComponent } from './dialogs/welcome-dialog/welcome-dialog.component'; 
import { SuccessOnboardingDialogComponent } from './dialogs/success-onboarding-dialog/success-onboarding-dialog.component';
import { InviteDialogComponent } from './dialogs/invite-dialog/invite-dialog.component';
import { TermsAndConditionComponent } from './terms-and-condition/terms-and-condition.component';
import { PromotionDialogComponent } from './dialogs/promotion-dialog/promotion-dialog.component';
import { AdminUpdatePasswordComponent } from './admin-update-password/admin-update-password.component';
import { AdminForgotPasswordComponent } from './admin-forgot-password/admin-forgot-password.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        NgChartsModule,
        MaterialComponentsModule,
        LazyLoadImageModule,
        AdminClientModule,
        RouterModule.forChild(AdminAuthenticationRoutes)
    ],
    declarations: [
        AdminProfileComponent,
        AdminSigninComponent,
        SideProfileComponent,
        NavigationComponent,
        GeneralComponent,
        JobComponent,
        PayrollComponent,
        DocumentsComponent,
        DependentsComponent,
        AdminSignupComponent,
        ClientSignupComponent,
        CareworkerSignupComponent,
        SignupInitComponent,
        OrganizationDetailsComponent,
        UnderstandingNeedsComponent,
        SafetyInformationComponent,
        FinanceAndLegalComponent,
        AdminSignupOnboardingComponent,
        AdminSignupFromLinkComponent,
        ClientSignupOnboardingComponent,
        SuccessSignupDialogComponent,
        SuccessOnboardingDialogComponent,
        InviteDialogComponent,
        WelcomeDialogComponent,
        TermsAndConditionComponent,
        PromotionDialogComponent,
        AdminUpdatePasswordComponent,
        AdminForgotPasswordComponent
    ]
})
export class AdminAuthenticationModule{ }
