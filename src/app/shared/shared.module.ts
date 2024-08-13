import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';  
import { 
  FormsModule, 
  NgControl, 
  ReactiveFormsModule 
} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { 
  Routes, 
  RouterModule 
} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MaterialComponentsModule } from './components/material-components/material-components.module';

/* IMAGE FILE MODIFIER */
import { ImageCropperModule } from 'ngx-image-cropper';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import * as fromComponents from './components'
import { PendingChangesGuard } from './guards/can-deactivate/pending-changes.guard';
import { StepperComponent } from './components/stepper/stepper.component';
import { NoNullPipe } from './pipes/no-null.pipe';
import { FileDropDirective } from './directives/file-drop.directive';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { DisableControlDirective } from './directives/disable-control.directive';
import { RoleHideDirective } from './directives/role-hide.directive';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { SyncStatusDialogComponent } from './components/sync-status-dialog/sync-status-dialog.component';
import { Convert24hrPipe } from './pipes/convert24hr.pipe';
import { TimePipe } from './pipes/time.pipe';
import { NameFormatPipe } from './pipes/name-format.pipe';
import { QuillModule } from 'ngx-quill';
import { DecimalPipe } from './pipes/decimal.pipe';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        HttpClientModule,
        ReactiveFormsModule,
        MaterialComponentsModule,
        ImageCropperModule,
        LazyLoadImageModule,
        NgxMatTimepickerModule.setLocale('en-GB'),
        GooglePlaceModule,
        QuillModule.forRoot({
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
              [{ 'header': 1 }, { 'header': 2 }],               // custom button values
              [{ 'list': 'ordered' }, { 'list': 'bullet' }],
              [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
              [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
              [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
              [{ 'font': [] }],
              [{ 'align': [] }],
              ['clean', 'link'],                                         // remove formatting button
            ]
          }
        })
    ],
    providers: [
        PendingChangesGuard,
        TimePipe,
        NameFormatPipe,
        DecimalPipe,
        //fromComponents.AlertComponent
    ],
    declarations: [...fromComponents.components, StepperComponent, NoNullPipe, FileDropDirective, DisableControlDirective, RoleHideDirective, RegistrationFormComponent, SyncStatusDialogComponent, Convert24hrPipe, TimePipe, NameFormatPipe, DecimalPipe],
    exports: [...fromComponents.components, RoleHideDirective, FileDropDirective, DisableControlDirective, ReactiveFormsModule, FormsModule, Convert24hrPipe, TimePipe, NameFormatPipe, QuillModule,DecimalPipe]
})
export class SharedModule { } 
