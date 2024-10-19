import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountSaleService {
  globalRoute = `${environment.api}/sale/account/`

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
    });
  }
}
