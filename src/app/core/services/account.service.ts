import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  globalRoute = `${environment.api}/account/`;

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<any>(this.globalRoute + 'all');
  }

  getAllByType(accountTypeId: any){
    let httpParams = new HttpParams().set('accountTypeId', accountTypeId);
    return this.http.get<any>(this.globalRoute + 'all/type', {
      params: httpParams
    });
  }

  getAllByAccountType(account: any, page: any, pageSize: any){
    let httpParams = new HttpParams().set('page', page).set('pageSize', pageSize);
    return this.http.post<any>(this.globalRoute + 'all/type', account.accountTypeRecord, { params: httpParams});
  }

  getAvailableAccountsByAccounType(account: any, page: any, pageSize: any){
    let httpParams = new HttpParams().set('page', page).set('pageSize', pageSize);
    return this.http.post<any>(this.globalRoute + 'available', account.accountTypeRecord, { params: httpParams});
  }

  getAvailableAccountsByAccounTypeFilter(account: any, page: any, pageSize: any, status: boolean){
    let httpParams = new HttpParams().set('page', page).set('pageSize', pageSize).set('status', status);
    return this.http.post<any>(this.globalRoute + 'available/filter', account.accountTypeRecord, { params: httpParams});
  }

  newAccount(account: any) {
    let httpParams = new HttpParams().set('accountTypeId', account.accountTypeRecord.accountTypeRecord.accountTypeId);
    return this.http.post<any>(this.globalRoute + 'create', account, {
      observe: 'response',
      params: httpParams
    });
  }

  updateAccount(accountId: any, account : any){
    let httpParams = new HttpParams().set('accountId', accountId);
    return this.http.put<any>(this.globalRoute + 'update', account , {
      params: httpParams
    });
  }

  inactiveAccount(accountId: number){
    return this.http.post<any>(`${this.globalRoute}${accountId}`, {});
  }

  getAccountsWithAvailableProfiles(accountTypeId: number, page: number, pageSize: number){
    const params = new HttpParams().set('accountTypeId', accountTypeId).set('page', page).set('pageSize', pageSize);
    return this.http.get<any>(`${this.globalRoute}available/profiles`, {
      params: params,
    });
  }
}
