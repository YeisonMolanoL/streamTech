import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NebularComponentsModule } from './nebular-components/nebular-components.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NebularComponentsModule
  ],
  exports: [NebularComponentsModule]
})
export class SharedModule { }
