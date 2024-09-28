import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCustomersComponent } from './add-customers/add-customers.component';
import { SharedModule } from './shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateAccountComponent } from './create-account/create-account.component';



@NgModule({
  declarations: [
    AddCustomersComponent,
    CreateAccountComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule
  ],
  exports: [AddCustomersComponent]
})
export class ComponentsModule { }
