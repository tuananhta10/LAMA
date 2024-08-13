import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { 
  FormsModule, 
  ReactiveFormsModule 
} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminEmployeeRoutes } from './employee.routing';
import { SharedModule } from '@app-shared/shared.module';
import { NgChartsModule } from 'ng2-charts';

import { MaterialComponentsModule } from '@app-material-component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';


import * as fromEmployeeMain from './employee-main';
import * as fromEmployeeDetails from './employee-details';
import * as fromEmployeeShared from './employee-shared/index';

import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { EmployeeCreateComponent } from './employee-create/employee-create.component';
import { EmployeeUpdateComponent } from './employee-update/employee-update.component';

/* EMPLOYEE SERVICE CALENDAR */
import { EmployeeServiceCalendarComponent } from './employee-service-calendar/employee-service-calendar.component';
import { CalendarHeaderComponent } from './employee-service-calendar/component/calendar-header/calendar-header.component';

/* EMPLOYEE SHIFT */
import { EmployeeShiftComponent as MainEmployeeShift } from './employee-shift/employee-shift.component';
import { ReusableTableShiftComponent } from './employee-shift/components/reusable-table-shift/reusable-table-shift.component';
import { AddEmployeeShiftComponent } from './employee-shift/dialogs/add-employee-shift/add-employee-shift.component';
import { ClientTotalsComponent } from './employee-shift/forms/client-totals/client-totals.component';
import { ShiftLocationComponent } from './employee-shift/forms/shift-location/shift-location.component';
import { ClientDetailsComponent } from './employee-shift/forms/client-details/client-details.component';
import { ServiceScheduleDetailsComponent } from './employee-shift/forms/service-schedule-details/service-schedule-details.component';
import { HoursComponent } from './employee-shift/forms/hours/hours.component';
import { ShiftTasksComponent } from './employee-shift/forms/tasks/tasks.component';

/* EMPLOYEE TASKS */
import { TasksComponent } from './employee-details/components/tasks/tasks.component';
import { EmployeeTasksComponent } from './employee-tasks/employee-tasks.component';
import { ReusableTableTasksComponent } from './employee-tasks/components/reusable-table-tasks/reusable-table-tasks.component';
import { AddTasksComponent } from './employee-tasks/dialogs/add-tasks/add-tasks.component';
import { ReusableGridTasksComponent } from './employee-tasks/components/reusable-grid-tasks/reusable-grid-tasks.component';

/* EMPLOYEE LEAVES */
import { EmployeeLeavesComponent } from './employee-leaves/employee-leaves.component';
import { ReusableTableLeavesComponent } from './employee-leaves/components/reusable-table-leaves/reusable-table-leaves.component';
import { AddEmployeeLeaveComponent } from './employee-leaves/dialogs/add-employee-leave/add-employee-leave.component';
import { LeavePeriodComponent } from './employee-leaves/forms/leave-period/leave-period.component';
import { ApprovalComponent } from './employee-leaves/forms/approval/approval.component';
import { EmployeeAvailableShiftComponent } from './employee-available-shift/employee-available-shift.component';
import { EmployeeTimesheetComponent } from './employee-timesheet/employee-timesheet.component';
import { AddTimesheetComponent } from './employee-timesheet/dialogs/add-timesheet/add-timesheet.component';
import { TimesheetDetailsComponent } from './employee-timesheet/forms/timesheet-details/timesheet-details.component';
import { TimeLoggedComponent } from './employee-timesheet/forms/time-logged/time-logged.component';
import { ViewAllComplianceComponent } from './employee-details/dialogs/view-all-compliance/view-all-compliance.component';
import { ViewAllCertificateComponent } from './employee-details/dialogs/view-all-certificate/view-all-certificate.component';
import { UpdateProfilePasswordComponent } from './employee-details/dialogs/update-profile-password/update-profile-password.component';
import { UpdateProfilePhotoComponent } from './employee-details/dialogs/update-profile-photo/update-profile-photo.component';
import { TimesheetApprovalComponent } from './employee-timesheet-approval/timesheet-approval.component';
import { EmployeeTimeSheetApprovalComponent } from './employee-timesheet-approval/components/employee-timesheet-approval-table/employee-timesheet-approval-table.component';
import { ViewTimesheetComponent } from './employee-timesheet-approval/dialogs/view-timesheet/view-timesheet.component';
import { ApproveDeclineTimesheetComponent } from './employee-timesheet-approval/dialogs/approve-decline-timesheet/approve-decline-timesheet.component';
import { ApprovalLoggedComponent } from './employee-timesheet-approval/forms/approval-logged/approval-logged.component';
import { ApprovalDetailsComponent } from './employee-timesheet-approval/forms/approval-details/approval-details.component';
import { EditableFormTableComponent } from './employee-shared/forms/editable-form-table/editable-form-table.component';

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
        RouterModule.forChild(AdminEmployeeRoutes)
    ],
    exports: [
        ...fromEmployeeShared.components,
        ...fromEmployeeMain.components,
        ...fromEmployeeDetails.components
    ],
    declarations: [
        EmployeeDetailsComponent,
        EmployeeCreateComponent,
        EmployeeUpdateComponent,
        ...fromEmployeeShared.components,
        ...fromEmployeeMain.components,
        ...fromEmployeeDetails.components,
        EmployeeServiceCalendarComponent,
        CalendarHeaderComponent,
        MainEmployeeShift,
        ReusableTableShiftComponent,
        TasksComponent,
        AddEmployeeShiftComponent,
        ServiceScheduleDetailsComponent,
        HoursComponent,
        ShiftTasksComponent,
        ClientTotalsComponent,
        ShiftLocationComponent,
        ClientDetailsComponent,
        EmployeeTasksComponent,
        ReusableTableTasksComponent,
        AddTasksComponent,
        ReusableGridTasksComponent,
        EmployeeLeavesComponent,
        ReusableTableLeavesComponent,
        AddEmployeeLeaveComponent,
        LeavePeriodComponent,
        ApprovalComponent,
        EmployeeAvailableShiftComponent,
        EmployeeTimesheetComponent,
        AddTimesheetComponent,
        TimesheetDetailsComponent,
        TimeLoggedComponent,
        ViewAllComplianceComponent,
        ViewAllCertificateComponent,
        UpdateProfilePasswordComponent,
        UpdateProfilePhotoComponent,
        TimesheetApprovalComponent,
        EmployeeTimeSheetApprovalComponent,
        ViewTimesheetComponent,
        ApproveDeclineTimesheetComponent,
        ApprovalLoggedComponent,
        ApprovalDetailsComponent,
        EditableFormTableComponent,
    ]
})
export class AdminEmployeeModule{ }
