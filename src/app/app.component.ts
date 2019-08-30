import { Component, ViewChild, OnInit, Inject, ɵSWITCH_VIEW_CONTAINER_REF_FACTORY__POST_R3__ } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthenticationService } from './core/services/authentication.service';
import { User } from './core/models/user';
import { MatSnackBar, MatDialog, MatDialogConfig, MatSidenav } from '@angular/material';
import { SidenavService } from './core/ui/sidenav/sidenav.service';
import { RouterOutlet } from '@angular/router';
import { animations } from './core/ui/animations';
import { SwUpdate, SwPush } from '@angular/service-worker';
import { DialogService } from './core/services/dialog.service';
import { NGXLogger } from 'ngx-logger';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { SplashScreenService } from './core/ui/splash-screen/splash-screen.service';
import { OverlayContainer } from '@angular/cdk/overlay';
import { DOCUMENT } from '@angular/common';
import { ThemeService } from './core/services/theme.service';
import { Config } from './core/config/config';
import { ConfigService } from './core/services/config.service';

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

  title = 'Angular Starter';

  currentUser: User;

  constructor(
    @Inject(DOCUMENT) private document: any,
    private router: Router,
    private authenticationService: AuthenticationService,
    private swUpdate: SwUpdate,
    private snackbar: MatSnackBar,
    private dialogService: DialogService,
    private logger: NGXLogger,
    private sidenavService: SidenavService,
    private splashScreenService: SplashScreenService,
    private themeService: ThemeService,
    private overlay: OverlayContainer,
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
  }

  initSplashscreenDisable() {
    this.splashScreenService.hide();
  }
}
