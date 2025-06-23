import { YesNoPipelinePipe } from './../../core/yes-no-pipeline.pipe';
import { NebularComponentsModule } from './modules/nebular-components/nebular-components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './components/loader/loader.component';
import { HeaderComponent } from './components/header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateCustomerComponent } from './components/create-customer/create-customer.component';
import { MessagesToSendComponent } from './components/messages-to-send/messages-to-send.component';
import { DialogConfirmationComponent } from '../inventory/components/dialog-confirmation/dialog-confirmation.component';
import { EditAccountDataModalComponent } from './components/edit-account-data-modal/edit-account-data-modal.component';
import { AddCustomersComponent } from './components/add-customers/add-customers.component';
import { CardInfoComponent } from './components/card-info/card-info.component';
import { CreateClientComponent } from './components/create-client/create-client.component';



@NgModule({
  declarations: [
    LoaderComponent, HeaderComponent, YesNoPipelinePipe, CreateCustomerComponent, MessagesToSendComponent, DialogConfirmationComponent, EditAccountDataModalComponent, AddCustomersComponent, CardInfoComponent, CreateClientComponent
  ],
  imports: [
    CommonModule,
    NebularComponentsModule,
    ReactiveFormsModule
  ],
  exports: [
    LoaderComponent,
    NebularComponentsModule,
    ReactiveFormsModule,
    YesNoPipelinePipe,
    HeaderComponent,
    CreateCustomerComponent,
    MessagesToSendComponent,
    DialogConfirmationComponent,
    EditAccountDataModalComponent,
    AddCustomersComponent,
    CardInfoComponent,
    CreateClientComponent
  ],
})
export class SharedModule { }
