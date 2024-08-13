import { Routes } from '@angular/router';
import { EmployeeMainComponent } from './employee-main/employee-main.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { EmployeeCreateComponent } from './employee-create/employee-create.component';
import { EmployeeUpdateComponent } from './employee-update/employee-update.component';

import { MainProfileComponent } from './employee-details/components/main-profile/main-profile.component';
import { CareworkerClientComponent } from './employee-details/components/careworker-client/careworker-client.component';
import { ServiceDetailsComponent } from './employee-details/components/service-details/service-details.component';
import { WorkdaysComponent } from './employee-details/components/workdays/workdays.component';
import { ContactDetailsComponent } from './employee-details/components/contact-details/contact-details.component';
import { RelatedDocumentsComponent } from './employee-details/components/related-documents/related-documents.component';
import { PendingChangesGuard } from '@main/shared/guards/can-deactivate/pending-changes.guard';

import { TrainingComponent } from './employee-details/components/training/training.component';
import { LeavePeriodsComponent } from './employee-details/components/leave-periods/leave-periods.component';
import { AppraisalComponent } from './employee-details/components/appraisal/appraisal.component';
import { StaffWarningsComponent } from './employee-details/components/staff-warnings/staff-warnings.component';
import { IncidentsComponent } from './employee-details/components/incidents/incidents.component';
import { AvailabilityComponent } from './employee-details/components/availability/availability.component';
import { AvailableShiftComponent } from './employee-details/components/available-shift/available-shift.component';
import { ServiceCalendarComponent } from './employee-details/components/service-calendar/service-calendar.component';
import { EmployeeShiftComponent } from './employee-details/components/employee-shift/employee-shift.component';
import { EmployeeServiceCalendarComponent } from './employee-service-calendar/employee-service-calendar.component';
import { EmployeeShiftComponent as MainEmployeeShift } from './employee-shift/employee-shift.component';
import { EmployeeTasksComponent } from './employee-tasks/employee-tasks.component';
import { EmployeeLeavesComponent } from './employee-leaves/employee-leaves.component';
import { EmployeeAvailableShiftComponent } from './employee-available-shift/employee-available-shift.component';
import { EmployeeTimesheetComponent } from './employee-timesheet/employee-timesheet.component';
import { TimesheetApprovalComponent } from './employee-timesheet-approval/timesheet-approval.component';

export const AdminEmployeeRoutes: Routes = [
  { path: '', component: EmployeeMainComponent },
  { path: 'create', component: EmployeeCreateComponent, canDeactivate:[PendingChangesGuard] },
  { path: 'edit/:id', component: EmployeeUpdateComponent },
  { 
    path: 'details/:id', 
    component: EmployeeDetailsComponent ,
    children: [
      { path: '', component: MainProfileComponent },
      { path: 'careworker-client', component: CareworkerClientComponent },
      { path: 'workdays', component: WorkdaysComponent },
      { path: 'service-details', component: ServiceDetailsComponent },
      { path: 'contact-details', component: ContactDetailsComponent },
      { path: 'related-documents', component: RelatedDocumentsComponent },

      /* EMPLOYEE MENU */
      { path: 'training', component: TrainingComponent },
      { path: 'leave-periods', component: LeavePeriodsComponent },
      { path: 'appraisal', component: AppraisalComponent },
      { path: 'staff-warnings', component: StaffWarningsComponent },
      { path: 'incidents', component: IncidentsComponent },
      { path: 'availability', component: AvailabilityComponent },
      { path: 'available-shift', component: AvailableShiftComponent },
      { path: 'service-calendar', component: EmployeeServiceCalendarComponent },
      { path: 'employee-shift', component: EmployeeShiftComponent },
      { path: 'timesheet', component: TimesheetApprovalComponent },
    ]
  },
  { path: 'service-calendar', component: EmployeeServiceCalendarComponent },
  { path: 'employee-shift', component: MainEmployeeShift },
  { path: 'employee-task', component: EmployeeTasksComponent },
  { path: 'employee-leave', component: EmployeeLeavesComponent },
  { path: 'available-shift', component: EmployeeAvailableShiftComponent },
  { path: 'timesheet', component: TimesheetApprovalComponent },
];
