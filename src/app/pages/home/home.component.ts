import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../../core/models/user';
import { AuthenticationService } from '../../core/services/authentication.service';
import { UserService } from '../../core/services/user.service';


interface Place {
    imgSrc: string;
    name: string;
    description: string;
    charge: string;
    location: string;
  }


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

    currentUser: User;
    users = [];
    places: Array<Place> = [];


    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService
    ) {
        this.currentUser = this.authenticationService.currentUserValue;

        this.places = [
            {
              imgSrc: 'assets/icons/icon-512x512.png',
              name: 'Cozy 5 Stars Apartment',
              description: `The place is close to Barceloneta Beach and bus stop just 2 min by walk and near to "Naviglio"
                    where you can enjoy the main night life in Barcelona.`,
              charge: '$899/night',
              location: 'Barcelona, Spain'
            },
            {
              imgSrc: 'assets/icons/icon-512x512.png',
              name: 'Office Studio',
              description: `The place is close to Metro Station and bus stop just 2 min by walk and near to "Naviglio"
                    where you can enjoy the night life in London, UK.`,
              charge: '$1,119/night',
              location: 'London, UK'
            },
            {
              imgSrc: 'assets/icons/icon-512x512.png',
              name: 'Beautiful Castle',
              description: `The place is close to Metro Station and bus stop just 2 min by walk and near to "Naviglio"
                    where you can enjoy the main night life in Milan.`,
              charge: '$459/night',
              location: 'Milan, Italy'
            }
          ];
    }

    ngOnInit() {
        this.loadAllUsers();
    }

    deleteUser(id: number) {
        this.userService.delete(id)
            .pipe(first())
            .subscribe(() => this.loadAllUsers());
    }

    private loadAllUsers() {
        this.userService.getAll()
            .pipe(first())
            .subscribe(users => this.users = users);
    }

}
