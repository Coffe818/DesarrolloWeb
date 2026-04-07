import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'bienvenida' },
  { path: 'bienvenida', loadComponent: () => import('./start/start').then(m => m.Start) },
  { path: 'login', loadComponent: () => import('./login/login').then(m => m.Login) },
  { path: 'crear-ticket', loadComponent: () => import('./ticket-form/ticket-form').then(m => m.TicketForm) },
  { path: 'admin/menu', loadComponent: () => import('./admin/admin-menu').then(m => m.AdminMenu) },
  { path: 'admin/dashboard', loadComponent: () => import('./admin-dashboard/admin-dashboard').then(m => m.AdminDashboard) },
  { path: 'admin/tickets', loadComponent: () => import('./admin-tickets/admin-tickets').then(m => m.AdminTickets) },
  { path: 'admin/catalogos', loadComponent: () => import('./admin-catalogos/admin-catalogos').then(m => m.AdminCatalogos) },
  { path: 'admin/catalogo/administradores', loadComponent: () => import('./admin-catalogo-administrador/admin-catalogo-administrador').then(m => m.AdminCatalogoAdministrador) },
  { path: 'admin/catalogo/municipios', loadComponent: () => import('./admin-catalogo-municipio/admin-catalogo-municipio').then(m => m.AdminCatalogoMunicipio) },
];