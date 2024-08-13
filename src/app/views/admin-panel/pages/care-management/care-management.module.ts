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

import { AdminCareManagementRoutes } from './care-management.routing';
import { CareManagementMainComponent } from './care-management-main/care-management-main.component';
import { CareManagementIncidentsComponent } from './care-management-incidents/care-management-incidents.component';
import { CareManagementSupportCoordinationComponent } from './care-management-support-coordination/care-management-support-coordination.component';
import { CareManagementNeedsAssessmentsComponent } from './care-management-needs-assessments/care-management-needs-assessments.component';
import { ReusableTableAssessmentComponent } from './care-management-needs-assessments/components/reusable-table-assessment/reusable-table-assessment.component';
import { AddAssessmentComponent } from './care-management-needs-assessments/dialogs/add-assessment/add-assessment.component';
import { ReusableTableIncidentComponent } from './care-management-incidents/components/reusable-table-incident/reusable-table-incident.component';
import { ReusableGridIncidentComponent } from './care-management-incidents/components/reusable-grid-incident/reusable-grid-incident.component';
import { AddIncidentComponent } from './care-management-incidents/dialogs/add-incident/add-incident.component';
import { ReusableTableSupportComponent } from './care-management-support-coordination/components/reusable-table-support/reusable-table-support.component';
import { AddSupportComponent } from './care-management-support-coordination/dialogs/add-support/add-support.component';
import { CareManagementPlanManagementClaimComponent } from './care-management-plan-management-claim/care-management-plan-management-claim.component';
import { CareManagementPlanManagementBatchesComponent } from './care-management-plan-management-batches/care-management-plan-management-batches.component';
import { AddClaimComponent } from './care-management-plan-management-claim/dialogs/add-claim/add-claim.component';
import { AddBatchComponent } from './care-management-plan-management-batches/dialogs/add-batch/add-batch.component';
import { ReusableTableClaimComponent } from './care-management-plan-management-claim/components/reusable-table-claim/reusable-table-claim.component';
import { CareManagementGeneralComponent } from './care-management-incidents/forms/care-management-general/care-management-general.component';
import { CareManagementDetailsComponent } from './care-management-incidents/forms/care-management-details/care-management-details.component';
import { CareManagementActionsTakenComponent } from './care-management-incidents/forms/care-management-actions-taken/care-management-actions-taken.component';
import { CareManagementNotificationsComponent } from './care-management-incidents/forms/care-management-notifications/care-management-notifications.component';
import { GenerateIncidentReportComponent } from './care-management-incidents/dialogs/generate-incident-report/generate-incident-report.component';

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
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    RouterModule.forChild(AdminCareManagementRoutes)
  ],
  declarations: [
    CareManagementMainComponent,
    CareManagementIncidentsComponent,
    CareManagementSupportCoordinationComponent,
    CareManagementNeedsAssessmentsComponent,
    ReusableTableAssessmentComponent,
    AddAssessmentComponent,
    ReusableTableIncidentComponent,
    ReusableGridIncidentComponent,
    AddIncidentComponent,
    ReusableTableSupportComponent,
    AddSupportComponent,
    CareManagementPlanManagementClaimComponent,
    CareManagementPlanManagementBatchesComponent,
    AddClaimComponent,
    AddBatchComponent,
    ReusableTableClaimComponent,
    CareManagementGeneralComponent,
    CareManagementDetailsComponent,
    CareManagementActionsTakenComponent,
    CareManagementNotificationsComponent,
    GenerateIncidentReportComponent
  ]
})
export class AdminCareManagementModule{ }
