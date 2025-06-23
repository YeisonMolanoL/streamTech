import { SellByAccountComponent } from './pages/sales/sell-by-account/sell-by-account.component';
import { SellByComboComponent } from './pages/sales/sell-by-combo/sell-by-combo.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaleProfilesComponent } from './pages/landing-sale/sale-profiles/sale-profiles.component';
import { SaleCombosComponent } from './pages/landing-sale/sale-combos/sale-combos.component';
import { SaleAccountComponent } from './pages/landing-sale/sale-account/sale-account.component';
import { CurrentSalesComponent } from './pages/landing-sale/current-sales/current-sales.component';
import { LandingSaleComponent } from './pages/landing-sale/landing-sale.component';
import { SellByProfileComponent } from './pages/sales/sell-by-profile/sell-by-profile.component';
import { SellProfileListComponent } from './pages/sales/sell-by-profile/sell-profile-list/sell-profile-list.component';
import { AccountSaleListComponent } from './pages/sales/sell-by-account/account-sale-list/account-sale-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateComboComponent } from './components/create-combo/create-combo.component';
import { ShoppingCartModule } from '../shopping-cart/shopping-cart.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    SellByComboComponent,
    SaleProfilesComponent,
    SaleCombosComponent,
    SaleAccountComponent,
    CurrentSalesComponent,
    LandingSaleComponent,
    SellByProfileComponent,
    SellProfileListComponent,
    AccountSaleListComponent,
    SellByAccountComponent,
    CreateComboComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ShoppingCartModule,
    SharedModule
  ]
})
export class ManagementModule { }
