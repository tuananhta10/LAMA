import { Routes } from '@angular/router';
import { CareManagementMainComponent } from './care-management-main/care-management-main.component';
import { CareManagementIncidentsComponent } from './care-management-incidents/care-management-incidents.component';
import { CareManagementSupportCoordinationComponent } from './care-management-support-coordination/care-management-support-coordination.component';
import { CareManagementNeedsAssessmentsComponent } from './care-management-needs-assessments/care-management-needs-assessments.component';
import { CareManagementPlanManagementClaimComponent } from './care-management-plan-management-claim/care-management-plan-management-claim.component';
import { CareManagementPlanManagementBatchesComponent } from './care-management-plan-management-batches/care-management-plan-management-batches.component';

export const AdminCareManagementRoutes: Routes = [
  { 
    path: '', 
    //component: CareManagementMainComponent,
    children: [
      { path: 'support-coordination', component: CareManagementSupportCoordinationComponent },
      { path: 'needs-assessments', component: CareManagementNeedsAssessmentsComponent },
      { path: 'incidents', component: CareManagementIncidentsComponent },
      { path: 'plan-management-claims', component: CareManagementPlanManagementClaimComponent },
      { path: 'plan-management-import-invoice', component: CareManagementPlanManagementBatchesComponent },
    ]
  },
];
