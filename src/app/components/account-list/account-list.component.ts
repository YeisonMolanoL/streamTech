import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { AccountService } from '../../core/services/account.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, map, of } from 'rxjs';
import { AlertsService } from '../../core/services/alerts.service';
import { ProfileSaleService } from '../../core/services/profile-sale.service';
import { NbDialogService } from '@nebular/theme';
import { EditAccountDataModalComponent } from '../edit-account-data-modal/edit-account-data-modal.component';

declare var bootstrap: any;

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrl: './account-list.component.css'
})
export class AccountListComponent implements OnInit, OnChanges{
  @Input() accountType: any;
  accountsPage : any[] = [];
  accounts : any[] = [];
  filteredAccounts$: Observable<any[]> = of([]);
  accountSelected: any;
  accountForm! : FormGroup;
  pageSize = 5;
  page = 0;
  pageTotal = 0;
  modalConfirmation: boolean = false;
  accountData: any[] = [];

  @ViewChild('autoInput') input: any;

  constructor(private dialogService: NbDialogService, private profileSaleService: ProfileSaleService, private alert: AlertsService, private fb : FormBuilder, private accountService: AccountService){}

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
    });

    this.accountForm.get('accountPurchaseDate')?.valueChanges.subscribe((value) => {
      if (value) {
        const purchaseDate = new Date(value);
        const dueDate = new Date(purchaseDate);
        dueDate.setDate(purchaseDate.getDate() + 30);
        this.accountForm.get('accountDueDate')?.setValue(dueDate.toISOString().split('T')[0]);
      }
    });
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
    this.accountService.getAllByAccountType(this.accountType, this.page, this.pageSize).subscribe({
      next: (data) => {
        this.accountsPage = data.content;
        this.pageTotal = data.totalPages;
      },
      error: (err) => {
        this.alert.showWarning(err.error.message, 'Importante');
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
    this.modalConfirmation = false;
    this.accountService.newAccount(this.accountForm.value).subscribe({
      next: (data) => {
        this.closeModal();
        this.accountForm.reset();
        this.ngOnInit();
        this.alert.showSuccess('Se ha creado la cuenta correctamente', '¡Correcto!')
      },
      error: (err) =>{
        this.alert.showWarning(err.error.message, 'Importante');
      }
    })
  }

  toggleAccountStatus(account: any){
    if(account.accountAvailableProfiles < account.accountTypeRecord.accountTypeAmountProfile){
      this.profileSaleService.getSalesByAccount(account.accountId).subscribe({
        next: (data) => {
          this.accountData = data;
          this.dialogService.open(EditAccountDataModalComponent, {
            context: {
              accountType: this.accountType,
              profilesSalesList: this.accountData,
              account: account,
            },
          }).onClose.subscribe(data => {
            if (data = 'restart'){
              this.ngOnInit();
            }
          });
        },
        error: (err) => {
  
        }
      });
    }
    //account.accountStatusAcount = !account.accountStatusAcount;
    /*this.accountService.updateAccount(account.accountId, account).subscribe({
      next: (data) => {
        this.ngOnInit();
      },
      error: (err) => {
        this.alert.showWarning(err.error.message, 'Importante');
      }
    });*/
  }

  toggleAccountStatusSale(account: any){
    account.accountStatusSale = !account.accountStatusSale;
    account.accountTypeRecord.accountTypeAvailableProfiles = account.accountTypeRecord.accountTypeAvailableProfiles - account.accountAvailableProfiles;
    
    
    this.accountService.updateAccount(account.accountId, account).subscribe({
      next: (data) => {
        this.ngOnInit();
      },
      error: (err) => {
        this.alert.showWarning(err.error.message, 'Importante');
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
        this.alert.showWarning(err.error.message, 'Importante');
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

  showAccountData(event: any){
    this.accountSelected = event;
    this.profileSaleService.getSalesByAccount(this.accountSelected.accountId).subscribe({
      next: (data) => {
        this.accountData = data;
        
      },
      error: (err) => {

      }
    });
  }
}
