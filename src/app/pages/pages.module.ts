import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlattformsComponent } from './plattforms/plattforms.component';
import { AccountComponent } from './account/account.component';
import { SellByProfileComponent } from './sales/sell-by-profile/sell-by-profile.component';
import { SellByAccountComponent } from './sales/sell-by-account/sell-by-account.component';
import { AccountListComponent } from '../components/account-list/account-list.component';
import { YesNoPipelinePipe } from '../core/yes-no-pipeline.pipe';
import { SellByComboComponent } from './sales/sell-by-combo/sell-by-combo.component';
import { AccountSaleListComponent } from './sales/sell-by-account/account-sale-list/account-sale-list.component';
import { SellProfileListComponent } from './sales/sell-by-profile/sell-profile-list/sell-profile-list.component';
import { ConnectionComponent } from './connection/connection.component';
import { ComponentsModule } from '../components/components.module';
import { LandingSaleComponent } from './landing-sale/landing-sale.component';
import { SaleProfilesComponent } from './landing-sale/sale-profiles/sale-profiles.component';
import { SaleCombosComponent } from './landing-sale/sale-combos/sale-combos.component';
import { SaleAccountComponent } from './landing-sale/sale-account/sale-account.component';
import { CurrentSalesComponent } from './landing-sale/current-sales/current-sales.component';
import { LoginComponent } from '../modules/authentication/pages/login/login.component';

@NgModule({
  declarations: [
    PagesComponent, HeaderComponent, PlattformsComponent, AccountComponent, SellByProfileComponent, SellByAccountComponent, YesNoPipelinePipe, AccountListComponent,
    SellByComboComponent, AccountSaleListComponent, SellProfileListComponent, HeaderComponent, ConnectionComponent, LandingSaleComponent, SaleProfilesComponent, SaleCombosComponent, SaleAccountComponent, CurrentSalesComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [YesNoPipelinePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PagesModule {}
