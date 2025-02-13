import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { SellByProfileResponse } from '../models/SellByProfileResponse.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileSaleService {
  globalRoute = `${environment.api}/sale/profile/`;

  constructor(private http: HttpClient) { }

  newProfileSale(profileSale: any){
    return this.http.post<SellByProfileResponse[]>(this.globalRoute + 'create', profileSale);
  }

  getSalesByAccount(accountId: number){
    let params = new HttpParams().set('accountId', accountId);
    return this.http.get<any>(`${this.globalRoute}sales`, {
      params: params,
    });
  }

  updateByEmail(email: any, profileSaleId: any){
    const params = new HttpParams().set('profileSaleId', profileSaleId).set('email', email);
    return this.http.put<any>(`${this.globalRoute}update/im`, [], {
      params: params,
    });
  }

  sellProfilesByAccountRecord(request: any){
    return this.http.post<any>(`${this.globalRoute}by/account`, request);
  }
}
