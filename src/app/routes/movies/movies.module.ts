import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './pages/list/list.component';
import { Routes, RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/core/shared/material.module';
import { MovieCardComponent } from 'src/app/routes/movies/components/movie-card/movie-card.component';

const routes: Routes = [
  {
      path     : '',
      component: ListComponent,
  }
];

@NgModule({
  declarations: [ListComponent, MovieCardComponent],
  imports: [
    RouterModule.forChild(routes),

    CommonModule,
    FlexLayoutModule,
    MaterialModule
  ]
})
export class MoviesModule { }
