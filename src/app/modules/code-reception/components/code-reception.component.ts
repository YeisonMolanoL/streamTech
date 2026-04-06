import { Component } from '@angular/core';
import { CodeReceptionService } from '../services/code-reception.service';
import { AccountSaleService } from '../../management/core/services/account-sale.service';
import { ProfileSaleService } from '../../management/core/services/profile-sale.service';

interface ProfileSaleSelection {
  profileSaleId: number;
  profileSaleName: string;
  profileSalePurchaseDate: string;
  profileSaleDueDate: string;
  profileSaleType: string;
  profileSaleStatus: boolean;
  profileSaleValidationAccess: number;
}

interface CodeResponse {
  success: boolean;
  code?: string;
  message?: string;
}

@Component({
  selector: 'app-code-reception',
  templateUrl: './code-reception.component.html',
  styleUrls: ['./code-reception.component.css']
})
export class CodeReceptionComponent {

  email: string = '';
  code: string | undefined = '';
  loading: boolean = false;
  success: boolean = false;
  error: string = '';
  message: string = '';

  profiles: ProfileSaleSelection[] = [];
  selectedProfileId: number | undefined;
  selectedProfile: ProfileSaleSelection | undefined;
  otpDigits: string[] = ['', '', '', ''];
  pinValidated: boolean = false;
  profileLookupLoading: boolean = false;
  pinValidationLoading: boolean = false;
  validationMessage: string = '';
  activeDeviceWarning: string = '';
  private validationMessageTimeout: ReturnType<typeof setTimeout> | undefined;

  constructor(private codeService: CodeReceptionService, private profileSaleService: ProfileSaleService) { }

  /**
   * Busca los perfiles vinculados al email ingresado
   */
  fetchProfiles(): void {
    if (!this.email || this.profileLookupLoading) {
      return;
    }

    this.profileLookupLoading = true;
    this.error = '';
    this.success = false;
    this.code = '';
    this.profiles = [];
    this.selectedProfileId = undefined;
    this.selectedProfile = undefined;
    this.otpDigits = ['', '', '', ''];
    this.pinValidated = false;
    this.validationMessage = '';
    this.activeDeviceWarning = '';
    this.clearValidationTimeout();

    this.profileSaleService.getProfilesByEmail(this.email).subscribe({
      next: (profiles) => {
        this.profileLookupLoading = false;
        this.profiles = profiles;
        if (!profiles.length) {
          this.error = 'No se encontraron perfiles para este correo';
        }
      },
      error: (err) => {
        this.profileLookupLoading = false;
        this.error = typeof err === 'string' ? err : 'Error al buscar perfiles';
        console.error('Error fetching profiles:', err);
      }
    });
  }

  /**
   * Selecciona un perfil al hacer click en la tarjeta
   */
  selectProfile(profile: ProfileSaleSelection): void {
    this.selectedProfile = profile;
    this.selectedProfileId = profile.profileSaleId;
    this.otpDigits = ['', '', '', ''];
    this.pinValidated = false;
    this.validationMessage = '';
    this.activeDeviceWarning = '';
    this.error = '';
    this.message = '';
    this.clearValidationTimeout();
  }

  /**
   * Maneja el input de cada dígito OTP
   */
  onOtpInput(index: number, event: any): void {
    const value = event.target.value;
    
    // Solo permitir dígitos
    if (!/^[0-9]?$/.test(value)) {
      event.target.value = '';
      this.otpDigits[index] = '';
      return;
    }

    this.otpDigits[index] = value;

    // Mover al siguiente campo si hay valor
    if (value && index < 3) {
      const nextInput = document.querySelector(`input[data-otp-index="${index + 1}"]`) as HTMLInputElement;
      if (nextInput) {
        nextInput.focus();
      }
    }

    // Si el último dígito está lleno, validar automáticamente
    if (index === 3 && value) {
      this.validateOtp();
    }
  }

  /**
   * Maneja retroceso (backspace) para mover al campo anterior
   */
  onOtpKeydown(index: number, event: KeyboardEvent): void {
    if (event.key === 'Backspace' && !this.otpDigits[index] && index > 0) {
      const prevInput = document.querySelector(`input[data-otp-index="${index - 1}"]`) as HTMLInputElement;
      if (prevInput) {
        prevInput.focus();
        this.otpDigits[index - 1] = '';
      }
    }
  }

