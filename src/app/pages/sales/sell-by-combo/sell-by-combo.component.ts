import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountTypeService } from '../../../core/services/account-type.service';
import { AlertsService } from '../../../core/services/alerts.service';
import { ClientService } from '../../../core/services/client.service';
import { ComboSaleService } from '../../../core/services/combo-sale.service';

@Component({
  selector: 'app-sell-by-combo',
  templateUrl: './sell-by-combo.component.html',
  styleUrl: './sell-by-combo.component.css'
})
export class SellByComboComponent implements OnInit{
  isDropdownAccountTypeOpen: boolean = false;
  availableAccountsType = new Array<any>();
  comboAccountsType = new Array<any>();
  filteredAccounts = new Array<any>();
  filteredClients = new Array<any>();
  availableCombos = new Array<any>();
  modalConfirmation: boolean = false;
  isDropdownClientsOpen = false;
  newComboSaleForm!: FormGroup;
  isDropdownComboOpen = false;
  clients = new Array<any>();
  combos = new Array<any>();
  searchAccountType: any;
  clientDialog = false;
  selectedClient: any;
  newClientName: any;
  selectedCombo: any;
  searchClient: any;

  constructor(private comboSaleService: ComboSaleService, private clientsService: ClientService, private alert: AlertsService, private accountTypeService: AccountTypeService, private fb: FormBuilder){}

  ngOnInit(): void {    
    this.initForm();
    this.getAccountsType();
    this.getAllClients();
  }

  initForm() {
    this.newComboSaleForm = this.fb.group({
      existingCombo: new FormControl (''),
      clientId: new FormControl ('', Validators.required),
      profileSaleDueDate: new FormControl ('', Validators.required),
      profileSalePurchaseDate: new FormControl ('', Validators.required),
      comboName: new FormControl ('', Validators.required),
      profileSaleName: new FormControl ('', Validators.required),
      profileSalePin: new FormControl ('', Validators.required),
      comboAccountsType: new FormControl (''),
    });

    this.newComboSaleForm.get('profileSalePurchaseDate')?.valueChanges.subscribe((value) => {
      if (value) {
        const purchaseDate = new Date(value);
        const dueDate = new Date(purchaseDate);
        dueDate.setDate(purchaseDate.getDate() + 30);
        this.newComboSaleForm.get('profileSaleDueDate')?.setValue(dueDate.toISOString().split('T')[0]);
      }
    });
  }

  getALlCombos(){
    this.comboSaleService.getAllCombos().subscribe({
      next: (data) => {
        this.combos = data;
      },
      error: (err) => {
        this.alert.showWarning(err.error.message, '¡Importante!');
      }
    })
  }

  getAccountsType(){
    this.accountTypeService.getAllAvailableProfile().subscribe({
      next: (data) => {
        this.availableAccountsType = data;
      },
      error: (err) => {
        this.alert.showWarning(err.error.message, '¡Importante!');        
      }
    })
  }

  getAllClients() {
    this.clientsService.getAll().subscribe({
      next: (data) => {
        this.clients = data;
        this.filteredClients = this.clients;
      },
      error: (err) => {
        this.alert.showWarning(err.error.message, '¡Importante!');
      }
    });
  }

  selectCombo(combo: any){

  }

  toggleDropdownAccountType(){
    this.isDropdownAccountTypeOpen = !this.isDropdownAccountTypeOpen;
  }

  toggleDropdownClients(){
    this.isDropdownClientsOpen = !this.isDropdownClientsOpen;
  }

  filterClient(){
    const lowerCaseSearchText = this.searchAccountType.toLowerCase();
    this.filteredClients = this.clients.filter(client =>
      client.accountTypeRecord.accountTypeName.toLowerCase().includes(lowerCaseSearchText)
    );
  }

  filterCombo(){

  }

  selectClient(option: any) {
    this.selectedClient = option;
    this.isDropdownClientsOpen = false;
    this.newComboSaleForm.get('clientId')?.setValue(this.selectedClient.clientId);
  }

  createNewComboSale(){
    this.comboSaleService.newComboSale(this.newComboSaleForm.value).subscribe({
      next: (data) => {
        this.ngOnInit();
        this.comboAccountsType = [];
        this.modalConfirmation = false;
        this.newComboSaleForm.reset();
        this.alert.showSuccess('Se ha creado la venta correctamente', '¡Validado!');
      },
      error: (err) => {
        this.alert.showError(err.error.message, '¡Importante!');
      }
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
    this.newComboSaleForm.get('comboAccountsType')?.setValue(this.comboAccountsType);
  }

  uploadClients(){
    this.closeModal();
    this.ngOnInit();
  }

  closeModal(): void {
    const modal = document.getElementById('modalNewClient');
    modal?.classList.remove('show');
    modal?.setAttribute('aria-hidden', 'true');
    modal?.setAttribute('style', 'display: none');

    const modalBackdrop = document.getElementsByClassName('modal-backdrop')[0];
    modalBackdrop.parentNode?.removeChild(modalBackdrop);
  }
}
