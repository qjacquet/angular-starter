import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/core/models/user';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-form-stepper-step-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  formContact: FormGroup;
  currentUser: User;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService
  ) {
    this.currentUser = this.authenticationService.currentUserValue;

    const contact = this.currentUser.profile.contact;
    const address = contact ? contact.address : null;

    this.formContact = this.formBuilder.group({
      firstName:      [contact ? contact.firstName : null, Validators.required],
      lastName:       [contact ? contact.firstName : null, Validators.required],
      phone:          [contact ? contact.phone : null, Validators.required],
      email:          [contact ? contact.email : null, Validators.required],
      addressNumber:  [address ? address.number : null, Validators.required],
      address:        [address ? address.name : null, Validators.required],
      zipcode:        [address ? address.zipcode : null, Validators.required],
      city:           [address ? address.city : null, Validators.required]
    });
  }

  ngOnInit() {
  }

}
