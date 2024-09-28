import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbButtonModule, NbCardModule, NbDatepickerModule, NbIconModule, NbInputModule, NbListModule, NbSelectModule } from '@nebular/theme';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NbSelectModule,
    NbIconModule,
    NbButtonModule,
    NbInputModule,
    NbDatepickerModule,
    NbListModule,
    NbCardModule
  ],
  exports: [NbSelectModule, NbIconModule, NbButtonModule, NbInputModule, NbDatepickerModule, NbListModule, NbCardModule]
})
export class NebularComponentsModule { }
