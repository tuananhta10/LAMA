import { 
  NgModule,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { 
  FormsModule, 
  ReactiveFormsModule 
} from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
import { SharedModule } from '@app-shared/shared.module';
import { ClientManagerPanelPanelRoutes } from './client-manager-panel.routing';
import { ClientManagerPanelComponent } from './client-manager-panel.component';
import { HeaderNavigationModule } from '@app-shared/components/navigation/header-navigation.module';
import {DatePipe} from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    SharedModule,
    HeaderNavigationModule,
    RouterModule.forChild(ClientManagerPanelPanelRoutes),
  ],
  exports: [
    ClientManagerPanelComponent,
  ],
  declarations: [
    ClientManagerPanelComponent
  ],
  providers: [DatePipe]
})
export class ClientManagerPanelModule{ }
