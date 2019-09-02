import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormService } from 'src/app/core/services/form.service';
import { SharedModule } from 'src/app/core/shared/shared.module';
import { FormStepperService } from 'src/app/core/ui/mat-stepper/form-stepper.service';

import { StepperFormComponent } from './stepper-form.component';
import { StepperComponent } from './stepper/stepper.component';
import { ContactComponent } from './stepper/steps/contact/contact.component';
import { DisclaimerComponent } from './stepper/steps/disclaimer/disclaimer.component';
import { PaymentComponent } from './stepper/steps/payment/payment.component';
import { PersonalDetailsComponent } from './stepper/steps/personal-details/personal-details.component';

const routes: Routes = [
  {
    path: '',
    component: StepperFormComponent,
  }
];

@NgModule({
  declarations: [
    StepperFormComponent,
    DisclaimerComponent,
    PersonalDetailsComponent,
    ContactComponent,
    PaymentComponent,
    StepperComponent],
  imports: [
    RouterModule.forChild(routes),

    SharedModule
  ],
  providers: [
    FormService,
    FormStepperService
  ]
})
export class StepperFormModule { }
