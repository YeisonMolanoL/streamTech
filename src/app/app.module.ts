import { NgModule, importProvidersFrom } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { provideStorage } from '@angular/fire/storage';
import { NbDatepickerModule, NbDialogModule, NbIconModule, NbMenuModule, NbSidebarModule, NbThemeModule, NbToastrModule, NbToastrService } from '@nebular/theme';
import { provideFirebaseApp } from '@angular/fire/app';
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { CarProductsComponent } from './components/car-products/car-products.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NbThemeModule.forRoot(),
    NbMenuModule.forRoot(),
    NbSidebarModule.forRoot(),
    NbDialogModule.forRoot(),
    NbToastrModule.forRoot(),
    NbDatepickerModule.forRoot(),
    HttpClientModule,
    NbEvaIconsModule,
    NbIconModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [
    CarProductsComponent,
    provideClientHydration(),
    importProvidersFrom([
      provideFirebaseApp(() => 
          initializeApp({
            apiKey: "AIzaSyDHZhNw6drFgQf3bgF7vkapOxeded80HgQ",
            authDomain: "listado-personas-d417f.firebaseapp.com",
            databaseURL: "https://listado-personas-d417f-default-rtdb.firebaseio.com",
            projectId: "listado-personas-d417f",
            storageBucket: "listado-personas-d417f.appspot.com",
            messagingSenderId: "573061027074",
            appId: "1:573061027074:web:19fb42cc9dd431ad7b9e1b",
            measurementId: "G-5SHD59VGKC"
          })
      ),
      provideStorage (() => getStorage())
  ]), NbToastrService
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
