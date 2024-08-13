import { Routes } from '@angular/router';
import { ScheduleBoardMainComponent } from './schedule-board-main/schedule-board-main.component';
import { ScheduleBoardClientComponent } from './schedule-board-client/schedule-board-client.component';
import { ScheduleBoardEmployeeComponent } from './schedule-board-employee/schedule-board-employee.component';

export const AdminScheduleBoardRoutes: Routes = [
  { path: '', component: ScheduleBoardMainComponent },
  { path: 'details/client/:id', component: ScheduleBoardClientComponent },
  { path: 'details/employee/:id', component: ScheduleBoardEmployeeComponent },
];
