import { Component, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  accountType: any = [];
  isDropdownAccountTypeOpen = false;
  isDropdownClientsOpen = false;
  newProfileSaleForm!: FormGroup;
  selectedAccountType: any = [];
  selectedClient: any = [];
  accountTypeList = new Array<any>();
  clients = new Array<any>();
  searchAccountType: any;
  searchClient: any;
  filteredAccounts = new Array<any>();
  filteredClients = new Array<any>();
  clientDialog = false;
  newClientName = '';
  profileSaleList = new Array<any>();

  constructor(private fb: FormBuilder, private accountSaleService: AccountSaleService, private clientsService: ClientService, private accountTypeService: AccountTypeService, private accountService
    : AccountService) {

  }

  ngOnInit(): void {
    console.log('Se dio');
    
    this.getAllAccountType();
    this.getAllClients();
    this.initForm();
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



  toggleDropdownAccountType() {
    this.isDropdownAccountTypeOpen = !this.isDropdownAccountTypeOpen;
  }

  toggleDropdownClients() {
    this.isDropdownClientsOpen = !this.isDropdownClientsOpen;
  }

  selectAccountType(option: any) {
    this.selectedAccountType = option;
    console.log(this.selectedAccountType);
    
    this.isDropdownAccountTypeOpen = false;
    this.newProfileSaleForm.get('accountTypeId')?.setValue(this.selectedAccountType.accountTypeRecord.accountTypeId);
    this.newProfileSaleForm.get('accountTypeName')?.setValue(this.selectedAccountType.accountTypeRecord.accountTypeName);
  }

  selectClient(option: any) {
    this.selectedClient = option;
    this.isDropdownClientsOpen = false;
    this.newProfileSaleForm.get('clientId')?.setValue(this.selectedClient.clientId);
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
    this.newProfileSaleForm.get('accounts')?.reset;
    this.newProfileSaleForm.get('accounts')?.setValue(accounts);
    if (this.newProfileSaleForm.valid) {
      this.accountSaleService.newAccountSale(this.newProfileSaleForm.value).subscribe({
        next: (data) => {
          this.newProfileSaleForm.reset;
          this.ngOnInit();
        },
        error: (err) => {
        }
      });
    }
  }

  newClientDialog(){
    this.isDropdownClientsOpen = false;
    this.clientDialog = true;
  }

  createClient(){
    console.log(this.newClientName);
    
  }

  addNewProfileSale(){
    this.profileSaleList.push(this.newProfileSaleForm.value)
    this.newProfileSaleForm.get('profileSaleName')?.reset();
    this.newProfileSaleForm.get('profileSalePin')?.reset();
  }
}
