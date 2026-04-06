import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { CodeReceptionRoutingModule } from './code-reception-routing.module';
import { CodeReceptionComponent } from './components/code-reception.component';

/**
 * Módulo para recepción de códigos por correo
 */
@NgModule({
  declarations: [
    CodeReceptionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    CodeReceptionRoutingModule
  ],
  exports: [
    CodeReceptionComponent
  ]
})
export class CodeReceptionModule { }
