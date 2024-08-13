import { Routes } from '@angular/router';
import { QuotesMainComponent } from './quotes-main/quotes-main.component';

export const AdminQuotesRoutes: Routes = [
  { path: '', component: QuotesMainComponent },
  { path: 'enquiries', component: QuotesMainComponent },
];
