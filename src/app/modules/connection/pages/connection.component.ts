import { AlertsService } from '../../shared/core/services/alerts.service';
import { SocketService } from '../../shared/core/services/socket.service';
import { ConnectionChatService } from '../core/services/connection-chat.service';
import { Component, inject, OnInit } from '@angular/core';
@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrl: './connection.component.css' 
})
export class ConnectionComponent implements OnInit {
  qrCode: string = '';
  userId: number | null = null;
  private alert = inject(AlertsService);

  constructor(private _connectionChatService: ConnectionChatService, private socketService: SocketService){}

  ngOnInit(): void {
    this.loadInitiallQr();
  }

  loadInitiallQr(){
    this._connectionChatService.getLoginQr().subscribe({
      next: data => {
        this.qrCode = data.qr;
      },
      error: err => {
        this.alert.showWarning(err.error.message, '¡Importante!');
      }
    })
  }
}
