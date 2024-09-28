import { ProfileSaleService } from './../../core/services/profile-sale.service';
import { Component, Inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AddCustomersComponent } from '../add-customers/add-customers.component';
import { NB_DIALOG_CONFIG, NbDialogRef, NbDialogService } from '@nebular/theme';
import { AccountService } from '../../core/services/account.service';
import { AlertsService } from '../../core/services/alerts.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.css'
})
export class CreateAccountComponent implements OnInit {
  accountForm! : FormGroup;
  private _accountType: any;
  profilesActive: any[] = [];
  isReadonly: boolean = false;

  get accountType() {
    return this._accountType;
  }

  set accountType(value: any) {
    this._accountType = value;
  }

  constructor(private profileSaleService: ProfileSaleService, private alert: AlertsService, private accountService: AccountService, @Inject(NB_DIALOG_CONFIG) public config: any, private dialogRef: NbDialogRef<AddCustomersComponent>, private fb: FormBuilder, private dialogService: NbDialogService){}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    const maxProfiles = 0; //this.accountType?.accountTypeRecord?.accountTypeAmountProfile || 0;
    this.accountForm = this.fb.group({
      accountId: [''],
      accountEmail: ['', Validators.required],
      accountPassword: ['', Validators.required],
      accountStatusAcount: [false],
      accountStatusSale: [false],
      accountProperty: [false],
      accountDueDate: ['', Validators.required],
      accountPurchaseDate: ['', Validators.required],
      accountAvailableProfiles: ['', [Validators.required]],
      accountTypeRecord: [''],
    });

    this.accountForm.get('accountPurchaseDate')?.valueChanges.subscribe((value) => {
      if (value) {
        const purchaseDate = new Date(value);
        const dueDate = new Date(purchaseDate);
        dueDate.setDate(purchaseDate.getDate() + 30);
        this.accountForm.get('accountPurchaseDate')?.setValue(purchaseDate.toISOString().split('T')[0], { emitEvent: false });
        this.accountForm.get('accountDueDate')?.setValue(dueDate.toISOString().split('T')[0]);
      }
    });
  }

  quantityAvailableProfiles(maxProfiles: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
  
      if (value !== null && (isNaN(value) || value > maxProfiles)) {
        return { notPositive: true };
      }
      return null;
    };
  }

  openDialogAddCustomers(){
    const dialogRef = this.dialogService.open(AddCustomersComponent, {
      context: { accountType: this.accountType }
    });
    dialogRef.onClose.subscribe((data: any) => {
      if (data) {
        this.accountForm.get('accountAvailableProfiles')?.setValue(this._accountType.accountTypeRecord.accountTypeAmountProfile - data.length);
        this.isReadonly = true; 
        this.profilesActive = data;
      } else {
        console.log('El diálogo fue cancelado.');
      }
    });
  }

  closeModal(data?: any) {
    this.accountForm.reset()
    this.dialogRef.close(data);
  }

  createAccount(){
    this.accountForm.get('accountTypeRecord')?.setValue(this._accountType);
    console.log('this.accountForm.value :>> ', this.accountForm.value);
    this.accountForm.get('accountAvailableProfiles')?.enable();
    this.accountService.newAccount(this.accountForm.value).subscribe({
      next: (data) => {
        console.log('data :>> ', data);
        const dataAddProdiles = {
          accountTypeId: 1,
          accountRecordId: data.body.accountId,
          profileSales: this.profilesActive
        }
        this.profileSaleService.sellProfilesByAccountRecord(dataAddProdiles).subscribe({
          next: () => {
            this.closeModal({response: true});
            this.alert.showSuccess('Se ha creado la cuenta correctamente', '¡Correcto!')
          },
          error: (err) => {
            this.alert.showError('Error interno en el servidor', '¡Alto!');
          }
        });
        /*this.closeModal();
        this.accountForm.reset();
        this.ngOnInit();
        this.alert.showSuccess('Se ha creado la cuenta correctamente', '¡Correcto!')*/
      },
      error: (err) =>{
        this.alert.showWarning(err.error.message, 'Importante');
      }
    });
  }

  test(){
    console.log('this.accountForm.value :>> ', this.accountForm.value);
    console.log('this.accountForm.valid :>> ', this.accountForm.valid);
  }
}
