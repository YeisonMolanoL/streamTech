import { Component, Input, OnInit } from '@angular/core';
import { AccountService } from '../../core/services/account.service';
import { NbDialogRef, NbOverlayService } from '@nebular/theme';
import { ProfileSaleService } from '../../core/services/profile-sale.service';
import { AlertsService } from '../../core/services/alerts.service';

@Component({
  selector: 'app-edit-account-data-modal',
  templateUrl: './edit-account-data-modal.component.html',
  styleUrl: './edit-account-data-modal.component.css'
})
export class EditAccountDataModalComponent implements OnInit {
  @Input() profilesSalesList: any[] = [];
  @Input() accountType: any;
  @Input() account: any;
  auxNewAccount: any;
  availableAccounts = new Array<any>();

  constructor(protected dialogRef: NbDialogRef<EditAccountDataModalComponent>, private alert: AlertsService, private profileSaleService: ProfileSaleService, private accountService: AccountService, private overlayService: NbOverlayService){}

  ngOnInit(): void {
    this.getAvailableAccountsByAccountTypeWithAvailableProfiles();
  }

  getAvailableAccountsByAccountTypeWithAvailableProfiles(){
    this.accountService.getAccountsWithAvailableProfiles(this.accountType.accountTypeRecord.accountTypeId, 0, 100).subscribe({
      next: (data) => {
        this.availableAccounts = data.content.filter((account: any) => account.accountId !== this.account.accountId);
      },
      error: (err) => {

      }
    });
  }

  onSelectionAccount(account: any, profileSale: any){
    this.profileSaleService.updateByEmail(account, profileSale.profileSaleId).subscribe({
      next: (data) => {
      },
      error: (err) => {

      }
    });
  }

  onChange(){
  }

  inactiveAccount(){this.accountService.inactiveAccount(this.account.accountId).subscribe({
      next: (data) => {
        this.alert.showSuccess('Se ha inactivado la cuenta correctamente', '¡Exitoso!');
        this.closeDialog('restart');
      },
      error: (err) => {
        this.alert.showSuccess(err.error.message, '¡Importante!');
      }
    });
  }

  closeDialog(dataEvent: any) {
    this.dialogRef.close(dataEvent);
  }
}
