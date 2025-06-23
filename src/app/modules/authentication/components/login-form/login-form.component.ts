import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { UserService } from '../../core/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css' 
})
export class LoginFormComponent implements OnInit {
  errorMessage$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  loginForm!: FormGroup;
  isLoading: boolean = false;
  private userService = inject(UserService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  showPassword: boolean = true;

  ngOnInit(): void {
      this.initLoginform();
  }

  initLoginform() {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.userService.logIn(this.loginForm.value).subscribe({
        next: (data) => {
          this.isLoading = false;
          localStorage.setItem('data_user', JSON.stringify(data));
          this.router.navigate(['/principal/landing-sale']);
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage$.next(err.error.message || '¡Upsss...! Ha ocurrido un error inesperado.');
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
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
