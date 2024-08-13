import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { 
  FormsModule, 
  ReactiveFormsModule 
} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '@app-shared/shared.module';
import { NgChartsModule } from 'ng2-charts';
import { MaterialComponentsModule } from '@app-material-component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { AdminAdministrationRoutes } from './administration.routing';
import { AdministrationMainComponent } from './administration-main/administration-main.component';
import { QualificationsComponent } from './components/qualifications/qualifications.component';
import { LanguagesComponent } from './components/languages/languages.component';
import { ServiceTypesComponent } from './components/service-types/service-types.component';
import { BranchSetupComponent } from './components/branch-setup/branch-setup.component';
import { ReusableListViewComponent } from './components/reusable-list-view/reusable-list-view.component';
import { ReusableGridViewComponent } from './components/reusable-grid-view/reusable-grid-view.component';
import { FundingSourceComponent } from './components/funding-source/funding-source.component';
import { PublicHolidayComponent } from './components/public-holiday/public-holiday.component';
import { EmployeePositionComponent } from './components/employee-position/employee-position.component';
import { PayrateLoadingComponent } from './components/payrate-loading/payrate-loading.component';
import { PriceListComponent } from './components/price-list/price-list.component';
import { AddPricelistComponent } from './dialogs/add-pricelist/add-pricelist.component';
import { AddPayrateLoadingComponent } from './dialogs/add-payrate-loading/add-payrate-loading.component';
import { AddEmployeePositionComponent } from './dialogs/add-employee-position/add-employee-position.component';
import { ViewEmployeePositionComponent } from './dialogs/view-employee-position/view-employee-position.component';
import { AddLanguageComponent } from './dialogs/add-language/add-language.component';
import { AddQualificationsComponent } from './dialogs/add-qualifications/add-qualifications.component';
import { AddServiceTypesComponent } from './dialogs/add-service-types/add-service-types.component';
import { AddFundingSourceComponent } from './dialogs/add-funding-source/add-funding-source.component';
import { CalendarViewComponent } from './components/public-holiday/calendar-view/calendar-view.component';
import { CalendarHeaderComponent } from './components/public-holiday/calendar-header/calendar-header.component';
import { AddPublicHolidayComponent } from './dialogs/add-public-holiday/add-public-holiday.component';
import { BranchDetailsComponent } from './components/branch-setup/forms/branch-details/branch-details.component';
import { BranchTravelSetupComponent } from './components/branch-setup/forms/branch-travel-setup/branch-travel-setup.component';
import { SupportWorkerAppComponent } from './components/branch-setup/forms/support-worker-app/support-worker-app.component';
import { PortalComponent } from './components/branch-setup/forms/portal/portal.component';
import { AddressComponent } from './components/branch-setup/forms/address/address.component';
import { LetterHeadComponent } from './components/branch-setup/forms/letter-head/letter-head.component';
import { ServiceAgreementTemplatesComponent } from './components/branch-setup/forms/service-agreement-templates/service-agreement-templates.component';
import { OrganizationSetupComponent } from './components/organization-setup/organization-setup.component';
import { OrganizationDetailsComponent } from './components/organization-setup/forms/organization-details/organization-details.component';
import { ContactDetailsComponent } from './components/organization-setup/forms/contact-details/contact-details.component';
import { PlanManagementSetupComponent } from './components/organization-setup/forms/plan-management-setup/plan-management-setup.component';

