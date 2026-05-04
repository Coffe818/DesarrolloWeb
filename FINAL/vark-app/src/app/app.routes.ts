import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/landing/landing').then(m => m.LandingComponent)
  },
  {
    path: 'presentar-examen',
    loadComponent: () => import('./components/realizar-examen/realizar-examen.component').then(m => m.RealizarExamenComponent)
  },
];
