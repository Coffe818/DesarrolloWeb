import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertService } from '../../shared/service/AlertService.service';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header';
import { UsuarioService } from '../../shared/service/UsuarioService.service';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-admin-catalogo-administrador',
  standalone: true,
  imports: [CommonModule, FormsModule, PageHeaderComponent],
  templateUrl: './admin-catalogo-administrador.html',
  styleUrl: './admin-catalogo-administrador.css'
})
export class AdminCatalogoAdministrador {
  alertService = inject(AlertService);
  usuarioService = inject(UsuarioService);

  // Signals de paginación del servicio
  currentPage = computed(() => this.usuarioService.currentPage());
  totalPages = computed(() => this.usuarioService.totalPages());
  totalCount = computed(() => this.usuarioService.totalCount());

  // Filtro local
  filterNombre = signal<string>('');

  // Lista filtrada de usuarios
  filteredUsuarios = computed(() => {
    const all = this.usuarioService.usuarios();
    const filter = this.filterNombre().toLowerCase().trim();
    
    if (!filter) return [...all];
    return all.filter(u => u.nombre_usuario.toLowerCase().includes(filter));
  });

  // Variables para los modales
  modalAdministrador: User = new User();
  modalContrasena = {
    contrasena_actual: '',
    contrasena_nueva: '',
    contrasena_confirmar: ''
  };
  modalTitulo: string = '';

  resetFilters() {
    this.filterNombre.set('');
  }

  // Navegación de paginación
  goToPage(page: number) {
    this.usuarioService.goToPage(page);
  }

  nextPage() {
    this.usuarioService.nextPage();
  }

  prevPage() {
    this.usuarioService.prevPage();
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const total = this.totalPages();
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
    return pages;
  }

  // Abrir modal para CREAR nuevo administrador
  abrirModalCrear() {
    this.modalTitulo = 'Nuevo Administrador';
    this.modalAdministrador = new User();
  }

  // Abrir modal para EDITAR administrador
  abrirModalEditar(administrador: User) {
    this.modalTitulo = 'Editar Administrador';
    this.modalAdministrador = { ...administrador };
  }

  // Abrir modal para CAMBIAR CONTRASEÑA
  abrirModalCambiarContrasena(administrador: User) {
    this.modalTitulo = 'Cambiar Contraseña';
    this.modalAdministrador = { ...administrador };
    this.modalContrasena = {
      contrasena_actual: '',
      contrasena_nueva: '',
      contrasena_confirmar: ''
    };
  }

  // Guardar nuevo administrador
  guardarNuevoAdministrador() {
    if (!this.modalAdministrador.nombre_usuario?.trim()) {
      this.alertService.error('El nombre de usuario es obligatorio.');
      return;
    }
    if (!this.modalAdministrador.contrasena?.trim()) {
      this.alertService.error('La contraseña es obligatoria.');
      return;
    }
    if (this.modalAdministrador.contrasena.length < 6) {
      this.alertService.error('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    this.usuarioService.usuarioSave(this.modalAdministrador).subscribe({
      next: () => {
        this.alertService.success('Administrador creado exitosamente.');
        this.cerrarModal('modalAdministrador');
        this.usuarioService.reloadUsuarios();
      },
      error: (err) => {
        this.alertService.error('Error al crear el administrador: ' + (err.message || 'Error desconocido'));
      }
    });
  }

  // Guardar cambios de edición
  guardarEdicionAdministrador() {
    if (!this.modalAdministrador.nombre_usuario?.trim()) {
      this.alertService.error('El nombre de usuario es obligatorio.');
      return;
    }

    this.usuarioService.usuarioUpdate(this.modalAdministrador).subscribe({
      next: () => {
        this.alertService.success('Administrador actualizado exitosamente.');
        this.cerrarModal('modalAdministrador');
        this.usuarioService.reloadUsuarios();
      },
      error: (err) => {
        this.alertService.error('Error al actualizar el administrador: ' + (err.message || 'Error desconocido'));
      }
    });
  }

  // Guardar cambio de contraseña
  guardarCambioContrasena() {
    if (!this.modalContrasena.contrasena_nueva.trim()) {
      this.alertService.error('La nueva contraseña es obligatoria.');
      return;
    }
    if (!this.modalContrasena.contrasena_actual.trim()) {
      this.alertService.error('La contraseña actual es obligatoria.');
      return;
    }
    if (this.modalContrasena.contrasena_nueva !== this.modalContrasena.contrasena_confirmar) {
      this.alertService.error('Las contraseñas nuevas no coinciden.');
      return;
    }
    if (this.modalContrasena.contrasena_nueva.length < 6) {
      this.alertService.error('La nueva contraseña debe tener al menos 6 caracteres.');
      return;
    }

    this.usuarioService.usuarioCambiarContrasena(
      this.modalAdministrador.id!, 
      this.modalContrasena.contrasena_actual,
      this.modalContrasena.contrasena_nueva
    ).subscribe({
      next: () => {
        this.alertService.success('Contraseña actualizada exitosamente.');
        this.cerrarModal('modalContrasena');
      },
      error: (err) => {
        this.alertService.error('Error al cambiar la contraseña: ' + (err.message || 'Error desconocido'));
      }
    });
  }

  deleteAdministrador(administrador: User) {
    this.alertService.confirm('Confirmar eliminación', `¿Estás seguro de que deseas eliminar al administrador ${administrador.nombre_usuario}?`).then(confirmed => {
      if (confirmed) {
        this.usuarioService.usuarioDelete(administrador.id!).subscribe({
          next: () => {
            this.alertService.success(`Administrador ${administrador.nombre_usuario} eliminado exitosamente.`);
            this.usuarioService.reloadUsuarios();
          },
          error: (err) => {
            this.alertService.error('Error al eliminar el administrador: ' + (err.message || 'Error desconocido'));
          }
        });
      }
    });
  }

  cerrarModal(modalId: string) {
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      const modal = (window as any).bootstrap?.Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      } else {
        modalElement.classList.remove('show');
        modalElement.style.display = 'none';
        document.body.classList.remove('modal-open');
        document.body.style.overflow = '';
        const backdrop = document.querySelector('.modal-backdrop');
        if (backdrop) backdrop.remove();
      }
    }
  }
}
