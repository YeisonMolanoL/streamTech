import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NbButtonModule,
  NbCardModule,
  NbContextMenuModule,
  NbDatepickerModule,
  NbIconModule,
  NbInputModule,
  NbListModule,
  NbPopoverModule,
  NbSelectModule,
  NbTooltipModule,
} from '@nebular/theme';

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
    NbCardModule,
    NbContextMenuModule,
    NbPopoverModule,
    NbTooltipModule,
  ],
  exports: [
    NbSelectModule,
    NbIconModule,
    NbButtonModule,
    NbInputModule,
    NbDatepickerModule,
    NbListModule,
    NbCardModule,
    NbContextMenuModule,
    NbPopoverModule,
    NbTooltipModule,
  ],
})
export class NebularComponentsModule {}
