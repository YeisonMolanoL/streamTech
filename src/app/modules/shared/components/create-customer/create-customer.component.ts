import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Modal } from 'bootstrap';
import { ClientService } from '../../../../core/services/client.service';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrl: './create-customer.component.css',
})
export class CreateCustomerComponent implements AfterViewInit {
  @ViewChild('modalElement') modalElementRef!: ElementRef;
  @ViewChild('clientNameInput') clientNameInput!: ElementRef;
  private modalInstance!: Modal;
  clientsService = inject(ClientService);

  @Output() onCreate = new EventEmitter<{ clientId: number, clientName: string; clientNumber: string } | null>();
  @Input() loading = false;

  clientForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.clientForm = this.fb.group({
      clientName: ['', Validators.required],
      clientNumber: ['', Validators.required],
    });
  }

  ngAfterViewInit() {
    this.modalInstance = new Modal(this.modalElementRef.nativeElement, {
      backdrop: 'static',
      keyboard: false,
    });
  }

  open() {
    this.modalInstance.show();
    setTimeout(() => {
      this.clientNameInput?.nativeElement?.focus();
    }, 500);
  }

  close() {
    this.modalInstance.hide();
  }

  createClient(){
    if (this.clientForm.valid) {
      this.clientsService.newClient(this.clientForm.value).subscribe({
        next: (data) => {
          const { clientName, clientNumber } = this.clientForm.value;
          this.onCreate.emit({ clientId: data.body, clientName: clientName, clientNumber: clientNumber });
          this.close();
          this.clientForm.reset();
          this.clientForm.markAsPristine();
        },
        error: (err) => {
          this.onCreate.emit(null);
        }
      });
      } else {
      this.clientForm.markAllAsTouched();
    }
  }
}
