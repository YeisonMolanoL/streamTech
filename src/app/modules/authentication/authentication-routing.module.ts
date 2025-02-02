import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    }
//   {
//     path: '',
//     component: PagesComponent,
//     children: [
//       {
//         path: 'conection',
//         component: ConnectionComponent
//       },
//       {
//         path: 'plataformas',
//         component: PlattformsComponent
//       },
//       {
//         path: 'cuentas/administracion',
//         component: AccountComponent
//       },
//       {
//         path: 'venta/cuentas',
//         component: SellByAccountComponent
//       },
//       {
//         path: 'venta/pantallas',
//         component: SellByProfileComponent
//       },
//       {
//         path: 'venta/combos',
//         component: SellByComboComponent
//       },
//       {
//         path: 'messages',
//         component: MessagesToSendComponent
//       },
//       {
//         path: 'landing-sale',
//         component: LandingSaleComponent,
//         children: [
//           { path: 'perfil', component: SaleProfilesComponent },
//           { path: 'combos', component: SaleCombosComponent },
//           { path: 'cuentas', component: SaleAccountComponent }
//         ]
//       }
//     ]
//   },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationRoutingModule { }
