import { ConnectionChatService } from './../../../../core/services/connection-chat.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ProfileSaleService } from '../../../../core/services/profile-sale.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AlertsService } from '../../../../core/services/alerts.service';
import Swal from 'sweetalert2';
import { NbDialogService } from '@nebular/theme';
import { MessagesToSendComponent } from '../../../../components/messages-to-send/messages-to-send.component';
import { MessageRequestModel } from '../../../../core/models/MessageRequest.model';

@Component({
  selector: 'app-sell-profile-list',
  templateUrl: './sell-profile-list.component.html',
  styleUrl: './sell-profile-list.component.css',
})
export class SellProfileListComponent implements OnInit {
  @Input() saleList: any[] = [];
  @Output() saleListCleared = new EventEmitter<void>();
  dialogConfirmation: boolean = false;
  dataEditControl = false;
  profileEdit: any;
  profileDataForm!: FormGroup;
  selectedObjectIndex: number | null = null;
  salesProfileList: any = [];
  messageSalesProfileList = new MessageRequestModel();

  constructor(
    private dialogService: NbDialogService,
    private connectionService: ConnectionChatService,
    private alert: AlertsService,
    private fb: FormBuilder,
    private profileSaleService: ProfileSaleService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.profileDataForm = this.fb.group({
      accountType: new FormControl('', Validators.required),
      profileSaleName: new FormControl('', Validators.required),
      profileSalePin: new FormControl('', Validators.required),
      profileSaleDueDate: new FormControl('', Validators.required),
      profileSalePurchaseDate: new FormControl('', Validators.required),
      accountId: new FormControl(''),
      clientId: new FormControl('', Validators.required),
    });

    this.profileDataForm
      .get('profileSalePurchaseDate')
      ?.valueChanges.subscribe((value) => {
        if (value) {
          const purchaseDate = new Date(value);
          const dueDate = new Date(purchaseDate);
          dueDate.setDate(purchaseDate.getDate() + 30);
          this.profileDataForm
            .get('profileSaleDueDate')
            ?.setValue(dueDate.toISOString().split('T')[0]);
        }
      });
  }

  makeSale() {
    Swal.fire({
      title: '¡Importante!',
      text: '¿Deseas enviar enviar mensajes adjuntos a tus clientes?',
      icon: 'success',
      confirmButtonText: 'Aceptar',
      showDenyButton: true,
      denyButtonText: 'No, continuar.',
    }).then((result) => {
      if (result.isConfirmed) {
        this.salesProfileList = this.saleList;
        this.openDialogMessagesToSend();
      }
      if (result.isDenied) {
        this.salesProfileList = this.saleList;
        this.messageSalesProfileList.sellByProfileRequests = [];
        this.sendSale();
      }
    });
  }

  deleteProfile(profile: any) {
    const index = this.saleList.indexOf(profile);
    if (index > -1) {
      this.saleList.splice(index, 1);
    }
  }

  editDataDialogControl() {
    this.dataEditControl = !this.dataEditControl;
  }

  openEditModal(index: number) {
    this.selectedObjectIndex = index;
    const object = this.saleList[index];
    this.profileDataForm.patchValue(object);
  }

  saveChanges() {
    if (this.selectedObjectIndex !== null) {
      this.saleList[this.selectedObjectIndex] = this.profileDataForm.value;
      this.selectedObjectIndex = null;

      this.profileDataForm.reset();
      this.closeModal();
    }
  }

  closeModal(): void {
    const modal = document.getElementById('modalEditProfile');
    modal?.classList.remove('show');
    modal?.setAttribute('aria-hidden', 'true');
    modal?.setAttribute('style', 'display: none');

    const modalBackdrop = document.getElementsByClassName('modal-backdrop')[0];
    modalBackdrop.parentNode?.removeChild(modalBackdrop);
  }

  openDialogMessagesToSend() {
    const dialogRef = this.dialogService.open(MessagesToSendComponent, {});
    dialogRef.onClose.subscribe((data) => {
      if (data) {
        this.messageSalesProfileList.message = data.message;
        this.messageSalesProfileList.vars = data.vars;
        this.sendSale();
      }
    });
  }

  sendSale() {
    this.profileSaleService.newProfileSale(this.salesProfileList).subscribe({
      next: (data) => {
        this.saleList = [];
        this.ngOnInit();
        this.saleListCleared.emit();
        this.dialogConfirmation = false;
        this.alert.showSuccess(
          'Se ha realizado la venta correctamente',
          '¡Validado!'
        );
        this.messageSalesProfileList.sellByProfileRequests = data;
        this.connectionService.sendMessagesInSale(this.messageSalesProfileList).subscribe({
            next: (data) => {
              this.alert.showSuccess(
                'Se ha realizado el envío de mensajes correctamente',
                '¡Validado!'
              );
            },
            error: (err) => {
              this.alert.showSuccess(
                err.error.message,
                'Importante!'
              );
            },
          });
      },
      error: (err) => {
        this.dialogConfirmation = false;
        this.alert.showError(err.error.message, 'Importante');
      },
    });
  }
}
