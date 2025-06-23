import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { ConnectionComponent } from '../connection/connection.component';
import { PlattformsComponent } from '../inventory/pages/plattforms/plattforms.component';
import { AccountComponent } from '../inventory/pages/account/account.component';
import { SellByAccountComponent } from '../management/pages/sales/sell-by-account/sell-by-account.component';
import { SellByProfileComponent } from '../management/pages/sales/sell-by-profile/sell-by-profile.component';
import { SellByComboComponent } from '../management/pages/sales/sell-by-combo/sell-by-combo.component';
import { MessagesToSendComponent } from '../../components/messages-to-send/messages-to-send.component';
import { SaleProfilesComponent } from '../management/pages/landing-sale/sale-profiles/sale-profiles.component';
import { SaleCombosComponent } from '../management/pages/landing-sale/sale-combos/sale-combos.component';
import { SaleAccountComponent } from '../management/pages/landing-sale/sale-account/sale-account.component';
import { LandingSaleComponent } from '../management/pages/landing-sale/landing-sale.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'conection',
        component: ConnectionComponent
      },
      {
        path: 'plataformas',
        component: PlattformsComponent
      },
      {
        path: 'cuentas/administracion',
        component: AccountComponent
      },
      {
        path: 'venta/cuentas',
        component: SellByAccountComponent
      },
      {
        path: 'venta/pantallas',
        component: SellByProfileComponent
      },
      {
        path: 'venta/combos',
        component: SellByComboComponent
      },
      {
        path: 'messages',
        component: MessagesToSendComponent
      },
      {
        path: 'landing-sale',
        component: LandingSaleComponent,
        children: [
          { path: 'perfil', component: SaleProfilesComponent },
          { path: 'combos', component: SaleCombosComponent },
          { path: 'cuentas', component: SaleAccountComponent }
        ]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule { }
