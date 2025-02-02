import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCustomersComponent } from './add-customers/add-customers.component';
import { SharedModule } from './shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateAccountComponent } from './create-account/create-account.component';
import { MessagesToSendComponent } from './messages-to-send/messages-to-send.component';
import { CreateComboComponent } from './create-combo/create-combo.component';
import { EditAccountDataModalComponent } from './edit-account-data-modal/edit-account-data-modal.component';
import { CreateClientComponent } from './create-client/create-client.component';
import { DialogConfirmationComponent } from './dialog-confirmation/dialog-confirmation.component';
import { CardInfoComponent } from './card-info/card-info.component';
import { ProductCardComponent } from './product/product.component';
import { AddCarProductComponent } from './add-car-product/add-car-product.component';
import { CarProductsComponent } from './car-products/car-products.component';

@NgModule({
  declarations: [
    AddCustomersComponent,
    CreateAccountComponent,
    MessagesToSendComponent,
    CreateComboComponent,
    EditAccountDataModalComponent,
    CreateClientComponent,
    DialogConfirmationComponent,
    CardInfoComponent,
    ProductCardComponent,
    AddCarProductComponent,
    CarProductsComponent,
  ],
  imports: [CommonModule, SharedModule, ReactiveFormsModule, FormsModule],
  exports: [
    SharedModule,
    CardInfoComponent,
    AddCustomersComponent,
    CreateAccountComponent,
    MessagesToSendComponent,
    CreateComboComponent,
    EditAccountDataModalComponent,
    CreateClientComponent,
    DialogConfirmationComponent,
    CardInfoComponent,
    ProductCardComponent,
    CarProductsComponent
  ],
})
export class ComponentsModule {}
