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

import { ViewClientScheduleListComponent } from './dialogs/view-client-schedule-list/view-client-schedule-list.component';
import { ReusableListViewComponent } from './components/reusable-list-view/reusable-list-view.component';
import { AssignEmployeeFormComponent } from './forms/assign-employee-form/assign-employee-form.component';
import { AssignedEmployeeDetailsComponent } from './forms/assigned-employee-details/assigned-employee-details.component';
import { EmployeeAvailabilityComponent } from './dialogs/employee-availability/employee-availability.component';
import { CancelScheduleComponent } from './dialogs/cancel-schedule/cancel-schedule.component';
import { MarkAsCompleteScheduleComponent } from './dialogs/mark-as-complete-schedule/mark-as-complete-schedule.component';
import { RescheduleComponent } from './dialogs/reschedule/reschedule.component';
import { RecalculateComponent } from './dialogs/recalculate/recalculate.component';
import { UndoCompleteComponent } from './dialogs/undo-complete/undo-complete.component';
import { BookResourceComponent } from './dialogs/book-resource/book-resource.component';
import { SwitchWorkerComponent } from './dialogs/switch-worker/switch-worker.component';
import { ChangeDayComponent } from './dialogs/change-day/change-day.component';
import { ScheduleActionComponent } from './components/schedule-action/schedule-action.component';
import { EmployeeAvailabilityManyComponent } from './dialogs/employee-availability-many/employee-availability-many.component';
import { ViewClientFundingListComponent } from './dialogs/view-client-funding-list/view-client-funding-list.component';
import { ParticipantFundingListViewComponent } from './components/participant-funding-list-view/participant-funding-list-view.component';
import { EditableFormTableComponent } from './components/editable-form-table/editable-form-table.component';
import { UnassignWorkerScheduleComponent } from './dialogs/unassign-worker-schedule/unassign-worker-schedule.component';

const components = [
  ScheduleBoardMainComponent,
  AddEmployeeShiftComponent,
  ClientTotalsComponent,
  ShiftLocationComponent,
  ClientDetailsComponent,
  ServiceScheduleDetailsComponent,
  HoursComponent,
  ShiftTasksComponent,
  AssignEmployeeComponent,
  FilterMultipleComponent,
  ScheduleBoardClientComponent,
  ScheduleBoardEmployeeComponent,
  AddEmployeeShiftSimpleComponent,
  ServiceDetailsSimpleComponent,
  SearchClientModalComponent,
  ViewClientScheduleListComponent,
  //ReusableListViewComponent
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
    ReusableListViewComponent,
    AssignEmployeeFormComponent,
    AssignedEmployeeDetailsComponent,
    EmployeeAvailabilityComponent,
    CancelScheduleComponent,
    MarkAsCompleteScheduleComponent,
    RescheduleComponent,
    RecalculateComponent,
    UndoCompleteComponent,
    BookResourceComponent,
    SwitchWorkerComponent,
    ChangeDayComponent,
    ScheduleActionComponent,
    EmployeeAvailabilityManyComponent,
    ViewClientFundingListComponent,
    ParticipantFundingListViewComponent,
    EditableFormTableComponent,
    UnassignWorkerScheduleComponent,
    
  ]
})
export class AdminScheduleBoardModule{ }
