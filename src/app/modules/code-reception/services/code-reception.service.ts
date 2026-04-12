import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

interface CodeResponse {
  success: boolean;
  code?: string;
  codeId?: number;
  requestId?: number;
  message?: string;
}

interface GetCodeRequest {
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class CodeReceptionService {

  private apiUrl: string;

  constructor(private http: HttpClient) {
    // Dinámica: usa environment.api (vacío en dev, URL completa en prod)
    this.apiUrl = `${environment.api}/api/code-reception`;
  }

  getCode(email: string): Observable<CodeResponse> {
    const request: GetCodeRequest = {
      email: email.trim().toLowerCase()
    };

    return this.http.post<CodeResponse>(
      `${this.apiUrl}/get-code`,
      request
    ).pipe(
      timeout(35000),
      catchError(this.handleError)
    );
  }

  getProfilesByEmail(email: string): Observable<any[]> {
    let params = new HttpParams().set('email', email.trim().toLowerCase());
    return this.http.get<any[]>(
      `${environment.api}/sale/profile/by-email`,
      { params }
    ).pipe(
      catchError(this.handleError)
    );
  }

  activateProfileSale(profileSaleId: number): Observable<void> {
    return this.http.put<void>(
      `${this.apiUrl}/sale/profile/activate/${profileSaleId}`,
      {}
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

