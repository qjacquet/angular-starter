import { Component, OnInit, Input } from '@angular/core';
import { navigation, Navigation } from '../../config/navigation';
import { SidenavService } from './sidenav.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  items: Navigation[];

  @Input() title: string;
  @Input() currentUser: User;

  constructor(
    private sideNavService: SidenavService
  ) {
  }

  ngOnInit() {
    this.items = navigation;
  }

  hide() {
    this.sideNavService.close();
  }

}
