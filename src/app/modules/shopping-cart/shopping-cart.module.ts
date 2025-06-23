import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCarProductComponent } from './components/add-car-product/add-car-product.component';
import { CarProductsComponent } from './components/car-products/car-products.component';
import { ProductCardComponent } from './components/product/product.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [AddCarProductComponent, CarProductsComponent, ProductCardComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [AddCarProductComponent, CarProductsComponent, ProductCardComponent],
})
export class ShoppingCartModule { }
