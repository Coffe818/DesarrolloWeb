import { Routes } from '@angular/router';
import { adminGuard, segGuard } from './shared/services/seg.service';

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
    path: 'historial',
    canActivate: [segGuard],
    loadComponent: () => import('./components/historial/historial.component').then(m => m.HistorialComponent)
  },
  {
    path: 'resultado/:idExamen',
    loadComponent: () => import('./components/resultado/resultado.component').then(m => m.ResultadoComponent)
  },
  {
    path: 'grupos',
    canActivate: [adminGuard],
    loadComponent: () => import('./components/grupos/grupos.component').then(m => m.GruposComponent)
  },
  {
    path: 'usuarios',
    canActivate: [adminGuard],
    loadComponent: () => import('./components/usuarios/usuarios.component').then(m => m.UsuariosComponent)
  },
];
