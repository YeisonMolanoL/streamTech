import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;

  constructor() {
    // Conectarse al servidor Socket.io
    this.socket = io(`${environment.apiConnection}/`); // Cambia la URL a la de tu servidor
  }

  // Método para recibir el QR
  getQRCode(): Observable<string> {
    return new Observable((observer) => {
      this.socket.on('qr', (qrUrl: string) => {
        observer.next(qrUrl);
      });
    });
  }

  // Método para recibir el estado del QR
  getQRCodeStatus(): Observable<string> {
    return new Observable((observer) => {
      this.socket.on('qrstatus', (src: string) => {
        observer.next(src);
      });
    });
  }

  // Método para recibir el usuario
  getUser(): Observable<string> {
    return new Observable((observer) => {
      this.socket.on('user', (user: string) => {
        observer.next(user);
      });
    });
  }
}
