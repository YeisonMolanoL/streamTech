import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AccountService } from '../../core/services/account.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, map, of } from 'rxjs';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrl: './account-list.component.css'
})
export class AccountListComponent implements OnInit{
  @Input() accountType: any;
  accountsPage : any[] = [];
  accounts : any[] = [];
  filteredAccounts$: Observable<any[]> = of([]);
  accountSelected = false;
  accountForm! : FormGroup;
  pageSize = 5;
  page = 0;
  pageTotal = 0;

  @ViewChild('autoInput') input: any;

  constructor(private fb : FormBuilder, private accountService: AccountService){
    
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
        console.log(this.filteredAccounts$);
        
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
    this.accountService.getAvailableByAccountType(this.accountType, this.page, this.pageSize).subscribe({
      next: (data) => {
        this.accountsPage = data.content;
        this.pageTotal = data.totalPages;
      },
      error: (err) => {
        console.log("Ha ocurrido un error en el backend");
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
        console.log("Ocurrio un error en el back");
      }
    })
  }

  toggleAccountStatus(account: any){
    account.accountStatusAcount = !account.accountStatusAcount;
    this.accountService.updateAccount(account.accountId, account).subscribe({
      next: (data) => {
        this.ngOnInit();
      },
      error: (err) => {
        console.log('ha ocurrido un error en el backend' + err.error);
      }
    });
  }

  toggleAccountStatusSale(account: any){
    account.accountStatusSale = !account.accountStatusSale;
    this.accountService.updateAccount(account.accountId, account).subscribe({
      next: (data) => {
        this.ngOnInit();
      },
      error: (err) => {
        console.log('ha ocurrido un error en el backend' + err.error);
      }
    });
  }

  toggleAccountProperty(account: any){
    account.accountProperty = !account.accountProperty;
    this.accountService.updateAccount(account.accountId, account).subscribe({
      next: (data) => {
        this.ngOnInit();
      },
      error: (err) => {
        console.log('ha ocurrido un error en el backend' + err.error);
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
}
