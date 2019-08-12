import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DateUtils } from '../../../../core/helpers/utils';
import { User } from 'src/app/core/models/user';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import locales from 'src/app/core/shared/locales-data';

export interface Country {
  value: string;
  country: string;
  nationality: string;
}

@Component({
  selector: 'app-candidature-step-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss']
})
export class PersonalDetailsComponent implements OnInit {

  requireParentAuthorization = false;

  formPersonalDetails: FormGroup;
  currentUser: User;
  countries = locales;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);

    this.formPersonalDetails = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      nationality: ['', Validators.required],
      birthDate: ['', Validators.required],
      birthCountry: ['', Validators.required],
      birthCity: ['', Validators.required],
      acceptParentAuthorization: ['', null]
    });
  }

  @Input() candidatureForm: FormGroup;

  ngOnInit() {
    this.formPersonalDetails.get('firstName').setValue(this.currentUser.firstName);
    this.formPersonalDetails.get('lastName').setValue(this.currentUser.lastName);
  }

  onBirthdayDateChange(input: string) {
    if (DateUtils.isDateOverBack18Years(new Date(input))) {
      this.requireParentAuthorization = true;
      this.formPersonalDetails.get('acceptParentAuthorization').setValidators([Validators.requiredTrue]);
    } else {
      this.requireParentAuthorization = false;
      this.formPersonalDetails.get('acceptParentAuthorization').setValidators(null);
    }
    this.formPersonalDetails.get('acceptParentAuthorization').updateValueAndValidity();
  }
}
