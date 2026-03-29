import { computed, inject, Injectable, signal } from '@angular/core';
import { map, tap } from 'rxjs';
import { HttpService } from './HttpService.service';
import { Municipio } from '../models/municipio.model';


@Injectable({
    providedIn: 'root',
})

export class MunicipioService {
    private httpService = inject(HttpService);

    private _municipios = signal<Municipio[]>([]);

    public municipios = computed(() => this._municipios());
    public municipiosNames = computed(() => this._municipios().map(m => m.nombre));

    private cargando = false;

    constructor() {
        this.cargarMunicipios();
    }


    cargarMunicipios() {
        if (this._municipios().length > 0 || this.cargando) return;

        this.cargando = true;
        this.httpService.get<any>('/api/municipios/').pipe(
            map(response => response.results as Municipio[]),
            tap(data => {
                this._municipios.set(data);
                this.cargando = false;
            }),
            tap({ error: () => this.cargando = false }),
        ).subscribe();
    }

}