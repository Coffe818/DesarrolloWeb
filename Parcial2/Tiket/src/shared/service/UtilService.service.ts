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

    //Formato json
    buildBody(data: any, fields: string[]): any {
        const body: any = {};
        fields.forEach(field => {
            if (data[field] !== undefined) {
                body[field] = data[field];
            }
        });
        return body;
    }

    buildQueryParams(data: any, fields: string[]): string {
        const params = new URLSearchParams();

        fields.forEach(field => {
            if (data[field] !== undefined && data[field] !== null && data[field] !== '' && data[field] !== 0) {
                params.append(field, data[field]);
            }
        });

        const queryString = params.toString();
        return queryString ? `?${queryString}` : '';
    }


}