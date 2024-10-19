import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MessageRequestModel } from '../models/MessageRequest.model';


@Injectable({
  providedIn: 'root'
})
export class ConnectionChatService {
  private api = `${environment.apiComunication}`;

  constructor(private http: HttpClient) {}

  public getDynamicQr(){
    return this.http.get<any>(`${this.api}scan`);
  }

  public sendMessage(customMessage: string, whatsappNumber: string){
    const params = new HttpParams().set('message', customMessage).set('number', whatsappNumber);
    return this.http.get<any>(`${this.api}/send-message`, {
      params: params,
    });
  }

  sendMessagesInSale(data: MessageRequestModel){
    return this.http.post(`${this.api}/massive`, data);
  }
}
