import { Component, OnInit } from '@angular/core';
import { AccountTypeService } from '../../core/services/account-type.service';
import { AlertsService } from '../../core/services/alerts.service';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { Router, NavigationStart, Event as NavigationEvent } from '@angular/router';
import { CarService } from '../../core/services/car.service';

@Component({
  selector: 'app-landing-sale',
  templateUrl: './landing-sale.component.html',
  styleUrl: './landing-sale.component.css',
})
export class LandingSaleComponent implements OnInit {
  allPlatforms: any[] = [];
  comboSaleActive = false;
  profileSaleActive = false;
  private navigationSubscription?: Subscription;

  constructor(
    private alert: AlertsService,
    private platrformsService: AccountTypeService,
    private router: Router,
    private carService: CarService,
  ) {}

  ngOnInit() {
    this.loadAllPlatforms();
    this.handleBackButton();
  }

  loadAllPlatforms() {
    this.platrformsService.getAll().subscribe({
      next: (data) => {
        this.allPlatforms = data;
      },
      error: (err) => {
        this.alert.showWarning(err.error.message, 'Importante');
      },
    });
  }

  addPlattform(event: boolean) {
  }

  addSale() {
    Swal.fire({
      title: '¿Tus datos son correctos?',
      text: 'Recuerda que no podrás cambiar estos datos más adelante',
      html: `<h1><strong>Nombre:</strong> Yeison</h1><h1><strong>Pin:</strong> 1234</h1>`,
      confirmButtonText: 'Aceptar',
      showCancelButton: true,
      cancelButtonText: `Cambiar`
    });
  }

  handleBackButton() {
    this.navigationSubscription = this.router.events.subscribe((event: NavigationEvent) => {
      if (event instanceof NavigationStart && event.navigationTrigger === 'popstate') {
        // Acción cuando el usuario presiona el botón de "Atrás"
        Swal.fire({
          title: 'Estás saliendo',
          text: '¿Estás seguro que quieres salir?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Sí, salir',
          cancelButtonText: 'Cancelar',
        }).then((result) => {
          if (result.isConfirmed) {
            this.ngOnInit();
          } else {
            // Cancelar la navegación
            this.router.navigate([this.router.url]); // Redirige al mismo lugar para evitar el cambio
          }
        });
      }
    });
  }
}
