import { ComboSaleService } from './../../core/services/combo-sale.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-create-combo',
  templateUrl: './create-combo.component.html',
  styleUrl: './create-combo.component.css'
})
export class CreateComboComponent implements OnInit {
  newComboForm!: FormGroup;

  constructor(private dialogRef: NbDialogRef<CreateComboComponent>, private fb: FormBuilder, private comboSaleService: ComboSaleService){}

  ngOnInit(): void {
    this.initFormNewCombo();
  }

  initFormNewCombo(){
    this.newComboForm = this.fb.group({
      comboId: new FormControl (''),
      comboName: new FormControl('', Validators.required)
    });
  }

  saveNewCombo(){
    this.comboSaleService.insertCombo(this.newComboForm.value).subscribe({
      next: (newCombo) => {
        this.dialogRef.close(newCombo);
      },
      error: (err) => {
        console.error('err.error.message :>> ', err.error.message);
      }
    });
  }

  test(){
  }
}
