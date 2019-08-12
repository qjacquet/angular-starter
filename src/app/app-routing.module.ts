import { AuthGuard } from './core/helpers/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: './pages/authentication/authentication.module#AuthenticationModule'
  },
  {
    path: '',
    loadChildren: './pages/home/home.module#HomeModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'page1',
    loadChildren: './pages/page1/page1.module#Page1Module',
    canActivate: [AuthGuard]
  },
  {
    path: 'page2',
    loadChildren: './pages/page2/page2.module#Page2Module',
    canActivate: [AuthGuard]
  },
  {
    path: 'candidature',
    loadChildren: './pages/candidature/candidature.module#CandidatureModule',
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
