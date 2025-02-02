import { CartItem } from './../../core/models/Car.model';
import { Component, Injectable, Input, OnInit } from '@angular/core';
import { CarModel } from '../../core/models/Car.model';
import { CarService } from '../../core/services/car.service';

@Injectable({
  providedIn: 'root', // Proporciona el componente como servicio a nivel global
})
@Component({
  selector: 'app-car-products',
  templateUrl: './car-products.component.html',
  styleUrl: './car-products.component.css',
  providers: [],
})
export class CarProductsComponent implements OnInit {
  @Input() car = new CarModel();
  carPoducts: CartItem[] = [];

  constructor(private carService: CarService) {}

  ngOnInit(): void {
    this.carService.initializeCart();
    setTimeout(() => {
      this.getCurrentCar();
    }, 500);
    this.carService.carItems.subscribe({
      next: (data) => {
        this.carPoducts = data;
      }
    });
    // this.getCurrentCar();
  }

  getCurrentCar() {
    return this.carService.currentCar;
  }

  addNewProduct(product: CartItem) {
    this.carService.addNewItem(product);
    // this.getCurrentCar().items.push(product);
    // this.saveCar();
  }

  saveCar() {
    localStorage.setItem('currentCar', JSON.stringify(this.car));
  }

  // getItemByAccountTypeId(accountTypeId: number){
  //   return this.car.items.find(item => {
  //     return item.productId === accountTypeId;
  //   }) || new CartItem;
  // }

  getItemBySaleType(category: string){
    // let dataFind = this.getCurrentCar()?.items?.find(item => {
    //   return item.category === category;
    // });
    // if(!dataFind){
    //   dataFind = new CartItem(category, category);
    //   this.carService.addNewItem(dataFind);
    // }
    // return dataFind;
  }
}
