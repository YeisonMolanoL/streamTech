import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NbDialogService, NbMenuService } from '@nebular/theme';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.css'
})
export class PagesComponent implements OnInit, AfterViewInit {
  menu: any = [];

  constructor(private menuService: NbMenuService, private nbDialogService: NbDialogService){

  }

  ngOnInit(): void {
    this.menuService.addItems(
      [
        {
          title: 'Home',
          icon: 'home',
          link: '/principal',
          home: true,
        },
        {
          title: 'Plataformas disponibles',
          icon: 'home',
          link: '/principal/plataformas'
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
            {
              title: 'Reportes',
              icon: 'maximize-outline',
              link: '/pages/consult/components',
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
          ]
        },
        {
          title: 'Seguridad',
          icon: 'lock-outline',
          children: [
            {
              title: 'Usuarios',
              link: '/pages/security/users',
            },
            {
              title: 'Roles',
              link: '/pages/security/roles',
            },
            {
              title: 'Pagador',
              link: '/pages/security/payers',
            },
          ],
        },
        {
          title: 'Organización',
          icon: 'briefcase-outline',
          children: [
            {
              title: 'Distribuidores',
              link: '/pages/organization/distributors',
            },
            {
              title: 'Oficinas',
              link: '/pages/organization/establishments',
            },
            {
              title: 'Vendedores',
              link: '/pages/organization/sellers',
            },
            {
              title: 'Contratos',
              link: '/pages/organization/contrats',
            },
          ],
        },
        {
          title: 'Funcionalidades',
          group: true,
        },
        {
          title: 'Emisión',
          icon: 'keypad-outline',
          link: '/pages/ui-features',
          children: [
            {
              title: 'Emisiones',
              link: '/pages/campaigns',
            },
            {
              title: 'Plan de Emisiones',
              link: '/pages/emissions',
            },
          ],
        },
        {
          title: 'Tiquetes',
          icon: 'cube-outline',
          link: '/pages/components',
          children: [
            {
              title: 'Asignación',
              link: '/pages/components/allocations',
            },
            {

              title: 'Financiera',
              link: '/pages/components/financial/movements',
            },{
              title: 'Pago de premios',
              link: '/pages/components/payprize',
            },
          ],
        },
        {
          title: 'Inventario',
          group: true,
        },
        {
          title: 'Transferencias',
          icon: 'file-outline',
          link: '/pages/inventory/transfers',
        },
        {
          title: 'Solicitudes',
          icon: 'book-outline',
          link: '/pages/request',
          children: [
            {
              title: 'Solicitudes',
              icon: 'clipboard-outline',
              link: '/pages/request/requests',
            },
            {
              title: 'Historial',
              icon: 'book-open-outline',
              link: '/pages/request/history',
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
        this.openTransfers();
      }
    });
  }

  openTransfers() {
    this.nbDialogService.open(PagesComponent);
  }

  toggle(){
    return true;
  }
}
