import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface AccountResponseDto {
  id: number;
  email: string;
  imapHost: string;
  imapPort: number;
  imapSecure: boolean;
  isImapActive: boolean;
  connectionError: string;
  accountDueDate: string;
  accountStatusAcount: boolean;
}

export interface AddEmailAccountRequestDto {
  email: string;
  password: string;
  host: string;
  port: number;
  secure: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AccountManagementService {

  private apiUrl = `${environment.api}/api/code-reception`;

  constructor(private http: HttpClient) { }

  getAccounts(): Observable<AccountResponseDto[]> {
    return this.http.get<AccountResponseDto[]>(`${this.apiUrl}/accounts`);
  }

  addAccount(account: AddEmailAccountRequestDto): Observable<AccountResponseDto> {
    return this.http.post<AccountResponseDto>(`${this.apiUrl}/accounts`, account);
  }

  toggleListening(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/accounts/${id}/toggle-listening`, {});
  }
}