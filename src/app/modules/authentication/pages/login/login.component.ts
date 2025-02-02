import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../core/services/user.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  isSignUpMode = false; // Estado para alternar entre login y registro
  loginForm!: FormGroup;
  signupForm!: FormGroup;
  errorMessage$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
      this.initLoginform();
      this.initSignUpForm();
  }

  initLoginform(){
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  initSignUpForm(){
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', Validators.required],
      userName: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  // Cambiar el modo de formulario
  toggleMode(isSignUp: boolean): void {
    this.isSignUpMode = isSignUp;
    this.errorMessage$.next('');
  }

  // Manejo del formulario de login
  onLogin(): void {
    if (this.loginForm.valid) {
      this.userService.logIn(this.loginForm.value).subscribe({
        next: (data) => {
          this.router.navigate(['/principal/landing-sale']);
        },
        error: (err) => {
          this.errorMessage$.next(err.error.message || '¡Upsss...! Ha ocurrido un error inesperado.');
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  // Manejo del formulario de registro
  onSignup(): void {
    if (this.signupForm.valid) {
      this.userService.insertUser(this.signupForm.value).subscribe({
        next: (data) => {
          this.router.navigate(['/principal/landing-sale']);
        },
        error: (err) => {
          this.errorMessage$.next(err.error.message || '¡Upsss...! Ha ocurrido un error inesperado.');
        }
      });
    } else {
      this.signupForm.markAllAsTouched();
    }
  }
}
