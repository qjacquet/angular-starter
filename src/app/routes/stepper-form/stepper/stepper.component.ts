import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { User } from 'src/app/core/models/user';
import { AlertService } from 'src/app/core/ui/alert/alert.service';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { UserService } from 'src/app/core/services/user.service';
import { FormStepperService } from 'src/app/core/ui/mat-stepper/form-stepper.service';

import { ContactComponent } from './steps/contact/contact.component';
import { DisclaimerComponent } from './steps/disclaimer/disclaimer.component';
import { PaymentComponent } from './steps/payment/payment.component';
import { PersonalDetailsComponent } from './steps/personal-details/personal-details.component';

const selector = 'app-form-stepper-stepper';

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
    this.authenticationService.currentUser.subscribe(u => {
      this.currentUser = u;
    });
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

    // Update form stepper status
    this.currentUser.formCompleted = {
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
          this.alertService.show('Form stepper send ! You will receive a mail soon.');
        },
        error => {
          this.alertService.show(error);
        });

    this.router.navigate(['/']);
  }

}
