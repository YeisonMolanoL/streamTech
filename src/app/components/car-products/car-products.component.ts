import { CartItem } from './../../core/models/Car.model';
import { Component, Injectable, Input, OnInit } from '@angular/core';
import { CarModel } from '../../core/models/Car.model';
import { CarService } from '../../core/services/car.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-car-products',
  templateUrl: './car-products.component.html',
  styleUrl: './car-products.component.css',
  providers: [],
})
export class CarProductsComponent implements OnInit {
  carProducts: CartItem[] = [];
  car = new CarModel();
  isCarActivated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private carService: CarService) {}

  ngOnInit(): void {
    this.carService.initializeCart();
    setTimeout(() => {
      this.getCurrentCar();
    }, 500);
    this.carService.currentCar$.subscribe({
      next: (data) => {
        this.car = data;
      }
    });
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

  get currentItems(){
    return this.car.items.filter(item => item.items.length > 0);
  }
}
