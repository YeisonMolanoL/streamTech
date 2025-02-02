import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AccountTypeService } from '../../../core/services/account-type.service';
import { AlertsService } from '../../../core/services/alerts.service';
import { ClientService } from '../../../core/services/client.service';
import { ComboSaleService } from '../../../core/services/combo-sale.service';
import { CreateClientComponent } from '../../../components/create-client/create-client.component';
import { CreateComboComponent } from '../../../components/create-combo/create-combo.component';
import { ComboModel } from '../../../core/models/Combo.model';

@Component({
  selector: 'app-sell-by-combo',
  templateUrl: './sell-by-combo.component.html',
  styleUrl: './sell-by-combo.component.css',
})
export class SellByComboComponent implements OnInit {
  isDropdownAccountTypeOpen: boolean = false;
  availableAccountsType = new Array<any>();
  comboAccountsType = new Array<any>();
  filteredAccounts = new Array<any>();
  filteredClients = new Array<any>();
  availableCombos = new Array<any>();
  modalConfirmation: boolean = false;
  isDropdownClientsOpen = false;
  newComboSaleForm!: FormGroup;
  isDropdownComboOpen = false;
  clients = new Array<any>();
  combos = new Array<any>();
  searchAccountType: any;
  clientDialog = false;
  selectedClient: any;
  newClientName: any;
  selectedCombo!: ComboModel;
  searchClient: any;

  constructor(
    private dialogRef: NbDialogService,
    private comboSaleService: ComboSaleService,
    private clientsService: ClientService,
    private alert: AlertsService,
    private accountTypeService: AccountTypeService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getAccountsType();
    this.getAllClients();
    this.getAllCombos();
  }

  initForm() {
    this.newComboSaleForm = this.fb.group({
      existingCombo: new FormControl(''),
      clientId: new FormControl('', Validators.required),
      profileSaleDueDate: new FormControl('', Validators.required),
      profileSalePurchaseDate: new FormControl('', Validators.required),
      comboName: new FormControl(''),
      profileSaleName: new FormControl('', Validators.required),
      profileSalePin: new FormControl('', Validators.required),
      comboAccountsType: new FormControl([], Validators.required),
      comboId: new FormControl('', Validators.required),
    });

    this.newComboSaleForm
      .get('profileSalePurchaseDate')
      ?.valueChanges.subscribe((value) => {
        if (value) {
          const purchaseDate = new Date(value);
          const dueDate = new Date(purchaseDate);
          dueDate.setDate(purchaseDate.getDate() + 30);
          this.newComboSaleForm
            .get('profileSaleDueDate')
            ?.setValue(dueDate.toISOString().split('T')[0]);
        }
      });
  }

  getAllCombos() {
    this.comboSaleService.getAllCombos().subscribe({
      next: (data) => {
        this.combos = data;
      },
      error: (err) => {
        this.alert.showWarning(err.error.message, '¡Importante!');
      },
    });
  }

  getAccountsType() {
    this.accountTypeService.getAllAvailableProfile().subscribe({
      next: (data) => {
        this.availableAccountsType = data;
      },
      error: (err) => {
        this.alert.showWarning(err.error.message, '¡Importante!');
      },
    });
  }

  getAllClients() {
    this.clientsService.getAll().subscribe({
      next: (data) => {
        this.clients = data;
        this.filteredClients = this.clients;
      },
      error: (err) => {
        this.alert.showWarning(err.error.message, '¡Importante!');
      },
    });
  }

  selectCombo(combo: any) {
    this.selectedCombo = combo;
    this.newComboSaleForm.get('comboId')?.setValue(this.selectedCombo.comboId);
  }

  toggleDropdownAccountType() {
    this.isDropdownAccountTypeOpen = !this.isDropdownAccountTypeOpen;
  }

  toggleDropdownClients() {
    this.isDropdownClientsOpen = !this.isDropdownClientsOpen;
  }

  filterClient(event: any) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.filteredClients = this.clients.filter((client) =>
      client.clientName.toLowerCase().includes(inputValue.toLowerCase())
    );
  }

  filterCombo(event: any) {}

  selectClient(option: any) {
    this.selectedClient = option;
    this.isDropdownClientsOpen = false;
    this.newComboSaleForm
      .get('clientId')
      ?.setValue(this.selectedClient.clientId);
  }

  createNewComboSale() {
    this.comboSaleService.newComboSale(this.newComboSaleForm.value).subscribe({
      next: (data) => {
        this.ngOnInit();
        this.comboAccountsType = [];
        this.modalConfirmation = false;
        this.newComboSaleForm.reset();
        this.alert.showSuccess(
          'Se ha creado la venta correctamente',
          '¡Validado!'
        );
      },
      error: (err) => {
        this.alert.showError(err.error.message, '¡Importante!');
      },
    });
  }

  toggleCard(accountType: any) {
    const index = this.comboAccountsType.indexOf(accountType.accountTypeId);
    if (index === -1) {
      this.comboAccountsType.push(accountType.accountTypeId);
      accountType.isSelected = true;
    } else {
      this.comboAccountsType.splice(index, 1);
      accountType.isSelected = false;
    }
    this.newComboSaleForm
      .get('comboAccountsType')
      ?.setValue(this.comboAccountsType);
  }

  openDialogNewClient() {
    const dialogRef = this.dialogRef.open(CreateClientComponent, {});
  }

  openDialogNewCombo() {
    this.dialogRef
      .open(CreateComboComponent, {})
      .onClose.subscribe((result) => {
        this.selectCombo(result);
      });
  }

  closeModal(): void {
    const modal = document.getElementById('modalNewClient');
    modal?.classList.remove('show');
    modal?.setAttribute('aria-hidden', 'true');
    modal?.setAttribute('style', 'display: none');

    const modalBackdrop = document.getElementsByClassName('modal-backdrop')[0];
    modalBackdrop.parentNode?.removeChild(modalBackdrop);
  }
}
