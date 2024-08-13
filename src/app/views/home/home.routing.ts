import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';

export const HomeRoutes: Routes = [
  { path: 'home', component: HomePageComponent },

  /*{
    path: 'home',
    redirectTo: 'admin/signin',
    pathMatch: 'full'
  },*/

  {
    path:'error/404',
    component: ErrorPageComponent
  },


];
