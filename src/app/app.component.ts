import { Component, ViewChild, OnInit, Inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthenticationService } from './core/services/authentication.service';
import { User } from './core/models/user';
import { MatSnackBar, MatDialog, MatDialogConfig, MatSidenav } from '@angular/material';
import { SidenavService } from './core/ui/sidenav/sidenav.service';
import { RouterOutlet } from '@angular/router';
import { animations } from './core/shared/animations';
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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations
})
export class AppComponent implements OnInit {

  unsubscribeAll: Subject<any>;

  themeClass: string;

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
    private overlay: OverlayContainer
  ) {
    // Set the private defaults
    this.unsubscribeAll = new Subject();

    // Get current user
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    // Splash screen
    this.splashScreenService.hide();

    // Locale
    registerLocaleData(localeFr);

    // Sidenav
    this.sidenavService.setSidenav(this.sidenav);

    // SW Update
    this.initSw();

    // Theme
    this.initTheme();
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  initTheme() {
    this.themeService.themeClass.subscribe(t => {
      this.themeClass = t;
    });
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
}