import { ExpenseTypeListComponent } from './components/expense-type-list/expense-type-list.component';
import { ListOfInterestsComponent } from './components/list-of-interests/list-of-interests.component';
import { CancellationPolicyComponent } from './components/cancellation-policy/cancellation-policy.component';
import { TravelTransportSettingsComponent } from './components/travel-transport-settings/travel-transport-settings.component';
import { SyncMyobComponent } from './components/sync-myob/sync-myob.component';
import { AddListOfInterestsComponent } from './dialogs/add-list-of-interests/add-list-of-interests.component';
import { AddCancellationPolicyComponent } from './dialogs/add-cancellation-policy/add-cancellation-policy.component';
import { AddExpenseTypeListComponent } from './dialogs/add-expense-type-list/add-expense-type-list.component';
import { ReusableOrgTableComponent } from './components/organization-setup/table/reusable-org-table/reusable-org-table.component';
import { SuccessAddRecordComponent } from './dialogs/success-add-record/success-add-record.component';
import { ChargeRateModalComponent } from './dialogs/add-service-types/sub-modal/charge-rate-modal/charge-rate-modal.component';
import { FundingCodeComponent } from './dialogs/add-service-types/sub-modal/funding-code-modal/funding-code-modal.component';
import { PriceListDetailsComponent } from './dialogs/add-pricelist/price-list-froms/price-list-details/price-list-details.component';
import { DeleteRecordComponent } from './dialogs/delete-record/delete-record.component';
import { GoalTemplatesComponent } from './components/goal-templates/goal-templates.component';
import { FormTemplatesComponent } from './components/form-templates/form-templates.component';
import { AddFormTemplateComponent } from './dialogs/add-form-template/add-form-template.component';
import { AddGoalTemplateComponent } from './dialogs/add-goal-template/add-goal-template.component';
import { AddPricelistPeriodComponent } from './dialogs/add-pricelist-period/add-pricelist-period.component';
import { AddPricelistRatesComponent } from './dialogs/add-pricelist-rates/add-pricelist-rates.component';
import { CommunicationTemplateComponent } from './components/communication-template/communication-template.component';
import { AddCommunicationTemplateComponent } from './dialogs/add-communication-template/add-communication-template.component';
import { ClientChecklistComponent } from './components/client-checklist/client-checklist.component';
import { BulkCommunicationGroupComponent } from './components/bulk-communication-group/bulk-communication-group.component';
import { AddClientChecklistComponent } from './dialogs/add-client-checklist/add-client-checklist.component';
import { AddBulkCommunicationGroupComponent } from './dialogs/add-bulk-communication-group/add-bulk-communication-group.component';
import { OrganizationsComponent } from './components/organizations/organizations.component';
import { BranchListComponent } from './components/branch-list/branch-list.component';
import { SosNumbersComponent } from './components/sos-numbers/sos-numbers.component';
import { AddSosNumbersComponent } from './dialogs/add-sos-numbers/add-sos-numbers.component';
import { PricelistTableCustomComponent } from './components/price-list/component/pricelist-table-custom/pricelist-table-custom.component';
import { UpdatePriceListComponent } from './dialogs/update-price-list/update-price-list.component';
import { InvoicesComponent } from './components/invoices/invoices.component';
import { AddXeroSettingComponent } from './dialogs/add-xero-settings/add-xero-settings.component';
import { AddInvoiceComponent } from './dialogs/add-invoice/add-invoice.component';
import { AddLineItemComponent } from './dialogs/add-invoice-line-item/add-invoice-line-item.component';
import { EmployeePayrateComponent } from './components/employee-payrate/employee-payrate.component';
import { EmployeePayrateCustomTableComponent } from './components/employee-payrate/component/employee-payrate-custom-table/employee-payrate-custom-table.component';
import { UpdateEmployeePayrateComponent } from './dialogs/update-employee-payrate/update-employee-payrate.component';
import { AddEmployeePositionSyncComponent } from './dialogs/add-employee-position-sync/add-employee-position-sync.component';
import { SyncXeroComponent } from './components/sync-xero/sync-xero.component';
import { SyncToXeroDialogComponent } from './dialogs/sync-to-xero-dialog/sync-to-xero-dialog.component';
import { JobTypeComponent } from './components/job-type/job-type.component';
import { SkillsComponent } from './components/skills/skills.component';
import { GenderComponent } from './components/gender/gender.component';
import { BulkCommunicationTemplateComponent } from './components/bulk-communication-template/bulk-communication-template.component';
import { AddBulkCommunicationTemplateComponent } from './dialogs/add-bulk-communication-template/add-bulk-communication-template.component';
import { CKEditorModule } from 'ckeditor4-angular';
import { HobbiesComponent } from './components/hobbies/hobbies.component';
import { AddHobbiesComponent } from './dialogs/add-hobbies/add-hobbies.component';
import { AddGenderComponent } from './dialogs/add-gender/add-gender.component';
import { AddSkillsComponent } from './dialogs/add-skills/add-skills.component';
import { AddJobTypeComponent } from './dialogs/add-job-type/add-job-type.component';
import { OrganizationSettingsComponent } from './components/organization-settings/organization-settings.component';
import { FinanceAndLegalComponent } from './components/organization-settings/forms/finance-and-legal/finance-and-legal.component';
import { OrganizationDetailsComponent as OrganizationSettingsDetails } from './components/organization-settings/forms/organization-details/organization-details.component';
import { SafetyInformationComponent } from './components/organization-settings/forms/safety-information/safety-information.component';
import { UnderstandingNeedsComponent } from './components/organization-settings/forms/understanding-needs/understanding-needs.component';
import { AddStripePaymentMethodComponent } from './dialogs/add-stripe-payment-method/add-stripe-payment-method.component';
import { CancelSubscriptionComponent } from './dialogs/cancel-subscription/cancel-subscription.component';
import { ExternalProvidersComponent } from './components/external-providers/external-providers.component';
import { AddExternalProvidersComponent } from './dialogs/add-external-providers/add-external-providers.component';
import { SmsCreditsComponent } from './components/sms-credits/sms-credits.component';

