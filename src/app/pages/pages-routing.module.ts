import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { AccountComponent } from './account/account.component';
import { PlattformsComponent } from './plattforms/plattforms.component';
import path from 'path';
import { SellByAccountComponent } from './sales/sell-by-account/sell-by-account.component';
import { SellByProfileComponent } from './sales/sell-by-profile/sell-by-profile.component';
import { SellByComboComponent } from './sales/sell-by-combo/sell-by-combo.component';
import { ConnectionComponent } from './connection/connection.component';
import { MessagesToSendComponent } from '../components/messages-to-send/messages-to-send.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
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
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { }
