import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';
import { AccountManagementService, AccountResponseDto, AddEmailAccountRequestDto } from './account-management.service';

@Component({
  selector: 'app-account-management',
  templateUrl: './account-management.component.html',
  styleUrl: './account-management.component.css'
})
export class AccountManagementComponent implements OnInit {

  accounts: AccountResponseDto[] = [];
  loading = false;
  addForm: FormGroup;

  constructor(
    private accountService: AccountManagementService,
    private fb: FormBuilder,
    private dialogService: NbDialogService
  ) {
    this.addForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      host: ['', Validators.required],
      port: [993, Validators.required],
      secure: [true]
    });
  }

  ngOnInit(): void {
    this.loadAccounts();
  }

  loadAccounts(): void {
    this.loading = true;
    this.accountService.getAccounts().subscribe({
      next: (accounts) => {
        this.accounts = accounts;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading accounts', error);
        this.loading = false;
      }
    });
  }

  addAccount(): void {
    if (this.addForm.valid) {
      const account: AddEmailAccountRequestDto = this.addForm.value;
      this.accountService.addAccount(account).subscribe({
        next: () => {
          this.loadAccounts();
          this.addForm.reset({ port: 993, secure: true });
        },
        error: (error) => {
          console.error('Error adding account', error);
        }
      });
    }
  }

  toggleListening(account: AccountResponseDto): void {
    this.accountService.toggleListening(account.id).subscribe({
      next: () => {
        account.isImapActive = !account.isImapActive;
      },
      error: (error) => {
        console.error('Error toggling listening', error);
      }
    });
  }
}
