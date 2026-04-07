import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { AlertsService } from '../../core/services/alerts.service';
import { ClientService } from '../../core/services/client.service';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrl: './create-client.component.css' 
})
export class CreateClientComponent implements OnInit{
  @Output() modalClose: EventEmitter<any> = new EventEmitter<any>();
  filteredClients = new Array<any>();
  clients = new Array<any>();
  clientForm!: FormGroup;
  isLoading: boolean = false;

  constructor(public dialogRef: NbDialogRef<CreateClientComponent>, private fb: FormBuilder, private alert: AlertsService, private clientsService: ClientService){}

  ngOnInit(): void {
    this.getAllClients();
    this.initClientForm();
  }

  initClientForm(){
    this.clientForm = this.fb.group({
      clientName: new FormControl ('', Validators.required),
      clientNumber: new FormControl ('', Validators.required),
    });
  }

  createClient(){
    if (this.clientForm.invalid) {
      this.clientForm.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    this.clientsService.newClient(this.clientForm.value).subscribe({
      next: (data) => {
        this.isLoading = false;
        this.getAllClients();
        this.alert.showSuccess('¡Se ha creado el nuevo cliente correctamente!', '¡Validado!');
        this.modalClose.emit();
        this.dialogRef.close({ response: true });
      },
      error: (err) => {
        this.isLoading = false;
        this.alert.showError(err.error.message, 'Error inesperado')
      }
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
      }
    });
  }
}
