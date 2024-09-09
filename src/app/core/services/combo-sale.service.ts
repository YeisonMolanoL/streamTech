import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComboSaleService {
  private globalRoute = 'http://localhost:8080/sale/combo/';

  constructor(private http: HttpClient) { }

  newComboSale(comboSale: any){
    console.log('comboSale :>> ', comboSale);
    return this.http.post<any>(this.globalRoute + 'create', comboSale, {
      observe: 'response'
    })
  }

  getAllCombos(){
    return this.http.get<any>(this.globalRoute + 'all');
  }
}
