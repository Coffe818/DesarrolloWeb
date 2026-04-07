import { Component, computed, inject, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MunicipioService } from '../../service/MunicipioService.service';
import { Municipio } from '../../models/municipio.model';

@Component({
  selector: 'app-municipio-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './municipio-search.html',
  styleUrl: './municipio-search.css'
})
export class MunicipioSearchComponent {
  // Input para valor inicial
  value = input<string>('');
  
  // Output para cuando se selecciona un municipio
  municipioSelected = output<string>();
  
  // Deshabilitado
  disabled = input<boolean>(false);

  municipioService = inject(MunicipioService);

  // Signal para el texto de búsqueda (lo que el usuario escribe)
  searchText = signal<string>('');
  
  // Signal para controlar el dropdown
  isOpen = signal<boolean>(false);

  // Todos los municipios cargados
  allMunicipios = computed(() => this.municipioService.allMunicipios());

  // Filtrar municipios basado en el texto de búsqueda
  filteredMunicipios = computed(() => {
    const search = this.searchText().toLowerCase().trim();
    const all = this.allMunicipios();
    
    // Si no hay búsqueda, mostrar todos los municipios (máximo 50 para no saturar)
    if (!search) return all.slice(0, 50);
    return all.filter(m => m.nombre.toLowerCase().includes(search));
  });

  // Mostrar todos los municipios al enfocar si no hay nada seleccionado
  showAllOnFocus = computed(() => {
    return this.searchText().length === 0;
  });

  constructor() {
    // Cargar todos los municipios al iniciar
    this.municipioService.loadAllMunicipios();
  }

  ngOnInit() {
    // Establecer valor inicial si viene del input
    if (this.value()) {
      this.searchText.set(this.value());
    }
  }

  onSearchChange(value: string) {
    this.searchText.set(value);
    this.isOpen.set(true);
  }

  onFocus() {
    this.isOpen.set(true);
  }

  selectMunicipio(municipio: Municipio) {
    this.searchText.set(municipio.nombre);
    this.isOpen.set(false);
    this.municipioSelected.emit(municipio.nombre);
  }

  clearSelection() {
    this.searchText.set('');
    this.isOpen.set(false);
    this.municipioSelected.emit('');
  }

  onBlur() {
    // Delay para permitir click en el dropdown
    setTimeout(() => {
      this.isOpen.set(false);
    }, 300);
  }

  onDropdownClick(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }
}
