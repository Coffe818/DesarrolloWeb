import { computed, Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class UtilService {

    private _loading = signal<boolean>(false);

    public isLoading = computed(() => this._loading());

    CURP_REGEX = /^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z0-9]\d$/;
    TELEFONO_REGEX = /^[+()\-\d\s]{7,25}$/;
    EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    constructor() { }

    startLoading() {
        this._loading.set(true);
    }

    stopLoading() {
        this._loading.set(false);
    }

    // validaciones 
    validarCURP(curp: string): boolean {
        return this.CURP_REGEX.test(curp);
    }

    validarTelefono(telefono: string): boolean {
        return this.TELEFONO_REGEX.test(telefono);
    }
    validarEmail(email: string): boolean {
        return this.EMAIL_REGEX.test(email);
    }


}