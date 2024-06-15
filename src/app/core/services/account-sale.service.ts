import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountSaleService {
  globalRoute = 'http://localhost:8080/sale/account/'

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<any>(this.globalRoute + 'all');
  }

  getAllTotalAccounts(){
    return this.http.get<any>(this.globalRoute + 'all/data');
  }

  newAccountSale(accountSale: any){
    return this.http.post<any>(this.globalRoute + 'create', accountSale, {
      observe: 'response'
    })
  }
}
