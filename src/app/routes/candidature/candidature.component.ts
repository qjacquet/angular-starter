import { Component, ViewChild, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DisclaimerComponent } from './stepper/steps/disclaimer/disclaimer.component';
import { PersonalDetailsComponent } from './stepper/steps/personal-details/personal-details.component';
import { ContactComponent } from './stepper/steps/contact/contact.component';
import { PaymentComponent } from './stepper/steps/payment/payment.component';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { User } from 'src/app/core/models/user';
import { MatStepper } from '@angular/material';
import { UserService } from 'src/app/core/services/user.service';
import { FormService } from '../../core/services/form.service';
import { CdkStep, StepperSelectionEvent } from '@angular/cdk/stepper';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
  selector: 'app-candidature',
  templateUrl: './candidature.component.html',
  styleUrls: ['./candidature.component.scss'],
})
export class CandidatureComponent implements OnInit {


  currentUser: User;
  canShowForm: boolean;
  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private formService: FormService,
    private cdr: ChangeDetectorRef,
    private alertService: AlertService
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit() {
    this.canShowForm = this.currentUser.candidature == null || this.currentUser.candidature.status === 'toUpdate';
  }
}
