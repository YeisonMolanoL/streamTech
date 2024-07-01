import { Component, Input, Output, SimpleChanges, ViewChild, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject, map, of } from 'rxjs';
import { AccountService } from '../../../../core/services/account.service';
import { AlertsService } from '../../../../core/services/alerts.service';

@Component({
  selector: 'app-account-sale-list',
  templateUrl: './account-sale-list.component.html',
  styleUrl: './account-sale-list.component.css'
})
export class AccountSaleListComponent implements OnInit, OnDestroy  {
  @Output() selectedAccountsUpdated: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('autoInput') input: any;
  @Input() accountType: any;
  filteredAccounts$: Observable<any[]> = of([]);
  modalConfirmation: boolean = false;
  accountSelected: boolean = false;
  selectedAccounts : any[] = [];
  accountsPage : any[] = [];
  accountForm! : FormGroup;
  accounts : any[] = [];
  pageTotal = 0;
  pageSize = 5;
  page = 0;

  

  constructor(private alert: AlertsService, private fb : FormBuilder, private accountService: AccountService){
    
  }

  ngOnDestroy(): void {
      this.ngOnInit();
  }

  ngOnChanges(changes: SimpleChanges): void {
      this.ngOnInit();
  }

  ngOnInit(): void {
      this.getAvailableAccountsByAccountType();
      this.initForm();
      this.accountForm.get('accountTypeRecord')?.setValue(this.accountType);
      this.getAllAccountsByType();
  }

  initForm(){
    this.accountForm = this.fb.group({
      accountId: [''],
      accountEmail: ['', Validators.required],
      accountPassword: ['', Validators.required],
      accountStatusAcount: [false],
      accountStatusSale: [false],
      accountProperty: [false],
      accountDueDate: ['', Validators.required],
      accountPurchaseDate: ['', Validators.required],
      accountAvailableProfiles: ['', Validators.required],
      accountTypeRecord: [''],
    })
  }

  getAllAccountsByType(){
    this.accountService.getAllByType(this.accountType.accountTypeRecord.accountTypeId).subscribe({
      next: (data) => {
        this.accounts = data;
        this.filteredAccounts$ = of(this.accounts);
      },
      error: (err) => {

      }
    })
  }

  getNewPage(action: any){
    if(action == 'prev'){
      if(this.page > 0){
        this.page--;
      }
    }else if(action == 'next'){
      if(this.page < (this.pageTotal - 1)){
        this.page++;
      }
    }
    this.getAvailableAccountsByAccountType();
  }

  getAvailableAccountsByAccountType(){    
    this.accountService.getAvailableAccountsByAccounType(this.accountType, this.page, this.pageSize).subscribe({
      next: (data) => {
        this.accountsPage = data.content;
        this.pageTotal = data.totalPages;
      },
      error: (err) => {
        this.alert.showWarning(err.error.message, '¡Importante!');
      }
    });
  }

  closeModal(): void {
    const modal = document.getElementById('modalNewAccount');
    modal?.classList.remove('show');
    modal?.setAttribute('aria-hidden', 'true');
    modal?.setAttribute('style', 'display: none');

    const modalBackdrop = document.getElementsByClassName('modal-backdrop')[0];
    modalBackdrop.parentNode?.removeChild(modalBackdrop);
  }

  createAccount(){
    this.accountService.newAccount(this.accountForm.value).subscribe({
      next: (data) => {
        this.closeModal();
        this.accountForm.reset();
        this.ngOnInit();
      },
      error: (err) =>{
        this.alert.showError(err.error.message, '¡Importante!');
      }
    })
  }

  toggleAccountStatus(account: any){
    account.accountStatusAcount = !account.accountStatusAcount;
    this.accountService.updateAccount(account.accountId, account).subscribe({
      next: (data) => {
        this.ngOnInit();
        this.alert.showSuccess('Actualizado correctamente', '¡Validado!');
      },
      error: (err) => {
        this.alert.showError(err.error.message, '¡Importante!');
      }
    });
  }

  toggleAccountStatusSale(account: any){
    account.accountStatusSale = !account.accountStatusSale;
    this.accountService.updateAccount(account.accountId, account).subscribe({
      next: (data) => {
        this.ngOnInit();
        this.alert.showSuccess('Actualizado correctamente', '¡Validado!');
      },
      error: (err) => {
        this.alert.showError(err.error.message, '¡Importante!');
      }
    });
  }

  toggleAccountProperty(account: any){
    account.accountProperty = !account.accountProperty;
    this.accountService.updateAccount(account.accountId, account).subscribe({
      next: (data) => {
        this.ngOnInit();
        this.alert.showSuccess('Actualizado correctamente', '¡Validado!');
      },
      error: (err) => {
        this.alert.showError(err.error.message, '¡Importante!');
      }
    });
  }


  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.accounts.filter(optionValue => optionValue.accountEmail.toLowerCase().includes(filterValue));
  }

  getFilteredOptions(value: string): Observable<any[]> {
    return of(value).pipe(
      map(filterString => this.filter(filterString)),
    );
  }

  onChange() {
    this.filteredAccounts$ = this.getFilteredOptions(this.input.nativeElement.value);
  }

  onSelectionChange($event: any) {
    this.filteredAccounts$ = this.getFilteredOptions($event);
  }

  selectNewAccount(account: any){
    const index = this.selectedAccounts.findIndex(accountSelect => accountSelect === account.accountId);
    if (index === -1) {
        this.selectedAccounts.push(account.accountId);
    } else {
        this.selectedAccounts.splice(index, 1);
    }
  }

  newAccountSale(){
    this.modalConfirmation = false;
    this.selectedAccountsUpdated.emit(this.selectedAccounts);
  }

  filterBy(status: any){
    if(status == 'every'){
      this.getAvailableAccountsByAccountType();
    }else{
      this.accountService.getAvailableAccountsByAccounTypeFilter(this.accountType, this.page, this.pageSize, status).subscribe({
        next: (data) => {
          this.accountsPage = data.content;
          this.pageTotal = data.totalPages;
        },
        error: (err) => {
          this.alert.showWarning(err.error.message, '¡Importante!');
        }
      });
    }
  }
}
