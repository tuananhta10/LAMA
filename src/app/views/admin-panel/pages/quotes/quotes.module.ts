import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { 
  FormsModule, 
  ReactiveFormsModule 
} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminQuotesRoutes } from './quotes.routing';
import { SharedModule } from '@app-shared/shared.module';
import { NgChartsModule } from 'ng2-charts';
import { MaterialComponentsModule } from '@app-material-component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { QuotesMainComponent } from './quotes-main/quotes-main.component';
import { ReusableTableEnquiryComponent } from './quotes-main/components/reusable-table-enquiry/reusable-table-enquiry.component';
import { AddEnquiryComponent } from './quotes-main/dialogs/add-enquiry/add-enquiry.component';

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
    RouterModule.forChild(AdminQuotesRoutes)
  ],
  declarations: [
    QuotesMainComponent,
    ReusableTableEnquiryComponent,
    AddEnquiryComponent,
  ]
})
export class AdminQuotesModule{ }
