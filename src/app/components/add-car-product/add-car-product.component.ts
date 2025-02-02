import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CarService } from '../../core/services/car.service';

@Component({
  selector: 'app-add-car-product',
  templateUrl: './add-car-product.component.html',
  styleUrl: './add-car-product.component.css'
})
export class AddCarProductComponent {
  @Input() currentQuantity: number = 0;
  @Input() max: number = 100;
  @Input() isIncreaseDisable: boolean = false;
  @Input() isDecreaseDisable: boolean = false;
  @Output() emmiter = new EventEmitter<any>();

  constructor(public carService: CarService){}

  increase(){
    if(this.currentQuantity < this.max){
      this.currentQuantity++;
    }
    this.carService.isSaleActive.next(true);
    this.onChange('increase');
  }

  decrease(){
    if(this.currentQuantity > 0){
      this.currentQuantity--;
    }
    this.carService.isSaleActive.next(true);
    this.onChange('decrease');
  }

  onChange(option: string){
    this.emmiter.emit({ event: option, quantity: this.currentQuantity });
  }
}
