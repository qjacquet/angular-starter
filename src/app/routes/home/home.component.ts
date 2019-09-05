import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/user';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

    user: User;

    constructor(
        private userService: UserService
    ) { }

    ngOnInit() {
    }

    click() {
        this.userService.getById(1).subscribe(u => {
            this.user = u;
            console.log(this.user);
        });
        
    }
}
