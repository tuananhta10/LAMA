import { Routes } from '@angular/router';
import { AdminPanelComponent } from './admin-panel.component';
import { AdminSigninComponent } from './pages/authentication/admin-signin/admin-signin.component';
import { AdminProfileComponent } from './pages/authentication/admin-profile/admin-profile.component';
import { AdminGuard } from '@app-admin-guard/admin-panel/admin.guard';
import { SSOComponent } from './pages/sso/sso.component';

export const AdminPanelRoutes: Routes = [
  
  { path: 'sso', component: SSOComponent },
  { 
    path: '', 
    component: AdminPanelComponent,

    /* ADMIN PANEL CHILD ROUTES */
    children: [
      /*  ADMIN PROFILE */
      {  
        path: '',
        loadChildren: async () =>
          (
            await import(
              './pages/authentication/authentication.module'
            )
          ).AdminAuthenticationModule
      },

      /* EMPTY PATH REDIRECT TO DASHBOARD */
      {
        path:'',
        redirectTo: '/admin/dashboard',
        pathMatch: 'full'
      },

      {  
        path: 'admin/global-search',
        loadChildren: async () =>
          (
            await import(
              './pages/global-search/global-search.module'
            )
          ).AdminGlobalSearchModule,
        canActivate: [AdminGuard],
        data: {
          role: ['admin'],
        },
      },

      {  
        path: 'admin/help',
        loadChildren: async () =>
          (
            await import(
              './pages/help/help.module'
            )
          ).AdminHelpModule,
        canActivate: [AdminGuard],
        data: {
          role: ['admin'],
        },
      },

      /* ADMIN DASHBOARD */
      {  
        path: 'admin/dashboard',
        loadChildren: async () =>
          (
            await import(
              './pages/dashboard/dashboard.module'
            )
          ).AdminDashboardModule,
        canActivate: [AdminGuard],
        data: {
          role: ['admin'],
        },
      },

      /* ADMIN REFERRALS  */
      {  
        path: 'admin/referrals',
        loadChildren: async () =>
          (
            await import(
              './pages/referrals/referrals.module'
            )
          ).AdminReferralModule,
        canActivate: [AdminGuard],
        data: {
          role: ['admin'],
        },
      },

      /* ADMIN CLIENT MANAGEMENT */
      {  
        path: 'admin/clients',
        loadChildren: async () =>
          (
            await import(
              './pages/client/client.module'
            )
          ).AdminClientModule,
        canActivate: [AdminGuard],
        data: {
          role: ['admin'],
        },
      },

      /* ADMIN EMPLOYEES */
      {  
        path: 'admin/employees',
        loadChildren: async () =>
          (
            await import(
              './pages/employees/employee.module'
            )
          ).AdminEmployeeModule,
        canActivate: [AdminGuard],
        data: {
          role: ['admin'],
        },
      },

      /* ADMIN CARE MANAGEMENT */
      {  
        path: 'admin/care',
        loadChildren: async () =>
          (
            await import(
              './pages/care-management/care-management.module'
            )
          ).AdminCareManagementModule,
        canActivate: [AdminGuard],
        data: {
          role: ['admin'],
        },
      },


      /* ADMIN ADMINISTRATION */
      {  
        path: 'admin/setup',
        loadChildren: async () =>
          (
            await import(
              './pages/administration/administration.module'
            )
          ).AdminAdministrationModule,
        canActivate: [AdminGuard],
        data: {
          role: ['admin'],
        },
      },

      /* ADMIN SCHEDULE BOARD */
      {  
        path: 'admin/schedule',
        loadChildren: async () =>
          (
            await import(
              './pages/schedule-board/schedule-board.module'
            )
          ).AdminScheduleBoardModule,
        canActivate: [AdminGuard],
        data: {
          role: ['admin'],
        },
      },

      /* MISSING PATH REDIRECT TO ERROR PAGE */
      {
        path: '**',
        redirectTo: 'error/404'
      }
    ] 
  },


  
];
