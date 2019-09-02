import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateUtils } from '../../../../../core/helpers/utils';
import { User } from 'src/app/core/models/user';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import locales from 'src/app/core/helpers/locales-data';

export interface Country {
  value: string;
  country: string;
  nationality: string;
}

@Component({
  selector: 'app-form-stepper-step-personal-details',
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
    this.currentUser = this.authenticationService.currentUserValue;

    const profile = this.currentUser.profile;
    const personalDetails = profile ? profile.personalDetails : null;

    this.formPersonalDetails = this.formBuilder.group({
      firstName:    [profile.firstName, Validators.required],
      lastName:     [profile.lastName, Validators.required],
      nationality:  [personalDetails ? personalDetails.nationality : null, Validators.required],
      birthDate:    [personalDetails ? personalDetails.birthDate : null, Validators.required],
      birthCountry: [personalDetails ? personalDetails.birthCountry : null, Validators.required],
      birthCity:    [personalDetails ? personalDetails.birthCity : null, Validators.required],
      acceptParentAuthorization: ['', null]
    });
  }

  ngOnInit() {
    this.parentAuthorizationDisplay(this.formPersonalDetails.get('birthDate').value);
  }

  onBirthdayDateChange(input: string) {
    this.parentAuthorizationDisplay(input);
  }

  parentAuthorizationDisplay(date: any) {
    if (DateUtils.isDateOverBack18Years(new Date(date))) {
      this.requireParentAuthorization = true;
      this.formPersonalDetails.get('acceptParentAuthorization').setValidators([Validators.requiredTrue]);
    } else {
      this.requireParentAuthorization = false;
      this.formPersonalDetails.get('acceptParentAuthorization').setValidators(null);
    }
    this.formPersonalDetails.get('acceptParentAuthorization').updateValueAndValidity();
  }


}
