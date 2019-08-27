import { Component, OnInit } from '@angular/core';
import { navigation, Navigation } from '../../navigation';
import { SidenavService } from '../../ui/sidenav/sidenav.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  items: Navigation[];

  constructor(
    private sideNavService: SidenavService
  ) {
    console.log(navigation);
    this.items = navigation;
  }

  ngOnInit() {
    console.log(navigation);
    this.items = navigation;
  }

  hide() {
    this.sideNavService.close();
  }

}
