import { Component, OnInit } from '@angular/core';
import { CarService } from '../../../core/services/car.service';

@Component({
  selector: 'app-sale-account',
  templateUrl: './sale-account.component.html',
  styleUrl: './sale-account.component.css'
})
export class SaleAccountComponent implements OnInit {
  itemSale: any;
  itemType: string = 'accounts';

  constructor(private _carService: CarService){}

  ngOnInit(): void {
    this.itemSale = this._carService.getItemBySaleType(this.itemType);
  }
}
