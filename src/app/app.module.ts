import { AlertService } from './core/services/alert.service';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthenticationService } from './core/services/authentication.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { DialogComponent } from './ui/dialog/dialog.component';
import { DialogService } from './core/services/dialog.service';
import { environment } from '../environments/environment';
import { ErrorInterceptor } from './core/helpers/error.interceptor';
import { FakeBackendProvider } from './core/helpers/fake-backend';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from './core/helpers/jwt.interceptor';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { MaterialModule } from './core/shared/material.module';
import { NgModule, LOCALE_ID } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { SidenavService } from './ui/sidenav/sidenav.service';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { FormService } from './core/services/form.service';
import { FormStepperService } from './ui/mat-stepper/form-stepper.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    DialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    LoggerModule.forRoot({
      serverLoggingUrl: `${environment.apiUrl}api/logs`,
      level: environment.logLevel,
      serverLogLevel: environment.serverLogLevel,
      disableConsoleLogging: false
    })
  ],
  providers: [
    AuthenticationService,

    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'fr' },
    { provide: MAT_DATE_LOCALE, useValue: LOCALE_ID},

    // provider used to create fake backend
    FakeBackendProvider,

    DialogService,
    AlertService,
    SidenavService,
    FormService,
    FormStepperService
  ],
  entryComponents: [
    DialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
