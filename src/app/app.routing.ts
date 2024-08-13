import { Routes } from '@angular/router';
import { AdminGuard } from '@app-admin-guard/admin-panel/admin.guard';

export const rootRouterConfig: Routes = [
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full'
  },

  {
    path: '',
    loadChildren: async () =>
      (
        await import(
          './views/home/home.module'
      )
    ).HomeModule,
  },

  {
    path: '',
    loadChildren: async () =>
      (
        await import(
          './views/admin-panel/admin-panel.module'
        )
      ).AdminPanelModule,
      //canActivate: [AuthGuard],
      //data: {restrictAuth: true},
  },

  {
    path: 'staff',
    loadChildren: async () =>
      (
        await import(
          './views/client-manager-panel/client-manager-panel.module'
        )
      ).ClientManagerPanelModule,
      data: {restrictAuth: true},
  },
  

  {
    path: '**',
    redirectTo: 'error/404'
  }
];
