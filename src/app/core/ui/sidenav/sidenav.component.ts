import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { navigation, Navigation } from '../../config/navigation';
import { SidenavService } from './sidenav.service';
import { User } from '../../models/user';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  items: Navigation[];

  @Input() title: string;
  @Input() currentUser: User;

  // Theme
  @Input() selectedTheme: string;
  @Output() selectedThemeChange = new EventEmitter<string>();

  constructor(
    private sideNavService: SidenavService,
    private themeService: ThemeService
  ) {
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

}
