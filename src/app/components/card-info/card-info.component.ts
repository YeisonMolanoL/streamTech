import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-info',
  templateUrl: './card-info.component.html',
  styleUrl: './card-info.component.css'
})
export class CardInfoComponent {
@Input() icon = '';
@Input() accountId = '';
@Input() email = '';
@Input() password = '';
@Input() statusAcount = '';
@Input() statusSale = '';
@Input() dueDate = '';
@Input() purchaseDate = '';
@Input() availableProfiles = '';
@Input() accountTypeRecord = '';
@Input() name = '';
@Input() totalAccounts = 0;
@Input() object: any = '';
}
