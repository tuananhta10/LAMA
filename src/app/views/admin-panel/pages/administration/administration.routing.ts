import { Routes } from '@angular/router';
import { AdministrationMainComponent } from './administration-main/administration-main.component';
import { QualificationsComponent } from './components/qualifications/qualifications.component';
import { LanguagesComponent } from './components/languages/languages.component';
import { ServiceTypesComponent } from './components/service-types/service-types.component';
import { BranchSetupComponent } from './components/branch-setup/branch-setup.component';
import { FundingSourceComponent } from './components/funding-source/funding-source.component';
import { PublicHolidayComponent } from './components/public-holiday/public-holiday.component';
import { EmployeePositionComponent } from './components/employee-position/employee-position.component';
import { PayrateLoadingComponent } from './components/payrate-loading/payrate-loading.component';
import { PriceListComponent } from './components/price-list/price-list.component';
import { OrganizationSetupComponent } from './components/organization-setup/organization-setup.component';
import { ExpenseTypeListComponent } from './components/expense-type-list/expense-type-list.component';
import { ListOfInterestsComponent } from './components/list-of-interests/list-of-interests.component';
import { CancellationPolicyComponent } from './components/cancellation-policy/cancellation-policy.component';
import { TravelTransportSettingsComponent } from './components/travel-transport-settings/travel-transport-settings.component';
import { SyncMyobComponent } from './components/sync-myob/sync-myob.component';
import { GoalTemplatesComponent } from './components/goal-templates/goal-templates.component';
import { FormTemplatesComponent } from './components/form-templates/form-templates.component';
import { CommunicationTemplateComponent } from './components/communication-template/communication-template.component';
import { ClientChecklistComponent } from './components/client-checklist/client-checklist.component';
import { BulkCommunicationGroupComponent } from './components/bulk-communication-group/bulk-communication-group.component';
import { OrganizationsComponent } from './components/organizations/organizations.component';
import { BranchListComponent } from './components/branch-list/branch-list.component';
import { AddSosNumbersComponent } from './dialogs/add-sos-numbers/add-sos-numbers.component';
import { SosNumbersComponent } from './components/sos-numbers/sos-numbers.component';
import { InvoicesComponent } from './components/invoices/invoices.component';
import { EmployeePayrateComponent } from './components/employee-payrate/employee-payrate.component';
import { SyncXeroComponent } from './components/sync-xero/sync-xero.component';
import { JobTypeComponent } from './components/job-type/job-type.component';
import { SkillsComponent } from './components/skills/skills.component';
import { GenderComponent } from './components/gender/gender.component';
import { BulkCommunicationTemplateComponent } from './components/bulk-communication-template/bulk-communication-template.component';
import { HobbiesComponent } from './components/hobbies/hobbies.component';
import { OrganizationSettingsComponent } from './components/organization-settings/organization-settings.component';
import { ExternalProvidersComponent } from './components/external-providers/external-providers.component';
import { SmsCreditsComponent } from './components/sms-credits/sms-credits.component';

export const AdminAdministrationRoutes: Routes = [
  //{ path: '', component: AdministrationMainComponent },

  { 
    path: '', 
    children: [
      { path: 'languages', component: LanguagesComponent },
      { path: 'qualifications', component: QualificationsComponent },
      { path: 'service-types', component: ServiceTypesComponent },
      { path: 'funding-source', component: FundingSourceComponent },
      { path: 'public-holiday', component: PublicHolidayComponent },
      { path: 'employee-position', component: EmployeePositionComponent },
      { path: 'job-types', component: JobTypeComponent },
      { path: 'payrate-loading', component: PayrateLoadingComponent },
      { path: 'communication-templates', component: CommunicationTemplateComponent },
      { path: 'goal-templates', component: GoalTemplatesComponent },
      { path: 'form-templates', component: FormTemplatesComponent },
      { path: 'price-list', component: PriceListComponent },
      { path: 'expense-type-list', component: ExpenseTypeListComponent },
      { path: 'interests', component: ListOfInterestsComponent },
      { path: 'skills', component: SkillsComponent },
      { path: 'gender', component: GenderComponent },
      { path: 'hobbies', component: HobbiesComponent },
      { path: 'cancellation-policy', component: CancellationPolicyComponent },
      { path: 'bulk-communication-groups', component: BulkCommunicationGroupComponent },
      { path: 'bulk-communication-templates', component: BulkCommunicationTemplateComponent },
      { path: 'client-checklist', component: ClientChecklistComponent },
      { path: 'travel-transport-settings', component: TravelTransportSettingsComponent },
      { path: 'sync-data', component: SyncXeroComponent },
      { path: 'branch-setup', component: BranchSetupComponent },
      { path: 'branch-setup/:id', component: BranchSetupComponent },
      { path: 'branch-list', component: BranchListComponent },
      { path: 'organization-settings', component: OrganizationSetupComponent },
      { path: 'organization-details', component: OrganizationSettingsComponent },
      //{ path: 'organization-setup/:id', component: OrganizationSetupComponent },
      //{ path: 'organization-list', component: OrganizationsComponent },
      { path: 'sos-numbers', component: SosNumbersComponent },
      { path: 'invoices', component: InvoicesComponent },
      { path: 'payrates', component: EmployeePayrateComponent },
      { path: 'external-providers', component: ExternalProvidersComponent },
      { path: 'sms-credits', component: SmsCreditsComponent },
    ]
  },
];
