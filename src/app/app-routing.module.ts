import { AuthGuard } from './core/helpers/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: './routes/authentication/authentication.module#AuthenticationModule'
  },
  {
    path: '',
    loadChildren: './routes/home/home.module#HomeModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'movies',
    loadChildren: './routes/movies/movies.module#MoviesModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'page1',
    loadChildren: './routes/page1/page1.module#Page1Module',
    canActivate: [AuthGuard]
  },
  {
    path: 'page2',
    loadChildren: './routes/page2/page2.module#Page2Module',
    canActivate: [AuthGuard]
  },
  {
    path: 'candidature',
    loadChildren: './routes/candidature/candidature.module#CandidatureModule',
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    AuthGuard
  ]
})
export class AppRoutingModule { }
