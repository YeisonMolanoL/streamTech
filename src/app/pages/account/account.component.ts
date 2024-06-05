import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { AccountTypeService } from '../../core/services/account-type.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../core/services/account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit{
  @Output() accountType = new EventEmitter<any>();
  accountTypeList = new Array<any>();
  accounts : any[] = [];
  
  accountSelected = false;
  pageSize = 5;
  page = 0;
  pageTotal = 0;

  constructor(private accountTypeService: AccountTypeService, private accountService: AccountService){

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
