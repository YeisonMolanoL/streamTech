import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ProfileSaleService } from '../../../../core/services/profile-sale.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sell-profile-list',
  templateUrl: './sell-profile-list.component.html',
  styleUrl: './sell-profile-list.component.css'
})
export class SellProfileListComponent implements OnInit{
  @Input() saleList : any[] = [];
  @Output() saleListCleared = new EventEmitter<void>();
  dataEditControl = false;
  profileEdit: any;
  profileDataForm!: FormGroup;
  selectedObjectIndex: number | null = null;

  constructor(private fb: FormBuilder, private profileSaleService: ProfileSaleService){}

  ngOnInit(): void {
      this.initForm();
  }

  initForm(){
    this.profileDataForm = this.fb.group({
      accountType: new FormControl ('', Validators.required),
      profileSaleName: new FormControl ('', Validators.required),
      profileSalePin: new FormControl ('', Validators.required),
      profileSaleDueDate: new FormControl ('', Validators.required),
      profileSalePurchaseDate: new FormControl ('', Validators.required),
      accountId: new FormControl (''),
      clientId: new FormControl ('', Validators.required)
    });

    this.profileDataForm.get('profileSalePurchaseDate')?.valueChanges.subscribe((value) => {
      if (value) {
        const purchaseDate = new Date(value);
        const dueDate = new Date(purchaseDate);
        dueDate.setDate(purchaseDate.getDate() + 30);
        this.profileDataForm.get('profileSaleDueDate')?.setValue(dueDate.toISOString().split('T')[0]);
      }
    });
  }

  makeSale(){
    this.profileSaleService.newProfileSale(this.saleList).subscribe({
      next: (data) => {
        this.saleList = [];
        this.ngOnInit();
        this.saleListCleared.emit();
      },
      error: (err) => {
        console.log('Ha habido un error en el backend' + err.error);
        
      }
    })
  }

  deleteProfile(profile: any){
    const index = this.saleList.indexOf(profile);
    if (index > -1) {
      this.saleList.splice(index, 1);
    }
  }

  editDataDialogControl(){
    this.dataEditControl = !this.dataEditControl;
  }

  openEditModal(index: number){
    this.selectedObjectIndex = index;
    const object = this.saleList[index];
    this.profileDataForm.patchValue(object);
  }

  saveChanges() {
    if (this.selectedObjectIndex !== null) {
      this.saleList[this.selectedObjectIndex] = this.profileDataForm.value;
      this.selectedObjectIndex = null;

      this.profileDataForm.reset();
      this.closeModal();
    }
  }

  closeModal(): void {
    const modal = document.getElementById('modalEditProfile');
    modal?.classList.remove('show');
    modal?.setAttribute('aria-hidden', 'true');
    modal?.setAttribute('style', 'display: none');

    const modalBackdrop = document.getElementsByClassName('modal-backdrop')[0];
    modalBackdrop.parentNode?.removeChild(modalBackdrop);
  }
}
