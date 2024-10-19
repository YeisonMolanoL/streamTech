import { Component, Input, Output, ViewChild, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountSaleService } from '../../../core/services/account-sale.service';
import { AccountSaleListComponent } from '../sell-by-account/account-sale-list/account-sale-list.component';
import { ClientService } from '../../../core/services/client.service';
import { AccountTypeService } from '../../../core/services/account-type.service';
import { AccountService } from '../../../core/services/account.service';
import { AlertsService } from '../../../core/services/alerts.service';

@Component({
  selector: 'app-sell-by-profile',
  templateUrl: './sell-by-profile.component.html',
  styleUrl: './sell-by-profile.component.css'
})
export class SellByProfileComponent implements OnInit {
  accountType: any = [];
  isDropdownAccountTypeOpen = false;
  isDropdownClientsOpen = false;
  newProfileSaleForm!: FormGroup;
  selectedAccountType: any;
  selectedClient: any;
  accountTypeList = new Array<any>();
  clients = new Array<any>();
  searchAccountType: any;
  searchClient: any;
  filteredAccounts = new Array<any>();
  filteredClients = new Array<any>();
  clientDialog = false;
  clientForm!: FormGroup;
  profileSaleList = new Array<any>();

  constructor(private alert: AlertsService, private fb: FormBuilder, private accountSaleService: AccountSaleService, private clientsService: ClientService, private accountTypeService: AccountTypeService, private accountService
    : AccountService) {

  }

  ngOnInit(): void {
    this.getAllAccountType();
    this.getAllClients();
    this.initForm();
    this.initClientForm();
  }

  initForm() {
    this.newProfileSaleForm = this.fb.group({
      accountTypeName: new FormControl ('', Validators.required),
      accountTypeId: new FormControl ('', Validators.required),
      profileSaleName: new FormControl ('', Validators.required),
      profileSalePin: new FormControl ('', Validators.required),
      profileSaleDueDate: new FormControl ('', Validators.required),
      profileSalePurchaseDate: new FormControl ('', Validators.required),
      clientId: new FormControl ('', Validators.required),
    });

    this.newProfileSaleForm.get('profileSalePurchaseDate')?.valueChanges.subscribe((value) => {
      if (value) {
        const purchaseDate = new Date(value);
        const dueDate = new Date(purchaseDate);
        dueDate.setDate(purchaseDate.getDate() + 30);
        this.newProfileSaleForm.get('profileSaleDueDate')?.setValue(dueDate.toISOString().split('T')[0]);
      }
    });
  }

  initClientForm(){
    this.clientForm = this.fb.group({
      clientName: new FormControl ('', Validators.required),
      clientNumber: new FormControl ('', Validators.required),
    })
  }

  getAllAccountType() {
    this.accountTypeService.getAllTotalAccounts().subscribe({
      next: (data) => {
        this.accountTypeList = data;
        this.filteredAccounts = this.accountTypeList;
      },
      error: (err) => {
        this.alert.showWarning(err.error.message, '¡Precausión!')
      }
    });
  }

  getAllClients() {
    this.clientsService.getAll().subscribe({
      next: (data) => {
        this.clients = data;
        this.filteredClients = this.clients;
      },
      error: (err) => {
        this.alert.showWarning(err.error.message, '¡Precausión!')
      }
    });
  }



  toggleDropdownAccountType() {
    this.isDropdownAccountTypeOpen = !this.isDropdownAccountTypeOpen;
  }

  toggleDropdownClients() {
    this.isDropdownClientsOpen = !this.isDropdownClientsOpen;
  }

  selectAccountType(option: any) {
    this.selectedAccountType = option;
    this.isDropdownAccountTypeOpen = false;
    this.newProfileSaleForm.get('accountTypeId')?.setValue(this.selectedAccountType.accountTypeRecord?.accountTypeId);
    this.newProfileSaleForm.get('accountTypeName')?.setValue(this.selectedAccountType.accountTypeRecord?.accountTypeName);
  }

  selectClient(option: any) {
    this.selectedClient = option;
    this.isDropdownClientsOpen = false;
    this.newProfileSaleForm.get('clientId')?.setValue(this.selectedClient.clientId);
  }

  filterAccountType(event: any) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.filteredAccounts = this.accountTypeList.filter(accountType =>
      accountType.accountTypeRecord.accountTypeName.toLowerCase().includes(inputValue.toLowerCase())
    );
  }

  filterClient(event: any) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.filteredClients = this.clients.filter(client =>
      client.clientName.toLowerCase().includes(inputValue.toLowerCase())
    );
  }

  newClientDialog(){
    this.isDropdownClientsOpen = false;
    this.clientDialog = true;
  }

  createClient(){
    this.clientsService.newClient(this.clientForm.value).subscribe({
      next: (data) => {
        this.getAllClients();
        this.closeModal();
        this.alert.showSuccess('¡Se ha creado el nuevo cliente correctamente!', '¡Validado!')
      },
      error: (err) => {
        this.alert.showError(err.error.message, 'Error inesperado')
      }
    });
  }

  addNewProfileSale(){
    this.profileSaleList.push(this.newProfileSaleForm.value);
    this.newProfileSaleForm.get('profileSaleName')?.reset();
    this.newProfileSaleForm.get('profileSalePin')?.reset();
  }

  closeModal(): void {
    const modal = document.getElementById('modalNewClient');
    modal?.classList.remove('show');
    modal?.setAttribute('aria-hidden', 'true');
    modal?.setAttribute('style', 'display: none');

    const modalBackdrop = document.getElementsByClassName('modal-backdrop')[0];
    modalBackdrop.parentNode?.removeChild(modalBackdrop);
  }

  saleMade(){
    this.clientForm.reset();
    this.selectedAccountType = undefined;
    this.selectedClient = undefined;
    this.profileSaleList = [];
    this.ngOnInit();
  }
}
