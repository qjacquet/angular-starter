import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../core/shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SidebarComponent } from './sidebar.component';
import { NavCollapsableComponent } from './collapsable/collapsable.component';
import { NavGroupComponent } from './group/group.component';
import { NavItemComponent } from './item/item.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    SidebarComponent,
    NavCollapsableComponent,
    NavGroupComponent,
    NavItemComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule
  ],
  exports: [SidebarComponent]
})
export class SidebarModule { }
