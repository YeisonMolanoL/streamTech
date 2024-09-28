import { SocketService } from '../../core/services/socket.service';
import { ConnectionChatService } from './../../core/services/connection-chat.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrl: './connection.component.css'
})
export class ConnectionComponent implements OnInit {
  qrCodeUrl: any;
  userId: any;

  constructor(private connectionChatService: ConnectionChatService, private socketService: SocketService){}

  ngOnInit(): void {
    this.socketService.getQRCodeStatus().subscribe({
      next: (data) => {
        console.log('data aca en el oniniti :>> ', data);
        this.qrCodeUrl = data;
      },
      error: (err) => {

      }
    })
      this.getDynaicQr();
  }

  getDynaicQr(){
    this.connectionChatService.getDynamicQr().subscribe({
      next: (data) => {
        console.log('data :>> ', data.qr);
        this.qrCodeUrl = data.qr;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
