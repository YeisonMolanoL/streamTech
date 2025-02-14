import { CartItem } from './../../core/models/Car.model';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CarProductsComponent } from '../car-products/car-products.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { CarService } from '../../core/services/car.service';

@Component({
  selector: 'app-card-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductCardComponent implements OnInit {
  @Input() accountType: any;
  @Input() itemSale!: CartItem;
  @Input() itemSaleType!: string;
  @Output() emmiter = new EventEmitter<any>();
  dataSaleForm!: FormGroup;
  isNewSale: boolean = false;
  @Input() items: any = [];
  itemItemSale: any;

  constructor(
    private fb: FormBuilder,
    private _carService: CarService,
    private _cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.itemItemSale = this._carService.findCurrentItemByItem(
      this.itemSaleType, this.accountType
    );
    this.initFormData();
  }

  initFormData() {
    this.dataSaleForm = this.fb.group({
      name: ['', [Validators.required]],
      pin: ['', [Validators.required]],
    });
  }

  currentItem() {
    return this._carService.getItemBySaleType(this.itemSaleType);
  }

  addToCart() {
    this.itemItemSale.data.push(this.dataSaleForm.value);
    this.itemItemSale.totalPrice = this.itemItemSale.price * this.itemItemSale.quantity;
    this.isNewSale = false;
    this.dataSaleForm.reset();
    this._carService.saveCar();
    this._carService.isSaleActive.next(false);
    this._cdr.detectChanges();
  }

  updateSale(event: any) {
    this.isNewSale = true;
    if (event.event === 'decrease') {
      // if(this.itemSale.dataSale?.length > 0){
      //   Swal.fire('¡Elige el producto a eliminar!', ``, 'warning');
      // }
    }
    this.itemItemSale.quantity = event.quantity;
    // this.itemSale.quantity = event
  }

  cancelSale() {
    this.isNewSale = false;
    this.dataSaleForm.reset();
  }
}
