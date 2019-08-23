import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material';

@Injectable()
export class SidenavService {
    private sidenav: MatSidenav;

    setSidenav(sidenav: MatSidenav) {
        this.sidenav = sidenav;
    }

    open() {
        this.sidenav.open();
    }

    close() {
        this.sidenav.close();
    }

    toggle() {
        this.sidenav.toggle();
    }
}
