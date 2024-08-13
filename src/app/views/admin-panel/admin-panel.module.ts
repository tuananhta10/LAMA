import { 
  NgModule,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminPanelRoutes } from './admin-panel.routing';
import { AdminPanelComponent } from './admin-panel.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

import { 
  FormsModule, 
  ReactiveFormsModule 
} from '@angular/forms';
import { AdminProfileLoaderComponent } from './components/admin-profile-loader/admin-profile-loader.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { HeaderNavigationModule } from '@app-shared/components/navigation/header-navigation.module';
import { SharedModule } from '@app-shared/shared.module';
import { DatePipe } from '@angular/common';
import { CKEditorModule } from 'ckeditor4-angular';
import { SSOComponent } from './pages/sso/sso.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    SharedModule,  
    CKEditorModule,
    RouterModule.forChild(AdminPanelRoutes),
    HeaderNavigationModule
  ],
  exports: [
    AdminPanelComponent,
    AdminProfileLoaderComponent,
    SidebarComponent,
  ],
  declarations: [
    AdminPanelComponent,
    SidebarComponent,
    AdminProfileLoaderComponent,
    SSOComponent
  ],
  providers: [DatePipe]
})
export class AdminPanelModule{ }
