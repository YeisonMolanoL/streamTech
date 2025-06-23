import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dialog-confirmation',
  templateUrl: './dialog-confirmation.component.html',
  styleUrl: './dialog-confirmation.component.css'
})
export class DialogConfirmationComponent {
  @Output() onConfirmCallback: EventEmitter<void> = new EventEmitter<void>();
  @Output() onCancelCallback: EventEmitter<void> = new EventEmitter<void>();

  onConfirm(): void {
    this.onConfirmCallback.emit();
  }

  onCancel(): void {
    this.onCancelCallback.emit();
  }  
}
