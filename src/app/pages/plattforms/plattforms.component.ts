import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AccountService } from '../../core/services/account.service';
import { AccountTypeService } from '../../core/services/account-type.service';
import { ref, uploadBytesResumable, Storage } from '@angular/fire/storage';
import { getDownloadURL } from 'firebase/storage';

@Component({
  selector: 'app-plattforms',
  templateUrl: './plattforms.component.html',
  styleUrl: './plattforms.component.css'
})
export class PlattformsComponent implements OnInit{
  accounts: Array<any> = [];
  accountsType: Array<any> = [];
  newAccountTypeForm!: FormGroup;
  uploadProgress$!: Observable<number>;
  downloadUrl$!: Observable<string>;
  imageSelected = false;
  fileSelected: File | null = null;

  private storage: Storage = inject(Storage);

  constructor(private fb: FormBuilder, private accountService: AccountService, private accountTypeService: AccountTypeService){

  }

  ngOnInit(){
    this.initForm();
    this.getAllAccountsType();
    this.getAllAccounts();
  }

  initForm(){
    this.newAccountTypeForm = this.fb.group({
      accountTypeName: ['', Validators.required],
      accountTypeAmountProfile: ['', [Validators.required, Validators.pattern(/^[1-9]$/)]],
      accountTypeStatus: [false],
      accountTypeIcon: ['']
    });
  }

  getAllAccounts(){
    this.accountService.getAll().subscribe({
      next: (data) => {
        this.accounts = data;
      },
      error: (err) => {
        console.log('Ha ocurrido un error en el servidor', err.error);
        
      },
    });
  }

  getAllAccountsType(){
    this.accountTypeService.getAllTotalAccounts().subscribe({
      next: (data) => {
        this.accountsType = data;
      },
      error: (err) => {
        console.log('Ha ocurrido un error en el servidor', err.error);
        
      },
    });
  }

  async createAccountType(){
    if(this.newAccountTypeForm.valid){
      let selectedFile: File | null = null;;
      if(this.fileSelected != null){
        selectedFile = this.fileSelected;
      }
      if(selectedFile != null){
        try {
          const url = await this.uploadFile(selectedFile);
          this.newAccountTypeForm.get('accountTypeIcon')?.setValue(url);
          this.accountTypeService.newAccountType(this.newAccountTypeForm.value).subscribe({
            next: (data) => {
              this.newAccountTypeForm.reset();
              this.getAllAccountsType();
              this.closeModal();
              console.log('Se ha añadido la nueva plataforma correctamente');
              
            },
            error: (err) => {
              console.log('Ha habido un error al inserta la nueva plataforma')
            }
          })
      } catch (error) {
          console.log('Error al subir el archivo: ', error);
      }
      }
    }else{
      console.log('Tiene que llenar el formulario bien ¡IDIOTA!');
      
    }
  }

  onFileSelected(event: any) {
    this.fileSelected = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
        const imagePreviewContainer = document.getElementById('imagePreviewContainer');
        const imagePreview = document.getElementById('imagePreview') as HTMLImageElement;
        const removeImageButton = document.getElementById('removeImageButton');
        
        if (imagePreviewContainer && imagePreview && removeImageButton) {
            imagePreview.src = reader.result as string;
            imagePreviewContainer.style.display = 'block';
            removeImageButton.addEventListener('click', () => {
                imagePreview.src = '';
                imagePreviewContainer.style.display = 'none';
                const fileInput = document.getElementById('fileUpload') as HTMLInputElement;
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

        uploadTask.on('state_changed',
            (snapshot) => {
            },
            (error) => {
                console.log('Error al cargar el archivo: ', error);
                reject(error);
            },
            async () => {
                console.log("El archivo se subió exitosamente");
                try {
                    const url = await getDownloadURL(fileRef);
                    console.log("Url del archivo: ", url);
                    resolve(url);
                } catch (error) {
                    console.log('Error al obtener la URL del archivo: ', error);
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
}
