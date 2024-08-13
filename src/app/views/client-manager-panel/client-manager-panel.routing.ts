import { Routes } from '@angular/router';
import { ClientManagerPanelComponent } from './client-manager-panel.component';
import { ClientManagerGuard } from '@app-admin-guard/client-manager-panel/client-manager.guard';

export const ClientManagerPanelPanelRoutes: Routes = [
  { 
    path: '', 
    component: ClientManagerPanelComponent,

    /* CLIENT MANAGER PANEL CHILD ROUTES */
    children: [
      /* EMPTY PATH REDIRECT TO DASHBOARD */
      {
        path:'',
        redirectTo: '/staff/dashboard',
        pathMatch: 'full'
      },

      /* CLIENT MANAGER DASHBOARD */
      {  
        path: 'dashboard',
        loadChildren: async () =>
          (
            await import(
              './pages/dashboard/dashboard.module'
            )
          ).ClientManagerDashboardModule,
        canActivate: [ClientManagerGuard]
      },
      
      /* REFERRALS */
      {  
        path: 'referrals',
        loadChildren: async () =>
          (
            await import(
              './pages/referrals/referrals.module'
            )
          ).ClientManagerReferralModule,
        canActivate: [ClientManagerGuard]
      },
      
      /* CLIENTS */
      {  
        path: 'clients',
        loadChildren: async () =>
          (
            await import(
              './pages/client/client.module'
            )
          ).ClientManagerClientModule,
        canActivate: [ClientManagerGuard]
      },

      /* EMPLOYEES */
      {  
        path: 'employees',
        loadChildren: async () =>
          (
            await import(
              './pages/employees/employee.module'
            )
          ).AdminEmployeeModule,
        canActivate: [ClientManagerGuard]
      },

      /* CARE MANAGEMENT */
      {  
        path: 'care',
        loadChildren: async () =>
          (
            await import(
              './pages/care-management/care-management.module'
            )
          ).AdminCareManagementModule,
        canActivate: [ClientManagerGuard]
      },

      /* SCHEDULE BOARD */
      {  
        path: 'schedule',
        loadChildren: async () =>
          (
            await import(
              './pages/schedule-board/schedule-board.module'
            )
          ).AdminScheduleBoardModule,
        canActivate: [ClientManagerGuard]
      },
    ] 
  },
  

  /* MISSING PATH REDIRECT TO ERROR PAGE */
  {
    path: '**',
    redirectTo: 'error/404'
  }
];
