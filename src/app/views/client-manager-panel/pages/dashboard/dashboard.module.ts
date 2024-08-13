import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { 
  FormsModule, 
  ReactiveFormsModule 
} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClientManagerDashboardRoutes } from './dashboard.routing';
import { DashboardMainComponent } from './dashboard-main/dashboard-main.component'
import { SharedModule } from '@app-shared/shared.module';
import { NgChartsModule } from 'ng2-charts';

import { MaterialComponentsModule } from '@app-material-component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { LazyLoadImageModule } from 'ng-lazyload-image';

import { TotalEnquiryAndApprovalComponent } from './dashboard-main/components/total-enquiry-and-approval/total-enquiry-and-approval.component';
import { TasksAndActivityComponent } from './dashboard-main/components/tasks-and-activity/tasks-and-activity.component';
import { ClientFundingComponent } from './dashboard-main/components/client-funding/client-funding.component';
import { IncidentsComponent } from './dashboard-main/components/incidents/incidents.component';
import { EmployeeShiftsComponent } from './dashboard-main/components/employee-shifts/employee-shifts.component';
import { CalendarComponent } from './dashboard-main/components/calendar/calendar.component';
import { EmployeeLeavesComponent } from './dashboard-main/components/employee-leaves/employee-leaves.component';
import { NewMembersComponent } from './dashboard-main/components/new-members/new-members.component';
import { StatisticDataComponent } from './dashboard-main/components/statistic-data/statistic-data.component';

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
    RouterModule.forChild(ClientManagerDashboardRoutes)
  ],
  declarations: [
    DashboardMainComponent,
    TotalEnquiryAndApprovalComponent,
    TasksAndActivityComponent,
    ClientFundingComponent,
    IncidentsComponent,
    EmployeeShiftsComponent,
    CalendarComponent,
    EmployeeLeavesComponent,
    NewMembersComponent,
    StatisticDataComponent
  ]
})
export class ClientManagerDashboardModule{ }
