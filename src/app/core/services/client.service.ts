import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  globalRoute = `${environment.api}/client/`;

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<any>(this.globalRoute + 'all');
  }

  newClient(client: any){
    return this.http.post<any>(this.globalRoute + 'create', client, {
      observe: 'response'
    })
  }
}
