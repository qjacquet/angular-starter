import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { LoggerModule } from 'ngx-logger';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DirectivesModule } from './core/directives';
import { ErrorInterceptor } from './core/helpers/error.interceptor';
import { FakeBackendProvider } from './core/helpers/fake-backend';
import { JwtInterceptor } from './core/helpers/jwt.interceptor';
import { AlertService } from './core/ui/alert/alert.service';
import { AuthenticationService } from './core/services/authentication.service';
import { ConfigService } from './core/services/config.service';
import { DialogService } from './core/ui/dialog/dialog.service';
import { FormService } from './core/services/form.service';
import { ThemeService } from './core/services/theme.service';
import { DialogComponent } from './core/ui/dialog/dialog.component';
import { FormStepperService } from './core/ui/mat-stepper/form-stepper.service';
import { MaterialColorPickerModule } from './core/ui/material-color-picker/material-color-picker.module';
import { SidenavModule } from './core/ui/sidenav/sidenav.module';
import { SidenavService } from './core/ui/sidenav/sidenav.service';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { SearchComponent } from './core/ui/search/search.component';

import { SharedModule } from './core/shared/shared.module';
import { OverlayContainer, FullscreenOverlayContainer } from '@angular/cdk/overlay';
import { MatFileUploadComponent } from './core/ui/mat-file-upload/mat-file-upload.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DialogComponent,
    SearchComponent,
    MatFileUploadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    SharedModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    LoggerModule.forRoot({
      serverLoggingUrl: `${environment.apiUrl}api/logs`,
      level: environment.logLevel,
      serverLogLevel: environment.serverLogLevel,
      disableConsoleLogging: false
    }),
    DirectivesModule,
    SidenavModule,
    MaterialColorPickerModule
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
    FormStepperService,
    ThemeService,
    ConfigService,
    {provide: OverlayContainer, useClass: FullscreenOverlayContainer}
  ],
  entryComponents: [
    DialogComponent,
    SearchComponent,
    MatFileUploadComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
