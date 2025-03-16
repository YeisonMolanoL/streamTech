import { Injectable } from '@angular/core';
import { CarModel, CartItem, SaleItem } from '../models/Car.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  car!: CarModel;
  currentCar$: BehaviorSubject<CarModel> = new BehaviorSubject<CarModel>(this.initializeCart());
  currentProduct$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public isSaleActive: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor() {
    this.car = this.initializeCart(); // Se inicializa correctamente
    this.currentCar$ = new BehaviorSubject<CarModel>(this.car);
  }

  get carCurrentCar() {
    return this.currentCar$.asObservable();
  }

  addNewItem(item: CartItem) {
    this.car.items.push(item);
  }

  initializeCart(): CarModel {
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
    }
    return this.resetCar();
  }

  resetCar(): CarModel {
    this.car = {
      createdAt: new Date(),
      totalPrice: 0.0,
      updatedAt: new Date(),
      items: [],
      totalItems: 0,
      currency: 'USD',
    };
    this.saveCar();
    return this.car;
  }

  saveCar() {
    if (!this.car) {
      console.error('No hay carrito para guardar.');
      return;
    }
    localStorage.setItem('currentCar', JSON.stringify(this.car));
    this.currentCar$.next(this.car);
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
      // this.carItems$.next(this.car.items);
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
