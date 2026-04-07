import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpService } from './HttpService.service';
import { UtilService } from './UtilService.service';
import { User } from '../models/user.model';
import { tap } from 'rxjs/operators';

interface PaginatedResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: User[];
}

@Injectable({
    providedIn: 'root',
})
export class UsuarioService {
    private httpService = inject(HttpService);
    private utilService = inject(UtilService);
    
    private _usuarios = signal<User[]>([]);
    private _currentPage = signal<number>(1);
    private _totalPages = signal<number>(1);
    private _totalCount = signal<number>(0);

    public usuarios = computed(() => this._usuarios());
    public currentPage = computed(() => this._currentPage());
    public totalPages = computed(() => this._totalPages());
    public totalCount = computed(() => this._totalCount());

    constructor() {
        this.cargarUsuarios(1);
    }

    cargarUsuarios(page: number = 1) {
        this.httpService.get<PaginatedResponse>(`/api/admin-users/?page=${page}`, true).pipe(
            tap({
                next: (data) => {
                    this._usuarios.set(data.results);
                    this._currentPage.set(page);
                    this._totalCount.set(data.count);
                    const totalPages = Math.ceil(data.count / 25);
                    this._totalPages.set(totalPages);
                },
                error: () => {
                    console.error('Error al cargar usuarios');
                }
            })
        ).subscribe();
    }

    reloadUsuarios() {
        this.cargarUsuarios(this._currentPage());
    }

    goToPage(page: number) {
        if (page < 1 || page > this._totalPages()) return;
        this.cargarUsuarios(page);
    }

    nextPage() {
        if (this._currentPage() < this._totalPages()) {
            this.cargarUsuarios(this._currentPage() + 1);
        }
    }

    prevPage() {
        if (this._currentPage() > 1) {
            this.cargarUsuarios(this._currentPage() - 1);
        }
    }

    usuarioDelete(id: number) {
        return this.httpService.delete<any>(`/api/admin-users/${id}/`, true);
    }

    usuarioSave(usuario: User) {
        const body = this.utilService.buildBody(usuario, ['nombre_usuario', 'contrasena']);
        return this.httpService.post<any>('/api/admin-users/', body, true);
    }

    usuarioUpdate(usuario: User) {
        const body = this.utilService.buildBody(usuario, ['nombre_usuario']);
        return this.httpService.put<any>(`/api/admin-users/${usuario.id}/`, body, true);
    }

    usuarioCambiarContrasena(id: number, contrasena_actual: string, contrasena_nueva: string) {
        const body = {
            contrasena_actual: contrasena_actual,
            contrasena_nueva: contrasena_nueva
        }
        return this.httpService.post<any>(`/api/admin-users/${id}/change-password/`, body, true);
    }
}
