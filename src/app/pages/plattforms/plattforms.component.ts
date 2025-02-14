import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AccountService } from '../../core/services/account.service';
import { AccountTypeService } from '../../core/services/account-type.service';
import { ref, uploadBytesResumable, Storage } from '@angular/fire/storage';
import { getDownloadURL } from 'firebase/storage';
import { AlertsService } from '../../core/services/alerts.service';

@Component({
  selector: 'app-plattforms',
  templateUrl: './plattforms.component.html',
  styleUrl: './plattforms.component.css',
})
export class PlattformsComponent implements OnInit {
  accounts: Array<any> = [];
  accountsType: Array<any> = [];
  newAccountTypeForm!: FormGroup;
  uploadProgress$!: Observable<number>;
  downloadUrl$!: Observable<string>;
  imageSelected = false;
  fileSelected: File | null = null;
  modalConfirmation: boolean = false;
  modal1 = false;

  private storage: Storage = inject(Storage);

  constructor(
    private alert: AlertsService,
    private fb: FormBuilder,
    private accountService: AccountService,
    private accountTypeService: AccountTypeService
  ) {}

  ngOnInit() {
    this.initForm();
    this.getAllAccountsType();
  }

  initForm() {
    this.newAccountTypeForm = this.fb.group({
      accountTypeName: ['', Validators.required],
      accountTypeAmountProfile: [
        '',
        [Validators.required, Validators.pattern(/^[1-9]$/)],
      ],
      accountTypeStatus: [true],
      accountTypeIcon: [''],
      price: ['', [Validators.required]],
      profile_price: ['', [Validators.required]],
    });
  }

  getAllAccountsType() {
    this.accountTypeService.getAllTotalAccounts().subscribe({
      next: (data) => {
        this.accountsType = data;
      },
      error: (err) => {
        this.alert.showWarning(err.error.message, 'Importante');
      },
    });
  }

  async createAccountType() {
    if (this.newAccountTypeForm.valid) {
      this.modalConfirmation = false;
      let selectedFile: File | null = null;
      if (this.fileSelected != null) {
        selectedFile = this.fileSelected;
      }
      if (selectedFile != null) {
        try {
          const url = await this.uploadFile(selectedFile);
          this.newAccountTypeForm.get('accountTypeIcon')?.setValue(url);
          this.accountTypeService
            .newAccountType(this.newAccountTypeForm.value)
            .subscribe({
              next: (data) => {
                this.newAccountTypeForm.reset();
                this.getAllAccountsType();
                this.closeModal();
                this.alert.showSuccess(
                  'Se ha añadido la nueva plataforma correctamente',
                  '¡Validado!'
                );
              },
              error: (err) => {
                this.alert.showWarning(err.error.message, 'Importante');
              },
            });
        } catch (error) {
          this.alert.showError(
            'Error al subir el archivo: ' + error + '',
            'Importante'
          );
        }
      }
    } else {
      this.alert.showWarning(
        'Tiene que llenar el formulario bien ¡IDIOTA!',
        'Importante'
      );
    }
  }

  onFileSelected(event: any) {
    this.fileSelected = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const imagePreviewContainer = document.getElementById(
        'imagePreviewContainer'
      );
      const imagePreview = document.getElementById(
        'imagePreview'
      ) as HTMLImageElement;
      const removeImageButton = document.getElementById('removeImageButton');

      if (imagePreviewContainer && imagePreview && removeImageButton) {
        imagePreview.src = reader.result as string;
        imagePreviewContainer.style.display = 'block';
        removeImageButton.addEventListener('click', () => {
          imagePreview.src = '';
          imagePreviewContainer.style.display = 'none';
          const fileInput = document.getElementById(
            'fileUpload'
          ) as HTMLInputElement;
          if (fileInput) {
            fileInput.value = '';
          }
        });
      }
    };
    reader.readAsDataURL(this.fileSelected!);
    this.imageSelected = true;
  }

  async uploadFile(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const filePath = `fileStreamTech/${file.name}`;
      const fileRef = ref(this.storage, filePath);
      const uploadTask = uploadBytesResumable(fileRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {},
        (error) => {
          this.alert.showError(
            'Error al subir el archivo: ' + error,
            'Importante'
          );
          reject(error);
        },
        async () => {
          try {
            const url = await getDownloadURL(fileRef);
            resolve(url);
          } catch (error) {
            this.alert.showError(
              'Error al obtener la URL del archivo: ' + error + '',
              'Importante'
            );
            reject(error);
          }
        }
      );
    });
  }

  removeImage() {
    this.imageSelected = false;
    document.getElementById('imagePreview')?.setAttribute('src', '');
    (<HTMLInputElement>document.getElementById('fileUpload')).value = '';
  }

  closeModal(): void {
    const modal = document.getElementById('staticBackdrop');
    modal?.classList.remove('show');
    modal?.setAttribute('aria-hidden', 'true');
    modal?.setAttribute('style', 'display: none');

    const modalBackdrop = document.getElementsByClassName('modal-backdrop')[0];
    modalBackdrop.parentNode?.removeChild(modalBackdrop);
    this.imageSelected = false;
  }

  openConfirmation() {
    this.modalConfirmation = true;
  }
}
