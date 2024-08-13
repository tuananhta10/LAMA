import { Routes } from '@angular/router';
import { ClientMainComponent } from './client-main/client-main.component';

/* CREATE CLIENT COMPONENT */
import { ClientCreateComponent } from './client-create/client-create.component';

/* EDIT CLIENT COMPONENT */
import { ClientUpdateComponent } from './client-update/client-update.component';

/* VIEW CLIENT DETAILS COMPONENT */
import { ClientDetailsComponent } from './client-details/client-details.component'; // Angular Material Component
import { MainProfileComponent } from './client-details/components/main-profile/main-profile.component';
import { CareworkersComponent } from './client-details/components/careworkers/careworkers.component';
import { MedicationComponent } from './client-details/components/medication/medication.component';
import { ServiceDetailsComponent } from './client-details/components/service-details/service-details.component';
import { ContactDetailsComponent } from './client-details/components/contact-details/contact-details.component';
import { RelatedDocumentsComponent } from './client-details/components/related-documents/related-documents.component';
import { GoalsComponent } from './client-details/components/goals/goals.component';
import { PendingChangesGuard } from '@main/shared/guards/can-deactivate/pending-changes.guard';

import { AboutMeComponent } from './client-details/components/about-me/about-me.component';
import { ServiceHistoryComponent } from './client-details/components/service-history/service-history.component';
import { IndividualIntakeComponent } from './client-details/components/individual-intake/individual-intake.component';
import { MedicalHistoryComponent } from './client-details/components/medical-history/medical-history.component';
import { IncidentsComponent } from './client-details/components/incidents/incidents.component';
import { ServiceTemplatesComponent } from './client-details/components/service-templates/service-templates.component';
import { ServiceScheduleComponent } from './client-details/components/service-schedule/service-schedule.component';
import { ClientFundingComponent } from './client-details/components/client-funding/client-funding.component';
import { ClientServiceScheduleComponent } from './client-service-schedule/client-service-schedule.component';
import { ClientClientFundingComponent } from './client-client-funding/client-client-funding.component';
import { AdminGuard } from '@app-admin-guard/admin-panel/admin.guard';
import { ClientGroupsComponent } from './client-groups/client-groups.component';
import { ClientFundingClaimsComponent } from './client-funding-claims/client-funding-claims.component';
import { InvoiceBatchesComponent } from './invoice-batches/invoice-batches.component';
import { ClientInvoiceComponent } from './client-invoice/client-invoice.component';
import { MainProfileNotesComponent } from './client-details/components/main-profile/main-profile-notes/main-profile-notes.component';

export const AdminClientRoutes: Routes = [
  { path: '', component: ClientMainComponent },
  {
    path: 'create',
    component: ClientCreateComponent,
    canDeactivate: [PendingChangesGuard],
  },
  { path: 'edit/:id', component: ClientUpdateComponent },
  {
    path: 'details/:id',
    component: ClientDetailsComponent,
    children: [
      { path: '', component: MainProfileComponent },
      { path: 'goals', component: GoalsComponent },
      {
        path: 'careworkers',
        component: CareworkersComponent
      },
      { path: 'medication', component: MedicationComponent },
      { path: 'service-details', component: ServiceDetailsComponent },
      { path: 'contact-details', component: ContactDetailsComponent },
      { path: 'related-documents', component: RelatedDocumentsComponent },
      { path: 'client-notes', component: MainProfileNotesComponent },
      { path: 'about-me', component: AboutMeComponent },
      { path: 'service-history', component: ServiceHistoryComponent },
      { path: 'individual-intake', component: IndividualIntakeComponent },
      { path: 'medical-history', component: MedicalHistoryComponent },
      { path: 'incidents', component: IncidentsComponent },
      { path: 'service-templates', component: ServiceTemplatesComponent },
      { path: 'service-schedule', component: ClientServiceScheduleComponent },
      { path: 'service-schedule/cancelled', component: ClientServiceScheduleComponent },
      { path: 'client-funding', component: ClientFundingComponent },
    ],
  },
  { path: 'service-schedule', component: ClientServiceScheduleComponent },
  { path: 'client-funding', component: ClientClientFundingComponent },
  { path: 'funding-claim', component: ClientFundingClaimsComponent }, 
  { path: 'invoice-batches', component: InvoiceBatchesComponent },
  { path: 'invoices', component: ClientInvoiceComponent },
  { path: 'client-groups', component: ClientGroupsComponent },
];
