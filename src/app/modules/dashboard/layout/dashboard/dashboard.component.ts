import { Component } from '@angular/core';
import { NbDialogService, NbMenuService } from '@nebular/theme';
import { MenuItem } from '../../core/models/MenuItem.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  menu: MenuItem[] = [];

  constructor(
    private menuService: NbMenuService
  ) {}

  ngOnInit(): void {
    this.menuService.addItems(
      [
        {
          title: 'Home',
          icon: 'home',
          link: '/principal/landing-sale',
          home: true,
        },
        {
          title: 'Conexión',
          icon: 'message-square-outline',
          link: 'conection',
        },
        {
          title: 'Inventario',
          group: true,
        },
        {
          title: 'Plataformas disponibles',
          icon: 'home',
          link: '/principal/plataformas',
        },
        {
          title: 'Cuentas',
          icon: 'search-outline',
          children: [
            {
              title: 'Administrar cuentas',
              icon: 'maximize-outline',
              link: '/principal/cuentas/administracion',
            },
          ],
        },
        {
          title: 'Administración',
          group: true,
        },
        {
          title: 'Venta',
          icon: 'maximize-outline',
          children: [
            {
              title: 'Venta cuentas',
              icon: 'maximize-outline',
              link: '/principal/venta/cuentas',
            },
            {
              title: 'Venta pantallas',
              icon: 'maximize-outline',
              link: '/principal/venta/pantallas',
            },
            {
              title: 'Combos',
              icon: 'maximize-outline',
              link: '/principal/venta/combos',
            },
          ],
        },
      ],
      'menu'
    );
  }

  ngAfterViewInit(): void {
    this.menuService.onItemClick().subscribe((data) => {
      if (data.item.link === undefined) {
      } else if (data.item.link === '') {
      }
    });
  }

  toggle() {
    return true;
  }
}
