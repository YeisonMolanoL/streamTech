import { NgModule, importProvidersFrom } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { provideStorage } from '@angular/fire/storage';
import { NbDialogModule, NbIconModule, NbMenuModule, NbSidebarModule, NbThemeModule } from '@nebular/theme';
import { provideFirebaseApp } from '@angular/fire/app';
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { environment } from '../environments/environment';

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
    HttpClientModule,
    NbEvaIconsModule,
    NbIconModule
  ],
  providers: [
    provideClientHydration(),
    importProvidersFrom([
      provideFirebaseApp(() => 
          initializeApp({
              apiKey: environment.api_key,
              authDomain: environment.authDomain,
              databaseURL: environment.database_images,
              projectId: environment.project_id_images,
              storageBucket: environment.storage_bucket_images,
              messagingSenderId: environment.messaging_sender_id_images,
              appId: environment.appId_images,
              measurementId: environment.measurementId_images
          })
      ),
      provideStorage (() => getStorage())
  ])
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
