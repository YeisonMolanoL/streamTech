import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { AccountTypeService } from '../../core/services/account-type.service';
import { AccountService } from '../../core/services/account.service';
import { AlertsService } from '../../core/services/alerts.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit{
  @Output() accountType = new EventEmitter<any>();
  accountTypeList = new Array<any>();
  accounts : any[] = [];
  modalConfirmation: boolean = false;
  accountSelected = false;
  pageSize = 5;
  page = 0;
  pageTotal = 0;

  constructor(private alert: AlertsService, private accountTypeService: AccountTypeService, private accountService: AccountService){

  }

  ngOnInit() {
    this.getAllAccountType();
  }

  getAllAccountType(){
    this.accountTypeService.getAllTotalAccounts().subscribe({
      next: (data) => {
        this.accountTypeList = data;
      },
      error: (err) => {
      }
    })
  }

  uploadAccountType(account: any){
    this.accountType = account;
    this.accountSelected = true;
    this.getAvailableAccountsByAccountType();
  }

  

  getAvailableAccountsByAccountType(){    
    this.accountService.getAllByAccountType(this.accountType, this.page, this.pageSize).subscribe({
      next: (data) => {
        this.accounts = [...data.content];
        this.pageTotal = data.totalPages;
      },
      error: (err) => {
      }
    });
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
}
