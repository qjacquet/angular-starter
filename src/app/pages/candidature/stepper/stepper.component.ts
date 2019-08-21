import { Component, ViewChild, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DisclaimerComponent } from './steps/disclaimer/disclaimer.component';
import { PersonalDetailsComponent } from './steps/personal-details/personal-details.component';
import { ContactComponent } from './steps/contact/contact.component';
import { PaymentComponent } from './steps/payment/payment.component';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { User } from 'src/app/core/models/user';
import { MatStepper } from '@angular/material';
import { UserService } from 'src/app/core/services/user.service';
import { FormService } from '../../../core/services/form.service';
import { CdkStep, StepperSelectionEvent } from '@angular/cdk/stepper';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/core/services/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormStepperService } from 'src/app/ui/mat-stepper/form-stepper.service';

const selector = 'app-candidature-stepper';

@Component({
  selector,
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit, AfterViewInit {

  currentUser: User;

  @ViewChild('stepper', null) stepper: MatStepper;

  @ViewChild(DisclaimerComponent, null) disclaimerStep: DisclaimerComponent;
  get formDisclaimer() {
    return this.disclaimerStep ? this.disclaimerStep.formDisclaimer : null;
  }

  @ViewChild(PersonalDetailsComponent, null) personalDetailsStep: PersonalDetailsComponent;
  get formPersonalDetails() {
    return this.personalDetailsStep ? this.personalDetailsStep.formPersonalDetails : null;
  }

  @ViewChild(ContactComponent, null) contactStep: ContactComponent;
  get formContact() {
    return this.contactStep ? this.contactStep.formContact : null;
  }

  @ViewChild(PaymentComponent, null) paymentStep: PaymentComponent;
  get formPayment() {
    return this.paymentStep ? this.paymentStep.formPayment : null;
  }

  get form() {
    return [
      this.formDisclaimer,
      this.formPersonalDetails,
      this.formContact,
      this.formPayment
    ];
  }

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private cdr: ChangeDetectorRef,
    private alertService: AlertService,
    private router: Router,
    private formStepperService: FormStepperService
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit() {
    this.formStepperService.setForm(
      selector,
      this.form,
      this.stepper);
  }

  // Need to change values in this lifecycle hook to update MatStepper render
  ngAfterViewInit(): void {
    this.formStepperService.setPreviousStepsTouched();

    // Prevent error message
    this.cdr.detectChanges();
  }

  move(step: number) {
    this.formStepperService.move(step);
  }

  goBack() {
    this.formStepperService.previous();
  }

  goForward() {
    this.formStepperService.next();
  }

  setFormUser() {
    // Update profile
    this.currentUser.profile = {
      firstName: this.formPersonalDetails.get('firstName').value,
      lastName: this.formPersonalDetails.get('lastName').value,
      personalDetails: {
        birthCity: this.formPersonalDetails.get('birthCity').value,
        birthCountry: this.formPersonalDetails.get('birthCountry').value,
        birthDate: this.formPersonalDetails.get('birthDate').value,
        nationality: this.formPersonalDetails.get('nationality').value
      },
      contact: {
        firstName: this.formContact.get('firstName').value,
        lastName: this.formContact.get('lastName').value,
        address: {
          number: this.formContact.get('addressNumber').value,
          name: this.formContact.get('address').value,
          zipcode: this.formContact.get('zipcode').value,
          city: this.formContact.get('city').value,
        },
        email: this.formContact.get('email').value,
        phone: this.formContact.get('phone').value,
      }
    };

    // Update candidature status
    this.currentUser.candidature = {
      status: 'submited'
    };
  }

  submit() {
    this.setFormUser();
    this.userService.update(this.currentUser)
      .pipe(first())
      .subscribe(
        data => {
          this.formStepperService.deleteSave();
          this.alertService.show('Candidature send ! You will receive a mail soon.');
        },
        error => {
          this.alertService.show(error);
        });

    this.router.navigate(['/']);
  }

}
