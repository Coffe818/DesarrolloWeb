import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertService } from '../../shared/service/AlertService.service';
import { MunicipioService } from '../../shared/service/MunicipioService.service';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header';
import { UtilService } from '../../shared/service/UtilService.service';
import { Municipio } from '../../shared/models/municipio.model';

@Component({
  selector: 'app-admin-catalogo-municipio',
  standalone: true,
  imports: [CommonModule, FormsModule, PageHeaderComponent],
  templateUrl: './admin-catalogo-municipio.html',
  styleUrl: './admin-catalogo-municipio.css'
})
export class AdminCatalogoMunicipio implements OnInit {
  utilService = inject(UtilService);
  alertService = inject(AlertService);
  municipioService = inject(MunicipioService);

  // Signals para paginación
  filterNombre = signal<string>('');
  
  filteredMunicipios = computed(() => {
    const all = this.municipioService.municipios();
    const filter = this.filterNombre().toLowerCase().trim();
    
    if (!filter) return [...all];
    return all.filter(m => m.nombre.toLowerCase().includes(filter));
  });

  // Signals de paginación del servicio
  currentPage = computed(() => this.municipioService.currentPage());
  totalPages = computed(() => this.municipioService.totalPages());
  totalCount = computed(() => this.municipioService.totalCount());

  modalMunicipio: Municipio = new Municipio();
  modalTitulo: string = '';

  ngOnInit() {
    // Los municipios se cargan en el constructor del servicio
  }

  resetFilters() {
    this.filterNombre.set('');
  }

  // Navegación de paginación
  goToPage(page: number) {
    this.municipioService.goToPage(page);
  }

  nextPage() {
    this.municipioService.nextPage();
  }

  prevPage() {
    this.municipioService.prevPage();
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const total = this.totalPages();
    
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
    return pages;
  }

  abrirModalCrear() {
    this.modalTitulo = 'Nuevo Municipio';
    this.modalMunicipio = new Municipio();
    this.modalMunicipio.estado = 'Coahuila';
  }

  abrirModalEditar(municipio: Municipio) {
    this.modalTitulo = 'Editar Municipio';
    this.modalMunicipio = { ...municipio };
  }

  guardarNuevoMunicipio() {
    if (!this.modalMunicipio.nombre?.trim()) {
      this.alertService.error('El nombre del municipio es obligatorio.');
      return;
    }
    if (!this.modalMunicipio.estado?.trim()) {
      this.alertService.error('El estado es obligatorio.');
      return;
    }

    this.municipioService.municipioCreate(this.modalMunicipio).subscribe({
      next: () => {
        this.alertService.success('Municipio creado exitosamente.');
        this.cerrarModal('modalMunicipio');
        this.municipioService.reloadMunicipios();
        this.municipioService.reloadAllMunicipios(); // Recargar también el search
      },
      error: () => {
        this.alertService.error('Error al crear el municipio');
      }
    });
  }

  guardarEdicionMunicipio() {
    if (!this.modalMunicipio.nombre?.trim()) {
      this.alertService.error('El nombre del municipio es obligatorio.');
      return;
    }
    if (!this.modalMunicipio.estado?.trim()) {
      this.alertService.error('El estado es obligatorio.');
      return;
    }
    console.log('Guardando municipio editado:', this.modalMunicipio);
    this.municipioService.municipioUpdate(this.modalMunicipio).subscribe({
      next: () => {
        this.alertService.success('Municipio actualizado exitosamente.');
        this.cerrarModal('modalMunicipio');
        this.municipioService.reloadMunicipios();
        this.municipioService.reloadAllMunicipios(); // Recargar también el search
      },
      error: () => {
        this.alertService.error('Error al actualizar el municipio');
      }
    });
  }

  deleteMunicipio(municipio: Municipio) {
    if (municipio.contador_tickets > 0) {
      this.alertService.error(`No se puede eliminar el municipio de ${municipio.nombre} porque tiene ${municipio.contador_tickets} tickets asociados.`);
      return;
    }
    this.alertService.confirm('Confirmar eliminación', `¿Estás seguro de que deseas eliminar el municipio de ${municipio.nombre}?`).then(confirmed => {
      if (confirmed) {
        this.municipioService.municipioDelete(municipio.id!).subscribe({
          next: () => {
            this.alertService.success(`Municipio ${municipio.nombre} eliminado exitosamente.`);
            this.municipioService.reloadMunicipios();
            this.municipioService.reloadAllMunicipios(); // Recargar también el search
          },
          error: () => {
            this.alertService.error('Error al eliminar el municipio');
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
