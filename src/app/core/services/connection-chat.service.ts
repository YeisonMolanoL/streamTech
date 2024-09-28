import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ConnectionChatService {
  private api = `${environment.apiConnection}`;

  constructor(private http: HttpClient) {}

  public getDynamicQr(){
    return this.http.get<any>(`${this.api}scan`);
  }

  public sendMessage(customMessage: string, whatsappNumber: string){
    const params = new HttpParams().set('message', customMessage).set('number', whatsappNumber);
    console.log('this.api :>> ', this.api);
    return this.http.get<any>(`${this.api}/send-message`, {
      params: params,
    });
  }
}
