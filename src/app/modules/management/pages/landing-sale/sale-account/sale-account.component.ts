import { Component, OnInit } from '@angular/core';
import { CarService } from '../../../../shopping-cart/core/services/car.service';
import { AlertsService } from '../../../../shared/core/services/alerts.service';
import { AccountTypeService } from '../../../../inventory/core/services/account-type.service';

@Component({
  selector: 'app-sale-account',
  templateUrl: './sale-account.component.html',
  styleUrl: './sale-account.component.css' 
})
export class SaleAccountComponent implements OnInit {
  availableAccountsType = new Array<any>();
  itemSale: any;
  itemType: string = 'Cuentas';

  constructor(private _carService: CarService, private accountTypeService: AccountTypeService, private alert: AlertsService) {}

  ngOnInit(): void {
    this.getAccountsType();
    this.itemSale = this._carService.getItemBySaleType(this.itemType);
  }

  getAccountsType() {
    this.accountTypeService.getAllAvailableProfile().subscribe({
      next: (data) => {
        this.availableAccountsType = data;
      },
      error: (err) => {
        this.alert.showWarning(err.error.message, '¡Importante!');
      },
    });
  }
}
