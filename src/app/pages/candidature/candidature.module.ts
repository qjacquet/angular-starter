import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../core/shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CandidatureComponent } from './candidature.component';
import { DisclaimerComponent } from './steps/disclaimer/disclaimer.component';
import { PersonalDetailsComponent } from './steps/personal-details/personal-details.component';
import { ContactComponent } from './steps/contact/contact.component';
import { PaymentComponent } from './steps/payment/payment.component';

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
    PaymentComponent],
  imports: [
    RouterModule.forChild(routes),

    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ]
})
export class CandidatureModule { }
