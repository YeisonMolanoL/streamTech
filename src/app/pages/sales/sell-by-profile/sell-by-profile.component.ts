import { Component, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountSaleService } from '../../../core/services/account-sale.service';
import { AccountSaleListComponent } from '../sell-by-account/account-sale-list/account-sale-list.component';
import { ClientService } from '../../../core/services/client.service';
import { AccountTypeService } from '../../../core/services/account-type.service';
import { AccountService } from '../../../core/services/account.service';

@Component({
  selector: 'app-sell-by-profile',
  templateUrl: './sell-by-profile.component.html',
  styleUrl: './sell-by-profile.component.css'
})
export class SellByProfileComponent {
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
  @ViewChild('accountSaleList') accountSaleList!: AccountSaleListComponent;

  constructor(private fb: FormBuilder, private accountSaleService: AccountSaleService, private clientsService: ClientService, private accountTypeService: AccountTypeService, private accountService
    : AccountService) {

  }

  ngOnInit(): void {
    this.getAllAccountType();
    this.getAllClients();
    this.initForm();
  }

  initForm() {
    this.newAccountSaleForm = this.fb.group({
      accountTypeId: ['', Validators.required],
      clientId: ['', [Validators.required, Validators.pattern(/^[1-9]$/)]],
      saleDate: ['', Validators.required],
      dueDate: ['', Validators.required],
      accounts: ['']
    });
  }

  getAvailableAccounts() {
    this.accountService.getAvailableAccountsByAccounType(this.accountType, this.page, this.pageSize).subscribe({
      next: (data) => {
        this.availableAccounts = data;
      },
      error: (err) => {
        console.log("No se han podido cargar las cuentas disponibles");
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
        console.log("Ocurrio un error al cargar la lista de plataformas disponibles", err.error);

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
        console.log("Ocurrio un error al cargar la lista de plataformas disponibles", err.error);

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
        console.log("Ha ocurrido un error en el backend");
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
}
