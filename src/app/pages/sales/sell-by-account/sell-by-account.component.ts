import { Component, Input, OnInit } from '@angular/core';
import { AccountService } from '../../../core/services/account.service';
import { AccountTypeService } from '../../../core/services/account-type.service';

@Component({
  selector: 'app-sell-by-account',
  templateUrl: './sell-by-account.component.html',
  styleUrl: './sell-by-account.component.css'
})
export class SellByAccountComponent implements OnInit{
  @Input() accountType: any;
  availableAccounts = Array<any>();
  accountTypeList = new Array<any>();
  accountsSold = Array<any>();
  accountSelected = false;
  accounts : any[] = [];
  pageTotal = 0;
  page = 1;
  pageSize = 5;

  constructor(private accountTypeService: AccountTypeService, private accountService: AccountService){
    
  }

  ngOnInit(): void {
      this.getAllAccountType();
      this.initForm();
  }

  initForm(){

  }

  getAvailableAccounts(){
    this.accountService.getAvailableByAccountType(this.accountType, this.page, this.pageSize).subscribe({
      next: (data) => {
        this.availableAccounts = data;
        console.log(this.availableAccounts);
        
      },
      error: (err) => {
        console.log("No se han podido cargar las cuentas disponibles");
      }
    })
  }

  getAllAccountType(){
    this.accountTypeService.getAllTotalAccounts().subscribe({
      next: (data) => {
        this.accountTypeList = data;
      },
      error: (err) => {
        console.log("Ocurrio un error al cargar la lista de plataformas disponibles", err.error);
        
      }
    })
  }

  uploadAccountType(account: any){
    this.accountType = account;
    this.accountSelected = true;
    this.getAvailableAccountsByAccountType();
  }

  getAvailableAccountsByAccountType(){    
    this.accountService.getAvailableByAccountType(this.accountType, this.page, this.pageSize).subscribe({
      next: (data) => {
        this.accounts = [...data.content];
        this.pageTotal = data.totalPages;
      },
      error: (err) => {
        console.log("Ha ocurrido un error en el backend");
      }
    });
  }
}
