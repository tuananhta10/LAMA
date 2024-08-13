import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { 
  FormsModule, 
  ReactiveFormsModule 
} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClientManagerReferralsRoutes } from './referrals.routing';
import { SharedModule } from '@app-shared/shared.module';
import { NgChartsModule } from 'ng2-charts';
import { MaterialComponentsModule } from '@app-material-component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { ReferralsMainComponent } from './referrals-main/referrals-main.component';
import { ReusableTableReferralsComponent } from './referrals-main/components/reusable-table-referrals/reusable-table-referrals.component';
import { AddReferralsComponent } from './referrals-main/dialogs/add-referrals/add-referrals.component';
import { ReusableGridReferralsComponent } from './referrals-main/components/reusable-grid-referrals/reusable-grid-referrals.component';
import { ReferralsCreateComponent } from './referrals-create/referrals-create.component';
import { ParticipantDetailsComponent } from './referrals-create/forms/participant-details/participant-details.component';
import { ReferrerDetailsComponent } from './referrals-create/forms/referrer-details/referrer-details.component';
import { AdditionalReportsComponent } from './referrals-create/forms/additional-reports/additional-reports.component';
import { ServiceDetailsComponent } from './referrals-create/forms/service-details/service-details.component';

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
    RouterModule.forChild(ClientManagerReferralsRoutes)
  ],
  declarations: [
    ReferralsMainComponent,
    ReusableTableReferralsComponent,
    ReusableGridReferralsComponent,
    AddReferralsComponent,
    ReferralsCreateComponent,
    ParticipantDetailsComponent,
    ReferrerDetailsComponent,
    AdditionalReportsComponent,
    ServiceDetailsComponent,
  ]
})
export class ClientManagerReferralModule{ }
