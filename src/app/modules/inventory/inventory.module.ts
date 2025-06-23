import { PlattformsComponent } from './pages/plattforms/plattforms.component';
import { ComponentsModule } from './../../components/components.module';
import { AccountComponent } from './pages/account/account.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [AccountComponent, PlattformsComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    
  ]
})
export class InventoryModule { }
