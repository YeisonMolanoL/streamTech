import { Injectable } from '@angular/core';
import { CarModel, CartItem, SaleItem } from '../models/Car.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  car!: CarModel;
  carItems$: BehaviorSubject<CartItem[]> = new BehaviorSubject<CartItem[]>([]);
  currentProduct$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public isSaleActive: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor() {}

  get carItems() {
    return this.carItems$.asObservable();
  }

  addNewItem(item: CartItem) {
    this.car.items.push(item);
    this.carItems$.next(this.car.items);
  }

  initializeCart() {
    const savedCar = localStorage.getItem('currentCar');
    if (savedCar) {
      try {
        this.car = JSON.parse(savedCar);
        if (!Array.isArray(this.car.items)) {
          this.car.items = [];
        }

        this.car.totalItems = this.car.totalItems || 0;
        this.car.currency = this.car.currency || 'USD';
        return this.car;
      } catch (e) {
        console.error('Error al inicializar el carrito, reiniciando...', e);
        this.resetCar();
      }
    } else {
      return this.resetCar();
    }
  }

  resetCar() {
    this.car = {
      createdAt: new Date(),
      totalPrice: 0.0,
      updatedAt: new Date(),
      items: [],
      totalItems: 0,
      currency: 'USD',
    };
    this.saveCar();
  }

  saveCar() {
    if (!this.car) {
      console.error('No hay carrito para guardar.');
      return;
    }

    localStorage.setItem('currentCar', JSON.stringify(this.car));
    localStorage;
  }

  get currentCar() {
    return this.initializeCart();
  }

  addNewItemq(item: CartItem) {
    this.car.items.push(item);
    this.saveCar();
  }

  addNewSale() {}

  getItemBySaleType(saleType: string) {
    if (!saleType) {
      return;
    }
    let dataFind = this.currentCar?.items?.find((item) => {
      return item.saleType === saleType;
    });
    if (!dataFind) {
      dataFind = new CartItem(saleType, saleType);
      this.car.items.push(dataFind);
      this.carItems$.next(this.car.items);
      this.saveCar();
    }
    return dataFind;
  }

  findCurrentItemByItem(saleType: string, data: any) {
    const carItemFound = this.getItemBySaleType(saleType);
    if (carItemFound) {
      let dataSaleFound: any = {};
      switch (saleType) {
        case 'profile':
          dataSaleFound.productId = data.accountTypeId;
          dataSaleFound.price = data.profilePrice;
          dataSaleFound.imageUrl = data.accountTypeIcon;
          dataSaleFound.productName = data.accountTypeName;
          break;
        case 'accounts':
          dataSaleFound.productId = data.accountTypeId;
          dataSaleFound.price = data.price;
          dataSaleFound.imageUrl = data.accountTypeIcon;
          dataSaleFound.productName = data.accountTypeName;
          break;
        case 'combo':
          break;
      }
      let itemSaleFound = carItemFound.items.find((itemSale) => {
        return itemSale.productId === dataSaleFound.productId && itemSale.productName === dataSaleFound.productName;
      });
      if (!itemSaleFound) {
        itemSaleFound = new SaleItem(dataSaleFound.productId, dataSaleFound.price, dataSaleFound.imageUrl, dataSaleFound.productName);
        carItemFound.items.push(itemSaleFound);
        this.saveCar();
      }
      return itemSaleFound;
    }
    return null;
  }
}
