import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-messages-to-send',
  templateUrl: './messages-to-send.component.html',
  styleUrl: './messages-to-send.component.css' 
})
export class MessagesToSendComponent implements OnInit {
  formMessage!: FormGroup;
  message: string = '';
  vars: any[] = [];
  items = [
    { title: 'Plataforma', value: '{{Plataforma}}', key: 'accountTypeName' },
    { title: 'Cuenta', value: '{{Cuenta}}}', key: 'accountEmail' },
    { title: 'Venta', value: '{{Venta}}', key: 'profileSalePurchaseDate' },
    { title: 'Vence', value: '{{Vence}}', key: 'profileSaleDueDate' },
    { title: 'Perfil', value: '{{Perfil}}', key: 'profileSaleName' },
    { title: 'Pin', value: '{{Pin}}', key: 'profileSalePin'},
    { title: 'Cliente', value: '{{Cliente}}', key: 'clientName'},
  ];

  constructor(private fb: FormBuilder, private dialogRef: NbDialogRef<MessagesToSendComponent>){}

  ngOnInit(): void {
      this.initForm();
  }

  initForm(){
    this.formMessage = this.fb.group({
      message: new FormControl('', Validators.required),
      vars: new FormControl([], Validators.required),
    });
  }

  actualizarMensaje(event: any): void {
    if (event.key === 'Backspace') {
      if (this.message.length > 0) {
        this.message = this.message.slice(0, -1);
      }
    } else if (event.key === 'Enter') {
      this.message += '\n'; 
    } else if (event.key.length === 1) {
      this.message += event.key;
    }

    event.preventDefault();
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    const chatBubble = document.querySelector('.chat-bubble');
    if (chatBubble) {
      chatBubble.scrollTop = chatBubble.scrollHeight;
    }
  }

  addNewVar(event: any){
    this.message += event.value;
    this.vars.push(event);
  }

  deleteVar(){

  }

  sendMessages(){
    this.formMessage.get('message')?.setValue(this.message);
    this.formMessage.get('vars')?.setValue(this.vars);
    this.dialogRef.close(this.formMessage.value);
  }
}
