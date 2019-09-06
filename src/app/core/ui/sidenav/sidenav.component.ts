import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { navigation, Navigation } from '../../config/navigation';
import { SidenavService } from './sidenav.service';
import { User } from '../../models/user';
import { ThemeService } from '../../services/theme.service';
import { AuthenticationService } from '../../services/authentication.service';
import { Config } from 'protractor';

import { MatDialog } from '@angular/material';
import { MatFileUploadComponent } from '../mat-file-upload/mat-file-upload.component';
import { AlertService } from '../alert/alert.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  items: Navigation[];
  currentUser: User;

  @Input() config: Config;

  constructor(
    private sideNavService: SidenavService,
    private themeService: ThemeService,
    private authenticationService: AuthenticationService,
    public dialog: MatDialog,
    public alertService: AlertService
  ) {
    this.authenticationService.currentUser.subscribe(u => {
      this.currentUser = u;
    });
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

  getAvatar() {
    return null; //this.authenticationService.getAvatar();
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (event) => {
        this.currentUser.profile.avatarBase64 = reader.result.toString();
        this.authenticationService.updateCurrentUser(this.currentUser);
      };
      this.authenticationService.saveCurrentUser().subscribe(u => {
        this.alertService.show('Profile picture updated');
      },
      e => {
        this.alertService.show(e);
      });
    }
  }

  openAvatarDialog() {
    // this.dialog.open(MatFileUploadComponent, {
    //   closeOnNavigation: true,
    //   width: '80%',
    //   height: '80%'
    // });
  }

  disconnect() {
    this.authenticationService.logout();
  }

}
