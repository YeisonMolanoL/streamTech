import { ComboModel } from './../models/Combo.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComboSaleService {
  private globalRoute = `${environment.api}/sale/combo/`;

  constructor(private http: HttpClient) { }

  newComboSale(comboSale: any){
    return this.http.post<any>(this.globalRoute + 'create', comboSale, {
      observe: 'response'
    })
  }

  getAllCombos(){
    return this.http.get<any>(this.globalRoute + 'all');
  }

  insertCombo(newCombo: ComboModel){
    return this.http.post<ComboModel>(`${this.globalRoute}insert`, newCombo);
  }
}
