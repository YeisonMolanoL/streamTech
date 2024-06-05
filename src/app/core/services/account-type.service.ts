import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountTypeService {
  globalRoute = 'http://localhost:8080/platform/'

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<any>(this.globalRoute + 'all');
  }

  getAllTotalAccounts(){
    return this.http.get<any>(this.globalRoute + 'all/data');
  }

  newAccountType(accountType: any){
    console.log(accountType);
    
    return this.http.post<any>(this.globalRoute + 'create', accountType, {
      observe: 'response'
    })
  }
}
