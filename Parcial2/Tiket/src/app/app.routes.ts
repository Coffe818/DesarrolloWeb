import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./start/start').then(m => m.Start) },
  { path: 'login', loadComponent: () => import('./login/login').then(m => m.Login) },
  { path: 'crear-tiket', loadComponent: () => import('./tiket-form/tiket-form').then(m => m.TiketForm) },
];