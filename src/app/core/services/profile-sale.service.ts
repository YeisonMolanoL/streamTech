import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileSaleService {
  globalRoute = 'http://localhost:8080/sale/profile/'

  constructor(private http: HttpClient) { }

  newProfileSale(profileSale: any){
    return this.http.post<any>(this.globalRoute + 'create', profileSale, {
      observe: 'response'
    })
  }

  getSalesByAccount(accountId: number){
    let params = new HttpParams().set('accountId', accountId);
    return this.http.get<any>(`${this.globalRoute}sales`, {
      params: params,
    });
  }

  updateByEmail(email: any, profileSaleId: any){
    const params = new HttpParams().set('profileSaleId', profileSaleId).set('email', email);
    console.log('params :>> ', params);
    return this.http.put<any>(`${this.globalRoute}update/im`, [], {
      params: params,
    });
  }
}
