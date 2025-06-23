import { YesNoPipelinePipe } from './../../core/yes-no-pipeline.pipe';
import { NebularComponentsModule } from './modules/nebular-components/nebular-components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './components/loader/loader.component';
import { HeaderComponent } from './components/header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateCustomerComponent } from './components/create-customer/create-customer.component';



@NgModule({
  declarations: [
    LoaderComponent, HeaderComponent, YesNoPipelinePipe, CreateCustomerComponent
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
    CreateCustomerComponent
  ],
})
export class SharedModule { }
