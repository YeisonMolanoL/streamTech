// EJEMPLO: Cómo usar el servicio de código recepción en un componente

import { Component } from '@angular/core';
import { CodeReceptionService } from '../modules/code-reception/services/code-reception.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string = '';
  code: string = '';
  isWaitingForCode: boolean = false;

  constructor(private codeService: CodeReceptionService) {}

  /**
   * Solicita un código y lo espera (long polling, 30s)
   */
  sendVerificationCode(): void {
    this.isWaitingForCode = true;

    this.codeService.getCode(this.email).subscribe({
      next: (response) => {
        this.isWaitingForCode = false;
        
        if (response.success) {
          this.code = response.code || '';
          console.log('Código recibido:', this.code);
          // Aquí puedes redirigir a siguiente paso de autenticación
        } else {
          alert(response.message || 'No se recibió código');
        }
      },
      error: (err) => {
        this.isWaitingForCode = false;
        console.error('Error:', err);
        alert('Error de conexión');
      }
    });
  }

  /**
   * Verifica el código (llamar a tu servicio de autenticación)
   */
  verifyCode(): void {
    // IMPLEMENTAR: llamar a tu servicio de validación de código
    console.log('Verificando código:', this.code);
  }
}
