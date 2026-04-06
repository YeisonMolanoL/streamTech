import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { SellByProfileResponse } from '../response/SellByProfileResponse.model';
import { catchError, Observable, throwError } from 'rxjs';

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

  getProfilesByEmail(email: string): Observable<ProfileSaleSelection[]> {
    const params = new HttpParams().set('email', email.trim().toLowerCase());
    return this.http
      .get<
        ProfileSaleSelection[]
      >(`${this.globalRoute}by-email`, { params })
      .pipe(catchError(this.handleError));
  }

  validateProfilePin(email: string, profileSaleId: number, pin: string): Observable<ProfilePinValidationResponse> {
    const request: ProfilePinValidationRequest = {
      email: email.trim().toLowerCase(),
      profileSaleId,
      pin
    };

    return this.http.post<ProfilePinValidationResponse>(
      `${this.globalRoute}validate-pin`,
      request
    ).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
      let errorMessage = 'Error desconocido';
  
      if (error.error instanceof ErrorEvent) {
        errorMessage = `Error: ${error.error.message}`;
      } else {
        if (error.status === 0) {
          errorMessage = 'No se puede conectar al servidor';
        } else if (error.status === 400) {
          errorMessage = 'Solicitud inválida';
        } else if (error.status === 500) {
          errorMessage = 'Error interno del servidor';
        } else {
          errorMessage = `Error ${error.status}: ${error.statusText}`;
        }
      }
  
      console.error(errorMessage);
      return throwError(() => new Error(errorMessage));
    }
}

interface ProfileSaleSelection {
  profileSaleId: number;
  profileSaleName: string;
  profileSalePurchaseDate: string;
  profileSaleDueDate: string;
  profileSaleType: string;
  profileSaleStatus: boolean;
  profileSaleValidationAccess: number;
}

interface ProfilePinValidationResponse {
  valid: boolean;
  message?: string;
  profileSaleValidationAccess?: number;
}

interface ProfilePinValidationRequest {
  profileSaleId: number;
  email: string;
  pin: string;
}