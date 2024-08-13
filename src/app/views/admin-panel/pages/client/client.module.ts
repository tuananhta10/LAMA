import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { 
  FormsModule, 
  ReactiveFormsModule 
} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminClientRoutes } from './client.routing';
import { SharedModule } from '@app-shared/shared.module';
import { NgChartsModule } from 'ng2-charts';
import { MaterialComponentsModule } from '@app-material-component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { LazyLoadImageModule } from 'ng-lazyload-image';

import * as fromClientShared from './client-shared'
import * as fromClientCreate from './client-create';
import * as fromClientMain from './client-main'
import * as fromClientUpdate from './client-update'
import * as fromClientDetails from './client-details';

import { AddClientFundingComponent } from './client-details/dialogs/add-client-funding/add-client-funding.component';
import { AddMedicalHistoryComponent } from './client-details/dialogs/add-medical-history/add-medical-history.component';
import { MedicalHistoryDetailsComponent } from './client-details/components/medical-history/forms/medical-history-details/medical-history-details.component';
import { AdmissionRecordComponent } from './client-details/components/medical-history/forms/admission-record/admission-record.component';
import { AssessmentRecordComponent } from './client-details/components/medical-history/forms/assessment-record/assessment-record.component';
import { ServiceHistoryGridComponent } from './client-details/components/service-history/service-history-grid/service-history-grid.component';
import { ClientServiceScheduleComponent } from './client-service-schedule/client-service-schedule.component';
import { ClientClientFundingComponent } from './client-client-funding/client-client-funding.component';

/* EMPLOYEE SHIFT */
import { AddClientServiceScheduleComponent } from './client-details/dialogs/add-client-service-schedule/add-client-service-schedule.component';
import { ClientTotalsComponent } from './client-details/forms/client-totals/client-totals.component';
import { ShiftLocationComponent } from './client-details/forms/shift-location/shift-location.component';
import { ClientDetailsComponent } from './client-details/forms/client-details/client-details.component';
import { ServiceScheduleDetailsComponent } from './client-details/forms/service-schedule-details/service-schedule-details.component';
import { HoursComponent } from './client-details/forms/hours/hours.component';
import { ShiftTasksComponent } from './client-details/forms/tasks/tasks.component';
import { CareworkerTableComponent } from './client-details/components/careworkers/careworker-table/careworker-table.component';
import { CareworkerTableReusableComponent } from './client-details/components/careworkers/careworker-table-reusable/careworker-table-reusable.component';
import { ServiceDetailsTableComponent } from './client-details/components/service-details/service-details-table/service-details-table.component';
import { UpdateProfilePhotoComponent } from './client-details/dialogs/update-profile-photo/update-profile-photo.component';
import { UpdateProfilePasswordComponent } from './client-details/dialogs/update-profile-password/update-profile-password.component';
import { ViewOnboardingNotesComponent } from './client-details/dialogs/view-onboarding-notes/view-onboarding-notes.component';
import { ClientGroupsComponent } from './client-groups/client-groups.component';
import { AddClientGroupComponent } from './client-details/dialogs/add-client-group/add-client-group.component';
import { ClientFundingDetailsComponent } from './client-details/dialogs/add-client-funding/forms/client-funding-details/client-funding-details.component';
import { FundingBudgetComponent } from './client-details/dialogs/add-client-funding/forms/funding-budget/funding-budget.component';
import { ClientFundingClaimsComponent } from './client-funding-claims/client-funding-claims.component';
import { InvoiceBatchesComponent } from './invoice-batches/invoice-batches.component';
import { ClientInvoiceComponent } from './client-invoice/client-invoice.component';
import { ViewFundingClaimComponent } from './client-details/dialogs/view-funding-claim/view-funding-claim.component';
import { ViewInvoicesComponent } from './client-details/dialogs/view-invoices/view-invoices.component';
import { ViewInvoiceBatchComponent } from './client-details/dialogs/view-invoice-batch/view-invoice-batch.component';
import { GenerateFundingClaimComponent } from './client-details/dialogs/generate-funding-claim/generate-funding-claim.component';
import { GenerateInvoiceBatchComponent } from './client-details/dialogs/generate-invoice-batch/generate-invoice-batch.component';
import { HealthCareProvidersModalComponent } from './client-shared/modals/health-care-providers-modal/health-care-providers-modal.component';
import { PrintInvoiceComponent } from './client-details/dialogs/print-invoice/print-invoice.component';
import { ViewGeneratedClaimSchedulesComponent } from './client-details/dialogs/view-generated-claim-schedules/view-generated-claim-schedules.component';
import { GenerateClientReportComponent } from './client-main/dialogs/generate-client-report/generate-client-report.component';
import { InternalExternalLookupComponent } from './client-shared/modals/internal-external-lookup/internal-external-lookup.component';
import { EmergencyContactModalComponent } from './client-shared/modals/emergency-contact-modal/emergency-contact-modal.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        NgChartsModule,
        MaterialComponentsModule,
        ImageCropperModule,
        LazyLoadImageModule,
        RouterModule.forChild(AdminClientRoutes)
    ],
    exports: [
        ...fromClientMain.components,
        ...fromClientUpdate.components,
        ...fromClientDetails.components,
        ...fromClientShared.components,
        ...fromClientCreate.components,
        AddClientServiceScheduleComponent,
        ClientTotalsComponent,
        ShiftLocationComponent,
        ClientDetailsComponent,
        ServiceScheduleDetailsComponent,
        HoursComponent,
        ShiftTasksComponent,
        ClientFundingClaimsComponent,
        InvoiceBatchesComponent,
        ClientInvoiceComponent
    ],
    declarations: [
        ...fromClientMain.components,
        ...fromClientUpdate.components,
        ...fromClientDetails.components,
        ...fromClientShared.components,
        ...fromClientCreate.components,
        AddClientFundingComponent,
        AddMedicalHistoryComponent,
        MedicalHistoryDetailsComponent,
        AdmissionRecordComponent,
        AssessmentRecordComponent,
        ServiceHistoryGridComponent,
        ClientServiceScheduleComponent,
        ClientClientFundingComponent,
        AddClientServiceScheduleComponent,
        ClientTotalsComponent,
        ShiftLocationComponent,
        ClientDetailsComponent,
        ServiceScheduleDetailsComponent,
        HoursComponent,
        ShiftTasksComponent,
        CareworkerTableComponent,
        CareworkerTableReusableComponent,
        ServiceDetailsTableComponent,
        UpdateProfilePhotoComponent,
        UpdateProfilePasswordComponent,
        ViewOnboardingNotesComponent,
        ClientGroupsComponent,
        AddClientGroupComponent,
        ClientFundingDetailsComponent,
        FundingBudgetComponent,
        ClientFundingClaimsComponent,
        InvoiceBatchesComponent,
        ClientInvoiceComponent,
        ViewFundingClaimComponent,
        ViewInvoicesComponent,
        ViewInvoiceBatchComponent,
        GenerateFundingClaimComponent,
        GenerateInvoiceBatchComponent,
        HealthCareProvidersModalComponent,
        PrintInvoiceComponent,
        ViewGeneratedClaimSchedulesComponent,
        GenerateClientReportComponent,
        InternalExternalLookupComponent,
        EmergencyContactModalComponent,
    ]
})
export class AdminClientModule{ }
