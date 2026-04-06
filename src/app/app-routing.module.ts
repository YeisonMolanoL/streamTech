import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => 
      import('./modules/authentication/authentication.module').then((m) => m.AuthenticationModule),
  },
  {
    path: 'principal',
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module'),
  },
  {
    path: 'code',
    loadChildren: () =>
      import('./modules/code-reception/code-reception.module').then((m) => m.CodeReceptionModule),
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
