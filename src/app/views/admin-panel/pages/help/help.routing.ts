import { Routes } from '@angular/router';
import { HelpMainComponent } from './help-main/help-main.component';

export const AdminHelpRoutes: Routes = [
  { path: '', component: HelpMainComponent },
  { path: '/:id', component: HelpMainComponent }
];
