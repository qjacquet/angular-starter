import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../core/shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CandidatureComponent } from './candidature.component';
import { DisclaimerComponent } from './stepper/steps/disclaimer/disclaimer.component';
import { PersonalDetailsComponent } from './stepper/steps/personal-details/personal-details.component';
import { ContactComponent } from './stepper/steps/contact/contact.component';
import { PaymentComponent } from './stepper/steps/payment/payment.component';
import { FormService } from 'src/app/core/services/form.service';
import { StepperComponent } from './stepper/stepper.component';
import { FormStepperService } from 'src/app/core/ui/mat-stepper/form-stepper.service';

const routes: Routes = [
  {
    path: '',
    component: CandidatureComponent,
  }
];

@NgModule({
  declarations: [
    CandidatureComponent,
    DisclaimerComponent,
    PersonalDetailsComponent,
    ContactComponent,
    PaymentComponent,
    StepperComponent],
  imports: [
    RouterModule.forChild(routes),

    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  providers: [
    FormService,
    FormStepperService
  ]
})
export class CandidatureModule { }
