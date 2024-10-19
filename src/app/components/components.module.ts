import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCustomersComponent } from './add-customers/add-customers.component';
import { SharedModule } from './shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateAccountComponent } from './create-account/create-account.component';
import { MessagesToSendComponent } from './messages-to-send/messages-to-send.component';



@NgModule({
  declarations: [
    AddCustomersComponent,
    CreateAccountComponent,
    MessagesToSendComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [AddCustomersComponent]
})
export class ComponentsModule { }
