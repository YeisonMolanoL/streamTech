import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountTypeService } from '../../../core/services/account-type.service';
import { AlertsService } from '../../../core/services/alerts.service';
import { ComboSaleService } from '../../../core/services/combo-sale.service';
import { CarService } from '../../../core/services/car.service';

@Component({
  selector: 'app-sale-combos',
  templateUrl: './sale-combos.component.html',
  styleUrl: './sale-combos.component.css'
})
export class SaleCombosComponent implements OnInit {
  availableCombos = new Array<any>();
  comboAccountsType = new Array<any>();
  newComboSaleForm!: FormGroup;
  @ViewChild('car', { static: false }) cartButton!: ElementRef;
  itemSale: any;
  itemType: string = 'combos';

  constructor(
    private fb: FormBuilder,
    private comboSaleService: ComboSaleService,
    private alert: AlertsService,
    private renderer: Renderer2,
    private _carService: CarService
  ) {}

  ngOnInit(): void {
    this.itemSale = this._carService.getItemBySaleType(this.itemType);
    this.getAllCombos();
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

  getAllCombos() {
    this.comboSaleService.getAllCombos().subscribe({
      next: (data) => {
        this.availableCombos = data;
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

  addToCart(event: number, index: number){
    const productElement = document.getElementById(`product-${index}`);
    const cartPosition = this.cartButton.nativeElement.getBoundingClientRect();
    if(productElement){
      const productPosition = productElement.getBoundingClientRect();

      const animationElement = this.createAnimationElement(productElement);
      this.animateElement(animationElement, productPosition, cartPosition);
    }
    // Aplica animación
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
}
