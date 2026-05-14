import { Routes } from '@angular/router';
import { segGuard } from './shared/services/seg.service';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/landing/landing').then(m => m.LandingComponent)
  },
  {
    path: 'presentar-examen/:idTipo',
    loadComponent: () => import('./components/realizar-examen/realizar-examen.component').then(m => m.RealizarExamenComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'resultados',
    canActivate: [segGuard],
    loadComponent: () => import('./components/resultados/resultados.component').then(m => m.ResultadosComponent)
  },
  {
    path: 'resultado/:idExamen',
    loadComponent: () => import('./components/resultado/resultado.component').then(m => m.ResultadoComponent)
  },
];
