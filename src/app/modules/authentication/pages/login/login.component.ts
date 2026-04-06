import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css' ,
})
export class LoginComponent implements OnInit {
  isSignUpMode = false;
  errorMessage$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor() {}

  ngOnInit(): void {}

  toggleMode(isSignUp: boolean): void {
    this.isSignUpMode = isSignUp;
    this.errorMessage$.next('');
  }
}
