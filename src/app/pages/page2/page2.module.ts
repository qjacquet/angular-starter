import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Page2Component } from './page2.component';

const routes: Routes = [
  {
    path     : '',
    component: Page2Component,
  },
];

@NgModule({
  declarations: [Page2Component],
  imports: [
    RouterModule.forChild(routes),

    CommonModule
  ]
})
export class Page2Module { }
