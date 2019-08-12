import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { MaterialModule } from '../../core/shared/material.module';

import { HomeComponent } from './home.component';

const routes: Routes = [
  {
      path     : '',
      component: HomeComponent,
  }
];

@NgModule({
  declarations: [HomeComponent],
  imports: [
    RouterModule.forChild(routes),

    CommonModule,
    MaterialModule
  ]
})
export class HomeModule { }
