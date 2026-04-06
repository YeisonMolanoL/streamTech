// EJEMPLO: Cómo agregar rutas en app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importar componentes principales
import { DashboardComponent } from './components/dashboard/dashboard.component';
// ... otros componentes

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  
  // ✅ OPCIÓN 1: Módulo Lazy Loading (Recomendado)
  {
    path: 'codigos',
    loadChildren: () => import('./modules/code-reception/code-reception.module')
      .then(m => m.CodeReceptionModule)
  },
  
  // ✅ OPCIÓN 2: Si usas módulo compilado (eagerly loaded)
  // Solo si ya importaste CodeReceptionModule en app.module.ts
  // {
  //   path: 'codigos',
  //   loadChildren: () => import('./modules/code-reception/code-reception.module')
  //     .then(m => m.CodeReceptionModule)
  // }

  // Otras rutas...
  {
    path: 'authentication',
    loadChildren: () => import('./modules/authentication/authentication.module')
      .then(m => m.AuthenticationModule)
  },
  
  {
    path: 'dashboard',
    loadChildren: () => import('./modules/dashboard/dashboard.module')
      .then(m => m.DashboardModule)
  },

  // Redirección por defecto
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
