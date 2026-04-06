// EJEMPLO: Cómo integrar CodeReceptionModule en tu app.module.ts

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// ✅ Importar el módulo de recepción de códigos
import { CodeReceptionModule } from './modules/code-reception/code-reception.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    
    // ✅ Agregar aquí
    CodeReceptionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
