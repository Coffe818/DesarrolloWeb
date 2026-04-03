import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../shared/service/AuthService.service';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header';

@Component({
  selector: 'app-admin-menu',
  standalone: true,
  imports: [CommonModule, RouterLink, PageHeaderComponent],
  templateUrl: './admin-menu.html',
  styleUrl: './admin-menu.css'
})
export class AdminMenu {
  authService = inject(AuthService);
  router = inject(Router);

  adminOptions = [
    { title: 'Dashboard', route: '/admin/dashboard', icon: 'dashboard', color: 'text-primary' },
    { title: 'Gestor de Tickets', route: '/admin/tickets', icon: 'confirmation_number', color: 'text-success' },
    { title: 'Catálogos', route: '/admin/catalogos', icon: 'folder_shared', color: 'text-warning' }
  ];

  logout() {
    this.authService.logout();
  }
}
