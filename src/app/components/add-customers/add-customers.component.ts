import { NB_DIALOG_CONFIG, NbDialogRef, NbDialogService } from '@nebular/theme';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ClientService } from '../../core/services/client.service';
import { AlertsService } from '../../core/services/alerts.service';
import { CreateClientComponent } from '../create-client/create-client.component';

@Component({
  selector: 'app-add-customers',
  templateUrl: './add-customers.component.html',
  styleUrl: './add-customers.component.css'
})
export class AddCustomersComponent implements OnInit {
  customers = new Array<any>();
  profiles = new Array<any>();
  profilesForm!: FormGroup;
  public _accountType: any;

  get accountType() {
    return this.config.context.accountType;
  }

  set accountType(value: any) {
    this._accountType = value;
  }

  constructor(private dialogService: NbDialogService, @Inject(NB_DIALOG_CONFIG) private config: any, private dialogRef: NbDialogRef<AddCustomersComponent>, private fb: FormBuilder, private customerService: ClientService, private alert: AlertsService){}

  ngOnInit(): void {
    this.initprofilesForm();
    this.getAllCustomers();
  }

  initprofilesForm(){
    this.profilesForm = this.fb.group({
      profileSaleDueDate: new FormControl('', [Validators.required]),
      profileSalePurchaseDate: new FormControl('', [Validators.required]),
      profile: new FormControl('', [Validators.required]),
      pin: new FormControl('', [Validators.required]),
      clientId: new FormControl('')
    });

    this.profilesForm.get('profileSalePurchaseDate')?.valueChanges.subscribe((value) => {
      if (value) {
        const purchaseDate = new Date(value);
        const dueDate = new Date(purchaseDate);
        dueDate.setDate(purchaseDate.getDate() + 30);
        this.profilesForm.get('profileSalePurchaseDate')?.setValue(purchaseDate.toISOString().split('T')[0], { emitEvent: false });
        this.profilesForm.get('profileSaleDueDate')?.setValue(dueDate.toISOString().split('T')[0]);
      }
    });
  }

  getAllCustomers(){
    this.customerService.getAll().subscribe({
      next: (data) => {
        this.customers = data;
      },
      error: (err) => {
        this.alert.showWarning('No se han cargado los clientes correctamente', 'Importante');
      }
    })
  }

  createClient(){
    this.customerService.newClient(this.profilesForm.value).subscribe({
      next: (data) => {
        this.getAllCustomers();
        this.alert.showSuccess('¡Se ha creado el nuevo cliente correctamente!', '¡Validado!')
      },
      error: (err) => {
        this.alert.showError(err.error.message, 'Error inesperado')
      }
    });
  }

  closeModal(){
    this.dialogRef.close(this.profiles);
  }

  addProfile(){
    let profile = {
      accountTypeName: this._accountType.accountTypeRecord.accountTypeName,
      clientId: this.profilesForm.get('clientId')?.value,
      profileSaleDueDate: this.profilesForm.get('profileSaleDueDate')?.value,
      profileSaleName: this.profilesForm.get('profile')?.value,
      profileSalePin: this.profilesForm.get('pin')?.value,
      profileSalePurchaseDate: this.profilesForm.get('profileSalePurchaseDate')?.value,
    }
    this.profiles.push(profile);
    this.profilesForm.reset()
  }

  openDialogCreateCustomer(){
    const dialogRef = this.dialogService.open(CreateClientComponent);
    dialogRef.onClose.subscribe((data: any) => {
      if (data) {
        if(data?.response){
          this.getAllCustomers();
        }
      } else {
      }
    });
  }
}
