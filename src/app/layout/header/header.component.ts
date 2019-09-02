import { Component, OnInit, Input, HostListener, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../core/services/authentication.service';
import { User } from '../../core/models/user';
import { SidenavService } from '../../core/ui/sidenav/sidenav.service';
import { Overlay, GlobalPositionStrategy, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { SearchComponent } from 'src/app/core/ui/search/search.component';
import { AlertService } from 'src/app/core/ui/alert/alert.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private sidenav: SidenavService,
    private overlay: Overlay,
    private alertService: AlertService
  ) { }

  @Input() title: string;
  @Input() currentUser: User;

  overlayRef: OverlayRef;

  ngOnInit() {
  }

  logout() {

    this.authenticationService.logout();
    this.router.navigate(['auth/login']);
  }

  toggleSidenav() {
    this.sidenav.toggle();
  }

  isOpenSidenav() {
    return this.sidenav.isOpen();
  }

  showSidenav() {
    this.sidenav.open();
  }

  openSearchOverlay() {
    const positionStrategy = this.overlay.position()
      .global()
      .centerHorizontally()
      .top();

    const overlayConfig = new OverlayConfig({
      hasBackdrop: true,
      backdropClass: 'backdrop',
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy,
      width: '100%'
    });

    this.overlayRef = this.overlay.create(overlayConfig);
    const filePreviewPortal = new ComponentPortal(SearchComponent);
    this.overlayRef.attach(filePreviewPortal);

    this.overlayRef.backdropClick().subscribe(_ => this.closeSearchOverlay());
  }

  closeSearchOverlay(): void {
    this.overlayRef.dispose();
  }

  @HostListener('document:keydown.escape', ['$event'])
  onKeydownEscape(event: KeyboardEvent) {
    this.overlayRef.dispose();
  }

  @HostListener('document:keydown.enter', ['$event'])
  onKeydownEnter(event: KeyboardEvent) {
    this.overlayRef.dispose();
    this.alertService.show('x results found');
  }

}
