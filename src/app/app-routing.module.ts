import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingSaleComponent } from './pages/landing-sale/landing-sale.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => 
      import('./modules/authentication/authentication.module').then((m) => m.AuthenticationModule),
  },
  {
    path: 'principal',
    loadChildren: () =>
      import('./pages/pages.module').then((m) => m.PagesModule),
  },
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
