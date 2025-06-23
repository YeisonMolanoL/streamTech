import { NgModule, importProvidersFrom } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { provideStorage } from '@angular/fire/storage';
import { NbDatepickerModule, NbDialogModule, NbIconModule, NbMenuModule, NbSidebarModule, NbThemeModule, NbToastrModule, NbToastrService } from '@nebular/theme';
import { provideFirebaseApp } from '@angular/fire/app';
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AuthInterceptor } from './modules/authentication/interceptors/auth.interceptor';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ManagementModule } from './modules/management/management.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { CarProductsComponent } from './modules/shopping-cart/components/car-products/car-products.component';
import { ShoppingCartModule } from './modules/shopping-cart/shopping-cart.module';

@NgModule({ declarations: [
        AppComponent,
    ],
    exports: [],
    bootstrap: [AppComponent], imports: [
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
        ManagementModule,
        InventoryModule,
        ShoppingCartModule,
        NbEvaIconsModule,
        NbIconModule,
        SweetAlert2Module.forRoot()], providers: [
        CarProductsComponent,
        provideClientHydration(),
        importProvidersFrom([
            provideFirebaseApp(() => initializeApp({
                apiKey: "AIzaSyDHZhNw6drFgQf3bgF7vkapOxeded80HgQ",
                authDomain: "listado-personas-d417f.firebaseapp.com",
                databaseURL: "https://listado-personas-d417f-default-rtdb.firebaseio.com",
                projectId: "listado-personas-d417f",
                storageBucket: "listado-personas-d417f.appspot.com",
                messagingSenderId: "573061027074",
                appId: "1:573061027074:web:19fb42cc9dd431ad7b9e1b",
                measurementId: "G-5SHD59VGKC"
            })),
            provideStorage(() => getStorage())
        ]), NbToastrService,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule { }
