import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { navigation, Navigation } from '../../config/navigation';
import { SidenavService } from './sidenav.service';
import { User } from '../../models/user';
import { ThemeService } from '../../services/theme.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  items: Navigation[];
  currentUser: User;

  @Input() title: string;

  // Theme
  @Input() selectedTheme: string;
  @Output() selectedThemeChange = new EventEmitter<string>();

  constructor(
    private sideNavService: SidenavService,
    private themeService: ThemeService,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    this.items = navigation;
  }

  hide() {
    this.sideNavService.close();
  }

  toggleDarkMode() {
    this.themeService.setReverse();
  }

  setTheme(themeClass: string) {
    this.themeService.setTheme(themeClass);
  }

}
