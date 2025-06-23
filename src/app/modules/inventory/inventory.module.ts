import { PlattformsComponent } from './pages/plattforms/plattforms.component';
import { AccountComponent } from './pages/account/account.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountListComponent } from './components/account-list/account-list.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [AccountComponent, PlattformsComponent, AccountListComponent, CreateAccountComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class InventoryModule { }