  /**
   * Valida el PIN completo
   */
  private validateOtp(): void {
    const pin = this.otpDigits.join('');
    
    if (pin.length !== 4 || !this.email || !this.selectedProfileId || this.pinValidationLoading) {
      return;
    }

    this.pinValidationLoading = true;
    this.error = '';
    this.validationMessage = '';
    this.activeDeviceWarning = '';

    this.profileSaleService.validateProfilePin(this.email, this.selectedProfileId, pin).subscribe({
      next: (response) => {
        this.pinValidationLoading = false;

        if (response.valid) {
          this.pinValidated = true;
          this.showValidationMessage('PIN validado correctamente. Ya puedes solicitar el código.');
          // this.activateProfileAccess();
        } else {
          this.pinValidated = false;
          this.validationMessage = '';
          this.error = response.message || 'PIN inválido';
          if (response.profileSaleValidationAccess === 1) {
            this.activeDeviceWarning = 'Este perfil ya está activo en otro dispositivo.';
          }
          // Limpiar OTP si está inválido
          this.otpDigits = ['', '', '', ''];
        }
      },
      error: (err) => {
        this.pinValidationLoading = false;
        this.error = typeof err === 'string' ? err : 'Error al validar el PIN';
        console.error('Error validating PIN:', err);
        this.otpDigits = ['', '', '', ''];
      }
    });
  }

  private showValidationMessage(message: string): void {
    this.validationMessage = message;
    this.clearValidationTimeout();
    this.validationMessageTimeout = setTimeout(() => {
      this.validationMessage = '';
      this.validationMessageTimeout = undefined;
    }, 5000);
  }

  private clearValidationTimeout(): void {
    if (this.validationMessageTimeout) {
      clearTimeout(this.validationMessageTimeout);
      this.validationMessageTimeout = undefined;
    }
  }

  /**
   * Activa el perfil en el backend una vez que el PIN fue validado
   */
  private activateProfileAccess(): void {
    if (!this.selectedProfileId) {
      return;
    }

    this.codeService.activateProfileSale(this.selectedProfileId).subscribe({
      next: () => {
        // Acceso activado, no se requiere acción adicional en el frontend
      },
      error: (err) => {
        console.error('Error activating profile access:', err);
      }
    });
  }

  /**
   * Solicita un código solo si el perfil fue validado previamente
   */
  getCode(): void {
    if (!this.email || !this.selectedProfileId || !this.pinValidated || this.loading) {
      this.error = 'Debes seleccionar un perfil y validar el PIN antes de solicitar el código.';
      return;
    }

    this.loading = true;
    this.success = false;
    this.error = '';
    this.code = '';

    this.codeService.getCode(this.email).subscribe({
      next: (response) => {
        this.loading = false;
        if (response.success && response.code) {
          this.success = true;
          this.code = response.code;
        } else {
          this.error = response.message || 'Error al obtener el código';
        }
      },
      error: (err) => {
        this.loading = false;
        this.error = 'Error de conexión. Intenta nuevamente.';
        console.error('Error getting code:', err);
      }
    });
  }

  /**
   * Copia el código al portapapeles
   */
  copyToClipboard(): void {
    if (this.code) {
      navigator.clipboard.writeText(this.code).then(() => {
        console.log('Código copiado al portapapeles');
      }).catch(err => {
        console.error('Error al copiar:', err);
      });
    }
  }

  /**
   * Reinicia el formulario para una nueva solicitud
   */
  reset(): void {
    this.email = '';
    this.code = '';
    this.loading = false;
    this.success = false;
    this.error = '';
    this.message = '';
    this.profiles = [];
    this.selectedProfileId = undefined;
    this.selectedProfile = undefined;
    this.otpDigits = ['', '', '', ''];
    this.pinValidated = false;
    this.validationMessage = '';
    this.activeDeviceWarning = '';
    this.profileLookupLoading = false;
    this.pinValidationLoading = false;
  }
}
