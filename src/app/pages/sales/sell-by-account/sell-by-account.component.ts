import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AccountService } from '../../../core/services/account.service';
import { AccountTypeService } from '../../../core/services/account-type.service';
import { ClientService } from '../../../core/services/client.service';
import { AccountSaleService } from '../../../core/services/account-sale.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountSaleListComponent } from './account-sale-list/account-sale-list.component';
import { AlertsService } from '../../../core/services/alerts.service';

@Component({
  selector: 'app-sell-by-account',
  templateUrl: './sell-by-account.component.html',
  styleUrl: './sell-by-account.component.css'
})
export class SellByAccountComponent implements OnInit {
  @Input() accountType: any;
  @Output() selectedAccountTypeChange = new EventEmitter<any>();
  isDropdownAccountTypeOpen = false;
  isDropdownClientsOpen = false;
  newAccountSaleForm!: FormGroup;
  selectedAccountType: any;
  selectedClient: any;
  selectedDate: string | null = null;
  availableAccounts = Array<any>();
  accountTypeList = new Array<any>();
  clients = new Array<any>();
  accountsSold = Array<any>();
  accountSelected = false;
  accounts: any[] = [];
  pageTotal = 0;
  page = 1;
  pageSize = 5;
  searchAccountType: any;
  searchClient: any;
  filteredAccounts = new Array<any>();
  filteredClients = new Array<any>();
  clientDialog: boolean = false;
  @ViewChild('accountSaleList') accountSaleList!: AccountSaleListComponent;

  constructor(private clientsService: ClientService, private alert: AlertsService, private fb: FormBuilder, private accountSaleService: AccountSaleService, private accountTypeService: AccountTypeService, private accountService: AccountService) {

  }

  ngOnInit(): void {
    this.getAllAccountType();
    this.getAllClients();
    this.initForm();
  }

  initForm() {
    this.newAccountSaleForm = this.fb.group({
      accountTypeId: new FormControl ('', [Validators.required, Validators.pattern(/^[1-9]$/)]),
      clientId: new FormControl ('', Validators.required),
      saleDate: new FormControl ('', Validators.required),
      dueDate: new FormControl ('', Validators.required),
      accounts: new FormControl ('')
    });

    this.newAccountSaleForm.get('saleDate')?.valueChanges.subscribe((value) => {
      if (value) {
        const purchaseDate = new Date(value);
        const dueDate = new Date(purchaseDate);
        dueDate.setDate(purchaseDate.getDate() + 30);
        this.newAccountSaleForm.get('dueDate')?.setValue(dueDate.toISOString().split('T')[0]);
      }
    });
  }

  getAvailableAccounts() {
    this.accountService.getAvailableAccountsByAccounType(this.accountType, this.page, this.pageSize).subscribe({
      next: (data) => {
        this.availableAccounts = data;
      },
      error: (err) => {
      }
    })
  }

  getAllAccountType() {
    this.accountTypeService.getAllTotalAccounts().subscribe({
      next: (data) => {
        this.accountTypeList = data;
        this.filteredAccounts = this.accountTypeList;
      },
      error: (err) => {
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
        this.alert.showWarning(err.error.message, '¡Importante!');
      }
    });
  }

  uploadAccountType(account: any) {
    this.accountType = account;
    this.accountSelected = true;
    this.getAvailableAccountsByAccountType();
  }

  getAvailableAccountsByAccountType() {
    this.accountService.getAvailableAccountsByAccounType(this.accountType, this.page, this.pageSize).subscribe({
      next: (data) => {
        this.accounts = [...data.content];
        this.pageTotal = data.totalPages;
      },
      error: (err) => {
      }
    });
  }

  uploadClients(){
    this.closeModal();
    this.ngOnInit();
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
    this.newAccountSaleForm.get('accountTypeId')?.setValue(this.selectedAccountType.accountTypeRecord.accountTypeId);
  }

  selectClient(option: any) {
    this.selectedClient = option;
    this.isDropdownClientsOpen = false;
    this.newAccountSaleForm.get('clientId')?.setValue(this.selectedClient.clientId);
  }

  filterAccountType() {
    const lowerCaseSearchText = this.searchAccountType.toLowerCase();
    this.filteredAccounts = this.accountTypeList.filter(accountType =>
      accountType.accountTypeRecord.accountTypeName.toLowerCase().includes(lowerCaseSearchText)
    );
  }

  filterClient() {
    const lowerCaseSearchText = this.searchAccountType.toLowerCase();
    this.filteredClients = this.clients.filter(client =>
      client.accountTypeRecord.accountTypeName.toLowerCase().includes(lowerCaseSearchText)
    );
  }

  newAccountSale(accounts: any) {
    this.newAccountSaleForm.get('accounts')?.reset;
    this.newAccountSaleForm.get('accounts')?.setValue(accounts);
    if (this.newAccountSaleForm.valid) {
      this.accountSaleService.newAccountSale(this.newAccountSaleForm.value).subscribe({
        next: (data) => {
          this.newAccountSaleForm.reset;
          this.ngOnInit();
          this.recreateAccountSaleList();
        },
        error: (err) => {
        }
      });
    }
  }

  recreateAccountSaleList() {
    // Destruimos y recreamos el componente hijo
    this.accountSaleList.ngOnDestroy();

    setTimeout(() => {
      this.accountSaleList.ngOnInit();
    });
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
