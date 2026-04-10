import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpService } from './HttpService.service';
import { Municipio } from '../models/municipio.model';
import { tap } from 'rxjs/operators';

interface PaginatedResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Municipio[];
}

@Injectable({
    providedIn: 'root',
})
export class MunicipioService {
    private httpService = inject(HttpService);

    private _municipios = signal<Municipio[]>([]);
    private _currentPage = signal<number>(1);
    private _totalPages = signal<number>(1);
    private _totalCount = signal<number>(0);
    
    // Para el search: cargar TODOS los municipios sin paginación
    private _allMunicipios = signal<Municipio[]>([]);
    private _allMunicipiosLoaded = signal<boolean>(false);

    public municipios = computed(() => this._municipios());
    public municipiosNames = computed(() => this._municipios().map(m => m.nombre));
    public currentPage = computed(() => this._currentPage());
    public totalPages = computed(() => this._totalPages());
    public totalCount = computed(() => this._totalCount());
    
    // Para el search component
    public allMunicipios = computed(() => this._allMunicipios());

    constructor() {
        this.cargarMunicipios(1);
    }

    cargarMunicipios(page: number = 1) {
        this.httpService.get<PaginatedResponse>(`/api/municipios/?page=${page}&page_size=25`).pipe(
            tap({
                next: (data) => {
                    this._municipios.set(data.results);
                    this._currentPage.set(page);
                    this._totalCount.set(data.count);
                    const totalPages = Math.ceil(data.count / 25);
                    this._totalPages.set(totalPages);
                },
                error: () => {
                    console.error('Error al cargar municipios');
                }
            })
        ).subscribe();
    }

    reloadMunicipios() {
        this.cargarMunicipios(this._currentPage());
    }
    
    // Cargar TODOS los municipios para el search (sin paginación)
    loadAllMunicipios() {
        // Si ya están cargados, no volver a cargar
        if (this._allMunicipiosLoaded()) {
            return;
        }
        
        console.log('[MunicipioService] Cargando todos los municipios...');
        this.cargarPaginaMunicipios(1);
    }
    
    // Recargar todos los municipios (limpia el cache y vuelve a cargar)
    reloadAllMunicipios() {
        console.log('[MunicipioService] Recargando todos los municipios...');
        this._allMunicipiosLoaded.set(false);
        this._allMunicipios.set([]);
        this.loadAllMunicipios();
    }
    
    // Cargar página por página y combinar resultados
    private cargarPaginaMunicipios(page: number) {
        this.httpService.get<PaginatedResponse>(`/api/municipios/?page=${page}`).pipe(
            tap({
                next: (data) => {
                    console.log(`[MunicipioService] Página ${page}:`, data.results.length, 'municipios');
                    
                    // Acumular los municipios
                    const current = this._allMunicipios();
                    this._allMunicipios.set([...current, ...data.results]);
                    
                    // Si hay más páginas, cargar la siguiente
                    if (data.next) {
                        this.cargarPaginaMunicipios(page + 1);
                    } else {
                        // Ya terminé de cargar todas las páginas
                        this._allMunicipiosLoaded.set(true);
                        console.log('[MunicipioService] Carga completa. Total:', this._allMunicipios().length);
                    }
                },
                error: (err) => {
                    console.error('[MunicipioService] Error al cargar municipios página', page, err);
                }
            })
        ).subscribe();
    }

    goToPage(page: number) {
        if (page < 1 || page > this._totalPages()) return;
        this.cargarMunicipios(page);
    }

    nextPage() {
        if (this._currentPage() < this._totalPages()) {
            this.cargarMunicipios(this._currentPage() + 1);
        }
    }

    prevPage() {
        if (this._currentPage() > 1) {
            this.cargarMunicipios(this._currentPage() - 1);
        }
    }

    municipioDelete(id: number) {
        return this.httpService.delete(`/api/municipios/${id}/`, true);
    }

    municipioCreate(municipio: Municipio) {
        const body = {
            nombre: municipio.nombre,
            estado: municipio.estado,
        };
        return this.httpService.post(`/api/municipios/`, body, true);
    }

    municipioUpdate(municipio: Municipio) {
        const body = {
            nombre: municipio.nombre,
            estado: municipio.estado,
        };
        return this.httpService.put(`/api/municipios/${municipio.id}/`, body, true);
    }
}
