import { Component, ViewChild, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthenticationService } from './core/services/authentication.service';
import { User } from './core/models/user';
import { MatSnackBar, MatDialog, MatDialogConfig, MatSidenav } from '@angular/material';
import { SidenavService } from './ui/sidenav/sidenav.service';
import { RouterOutlet } from '@angular/router';
import { animations } from './ui/animations';
import { SwUpdate, SwPush } from '@angular/service-worker';
import { DialogService } from './core/services/dialog.service';
import { NGXLogger } from 'ngx-logger';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations
})
export class AppComponent implements OnInit {

  private unsubscribeAll: Subject<any>;

  @ViewChild('sidenav', null) public sidenav: MatSidenav;

  title = 'Angular Starter';

  currentUser: User;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private swUpdate: SwUpdate,
    private snackbar: MatSnackBar,
    private dialogService: DialogService,
    private logger: NGXLogger,
    private sidenavService: SidenavService
  ) {
    // Set the private defaults
    this.unsubscribeAll = new Subject();

    // Get current user
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    registerLocaleData(localeFr);

    this.sidenavService.setSidenav(this.sidenav);


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

    // Chargement sidebar
    // this.router.events
    // .pipe(
    //     filter((event) => event instanceof NavigationEnd),
    //     takeUntil(this.unsubscribeAll)
    // )
    // .subscribe(() => {
    //   this.sideBarService.getSidebar('main').open();
    //     }
    // );
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
