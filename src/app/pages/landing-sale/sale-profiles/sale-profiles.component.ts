import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AccountTypeService } from '../../../core/services/account-type.service';
import { AlertsService } from '../../../core/services/alerts.service';
import { CarProductsComponent } from '../../../components/car-products/car-products.component';
import { CartItem } from '../../../core/models/Car.model';
import { CarService } from '../../../core/services/car.service';

@Component({
  selector: 'app-sale-profiles',
  templateUrl: './sale-profiles.component.html',
  styleUrl: './sale-profiles.component.css',
})
export class SaleProfilesComponent implements OnInit {
  availableAccountsType = new Array<any>();
  comboAccountsType = new Array<any>();
  newComboSaleForm!: FormGroup;
  @ViewChild('car', { static: false }) cartButton!: ElementRef;
  itemType: string = 'profile';
  itemSale!: CartItem;
  isActive: boolean = true;

  constructor(
    private fb: FormBuilder,
    private accountTypeService: AccountTypeService,
    private alert: AlertsService,
    private renderer: Renderer2,
    private _carService: CarService
  ) {}

  ngOnInit(): void {
    const itemBySaleFound = this._carService.getItemBySaleType(this.itemType);
    if(itemBySaleFound && itemBySaleFound != null){
      this.itemSale = itemBySaleFound;
    }
    this.getAccountsType();
    this.initForm();
  }

  initForm() {
    this.newComboSaleForm = this.fb.group({
      existingCombo: new FormControl(''),
      clientId: new FormControl('', Validators.required),
      profileSaleDueDate: new FormControl('', Validators.required),
      profileSalePurchaseDate: new FormControl('', Validators.required),
      comboName: new FormControl(''),
      profileSaleName: new FormControl('', Validators.required),
      profileSalePin: new FormControl('', Validators.required),
      comboAccountsType: new FormControl([], Validators.required),
      comboId: new FormControl('', Validators.required),
    });
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

  toggleCard(accountType: any) {
    const index = this.comboAccountsType.indexOf(accountType.accountTypeId);
    if (index === -1) {
      this.comboAccountsType.push(accountType.accountTypeId);
      accountType.isSelected = true;
    } else {
      this.comboAccountsType.splice(index, 1);
      accountType.isSelected = false;
    }
    this.newComboSaleForm
      .get('comboAccountsType')
      ?.setValue(this.comboAccountsType);
  }

  createAnimationElement(productElement: HTMLElement): HTMLElement {
    const animationElement = productElement.cloneNode(true) as HTMLElement;
    this.renderer.setStyle(animationElement, 'position', 'fixed');
    this.renderer.setStyle(animationElement, 'top', `${productElement.getBoundingClientRect().top}px`);
    this.renderer.setStyle(animationElement, 'left', `${productElement.getBoundingClientRect().left}px`);
    this.renderer.setStyle(animationElement, 'z-index', '1000');
    document.body.appendChild(animationElement);
    return animationElement;
  }

  animateElement(element: HTMLElement, startPos: DOMRect, endPos: DOMRect) {
    const deltaX = endPos.left - startPos.left;
    const deltaY = endPos.top - startPos.top;

    const animation = element.animate(
      [
        { transform: 'translate(0, 0)', opacity: 1 },
        { transform: `translate(${deltaX}px, ${deltaY}px) scale(0)`, opacity: 0 },
      ],
      { duration: 1000, easing: 'ease-in-out' }
    );

    animation.onfinish = () => {
      element.remove(); // Elimina el elemento animado después de completar la animación
    };
  }

  addToCart(event: any) {
      // let currentItem = this._carProduct.getItemByAccountTypeId(
      //   // this.accountType.account_type_id1
      //   1
      // );
      // if (currentItem) {
      // } 
      //   let newProduct = new CartItem();
      //   newProduct.productId = this.accountType.account_type_id;
      //   newProduct.imageUrl = this.accountType.account_type_icon;
      //   newProduct.quantity = 1;
      //   newProduct.name = this.accountType.account_type_name;
      //   // newProduct.price = 
      // }
      // this.isNewSale = true;
      // this._carProductsComponent.addNewProduct(event); 
      // this.emmiter.emit(event);
    }
}
