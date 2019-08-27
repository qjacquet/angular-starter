import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../core/services/authentication.service';
import { User } from '../../core/models/user';
import { SidenavService } from '../../core/ui/sidenav/sidenav.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private sidenav: SidenavService
  ) { }

  @Input() title: string;
  @Input() currentUser: User;

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

}
