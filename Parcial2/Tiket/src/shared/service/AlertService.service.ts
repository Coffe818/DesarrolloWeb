import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root',
})

export class AlertService {

    private toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
        target: 'body',
        showClass: {
            popup: 'animate__animated animate__slideInRight animate__faster'
        },
        hideClass: {
            popup: 'animate__animated animate__slideOutRight animate__slow'
        },
        customClass: {
            popup: 'my-custom-toast'
        }
    });

    constructor() { }

    // Alerta de éxito tipo Toast (no bloquea la pantalla)
    success(message: string) {
        this.toast.fire({
            icon: 'success',
            title: message,
            background: '#f8fff9'
        });
    }

    // Alerta de error
    error(message: string) {
        this.toast.fire({
            icon: 'error',
            title: message,
            background: '#fff8f8'
        });
    }

    // Confirmación (bloqueante, ideal para borrar o guardar cosas críticas)
    async confirm(title: string, text: string) {
        return Swal.fire({
            title: title,
            text: text,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#0d6efd',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Sí, continuar',
            cancelButtonText: 'Cancelar',
            heightAuto: false // Evita saltos raros de scroll
        });
    }


}
