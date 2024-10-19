import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountTypeService {
  globalRoute = `${environment.api}/platform/`;

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<any>(this.globalRoute + 'all');
  }

  getAllTotalAccounts(){
    return this.http.get<any>(this.globalRoute + 'all/data');
  }

  newAccountType(accountType: any){
    return this.http.post<any>(this.globalRoute + 'create', accountType, {
      observe: 'response'
    })
  }

  getAllAvailableProfile(){
    return this.http.get<any>(this.globalRoute + 'all/available');
  }
}
