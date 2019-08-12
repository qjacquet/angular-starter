import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Page1Component } from './page1.component';

const routes: Routes = [
  {
    path: '',
    component: Page1Component,
  },
];

@NgModule({
  declarations: [Page1Component],
  imports: [
    RouterModule.forChild(routes),

    CommonModule
  ]
})
export class Page1Module { }
