import { Component, ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DisclaimerComponent } from './steps/disclaimer/disclaimer.component';
import { PersonalDetailsComponent } from './steps/personal-details/personal-details.component';
import { ContactComponent } from './steps/contact/contact.component';
import { PaymentComponent } from './steps/payment/payment.component';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { User } from 'src/app/core/models/user';
import { MatStepper } from '@angular/material';
import { UserService } from 'src/app/core/services/user.service';
import { FormService } from '../../core/services/form.service';

@Component({
  selector: 'app-candidature',
  templateUrl: './candidature.component.html',
  styleUrls: ['./candidature.component.scss']
})
export class CandidatureComponent implements OnInit {

  candidatureForm: FormGroup;
  currentUser: User;

  @ViewChild(DisclaimerComponent, null) disclaimerStep: DisclaimerComponent;
  @ViewChild(PersonalDetailsComponent, null) personalDetailsStep: PersonalDetailsComponent;
  @ViewChild(ContactComponent, null) contactStep: ContactComponent;
  @ViewChild(PaymentComponent, null) paymentStep: PaymentComponent;

  get formDisclaimer() {
    return this.disclaimerStep ? this.disclaimerStep.formDisclaimer : null;
  }

  get formPersonalDetails() {
    return this.personalDetailsStep ? this.personalDetailsStep.formPersonalDetails : null;
  }

  get formContact() {
    return this.contactStep ? this.contactStep.formContact : null;
  }

  get formPayment() {
    return this.paymentStep ? this.paymentStep.formPayment : null;
  }

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private formService: FormService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);


  }

  ngOnInit() {
    this.formDisclaimer.setValue(this.formService.getForm('formDisclaimer'));
    this.formPersonalDetails.setValue(this.formService.getForm('formPersonalDetails'));
    this.formContact.setValue(this.formService.getForm('formContact'));
    this.formPayment.setValue(this.formService.getForm('formPayment'));
  }

  goBack(stepper: MatStepper) {
    this.saveForm();
    stepper.previous();
  }

  goForward(stepper: MatStepper) {
    this.saveForm();
    stepper.next();
  }

  saveForm() {
    this.formService.saveForm('formDisclaimer', this.formDisclaimer);
    this.formService.saveForm('formPersonalDetails', this.formPersonalDetails);
    this.formService.saveForm('formContact', this.formContact);
    this.formService.saveForm('formPayment', this.formPayment);
  }

  getFormUser() {
    const user = new User({
      id: this.currentUser.id,
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
    });

    return user;
  }

  submit() {
    this.userService.update(this.getFormUser());
  }

}
