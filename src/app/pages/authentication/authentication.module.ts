import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../core/shared/material.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
];

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    RouterModule.forChild(routes),

    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class AuthenticationModule { }
