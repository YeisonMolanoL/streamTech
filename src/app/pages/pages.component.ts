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
          title: 'Inventario',
          group: true,
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
            }
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
        }
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
