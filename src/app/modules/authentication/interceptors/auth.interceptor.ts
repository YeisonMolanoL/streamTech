import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const data_user = localStorage.getItem('data_user');
    if (!data_user) {
      this.router.navigate(['/auth/login']); // Redirige si no hay datos de usuario
      return next.handle(req); // Continúa con la solicitud sin modificar
    }

    const parsedData = JSON.parse(data_user);
    const token = parsedData.token;

    if (token) {
      const modifiedReq = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
      return next.handle(modifiedReq).pipe(
        catchError(error => {
          if (error.status === 401) {
            // localStorage.removeItem('data_user');
            // this.router.navigate(['/auth/login']);
          } else if (error.status === 403) {
            this.router.navigate(['/forbidden']);
          } else if (error.status === 500) {
            this.router.navigate(['/server-error']);
          }
          return throwError(() => error);
        })
      );
    } else {
      return next.handle(req); // Si no hay token, continúa sin modificar
    }
  }
}