import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../shared/service/AuthService.service';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header';

@Component({
  selector: 'app-admin-catalogos',
  standalone: true,
  imports: [CommonModule, RouterLink, PageHeaderComponent],
  templateUrl: './admin-catalogos.html',
  styleUrl: './admin-catalogos.css'
})
export class AdminCatalogos{
  authService = inject(AuthService);
  router = inject(Router);

  adminOptions = [
    { title: 'Administradores', route: '/admin/catalogo/administradores', icon: 'manage_accounts', color: 'text-primary-emphasis' },
    { title: 'Municipios', route: '/admin/catalogo/municipios', icon: 'location_city', color: 'text-secondary' },
  ];

  logout() {
    this.authService.logout();
  }
}
