import { computed, inject, Injectable, signal } from '@angular/core';
import { map, tap } from 'rxjs';
import { HttpService } from './HttpService.service';



@Injectable({
    providedIn: 'root',
})

export class NivelEstudioService {

    private httpService = inject(HttpService);

    private _nivelesEstudios = signal<string[]>([]);

    public nivelesEstudios = computed(() => this._nivelesEstudios());

    private cargando = false;

    constructor() {
        this.cargarNivelesEstudios();
    }


    cargarNivelesEstudios() {
        if (this._nivelesEstudios().length > 0 || this.cargando) return;

        this.cargando = true;
        this.httpService.get<any>('/api/niveles-estudio/').pipe(
            map(response => response as string[]),
            tap(data => {
                this._nivelesEstudios.set(data);
                console.log('Niveles de estudio cargados:', this._nivelesEstudios());
                this.cargando = false;
            }),
            tap({ error: () => this.cargando = false })
        ).subscribe(

        );
    }

}