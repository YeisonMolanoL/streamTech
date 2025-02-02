import { Injectable } from '@angular/core';
import { UserModel } from '../../../../core/models/User.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl: string = `${environment.api}/users`;

  constructor(private http: HttpClient) { }

  insertUser(user: UserModel){
    return this.http.post<UserModel>(`${this.apiUrl}/create`, user);
  }

  logIn(userLogIn: { userName: string, password: string }){
    return this.http.post<UserModel>(`${this.apiUrl}/login`, userLogIn);
  }
}
