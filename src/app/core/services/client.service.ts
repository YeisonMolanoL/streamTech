import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  globalRoute = 'http://localhost:8080/client/'

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<any>(this.globalRoute + 'all');
  }
}
