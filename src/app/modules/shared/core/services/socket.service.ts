import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io(`${environment.apiComunication}/`);
  }
  
  getQRCode(): Observable<string> {
    return new Observable((observer) => {
      this.socket.on('qr', (qrUrl: string) => {
        observer.next(qrUrl);
      });
    });
  }
  
  getQRCodeStatus(): Observable<string> {
    return new Observable((observer) => {
      this.socket.on('qrstatus', (src: string) => {
        observer.next(src);
      });
    });
  }
  
  getUser(): Observable<string> {
    return new Observable((observer) => {
      this.socket.on('user', (user: string) => {
        observer.next(user);
      });
    });
  }
}
