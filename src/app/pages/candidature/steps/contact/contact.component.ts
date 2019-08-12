import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { User } from 'src/app/core/models/user';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-candidature-step-contact',
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
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);

    this.formContact = this.formBuilder.group({
      firstName: [this.currentUser.firstName, Validators.required],
      lastName: [this.currentUser.lastName, Validators.required],
      addressNumber: ['', Validators.required],
      address: ['', Validators.required],
      zipcode: ['', Validators.required],
      city: ['', Validators.required],
      phone: ['', Validators.required],
      email: [this.currentUser.email, Validators.required]
    });
  }

  @Input() candidatureForm: FormGroup;

  ngOnInit() {
  }

}
