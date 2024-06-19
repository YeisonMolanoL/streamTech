import { HttpClient } from '@angular/common/http';
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
}