const components = [
  AdministrationMainComponent,
  QualificationsComponent,
  LanguagesComponent,
  ServiceTypesComponent,
  BranchSetupComponent,  
  FundingSourceComponent,
  PublicHolidayComponent,
  ReusableListViewComponent,
  ReusableGridViewComponent,
  EmployeePositionComponent,
  PayrateLoadingComponent,
  PriceListComponent,
  AddPricelistComponent,
  AddPayrateLoadingComponent,
  AddEmployeePositionComponent,
  ViewEmployeePositionComponent,
  AddLanguageComponent,
  AddQualificationsComponent,
  AddServiceTypesComponent,
  AddFundingSourceComponent,
  CalendarViewComponent,
  CalendarHeaderComponent,
  AddPublicHolidayComponent,
  BranchDetailsComponent,
  BranchTravelSetupComponent,
  SupportWorkerAppComponent,
  PortalComponent,
  AddressComponent,
  LetterHeadComponent,
  ServiceAgreementTemplatesComponent,
  OrganizationSetupComponent,
  OrganizationDetailsComponent,
  ContactDetailsComponent,
  PlanManagementSetupComponent,
  ExpenseTypeListComponent,
  ListOfInterestsComponent,
  CancellationPolicyComponent,
  TravelTransportSettingsComponent,
  SyncMyobComponent,
  AddListOfInterestsComponent,
  AddCancellationPolicyComponent,
  AddExpenseTypeListComponent,
  ChargeRateModalComponent,
  FundingCodeComponent,
  PriceListDetailsComponent,
  ReusableOrgTableComponent,
  SuccessAddRecordComponent,
  DeleteRecordComponent,
  GoalTemplatesComponent,
  FormTemplatesComponent,
  AddFormTemplateComponent,
  AddGoalTemplateComponent,
  
  AddPricelistPeriodComponent,
  AddPricelistRatesComponent,
  CommunicationTemplateComponent,
  AddCommunicationTemplateComponent,
  ClientChecklistComponent,
  BulkCommunicationGroupComponent,
  AddClientChecklistComponent,
  AddBulkCommunicationGroupComponent,
  OrganizationsComponent,
  BranchListComponent,
  SosNumbersComponent,
  AddSosNumbersComponent,
  InvoicesComponent,
  AddXeroSettingComponent,
  AddInvoiceComponent,
  AddLineItemComponent,
];


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
    CKEditorModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    RouterModule.forChild(AdminAdministrationRoutes),
  ],
  exports: [
    ...components
  ],
  declarations: [
    ...components,
    PricelistTableCustomComponent,
    UpdatePriceListComponent,
    EmployeePayrateComponent,
    EmployeePayrateCustomTableComponent,
    UpdateEmployeePayrateComponent,
    AddEmployeePositionSyncComponent,
    SyncXeroComponent,
    SyncToXeroDialogComponent,
    JobTypeComponent,
    SkillsComponent,
    GenderComponent,
    BulkCommunicationTemplateComponent,
    AddBulkCommunicationTemplateComponent,
    HobbiesComponent,
    AddHobbiesComponent,
    AddGenderComponent,
    AddSkillsComponent,
    AddJobTypeComponent,
    OrganizationSettingsComponent,
    FinanceAndLegalComponent,
    OrganizationSettingsDetails,
    SafetyInformationComponent,
    UnderstandingNeedsComponent,
    AddStripePaymentMethodComponent,
    CancelSubscriptionComponent,
    ExternalProvidersComponent,
    AddExternalProvidersComponent,
    SmsCreditsComponent,
    
    
  ]
})
export class AdminAdministrationModule{ }
