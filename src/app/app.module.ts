import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { 
  // HttpClientModule, 
  HTTP_INTERCEPTORS 
} from '@angular/common/http';

import { AppComponent } from './app.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { AuthInterceptor } from '@app-main-interceptor';
import { SharedModule } from '@app-shared/shared.module';
import { environment } from '@environments/environment';
import { rootRouterConfig } from './app.routing';

/* FOR NGRX CONFIG */
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { 
  StoreRouterConnectingModule, 
  DefaultRouterStateSerializer 
} from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { 
  appReducer,
  metaReducers
} from './app.reducer';

import { EffectsModule } from '@ngrx/effects';
import { AdminProfilePublicModule } from './views/admin-panel/store/module';
import { ClientManagerPublicModule } from './views/client-manager-panel/store/module';
import { UnAuthorizedInterceptor } from './shared/interceptor/unathorized-interceptor';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { AngularFireMessagingModule } from '@angular/fire/compat/messaging';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule} from '@angular/fire/compat';
import {
  MatNativeDateModule,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';
import { JwtModule } from '@auth0/angular-jwt';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    SharedModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    NgxSpinnerModule,
    RouterModule.forRoot(rootRouterConfig, {
      useHash: false,
      relativeLinkResolution: 'legacy',
      initialNavigation: 'enabled',
    }),
    /* NGRX CONFIGURATION */
    StoreModule.forRoot(
      appReducer, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: false,
        strictActionImmutability: false
      }
    }),
    StoreDevtoolsModule.instrument({
      name: environment.NgRxName,
      maxAge: environment.NgRxMaxAge,
      logOnly: environment.isDebug
    }),
    StoreRouterConnectingModule.forRoot({ serializer: DefaultRouterStateSerializer }),
    EffectsModule.forRoot([]),
    AdminProfilePublicModule.forRoot(),
    ClientManagerPublicModule.forRoot(),
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireMessagingModule,
    AngularFireModule.initializeApp(environment.firebase),
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('token');
        },
      },
    }),

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: UnAuthorizedInterceptor, 
      multi: true 
    },
    { provide: MAT_DATE_LOCALE, useValue: 'en-AU' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
