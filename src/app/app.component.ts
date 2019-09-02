import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav, MatSnackBar } from '@angular/material';
import { RouterOutlet } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { Subject } from 'rxjs';

import { Config } from './core/config/config';
import { User } from './core/models/user';
import { AuthenticationService } from './core/services/authentication.service';
import { ConfigService } from './core/services/config.service';
import { animations } from './core/ui/animations';
import { SidenavService } from './core/ui/sidenav/sidenav.service';
import { SplashScreenService } from './core/ui/splash-screen/splash-screen.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations
})
export class AppComponent implements OnInit {

  unsubscribeAll: Subject<any>;

  config: Config;

  @ViewChild('sidenav', null) public sidenav: MatSidenav;

  currentUser: User;

  constructor(
    private authenticationService: AuthenticationService,
    private swUpdate: SwUpdate,
    private snackbar: MatSnackBar,
    private sidenavService: SidenavService,
    private splashScreenService: SplashScreenService,
    private configService: ConfigService
  ) {
    // Set the private defaults
    this.unsubscribeAll = new Subject();

    // Get current user
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);

    // Update config
    this.configService.config.subscribe(c => {
      this.config = c;
    });
  }

  ngOnInit(): void {

    // Locale
    this.initLocale();

    // Sidenav
    this.initSidenav();

    // SW Update
    this.initSw();

    // Splash screen disable
    this.initSplashscreenDisable();
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  initSw() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        const snack = this.snackbar.open('Update Available', 'Reload');
        snack
          .onAction()
          .subscribe(() => {
            window.location.reload();
          });
      });
    }
  }

  initLocale() {
    registerLocaleData(localeFr);
  }

  initSidenav() {
    this.sidenavService.setSidenav(this.sidenav);
    this.config.sidebar.opened ? this.sidenavService.open() : this.sidenavService.close();
  }

  initSplashscreenDisable() {
    this.splashScreenService.hide();
  }
}
