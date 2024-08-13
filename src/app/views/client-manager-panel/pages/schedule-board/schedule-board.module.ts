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

import { AdminScheduleBoardRoutes } from './schedule-board.routing';
import { ScheduleBoardMainComponent } from './schedule-board-main/schedule-board-main.component';
import { AddEmployeeShiftComponent } from './dialogs/add-employee-shift/add-employee-shift.component';
import { ClientTotalsComponent } from './forms/client-totals/client-totals.component';
import { ShiftLocationComponent } from './forms/shift-location/shift-location.component';
import { ClientDetailsComponent } from './forms/client-details/client-details.component';
import { ServiceScheduleDetailsComponent } from './forms/service-schedule-details/service-schedule-details.component';
import { HoursComponent } from './forms/hours/hours.component';
import { ShiftTasksComponent } from './forms/tasks/tasks.component';
import { AssignEmployeeComponent } from './dialogs/assign-employee/assign-employee.component';
import { FilterMultipleComponent } from './dialogs/filter-multiple/filter-multiple.component';
import { ScheduleBoardClientComponent } from './schedule-board-client/schedule-board-client.component';
import { ScheduleBoardEmployeeComponent } from './schedule-board-employee/schedule-board-employee.component';
import { AddEmployeeShiftSimpleComponent } from './dialogs/add-employee-shift-simple/add-employee-shift-simple.component';
import { ServiceDetailsSimpleComponent } from './forms/service-details-simple/service-details-simple.component';
import { SearchClientModalComponent } from './dialogs/search-client-modal/search-client-modal.component';
import { ClientServiceScheduleComponent } from '../client/client-service-schedule/client-service-schedule.component';

const components = [
  ScheduleBoardMainComponent,
  AddEmployeeShiftComponent,
  ClientTotalsComponent,
  ShiftLocationComponent,
  ClientDetailsComponent,
  ServiceScheduleDetailsComponent,
  HoursComponent,
  ShiftTasksComponent,
]

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
    RouterModule.forChild(AdminScheduleBoardRoutes)
  ],
  declarations: [
    ...components,
    AssignEmployeeComponent,
    FilterMultipleComponent,
    ScheduleBoardClientComponent,
    ScheduleBoardEmployeeComponent,
    AddEmployeeShiftSimpleComponent,
    ServiceDetailsSimpleComponent,
    SearchClientModalComponent,
  ]
})
export class AdminScheduleBoardModule{ }
