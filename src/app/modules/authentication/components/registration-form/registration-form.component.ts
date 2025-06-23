import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { UserService } from '../../core/services/user.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

export const passwordMatchValidator: ValidatorFn = (form: AbstractControl): ValidationErrors | null => {
  const password = form.get('password')?.value;
  const confirmPassword = form.get('confirmPassword')?.value;

  return password === confirmPassword ? null : { passwordMismatch: true };
};

@Component({
  selector: 'registration-form',
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.css' 
})
export class RegistrationFormComponent implements OnInit {
  errorMessage$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  signupForm!: FormGroup;
  isLoading: boolean = false;
  private userService = inject(UserService);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  showPassword: boolean = false;

  ngOnInit(): void {
      this.initSignUpForm();
  }

  initSignUpForm() {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', Validators.required],
      userName: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
      roles: ['USER'],
    }, { validators: passwordMatchValidator });
  }

  onSignup(): void {
    if (this.signupForm.valid) {
      this.isLoading = true;
      this.userService.insertUser(this.signupForm.value).subscribe({
        next: (data) => {
          this.isLoading = false;
          this.router.navigate(['/principal/landing-sale']);
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage$.next(
            err.error.message || '¡Upsss...! Ha ocurrido un error inesperado.'
          );
        },
      });
    } else {
      this.signupForm.markAllAsTouched();
    }
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  getInputType() {
    if (this.showPassword) {
      return 'text';
    }
    return 'password';
  }
}
