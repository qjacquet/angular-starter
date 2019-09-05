import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { User } from 'src/app/core/models/user';

@Component({
  selector: 'app-stepper-form',
  templateUrl: './stepper-form.component.html',
  styleUrls: ['./stepper-form.component.scss'],
})
export class StepperFormComponent implements OnInit {


  currentUser: User;
  canShowForm: boolean;
  constructor(
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(u => {
      this.currentUser = u;
    });
  }

  ngOnInit() {
    this.canShowForm = this.currentUser.formCompleted == null || this.currentUser.formCompleted.status === 'toUpdate';
  }
}
